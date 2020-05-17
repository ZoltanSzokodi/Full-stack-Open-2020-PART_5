import React, { useState } from 'react';
const Blog = ({
  blog: {
    title,
    author,
    likes,
    url,
    user: { name },
  },
}) => {
  const [visible, setVisible] = useState(false);

  // const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => setVisible(!visible);
  return (
    <div className='blog'>
      <div>
        <span className='title'>{title}</span> -{' '}
        <span className='author'>{author}</span>
        <ul style={showWhenVisible}>
          <li>
            likes - {likes.length}
            <button>like</button>
          </li>
          <li>url - {url}</li>
          <li>user - {name}</li>
        </ul>
      </div>
      <div>
        <button onClick={toggleVisibility} className='view'>
          {visible ? 'hide' : 'show'}
        </button>
        <button className='delete'>X</button>
      </div>
    </div>
  );
};

export default Blog;
