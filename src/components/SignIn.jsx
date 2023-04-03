/* eslint-disable jsx-a11y/label-has-associated-control */

import PropTypes from 'prop-types';
import './styles/SignIn.css';

function SignIn({ closePanel }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="SignIn" onSubmit={handleSubmit} noValidate>
      <button className="SignIn-close" type="button" onClick={closePanel}>
        ×
      </button>
      <div className="SignIn-inputContainer">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </div>
      <div className="SignIn-inputContainer">
        <div className="SignIn-inputContainerTop">
          <label htmlFor="password">Password</label>
          <p className="SignIn-forgotten">Forgotten?</p>
        </div>
        <input type="password" name="password" id="password" />
      </div>
      <button type="submit" className="SignIn-button">
        Sign in
      </button>
    </form>
  );
}

SignIn.propTypes = {
  closePanel: PropTypes.func.isRequired,
};

export default SignIn;
