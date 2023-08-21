import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Loading from '../components/Loading';
import FilmEntry from '../components/FilmEntry';
import './styles/Films.css';

function Films() {
  const [isLoading, setIsLoading] = useState(true);
  const [timeWindow, setTimeWindow] = useState('day');
  const [popularFilmsData, setPopularFilmsData] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    const controller = new AbortController();
    const { signal } = controller;

    (async () => {
      const gatewayURL = '/api/gateway';
      const apiURL = `https://api.themoviedb.org/3/trending/movie/${timeWindow}`;
      const fetchURL = `${gatewayURL}?url=${encodeURIComponent(apiURL)}`;

      const response = await fetch(fetchURL, { signal });
      const data = await response.json();
      setPopularFilmsData(data);

      setIsLoading(false);
    })();

    return () => controller.abort();
  }, [timeWindow]);

  const popularFilmsElements = popularFilmsData?.results?.map((entry) => (
    <FilmEntry data={entry} type="popular" key={entry.id} />
  ));

  return (
    <div className="Films">
      <Helmet>
        <title>Films • Stanboxd</title>
      </Helmet>
      <div className="Films-content">
        <main className="Films-main">
          <div className="Films-sectionHeading">
            Popular films {timeWindow === 'day' ? 'today' : 'this week'}
          </div>
          {isLoading && <Loading />}

          {!isLoading && popularFilmsElements}
        </main>
        <aside className="Films-aside">
          <div className="Films-sectionHeading">Time window</div>
          <div className="Films-buttons">
            <button
              className={`Films-button ${timeWindow === 'day' && 'active'}`}
              type="button"
              onClick={() => setTimeWindow('day')}
            >
              Day
            </button>
            <button
              className={`Films-button ${timeWindow === 'week' && 'active'}`}
              type="button"
              onClick={() => setTimeWindow('week')}
            >
              Week
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Films;
