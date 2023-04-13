const searchFilms = async (query, signal) => {
  const gatewayURL = '/api/gateway';
  const apiURL = `https://api.themoviedb.org/3/search/movie?query=${query}`;
  const fetchURL = `${gatewayURL}?url=${encodeURIComponent(apiURL)}`;

  const response = await fetch(fetchURL, { signal });
  const data = await response.json();

  return data;
};

export default searchFilms;
