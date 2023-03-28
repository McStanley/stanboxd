import { useEffect, useState } from 'react';
import Background from '../components/Background';
import './styles/Home.css';

function Home() {
  const [trendingData, setTrendingData] = useState([]);

  useEffect(() => {
    (async () => {
      const gatewayURL = '/api/gateway';
      const apiURL = 'https://api.themoviedb.org/3/trending/movie/week';
      const fetchURL = `${gatewayURL}?url=${encodeURIComponent(apiURL)}`;

      const response = await fetch(fetchURL);
      const data = await response.json();

      console.log(data);
      const trendingMovies = data.results.slice(0, 5);

      console.log(trendingMovies);
      setTrendingData(trendingMovies);
    })();
  }, []);

  const trendingMovies = trendingData.map((entry) => (
    <article className="Home-trendingMovie" key={entry.id}>
      <img
        src={`https://image.tmdb.org/t/p/w154/${entry.poster_path}`}
        alt={entry.title}
      />
    </article>
  ));

  return (
    <main className="Home">
      {trendingData[0] && <Background path={trendingData[0].backdrop_path} />}
      <h2 className="Home-heading">
        Track films you’ve watched. <br /> Save those you want to see. <br />
        Tell your friends what’s good.
      </h2>
      <button className="Home-getStarted" type="button">
        Get started — it‘s free!
      </button>
      <p className="Home-subheading">
        The social network for film lovers. Also available on 🍏 🤖
      </p>
      <div className="Home-trendingList">{trendingMovies}</div>
    </main>
  );
}

export default Home;
