import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ loginUser }) => {
  const initialState = {
    username: '',
    password: '',
  };
  const [{ username, password }, setFields] = useState(initialState);

  const handleChange = e => {
    const { name, value } = e.target;
    setFields(prevState => ({ ...prevState, [name]: value }));
  };

  const handleReset = () => setFields({ ...initialState });

  const handleSubmit = e => {
    e.preventDefault();

    loginUser({ username, password });

    handleReset();
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <label>
          username:{' '}
          <input
            onChange={handleChange}
            type='text'
            name='username'
            value={username}
            placeholder='Add username...'
            required
          />
        </label>
        <br />
        <label>
          password:{' '}
          <input
            onChange={handleChange}
            type='password'
            name='password'
            value={password}
            placeholder='Add password...'
            required
          />
        </label>
        <br />
        <button type='submit'>login</button>
      </form>
    </Fragment>
  );
};

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

export default LoginForm;
