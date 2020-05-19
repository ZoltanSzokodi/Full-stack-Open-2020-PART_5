import React, { useState, useEffect } from 'react';
import blogService from '../services/blogs';

const Blog = ({
  blog: {
    id,
    title,
    author,
    likes,
    url,
    user: { name },
  },
  blogs,
  setBlogs,
  user,
}) => {
  const [visible, setVisible] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    likes.includes(user.id) ? setLiked(true) : setLiked(false);
  }, [likes, user.id]);

  // const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => setVisible(!visible);

  const handleLike = async type => {
    let blog;
    try {
      type === 'like'
        ? (blog = await blogService.like(id))
        : (blog = await blogService.unlike(id));

      const updatedBlogs = blogs.map(b => {
        if (b.id === blog.id) return blog;
        else return b;
      });
      setBlogs([...updatedBlogs]);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleUnLike = async () => {
  //   try {
  //     const blog = await blogService.unlike(id);

  //     const updatedBlogs = blogs.map(b => {
  //       if (b.id === blog.id) return blog;
  //       else return b;
  //     });

  //     setBlogs([...updatedBlogs]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className='blog'>
      <div>
        <span className='title'>{title}</span> -{' '}
        <span className='author'>{author}</span>
        <ul style={showWhenVisible}>
          <li>
            likes - {likes.length}
            {liked ? (
              <button onClick={() => handleLike('unlike')}>unlike</button>
            ) : (
              <button onClick={() => handleLike('like')}>like</button>
            )}
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
