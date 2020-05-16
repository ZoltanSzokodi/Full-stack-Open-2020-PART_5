import React, { Fragment } from 'react';

const Login = ({
  credentials: { username, password },
  handleChange,
  handleSubmit,
}) => {
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
        <input type='submit' text='login' />
      </form>
    </Fragment>
  );
};

export default Login;
