import React from 'react';
import Blog from './Blog';

const Blogs = ({ blogs, setBlogs, user }) => {
  return (
    <div>
      <h2>Blogs list</h2>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
        />
      ))}
    </div>
  );
};

export default Blogs;
