import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import PropTypes from 'prop-types';
import { db } from '../firebase';
import Loading from '../components/Loading';
import Background from '../components/Background';
import Poster from '../components/Poster';
import FilmDetails from '../components/FilmDetails';
import FilmActions from '../components/FilmActions';
import FilmPageReview from '../components/FilmPageReview';
import './styles/Film.css';

const reviewsRef = collection(db, 'reviews');

function Film({ openSignIn }) {
  const [filmData, setFilmData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const gatewayURL = '/api/gateway';
      const apiURL = `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,alternative_titles`;
      const fetchURL = `${gatewayURL}?url=${encodeURIComponent(apiURL)}`;

      const response = await fetch(fetchURL);
      const data = await response.json();

      console.log(data);
      setFilmData(data);
    })();
  }, []);

  const reviewsQuery = query(
    reviewsRef,
    where('film_id', '==', +id),
    orderBy('createdAt', 'desc')
  );

  const [reviewsData, reviewsLoading] = useCollectionData(reviewsQuery);

  if (!filmData) return <Loading />;

  const releaseYear = filmData.release_date
    ? new Date(filmData.release_date).getFullYear()
    : null;

  const director = filmData.credits.crew.find(
    (entry) => entry.job === 'Director'
  );

  const voteAverage = (
    Math.round((filmData.vote_average / 2) * 10) / 10
  ).toFixed(1);

  const reviewElements = reviewsData?.map((entry) => (
    <FilmPageReview
      userId={entry.user_id}
      rating={entry.rating}
      text={entry.text}
      key={entry.user_id}
    />
  ));

  const styles = {
    paddingTop: filmData.backdrop_path ? 380 : 20,
  };

  return (
    <div className="Film" style={styles}>
      {filmData.backdrop_path && <Background path={filmData.backdrop_path} />}
      <aside className="Film-aside">
        <Poster
          path={filmData.poster_path}
          size="w342"
          altText={filmData.title}
        />
      </aside>
      <main className="Film-main">
        <section className="Film-header">
          <h2 className="Film-title">{filmData.title}</h2>
          <div className="Film-subtitle">
            <Link to=".">
              <p>{releaseYear}</p>
            </Link>
            {director && (
              <p>
                Directed by <Link to=".">{director.name}</Link>
              </p>
            )}
          </div>
        </section>
        <section className="Film-info">
          <div className="Film-details">
            <p className="Film-tagline">{filmData.tagline}</p>
            <p className="Film-overview">{filmData.overview}</p>
            <FilmDetails
              cast={filmData.credits.cast}
              crew={filmData.credits.crew}
              studios={filmData.production_companies}
              languages={filmData.spoken_languages}
              titles={filmData.alternative_titles.titles}
              genres={filmData.genres}
            />
          </div>
          <div className="Film-sidebar">
            <FilmActions
              filmId={filmData.id}
              filmTitle={filmData.title}
              releaseYear={releaseYear}
              posterPath={filmData.poster_path}
              openSignIn={openSignIn}
            />
            <section className="Film-rating">
              <div className="Film-ratingHeader">
                <p>Ratings</p>
                <p>{filmData.vote_count} reviews</p>
              </div>
              <div className="Film-ratingScore">★ {voteAverage}</div>
            </section>
          </div>
        </section>
        <section className="Film-reviews">
          <div className="Film-reviewsHeader">Reviews</div>
          {reviewsLoading && (
            <p className="Film-reviewsInfo">Loading reviews...</p>
          )}

          {!reviewsLoading && !reviewsData.length && (
            <p className="Film-reviewsInfo">
              There are no reviews for this movie yet.
            </p>
          )}

          {!reviewsLoading && !!reviewsData.length && reviewElements}
        </section>
      </main>
    </div>
  );
}

Film.propTypes = {
  openSignIn: PropTypes.func.isRequired,
};

export default Film;
