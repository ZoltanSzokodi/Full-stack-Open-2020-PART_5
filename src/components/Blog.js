import React, { useState, useEffect } from 'react';

const Blog = ({ blog, user, handleDelete, handleLike }) => {
  const [visible, setVisible] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    blog.likes.includes(user.id) ? setLiked(true) : setLiked(false);
  }, [blog.likes, user.id]);

  // const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => setVisible(!visible);

  return (
    <div className='blog'>
      <div>
        <span className='title'>{blog.title}</span> -{' '}
        <span className='author'>{blog.author}</span>
        <ul style={showWhenVisible}>
          <li>
            likes - {blog.likes.length}
            {liked ? (
              <button onClick={() => handleLike('unlike', blog.id)}>
                unlike
              </button>
            ) : (
              <button onClick={() => handleLike('like', blog.id)}>like</button>
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
          onClick={() => handleDelete(blog.id)}
          className='delete'
          disabled={user.id !== blog.user.id}>
          X
        </button>
      </div>
    </div>
  );
};

export default Blog;
