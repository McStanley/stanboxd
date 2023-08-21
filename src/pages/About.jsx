import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import FilmData from '../components/FilmData';
import Author from '../components/Author';
import './styles/About.css';

const pages = [
  { title: 'Film data', path: 'film-data', component: <FilmData /> },
  { title: 'Author', path: 'author', component: <Author /> },
];

function About() {
  const { path } = useParams();

  const navElements = pages.map((entry) => {
    const isActive = entry.path === path;

    return (
      <Link to={`/about/${entry.path}`} key={entry.path}>
        <div className={`About-navItem ${isActive && 'active'}`}>
          {entry.title}
        </div>
      </Link>
    );
  });

  const activePage = pages.find((entry) => entry.path === path);

  const pageElement = activePage?.component;

  const pageTitle = activePage?.title || 'About';

  return (
    <main className="About">
      <Helmet>
        <title>{pageTitle} • Stanboxd</title>
      </Helmet>
      <div className="About-content">
        <nav className="About-nav">{navElements}</nav>
        {pageElement}
      </div>
    </main>
  );
}

export default About;
