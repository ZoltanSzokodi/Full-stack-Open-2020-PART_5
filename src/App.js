import React, { Fragment, useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';

import Blogs from './components/Blogs';
import Login from './components/Login';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';

import './App.css';

const App = () => {
  const [notification, setNotification] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  // Fetch all blogs
  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  // Check local storage for user token
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // Reset notifications after 5s
  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotification(null);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [notification]);

  // EVENT HANDLERS ============================
  const addCredentials = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async e => {
    e.preventDefault();

    try {
      const user = await loginService.login(credentials);

      blogService.setToken(user.token);
      localStorage.setItem('user', JSON.stringify(user));

      setUser(user);
      setCredentials({
        username: '',
        password: '',
      });
      setNotification({
        success: true,
        msg: 'You are logged in',
      });
      // setTimeout(() => {
      //   setNotification(null);
      // }, 5000);
    } catch (error) {
      console.log(error.response.data.error);
      setNotification({
        success: false,
        msg: error.response.data.error,
      });
      // setTimeout(() => {
      //   setNotification(null);
      // }, 5000);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('user');
    setUser(null);
    setNotification({
      success: true,
      msg: 'Logged out',
    });
    // setTimeout(() => {
    //   setNotification(null);
    // }, 5000);
  };

  const addBlogCredentials = e => {
    setNewBlog({
      ...newBlog,
      [e.target.name]: e.target.value,
    });
  };

  const createNewBlog = async e => {
    e.preventDefault();

    try {
      const blog = await blogService.create(newBlog);

      setBlogs(blogs.concat(blog));
      setNewBlog({
        title: '',
        author: '',
        url: '',
      });
      setNotification({
        success: true,
        msg: 'New blog added',
      });
      // setTimeout(() => {
      //   setNotification(null);
      // }, 5000);
    } catch (error) {
      console.log(error.response.data.error);
      setNotification({
        success: false,
        msg: error.response.data.error,
      });
      // setTimeout(() => {
      //   setNotification(null);
      // }, 5000);
    }
  };

  return (
    <div>
      {user && (
        <Fragment>
          <span>{`${user.username} is logged in`}</span>
          <button onClick={logoutUser}>log out</button>
        </Fragment>
      )}

      {notification && <Notification notification={notification} />}

      {user === null ? (
        <Login
          credentials={credentials}
          handleChange={addCredentials}
          handleSubmit={loginUser}
        />
      ) : (
        <Fragment>
          <NewBlog
            newBlog={newBlog}
            handleChange={addBlogCredentials}
            handleSubmit={createNewBlog}
          />
          <Blogs blogs={blogs} />
        </Fragment>
      )}
    </div>
  );
};

export default App;
