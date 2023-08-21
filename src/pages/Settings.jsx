import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useUserContext } from '../contexts/UserContext';
import Loading from '../components/Loading';
import ProfileSettings from '../components/ProfileSettings';
import AvatarSettings from '../components/AvatarSettings';
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

  const tabName = tabs.find((entry) => entry.path === tab).name;

  return (
    <div className="Settings">
      <Helmet>
        <title>{tabName} settings • Stanboxd</title>
      </Helmet>
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
                currentUsername={userData.username}
              />
            )}
            {tab === 'avatar' && (
              <AvatarSettings
                uid={userData.uid}
                username={userData.username}
                currentAvatar={userData.avatarUrl}
              />
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
