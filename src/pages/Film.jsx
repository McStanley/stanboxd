import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Background from '../components/Background';
import Poster from '../components/Poster';
import './styles/Film.css';

function Film() {
  const [filmData, setFilmData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const gatewayURL = '/api/gateway';
      const apiURL = `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits`;
      const fetchURL = `${gatewayURL}?url=${encodeURIComponent(apiURL)}`;

      const response = await fetch(fetchURL);
      const data = await response.json();

      console.log(data);
      setFilmData(data);
    })();
  }, []);

  if (!filmData) return <div>Loading...</div>;

  const releaseYear = new Date(filmData.release_date).getFullYear();

  const director = filmData.credits.crew.find(
    (entry) => entry.job === 'Director'
  );

  const voteAverage = Math.round(
    ((filmData.vote_average / 2) * 10) / 10
  ).toFixed(1);

  return (
    <div className="Film">
      <Background path={filmData.backdrop_path} />
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
            <p>
              Directed by <Link to=".">{director.name}</Link>
            </p>
          </div>
        </section>
        <section className="Film-info">
          <div className="Film-details">
            <p className="Film-tagline">{filmData.tagline}</p>
            <p className="Film-overview">{filmData.overview}</p>
          </div>
          <div className="Film-sidebar">
            <section className="Film-actions">
              <button className="Film-rate" type="button">
                Sign in to log, rate or review
              </button>
              <button className="Film-share" type="button">
                Share
              </button>
            </section>
            <section className="Film-rating">
              <div className="Film-ratingHeader">
                <p>Ratings</p>
                <p>{filmData.vote_count} reviews</p>
              </div>
              <div className="Film-ratingScore">★ {voteAverage}</div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Film;
