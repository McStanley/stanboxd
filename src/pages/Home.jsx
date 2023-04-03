import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Background from '../components/Background';
import Poster from '../components/Poster';
import './styles/Home.css';

function Home({ openSignUp }) {
  const [trendingData, setTrendingData] = useState([]);

  useEffect(() => {
    (async () => {
      const gatewayURL = '/api/gateway';
      const apiURL = 'https://api.themoviedb.org/3/trending/movie/week';
      const fetchURL = `${gatewayURL}?url=${encodeURIComponent(apiURL)}`;

      const response = await fetch(fetchURL);
      const data = await response.json();

      console.log(data);
      const trendingMovies = data.results.slice(0, 6);

      console.log(trendingMovies);
      setTrendingData(trendingMovies);
    })();
  }, []);

  const trendingMovies = trendingData.map((entry) => (
    <Poster
      id={entry.id}
      path={entry.poster_path}
      size="w185"
      altText={entry.title}
      key={entry.id}
    />
  ));

  return (
    <main className="Home">
      {trendingData[0] && <Background path={trendingData[0].backdrop_path} />}
      <h2 className="Home-heading">
        Track films you’ve watched. <br /> Save those you want to see. <br />
        Tell your friends what’s good.
      </h2>
      <button className="Home-getStarted" type="button" onClick={openSignUp}>
        Get started — it‘s free!
      </button>
      <p className="Home-subheading">
        The social network for film lovers. Also available on 🍏 🤖
      </p>
      <div className="Home-trendingList">{trendingMovies}</div>
    </main>
  );
}

Home.propTypes = {
  openSignUp: PropTypes.func.isRequired,
};

export default Home;
