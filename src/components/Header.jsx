import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignIn from './SignIn';
import './styles/Header.css';

function Header({ openSignUp }) {
  const [showSignIn, setShowSignIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowSignIn(false);
  }, [location.pathname]);

  const toggleShowSignIn = () => {
    setShowSignIn((prevShowSignIn) => !prevShowSignIn);
  };

  return (
    <header className="Header">
      <Link to="/">
        <h1 className="Header-title">Stanboxd</h1>
      </Link>
      {!showSignIn && (
        <div className="Header-controls">
          <ul className="Header-list">
            <li>
              <button type="button" onClick={toggleShowSignIn}>
                Sign in
              </button>
            </li>
            <li>
              <button type="button" onClick={openSignUp}>
                Create account
              </button>
            </li>
            <li>Films</li>
            <li>Members</li>
          </ul>
          <input
            className="Header-search"
            type="text"
            name="search"
            id="search"
          />
        </div>
      )}
      {showSignIn && <SignIn closePanel={toggleShowSignIn} />}
    </header>
  );
}

Header.propTypes = {
  openSignUp: PropTypes.func.isRequired,
};

export default Header;
