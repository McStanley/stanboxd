import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles/FilmDetails.css';

const CAST_LIMIT = 20;

function FilmDetails({ cast, crew, studios, languages, titles, genres }) {
  const [tabs, setTabs] = useState([
    { name: 'Cast', active: false },
    { name: 'Crew', active: false },
    { name: 'Details', active: false },
    { name: 'Genres', active: false },
  ]);
  const [activeTab, setActiveTab] = useState(null);
  const [expandCast, setExpandCast] = useState(false);
  const [crewData, setCrewData] = useState({});
  const [detailsData, setDetailsData] = useState({});
  const [hoveredTile, setHoveredTile] = useState(null);

  useEffect(() => {
    const presentTabs = [];

    // Cast

    if (cast.length) presentTabs.push('Cast');

    // Crew

    const groupedCrew = {};

    crew.forEach((person) => {
      if (!groupedCrew[person.job]) {
        groupedCrew[person.job] = [];
      }

      groupedCrew[person.job].push(person);
    });

    if (Object.keys(groupedCrew).length) presentTabs.push('Crew');

    setCrewData(groupedCrew);

    // Details

    const details = {};

    if (studios.length) {
      let key = 'Studio';
      if (studios.length > 1) key += 's';

      details[key] = studios;
    }

    if (languages.length) {
      let key = 'Language';
      if (languages.length > 1) key += 's';

      details[key] = languages;
    }

    if (titles.length) {
      let key = 'Alternative title';
      if (titles.length > 1) key += 's';

      details[key] = titles;
    }

    if (Object.keys(details).length) presentTabs.push('Details');

    setDetailsData(details);

    // Genres

    if (Object.keys(genres).length) presentTabs.push('Genres');

    // Update tabs

    setTabs((prevTabs) =>
      prevTabs.map((tab) => ({
        ...tab,
        active: presentTabs.includes(tab.name),
      }))
    );
  }, []);

  useEffect(() => {
    setActiveTab(tabs.find((tab) => tab.active)?.name);
  }, [tabs]);

  const navElements = tabs
    .filter((tab) => tab.active)
    .map((tab) => (
      <button
        className={`FilmDetails-navItem ${tab.name === activeTab && 'active'}`}
        onClick={() => setActiveTab(tab.name)}
        key={tab.name}
        type="button"
      >
        {tab.name}
      </button>
    ));

  if (!navElements.length) return null;

  const castSection = (
    <div className="FilmDetails-tileGrid">
      {cast.slice(0, expandCast ? undefined : CAST_LIMIT).map((entry) => (
        <div
          className="FilmDetails-tile"
          onMouseEnter={() => setHoveredTile(entry.id)}
          onMouseLeave={() => setHoveredTile(null)}
          key={entry.id}
        >
          {entry.name}
          {!!entry.character && (
            <div
              className={`FilmDetails-popup ${
                hoveredTile === entry.id && 'visible'
              }`}
            >
              <p className="FilmDetails-popupText">{entry.character}</p>
              <div className="FilmDetails-popupArrow" />
            </div>
          )}
        </div>
      ))}
      {!expandCast && cast.length > CAST_LIMIT && (
        <button
          type="button"
          className="FilmDetails-tile"
          onClick={() => setExpandCast(true)}
        >
          Show more
        </button>
      )}
    </div>
  );

  const crewSection = (
    <div className="FilmDetails-list">
      {Object.keys(crewData).map((key) => (
        <div className="FilmDetails-row" key={key}>
          <div className="FilmDetails-rowHeader">
            <p className="FilmDetails-rowTitle">{crewData[key][0].job}</p>
          </div>
          <div className="FilmDetails-rowTileGrid">
            {crewData[key].map((person) => (
              <div className="FilmDetails-tile" key={person.id}>
                {person.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const detailsSection = (
    <div className="FilmDetails-list">
      {Object.keys(detailsData).map((key) => (
        <div className="FilmDetails-row" key={key}>
          <div className="FilmDetails-rowHeader">
            <p className="FilmDetails-rowTitle">{key}</p>
          </div>
          {key.includes('Alternative title') ? (
            <p className="FilmDetails-titles">{detailsData[key].map(
              (entry) => entry.title
            ).join`, `}</p>
          ) : (
            <div className="FilmDetails-rowTiles">
              {detailsData[key].map((entry) => (
                <div
                  className="FilmDetails-tile"
                  key={entry.id || entry.iso_639_1}
                >
                  {entry.english_name || entry.name || entry.title}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const genresSection = (
    <div className="FilmDetails-tileGrid">
      {genres.map((entry) => (
        <div className="FilmDetails-tile" key={entry.id}>
          {entry.name}
        </div>
      ))}
    </div>
  );

  return (
    <div className="FilmDetails">
      <nav className="FilmDetails-nav">{navElements}</nav>
      {activeTab === 'Cast' && castSection}
      {activeTab === 'Crew' && crewSection}
      {activeTab === 'Details' && detailsSection}
      {activeTab === 'Genres' && genresSection}
    </div>
  );
}

FilmDetails.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
    })
  ).isRequired,

  crew: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      job: PropTypes.string.isRequired,
    })
  ).isRequired,

  studios: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,

  languages: PropTypes.arrayOf(
    PropTypes.shape({
      iso_639_1: PropTypes.string.isRequired,
      english_name: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,

  titles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,

  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FilmDetails;
