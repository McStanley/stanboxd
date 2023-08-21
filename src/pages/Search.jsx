import { useEffect, useLayoutEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import searchFilms from '../utils/searchFilms';
import searchMembers from '../utils/searchMembers';
import Loading from '../components/Loading';
import FilmEntry from '../components/FilmEntry';
import DefaultAvatar from '../assets/avatar.png';
import './styles/Search.css';

const categories = [
  { name: 'Films', path: 'films', func: searchFilms },
  { name: 'Members', path: 'members', func: searchMembers },
];

function Search() {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState(null);
  const { category, query = 'The Search For Nothing' } = useParams();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    setIsLoading(true);
  }, [category, query]);

  useEffect(() => {
    const validPaths = categories.map((entry) => entry.path);

    if (!validPaths.includes(category)) {
      const redirectPath = `/search/films/${encodeURIComponent(query)}`;
      navigate(redirectPath);
    }
  }, [category]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    (async () => {
      setResults(null);

      const activeCategory = categories.find(
        (entry) => entry.path === category
      );

      const data = await activeCategory.func(query, signal);
      setResults(data);

      setIsLoading(false);
    })();

    return () => controller.abort();
  }, [category, query]);

  const navElements = categories.map((entry) => {
    const isActive = entry.path === category;

    return (
      <Link
        to={`/search/${entry.path}/${encodeURIComponent(query)}`}
        key={entry.path}
      >
        <div className={`Search-navItem ${isActive && 'active'}`}>
          {entry.name}
        </div>
      </Link>
    );
  });

  let resultsElements;
  let resultsCount;

  switch (category) {
    case 'films':
      resultsElements = results?.results?.map((entry) => (
        <FilmEntry data={entry} type="search" key={entry.id} />
      ));
      resultsCount = results?.total_results;
      break;

    case 'members':
      resultsElements = results?.map?.((entry) => (
        <article className="Search-user" key={entry.id}>
          <Link to={`/member/${entry.id}`} className="Search-avatarLink">
            <img
              className="Search-avatar"
              src={entry.avatarUrl || DefaultAvatar}
              alt={entry.username}
            />
          </Link>
          <Link to={`/member/${entry.id}`}>
            <p className="Search-username">{entry.username}</p>
          </Link>
        </article>
      ));
      resultsCount = results?.length;
      break;

    default:
      resultsElements = null;
      resultsCount = null;
  }

  return (
    <div className="Search">
      <Helmet>
        <title>Search results for {query} • Stanboxd</title>
      </Helmet>
      <div className="Search-content">
        <main className="Search-main">
          {isLoading && <Loading />}

          {!isLoading && !results && (
            <>
              <h2 className="Search-sectionHeading">Something went wrong</h2>
              <p className="Search-info">
                Please try again later or{' '}
                <a href="https://github.com/McStanley">let me know</a> about
                your problem.
              </p>
            </>
          )}

          {!isLoading && results && !resultsCount && (
            <>
              <h2 className="Search-sectionHeading">No results</h2>
              <p className="Search-info">
                There were no matches for your search term.
              </p>
            </>
          )}

          {!isLoading && results && !!resultsCount && (
            <>
              <h2 className="Search-sectionHeading">
                Found {resultsCount} {category} matching &quot;{query}&quot;
              </h2>
              <section className="Search-results">{resultsElements}</section>
            </>
          )}
        </main>
        <aside className="Search-aside">
          <h2 className="Search-sectionHeading">Show results for</h2>
          <nav className="Search-nav">{navElements}</nav>
          {category === 'members' && !isLoading && (
            <>
              <h2 className="Search-sectionHeading">
                Can&apos;t find a friend?
              </h2>
              <p className="Search-notice">
                You have to specify the complete username to find a user. Member
                search is not case sensitive.
              </p>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

export default Search;
