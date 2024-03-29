import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { useUserContext } from '../contexts/UserContext';
import Loading from '../components/Loading';
import Background from '../components/Background';
import Poster from '../components/Poster';
import './styles/Home.css';

function Home({ openSignUp }) {
  const [trendingData, setTrendingData] = useState([]);
  const [userData, userLoading] = useUserContext();

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

  if (!trendingData.length) return <Loading />;

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
      <Helmet>
        <title>Stanboxd • The best Letterboxd clone out there.</title>
      </Helmet>
      {trendingData[0] && <Background path={trendingData[0].backdrop_path} />}
      <h2 className="Home-heading">
        Track films you’ve watched. <br /> Save those you want to see. <br />
        Tell your friends what’s good.
      </h2>
      {userLoading && <p className="Home-welcome">Loading user data...</p>}
      {!userLoading && !userData && (
        <button className="Home-getStarted" type="button" onClick={openSignUp}>
          Get started — it‘s free!
        </button>
      )}
      {!userLoading && userData && (
        <p className="Home-welcome">
          Welcome back,{' '}
          <span className="Home-welcomeName">{userData.username}</span>. What
          have you been watching?
        </p>
      )}
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
