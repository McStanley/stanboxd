import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { doc } from 'firebase/firestore';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import PropTypes from 'prop-types';
import { db } from '../firebase';
import Poster from './Poster';
import StarRating from './StarRating';
import DefaultAvatar from '../assets/avatar.png';
import './styles/ReviewsPageReview.css';

function ReviewsPageReview({ filmId, userId, rating, text, onLoad }) {
  const [filmData, setFilmData] = useState(null);
  const [userData] = useDocumentDataOnce(doc(db, 'users', userId));

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    (async () => {
      const gatewayURL = '/api/gateway';
      const apiURL = `https://api.themoviedb.org/3/movie/${filmId}`;
      const fetchURL = `${gatewayURL}?url=${encodeURIComponent(apiURL)}`;

      const response = await fetch(fetchURL, { signal });
      const data = await response.json();

      setFilmData(data);
      onLoad();
    })();

    return () => controller.abort();
  }, []);

  if (!filmData || !userData) {
    return null;
  }

  const releaseYear = filmData.release_date
    ? new Date(filmData.release_date).getFullYear()
    : null;

  return (
    <article className="ReviewsPageReview">
      {filmData && userData && (
        <>
          <div className="ReviewsPageReview-posterContainer">
            <Poster
              id={filmData.id}
              path={filmData.poster_path}
              size="w92"
              altText={filmData.title}
            />
          </div>
          <div className="ReviewsPageReview-main">
            <div className="ReviewsPageReview-header">
              <Link to={`/film/${filmId}`}>
                <p className="ReviewsPageReview-filmTitle">{filmData.title}</p>
              </Link>
              <p className="ReviewsPageReview-filmReleaseYear">{releaseYear}</p>
            </div>
            <div className="ReviewsPageReview-subheader">
              <img
                className="ReviewsPageReview-avatar"
                src={userData.avatarUrl || DefaultAvatar}
                alt={userData.username}
              />
              <p className="ReviewsPageReview-reviewedBy">
                Reviewed by{' '}
                <span className="ReviewsPageReview-username">
                  {userData.username}
                </span>
              </p>
              <StarRating value={rating} />
            </div>
            <p className="ReviewsPageReview-text">{text}</p>
          </div>
        </>
      )}
    </article>
  );
}

ReviewsPageReview.propTypes = {
  filmId: PropTypes.number.isRequired,
  userId: PropTypes.string.isRequired,
  rating: PropTypes.number,
  text: PropTypes.string,
  onLoad: PropTypes.func.isRequired,
};

ReviewsPageReview.defaultProps = {
  rating: null,
  text: null,
};

export default ReviewsPageReview;
