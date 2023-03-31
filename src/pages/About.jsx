import { Link, useParams } from 'react-router-dom';
import FilmData from '../components/FilmData';
import './styles/About.css';

function About() {
  const { path } = useParams();

  const pages = [
    { title: 'Film data', path: 'film-data', component: <FilmData /> },
  ];

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

  const pageElement = pages.find((entry) => entry.path === path)?.component;

  return (
    <main className="About">
      <div className="About-content">
        <nav className="About-nav">{navElements}</nav>
        {pageElement}
      </div>
    </main>
  );
}

export default About;
