import React, { Fragment } from 'react';

const NewBlog = ({
  newBlog: { title, author, url },
  handleChange,
  handleSubmit,
}) => {
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
        <input type='submit' text='Add' />
      </form>
    </Fragment>
  );
};

export default NewBlog;
