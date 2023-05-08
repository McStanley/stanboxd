import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import { logout } from '../firebase';
import { useUserContext } from '../contexts/UserContext';
import SearchBar from './SearchBar';
import SignIn from './SignIn';
import DefaultAvatar from '../assets/avatar.png';
import Dropdown from '../assets/dropdown.svg';
import './styles/Header.css';

function Header({ openSignUp, showSignIn, toggleShowSignIn }) {
  const [userData, userLoading] = useUserContext();

  const handleSignOut = async () => {
    await logout();
    toast.success('Signed out successfully.');
  };

  const userBanner = userData && (
    <>
      <img
        className="Header-avatar"
        src={userData.avatarUrl || DefaultAvatar}
        alt={userData.username}
      />
      {userData.username}
      <img className="Header-dropdownIcon" src={Dropdown} alt="Dropdown" />
    </>
  );

  return (
    <header className="Header">
      <Link to="/">
        <h1 className="Header-title">Stanboxd</h1>
      </Link>
      {!showSignIn && (
        <div className="Header-controls">
          <ul className="Header-list">
            {userLoading && (
              <li className="Header-loadingUser">Loading user data...</li>
            )}
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
                <div className="Header-user">{userBanner}</div>
                <div className="Header-dropdown">
                  <div className="Header-dropdownUser">{userBanner}</div>
                  <div className="Header-dropdownDivider" />
                  <Link to="/" className="Header-dropdownEntry">
                    Home
                  </Link>
                  <Link
                    to={`/member/${userData.uid}`}
                    className="Header-dropdownEntry"
                  >
                    Profile
                  </Link>
                  <Link
                    to={`/member/${userData.uid}/films`}
                    className="Header-dropdownEntry"
                  >
                    Films
                  </Link>
                  <Link
                    to={`/member/${userData.uid}/reviews`}
                    className="Header-dropdownEntry"
                  >
                    Reviews
                  </Link>
                  <div className="Header-dropdownDivider" />
                  <Link to="/settings">
                    <div className="Header-dropdownEntry">Settings</div>
                  </Link>
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
            <li>
              <Link to="/films">Films</Link>
            </li>
            <li>
              <Link to="/reviews">Reviews</Link>
            </li>
            <li className="Header-members">Members</li>
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
  showSignIn: PropTypes.bool.isRequired,
  toggleShowSignIn: PropTypes.func.isRequired,
};

export default Header;
