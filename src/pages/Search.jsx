import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './styles/Search.css';

const categories = [
  { name: 'Films', path: 'films' },
  { name: 'Members', path: 'members' },
];

function Search() {
  const { category, query = '' } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const validPaths = categories.map((entry) => entry.path);

    if (!validPaths.includes(category)) {
      const redirectPath = `/search/films/${query}`;
      navigate(redirectPath);
    }
  }, [category]);

  const navElements = categories.map((entry) => {
    const isActive = entry.path === category;

    return (
      <Link to={`/search/${entry.path}/${query}`} key={entry.path}>
        <div className={`Search-navItem ${isActive && 'active'}`}>
          {entry.name}
        </div>
      </Link>
    );
  });

  return (
    <div className="Search">
      <div className="Search-content">
        <main className="Search-main">
          <h2 className="Search-sectionHeading">No results</h2>
          <p className="Search-noMatches">
            There were no matches for your search term.
          </p>
        </main>
        <aside className="Search-aside">
          <h2 className="Search-sectionHeading">Show results for</h2>
          <nav className="Search-nav">{navElements}</nav>
        </aside>
      </div>
    </div>
  );
}

export default Search;
