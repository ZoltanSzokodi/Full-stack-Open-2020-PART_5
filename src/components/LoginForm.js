import React, { Fragment, useState } from 'react';

const LoginForm = ({ loginUser }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    loginUser(credentials);

    setCredentials({
      username: '',
      password: '',
    });
  };

  const { username, password } = credentials;

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <div>
          username:{' '}
          <input
            onChange={handleChange}
            type='text'
            name='username'
            value={username}
            placeholder='Add username...'
            required
          />
        </div>
        <div>
          password:{' '}
          <input
            onChange={handleChange}
            type='password'
            name='password'
            value={password}
            placeholder='Add password...'
            required
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </Fragment>
  );
};

export default LoginForm;
