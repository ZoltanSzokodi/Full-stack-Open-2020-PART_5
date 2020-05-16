import React, { Fragment, useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const handleChange = e => {
    setNewBlog({
      ...newBlog,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    createBlog(newBlog);

    setNewBlog({
      title: '',
      author: '',
      url: '',
    });
  };

  const { title, author, url } = newBlog;

  return (
    <Fragment>
      <h2>Add new blog to list</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:{' '}
          <input
            onChange={handleChange}
            type='text'
            name='title'
            value={title}
            placeholder='Add title...'
            required
          />
        </div>
        <div>
          author:{' '}
          <input
            onChange={handleChange}
            type='text'
            name='author'
            value={author}
            placeholder='Add author...'
            required
          />
        </div>
        <div>
          url:{' '}
          <input
            onChange={handleChange}
            type='text'
            name='url'
            value={url}
            placeholder='Add url...'
            required
          />
        </div>
        <button type='submit'>add blog</button>
      </form>
    </Fragment>
  );
};

export default BlogForm;
