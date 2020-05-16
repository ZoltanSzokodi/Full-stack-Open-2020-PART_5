import React, { Fragment, useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';

import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';

import './App.css';

const App = () => {
  const [notification, setNotification] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

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
  const loginUser = async credentialsObj => {
    try {
      const user = await loginService.login(credentialsObj);

      blogService.setToken(user.token);
      localStorage.setItem('user', JSON.stringify(user));

      setUser(user);
      setNotification({
        success: true,
        msg: 'You are logged in',
      });
    } catch (error) {
      console.log(error.response.data.error);
      setNotification({
        success: false,
        msg: error.response.data.error,
      });
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('user');

    setUser(null);
    setNotification({
      success: true,
      msg: 'Logged out',
    });
  };

  const createBlog = async newBlogObj => {
    try {
      const blog = await blogService.create(newBlogObj);

      setBlogs(blogs.concat(blog));

      setNotification({
        success: true,
        msg: 'New blog added',
      });
    } catch (error) {
      console.log(error.response.data.error);
      setNotification({
        success: false,
        msg: error.response.data.error,
      });
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
        <LoginForm loginUser={loginUser} />
      ) : (
        <Fragment>
          <BlogForm createBlog={createBlog} />
          <Blogs blogs={blogs} />
        </Fragment>
      )}
    </div>
  );
};

export default App;
