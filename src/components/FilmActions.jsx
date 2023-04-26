import { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  getDoc,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import PropTypes from 'prop-types';
import { db } from '../firebase';
import { useUserContext } from '../contexts/UserContext';
import StarRating from './StarRating';
import Overlay from './Overlay';
import ReviewForm from './ReviewForm';
import Share from './Share';
import './styles/FilmActions.css';

const reviewsRef = collection(db, 'reviews');

function FilmActions({
  filmId,
  filmTitle,
  releaseYear,
  posterPath,
  openSignIn,
}) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userData, userLoading] = useUserContext();

  const toggleShowReviewForm = () => {
    setShowReviewForm((prevShowReviewForm) => !prevShowReviewForm);
  };

  const q = userData
    ? query(
        reviewsRef,
        where('film_id', '==', filmId),
        where('user_id', '==', userData.uid)
      )
    : null;

  const [reviewData, reviewLoading, , reviewSnapshot] = useCollectionData(q);

  const updateRating = async (value) => {
    if (reviewData.length) {
      const reviewRef = reviewSnapshot.docs[0].ref;

      await updateDoc(reviewRef, {
        rating: value || deleteField(),
        updatedAt: serverTimestamp(),
      });

      const updatedDoc = await getDoc(reviewRef);

      if (!updatedDoc.get('rating') && !updatedDoc.get('text')) {
        await deleteDoc(reviewRef);
      }
    } else {
      await addDoc(reviewsRef, {
        user_id: userData.uid,
        film_id: filmId,
        rating: value,
        createdAt: serverTimestamp(),
      });
    }
  };

  const isLoading = userLoading || reviewLoading;
  const review = reviewData?.[0];

  return (
    <section className="FilmActions">
      {isLoading && (
        <div className="FilmActions-loading">Loading user data...</div>
      )}

      {!isLoading && !userData && (
        <button
          className="FilmActions-signIn"
          type="button"
          onClick={openSignIn}
        >
          Sign in to log, rate or review
        </button>
      )}

      {!isLoading && userData && (
        <>
          <div className="FilmActions-rate">
            <p>{review?.rating ? 'Rated' : 'Rate'}</p>
            <StarRating value={review?.rating} setValue={updateRating} />
          </div>
          <button
            className="FilmActions-review"
            type="button"
            onClick={toggleShowReviewForm}
          >
            {review ? 'Edit or delete your review' : 'Add a review...'}
          </button>
        </>
      )}

      <Share url={`https://stanboxd.vercel.app/film/${filmId}`} />

      {showReviewForm && (
        <Overlay>
          <ReviewForm
            uid={userData.uid}
            filmId={filmId}
            filmTitle={filmTitle}
            releaseYear={releaseYear}
            posterPath={posterPath}
            reviewText={review?.text}
            reviewRating={review?.rating}
            reviewRef={reviewSnapshot?.docs?.[0]?.ref}
            closePanel={toggleShowReviewForm}
          />
        </Overlay>
      )}
    </section>
  );
}

FilmActions.propTypes = {
  filmId: PropTypes.number.isRequired,
  filmTitle: PropTypes.string.isRequired,
  releaseYear: PropTypes.number,
  posterPath: PropTypes.string,
  openSignIn: PropTypes.func.isRequired,
};

FilmActions.defaultProps = {
  releaseYear: null,
  posterPath: null,
};

export default FilmActions;
