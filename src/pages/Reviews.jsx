import { useLayoutEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { collection, limit, orderBy, query } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import LinearProgress from '@mui/material/LinearProgress';
import { db } from '../firebase';
import Loading from '../components/Loading';
import ReviewsPageReview from '../components/ReviewsPageReview';
import './styles/Reviews.css';

const reviewsRef = collection(db, 'reviews');

function Reviews() {
  const [order, setOrder] = useState('desc');
  const [loadedReviews, setLoadedReviews] = useState([]);

  const reviewsQuery = query(
    reviewsRef,
    orderBy('createdAt', order),
    limit(20)
  );

  const [reviews, reviewsLoading] = useCollectionData(reviewsQuery);

  useLayoutEffect(() => {
    setLoadedReviews(new Array(reviews?.length).fill(false));
  }, [reviews]);

  const handleReviewLoad = (reviewIndex) => {
    setLoadedReviews((prevLoadedReviews) =>
      prevLoadedReviews.map((entry, index) => {
        if (index === reviewIndex) {
          return true;
        }

        return entry;
      })
    );
  };

  const reviewsElements = reviews?.map((entry, index) => (
    <ReviewsPageReview
      filmId={entry.film_id}
      userId={entry.user_id}
      rating={entry.rating}
      text={entry.text}
      onLoad={() => handleReviewLoad(index)}
      key={`${entry.film_id}${entry.user_id}`}
    />
  ));

  const reviewsReady = !reviewsLoading && !loadedReviews.includes(false);

  const loadingProgress =
    (loadedReviews.filter((entry) => entry === true).length /
      loadedReviews.length) *
    100;

  const reviewsStyles = {
    display: reviewsReady ? 'initial' : 'none',
  };

  return (
    <div className="Reviews">
      <Helmet>
        <title>Reviews • Stanboxd</title>
      </Helmet>
      <div className="Reviews-content">
        <main className="Reviews-main">
          <div className="Reviews-sectionHeading">
            {order === 'desc' ? 'Latest' : 'Oldest'} reviews
          </div>
          {!reviewsReady && (
            <>
              <LinearProgress
                variant="determinate"
                value={loadingProgress}
                sx={{
                  borderRadius: '5px',
                }}
              />
              <Loading />
            </>
          )}
          <div className="Reviews-reviewsContainer" style={reviewsStyles}>
            {reviewsElements}
          </div>
        </main>
        <aside className="Reviews-aside">
          <div className="Reviews-sectionHeading">Sort by</div>
          <div className="Reviews-buttons">
            <button
              className={`Reviews-button ${order === 'desc' && 'active'}`}
              type="button"
              onClick={() => setOrder('desc')}
            >
              Newest
            </button>
            <button
              className={`Reviews-button ${order === 'asc' && 'active'}`}
              type="button"
              onClick={() => setOrder('asc')}
            >
              Oldest
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Reviews;
