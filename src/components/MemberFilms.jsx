import { useEffect, useState } from 'react';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import PropTypes from 'prop-types';
import { db } from '../firebase';
import Poster from './Poster';
import StarRating from './StarRating';
import './styles/MemberFilms.css';

const reviewsRef = collection(db, 'reviews');

function MemberFilms({ uid, username }) {
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

  const filmElements =
    reviewsData &&
    filmsData &&
    reviewsData.map((entry) => {
      const filmData = filmsData[entry.film_id];

      return (
        <article className="MemberFilms-filmEntry">
          <div className="MemberFilms-posterContainer">
            <Poster
              id={filmData.id}
              path={filmData.poster_path}
              size="w92"
              altText={filmData.title}
            />
          </div>
          <StarRating value={entry.rating} />
        </article>
      );
    });

  return (
    <div className="MemberFilms">
      <div className="MemberFilms-header">{username}&apos;s films</div>
      {(reviewsLoading || (!!reviewsData.length && !filmsData)) && (
        <p>Loading films...</p>
      )}
      {!reviewsLoading && !reviewsData.length && <p>No films yet.</p>}
      {!reviewsLoading && !!reviewsData.length && (
        <div className="MemberFilms-filmList">{filmElements}</div>
      )}
    </div>
  );
}

MemberFilms.propTypes = {
  uid: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default MemberFilms;
