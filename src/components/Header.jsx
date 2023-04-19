import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import { logout } from '../firebase';
import { useUserContext } from '../contexts/UserContext';
import SearchBar from './SearchBar';
import SignIn from './SignIn';
import Dropdown from '../assets/dropdown.svg';
import './styles/Header.css';

function Header({ openSignUp }) {
  const [showSignIn, setShowSignIn] = useState(false);
  const location = useLocation();
  const [userData, userLoading] = useUserContext();

  useEffect(() => {
    setShowSignIn(false);
  }, [location.pathname]);

  const toggleShowSignIn = () => {
    setShowSignIn((prevShowSignIn) => !prevShowSignIn);
  };

  const handleSignOut = async () => {
    await logout();
    toast.success('Signed out successfully.');
  };

  return (
    <header className="Header">
      <Link to="/">
        <h1 className="Header-title">Stanboxd</h1>
      </Link>
      {!showSignIn && (
        <div className="Header-controls">
          <ul className="Header-list">
            {userLoading && <li>Loading user data...</li>}
            {!userLoading && !userData && (
              <>
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
              </>
            )}
            {!userLoading && userData && (
              <li className="Header-userContainer">
                <div className="Header-user">
                  {userData.username}{' '}
                  <img
                    className="Header-dropdownIcon"
                    src={Dropdown}
                    alt="Dropdown"
                  />
                </div>
                <div className="Header-dropdown">
                  <div className="Header-dropdownUser">
                    {userData.username}{' '}
                    <img
                      className="Header-dropdownIcon"
                      src={Dropdown}
                      alt="Dropdown"
                    />
                  </div>
                  <div className="Header-dropdownDivider" />
                  <button
                    className="Header-dropdownEntry"
                    type="button"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </button>
                </div>
              </li>
            )}
            <li>Films</li>
            <li>Members</li>
          </ul>
          <SearchBar />
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
