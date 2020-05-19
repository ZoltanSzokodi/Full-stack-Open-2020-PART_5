import React, { useState, useEffect } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, blogs, setBlogs, user, setNotification }) => {
  const [visible, setVisible] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    blog.likes.includes(user.id) ? setLiked(true) : setLiked(false);
  }, [blog.likes, user.id]);

  // const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => setVisible(!visible);

  const handleLike = async type => {
    let resBlogObj;
    try {
      type === 'like'
        ? (resBlogObj = await blogService.like(blog.id))
        : (resBlogObj = await blogService.unlike(blog.id));

      const updatedBlogs = blogs.map(b => {
        if (b.id === resBlogObj.id) return resBlogObj;
        else return b;
      });
      setBlogs(updatedBlogs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm(
      'Are you sure you want to delete this blog?'
    );

    if (!confirm) return null;

    try {
      const res = await blogService.remove(blog.id);
      const updatedBlogs = blogs.filter(b => b.id !== blog.id);

      setBlogs(updatedBlogs);
      setNotification({
        success: true,
        msg: res.message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='blog'>
      <div>
        <span className='title'>{blog.title}</span> -{' '}
        <span className='author'>{blog.author}</span>
        <ul style={showWhenVisible}>
          <li>
            likes - {blog.likes.length}
            {liked ? (
              <button onClick={() => handleLike('unlike')}>unlike</button>
            ) : (
              <button onClick={() => handleLike('like')}>like</button>
            )}
          </li>
          <li>url - {blog.url}</li>
          <li>user - {blog.user.name}</li>
        </ul>
      </div>
      <div>
        <button onClick={toggleVisibility} className='view'>
          {visible ? 'hide' : 'show'}
        </button>
        <button
          onClick={handleDelete}
          className='delete'
          disabled={user.id !== blog.user.id}>
          X
        </button>
      </div>
    </div>
  );
};

export default Blog;
