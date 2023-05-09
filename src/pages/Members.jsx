import { Link } from 'react-router-dom';
import { collection, limit, orderBy, query } from 'firebase/firestore';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Loading from '../components/Loading';
import DefaultAvatar from '../assets/avatar.png';
import './styles/Members.css';

const usersRef = collection(db, 'users');
const usersQuery = query(usersRef, orderBy('registeredAt', 'desc'), limit(10));

function Members() {
  const [usersSnapshot, usersLoading] = useCollectionOnce(usersQuery);

  const usersElements = usersSnapshot?.docs?.map((doc) => {
    const userData = doc.data();

    return (
      <article className="Members-user" key={doc.id}>
        <Link to={`/member/${doc.id}`} className="Members-avatarLink">
          <img
            className="Members-avatar"
            src={userData.avatarUrl || DefaultAvatar}
            alt={userData.username}
          />
        </Link>
        <Link to={`/member/${doc.id}`}>
          <p className="Members-username">{userData.username}</p>
        </Link>
      </article>
    );
  });

  return (
    <div className="Members">
      <div className="Members-content">
        <div className="Members-header">
          Film lovers and critics — find other members.
        </div>
        <div className="Members-sectionHeading">Joined recently</div>
        {usersLoading && <Loading />}
        {!usersLoading && usersSnapshot.empty && <p>No users yet...</p>}
        {!usersLoading && !usersSnapshot.empty && (
          <div className="Members-usersContainer">{usersElements}</div>
        )}
      </div>
    </div>
  );
}
export default Members;
