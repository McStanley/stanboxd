import { Link, useParams } from 'react-router-dom';
import { doc } from 'firebase/firestore';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import { useUserContext } from '../contexts/UserContext';
import Loading from '../components/Loading';
import MemberProfile from '../components/MemberProfile';
import MemberFilms from '../components/MemberFilms';
import MemberReviews from '../components/MemberReviews';
import DefaultAvatar from '../assets/avatar.png';
import './styles/Member.css';

const tabs = [
  { path: '', name: 'Profile', component: MemberProfile },
  { path: 'films', name: 'Films', component: MemberFilms },
  { path: 'reviews', name: 'Reviews', component: MemberReviews },
];

function Member() {
  const { uid, tab = '' } = useParams();
  const userRef = doc(db, 'users', uid);
  const [userData, userLoading] = useDocumentDataOnce(userRef);
  const [userContext] = useUserContext();

  const activeIndex = tabs.findIndex((entry) => entry.path === tab);
  const activeTab = tabs[activeIndex];

  const navElements = tabs.map((entry, index) => (
    <Link
      className={`Member-navItem ${index === activeIndex && 'active'}`}
      to={`/member/${uid}/${entry.path}`}
      key={entry.name}
    >
      {entry.name}
    </Link>
  ));

  return (
    <div className="Member">
      <div className="Member-content">
        {userLoading && <Loading />}
        {!userLoading && !userData && (
          <p>Sorry, we couldn&apos;t find this user.</p>
        )}
        {!userLoading && userData && (
          <>
            <div className="Member-header">
              <img
                className="Member-avatar"
                src={userData.avatarUrl || DefaultAvatar}
                alt={userData.username}
              />
              <div className="Member-info">
                <p className="Member-username">{userData.username}</p>
                {uid === userContext?.uid && (
                  <Link className="Member-edit" to="/settings" role="button">
                    Edit profile
                  </Link>
                )}
              </div>
            </div>
            <nav className="Member-nav">{navElements}</nav>
            <activeTab.component uid={uid} username={userData.username} />
          </>
        )}
      </div>
    </div>
  );
}
export default Member;
