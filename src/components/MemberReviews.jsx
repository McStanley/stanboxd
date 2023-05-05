import { useEffect, useState } from 'react';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import PropTypes from 'prop-types';
import { db } from '../firebase';
import MemberPageReview from './MemberPageReview';
import './styles/MemberReviews.css';

const reviewsRef = collection(db, 'reviews');

function MemberReviews({ uid, username }) {
  const reviewsQuery = query(
    reviewsRef,
    where('user_id', '==', uid),
    orderBy('createdAt', 'desc')
  );
  const [reviewsData, reviewsLoading] = useCollectionDataOnce(reviewsQuery);
  const [filmsData, setFilmsData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    if (!reviewsLoading && reviewsData.length) {
      (async () => {
        const filmIds = [...new Set(reviewsData.map((entry) => entry.film_id))];

        const filmsDataPromises = filmIds.map((id) => {
          const apiURL = `https://api.themoviedb.org/3/movie/${id}`;
          const fetchURL = `/api/gateway?url=${encodeURIComponent(apiURL)}`;

          return fetch(fetchURL, { signal }).then((response) =>
            response.json()
          );
        });

        const filmsDataList = await Promise.all(filmsDataPromises);

        const filmsDataObject = filmsDataList.reduce(
          (object, entry) => ({ ...object, [entry.id]: entry }),
          {}
        );

        setFilmsData(filmsDataObject);
      })();
    }

    return () => controller.abort();
  }, [reviewsData, reviewsLoading]);

  const reviewElements =
    reviewsData &&
    filmsData &&
    reviewsData.map((entry) => {
      const filmData = filmsData[entry.film_id];

      return (
        <MemberPageReview
          filmId={entry.film_id}
          filmTitle={filmData.title}
          filmRelease={filmData.release_date}
          posterPath={filmData.poster_path}
          rating={entry.rating}
          text={entry.text}
          key={entry.film_id}
        />
      );
    });

  return (
    <div className="MemberReviews">
      <div className="MemberReviews-header">{username}&apos;s reviews</div>
      {(reviewsLoading || !filmsData) && (
        <p className="MemberReviews-notice">Loading reviews...</p>
      )}
      {!reviewsLoading && !reviewsData.length && (
        <p className="MemberReviews-notice">No reviews yet.</p>
      )}
      {!reviewsLoading && !!reviewsData.length && reviewElements}
    </div>
  );
}

MemberReviews.propTypes = {
  uid: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default MemberReviews;
