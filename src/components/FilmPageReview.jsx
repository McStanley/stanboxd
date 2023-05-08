import { Link } from 'react-router-dom';
import { doc } from 'firebase/firestore';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import PropTypes from 'prop-types';
import { db } from '../firebase';
import StarRating from './StarRating';
import DefaultAvatar from '../assets/avatar.png';
import './styles/FilmPageReview.css';

function FilmPageReview({ userId, rating, text }) {
  const [userData, userLoading] = useDocumentDataOnce(doc(db, 'users', userId));

  if (userLoading) {
    return null;
  }

  return (
    <article className="FilmPageReview">
      <Link to={`/member/${userId}`} className="FilmPageReview-avatarLink">
        <img
          className="FilmPageReview-avatar"
          src={userData.avatarUrl || DefaultAvatar}
          alt={userData.username}
        />
      </Link>
      <div className="FilmPageReview-main">
        <div className="FilmPageReview-header">
          <p>
            Review by{' '}
            <span className="FilmPageReview-author">{userData.username}</span>
          </p>
          <StarRating value={rating} />
        </div>
        <p className="FilmPageReview-text">{text}</p>
      </div>
    </article>
  );
}

FilmPageReview.propTypes = {
  userId: PropTypes.string.isRequired,
  rating: PropTypes.number,
  text: PropTypes.string,
};

FilmPageReview.defaultProps = {
  rating: null,
  text: null,
};

export default FilmPageReview;
