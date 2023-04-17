/* eslint-disable jsx-a11y/label-has-associated-control */

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import { isUsernameAvailable, register } from '../firebase';
import './styles/SignUp.css';

const AUTH_ERRORS = {
  'auth/email-already-in-use':
    'That email address is already associated with an account.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/weak-password': 'Please enter a stronger password.',
};

function SignUp({ closePanel }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    const emptyFields = [];

    if (!email) emptyFields.push('email');
    if (!username) emptyFields.push('username');
    if (!password) emptyFields.push('password');

    if (emptyFields.length) {
      emptyFields.forEach((entry) => {
        toast.error(`Please complete your ${entry}.`);
      });

      return;
    }

    if (!(await isUsernameAvailable(username))) {
      toast.error('This username is taken.');

      return;
    }

    try {
      await register(username, email, password);
      closePanel();
    } catch (error) {
      console.log(error);

      const unknownErrorMessage = (
        <span>
          Unknown error occured.{' '}
          <a href="https://github.com/McStanley">Contact me</a>.
        </span>
      );

      const toastContent = AUTH_ERRORS[error.code] || unknownErrorMessage;

      toast.error(toastContent);
    }
  };

  return (
    <form className="SignUp" onSubmit={handleSubmit} noValidate>
      <div className="SignUp-header">
        <p className="SignUp-title">Join Stanboxd</p>
        <button className="SignUp-close" type="button" onClick={closePanel}>
          ×
        </button>
      </div>
      <div className="SignUp-inputContainer">
        <label htmlFor="signup-email">Email address</label>
        <input
          className="wide"
          type="email"
          name="email"
          id="signup-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="SignUp-inputContainer">
        <label htmlFor="signup-username">Username</label>
        <input
          type="text"
          name="username"
          id="signup-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="SignUp-inputContainer">
        <label htmlFor="signup-password">Password</label>
        <input
          type="password"
          name="password"
          id="signup-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="SignUp-submit" type="submit">
        Sign up
      </button>
    </form>
  );
}

SignUp.propTypes = {
  closePanel: PropTypes.func.isRequired,
};

export default SignUp;
