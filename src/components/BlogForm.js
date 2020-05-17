import React, { Fragment, useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const initialState = {
    title: '',
    author: '',
    url: '',
  };
  const [{ title, author, url }, setFields] = useState(initialState);

  const handleChange = e => {
    const { name, value } = e.target;
    setFields(prevState => ({ ...prevState, [name]: value }));
  };

  const handleReset = () => setFields({ ...initialState });

  const handleSubmit = e => {
    e.preventDefault();

    createBlog({ title, author, url });

    handleReset();
  };

  return (
    <Fragment>
      <h2>Add new blog to list</h2>
      <form onSubmit={handleSubmit}>
        <label>
          title:{' '}
          <input
            onChange={handleChange}
            type='text'
            name='title'
            value={title}
            placeholder='Add title...'
            required
          />
        </label>
        <br />
        <label>
          author:{' '}
          <input
            onChange={handleChange}
            type='text'
            name='author'
            value={author}
            placeholder='Add author...'
            required
          />
        </label>
        <br />
        <label>
          url:{' '}
          <input
            onChange={handleChange}
            type='text'
            name='url'
            value={url}
            placeholder='Add url...'
            required
          />
        </label>
        <br />
        <button type='submit'>add blog</button>
      </form>
    </Fragment>
  );
};

export default BlogForm;
