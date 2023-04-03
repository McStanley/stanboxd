/* eslint-disable jsx-a11y/label-has-associated-control */

import PropTypes from 'prop-types';
import './styles/SignUp.css';

function SignUp({ closePanel }) {
  const handleSubmit = (e) => {
    e.preventDefault();
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
        <input className="wide" type="email" name="email" id="signup-email" />
      </div>
      <div className="SignUp-inputContainer">
        <label htmlFor="signup-username">Username</label>
        <input type="text" name="username" id="signup-username" />
      </div>
      <div className="SignUp-inputContainer">
        <label htmlFor="signup-password">Password</label>
        <input type="password" name="password" id="signup-password" />
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
