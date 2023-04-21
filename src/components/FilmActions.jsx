import { useUserContext } from '../contexts/UserContext';
import './styles/FilmActions.css';

function FilmActions() {
  const [userData, userLoading] = useUserContext();

  return (
    <section className="FilmActions">
      {userLoading && (
        <div className="FilmActions-loading">Loading user data...</div>
      )}
      {!userLoading && !userData && (
        <button className="FilmActions-signIn" type="button">
          Sign in to log, rate or review
        </button>
      )}
      {!userLoading && userData && (
        <>
          <div className="FilmActions-rate">Rate</div>
          <button className="FilmActions-review" type="button">
            Review or log...
          </button>
        </>
      )}
      <div className="FilmActions-share">Share</div>
    </section>
  );
}

export default FilmActions;
