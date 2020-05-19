import React from 'react';
import Blog from './Blog';
import sortByLikes from '../helpers/sortByLikes';

const Blogs = ({ blogs, setBlogs, user, setNotification }) => {
  return (
    <div>
      <h2>Blogs list</h2>
      {[...blogs].sort(sortByLikes).map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
          setNotification={setNotification}
        />
      ))}
    </div>
  );
};

export default Blogs;
