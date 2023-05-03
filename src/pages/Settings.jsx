import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useUserContext } from '../contexts/UserContext';
import Loading from '../components/Loading';
import ProfileSettings from '../components/ProfileSettings';
import './styles/Settings.css';

const tabs = [
  { path: '', name: 'Profile' },
  { path: 'avatar', name: 'Avatar' },
];

function Settings({ openSignIn }) {
  const { tab = '' } = useParams();
  const [userData, userLoading] = useUserContext();

  const navElements = tabs.map((entry) => (
    <Link
      to={`/settings/${entry.path}`}
      className={`Settings-navEntry ${tab === entry.path && 'active'}`}
      key={entry.path}
    >
      {entry.name}
    </Link>
  ));

  return (
    <div className="Settings">
      <div className="Settings-content">
        <p className="Settings-title">Account settings</p>
        {userLoading && <Loading />}
        {!userLoading && !userData && (
          <p>
            Please{' '}
            <button
              className="Settings-signIn"
              type="button"
              onClick={openSignIn}
            >
              sign in
            </button>
            .
          </p>
        )}
        {!userLoading && userData && (
          <>
            <nav className="Settings-nav">{navElements}</nav>
            {tab === '' && (
              <ProfileSettings
                uid={userData.uid}
                username={userData.username}
              />
            )}
            {tab === 'avatar' && (
              <p style={{ fontSize: '2rem', userSelect: 'none' }}>🚧</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

Settings.propTypes = {
  openSignIn: PropTypes.func.isRequired,
};

export default Settings;
