import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastBar, Toaster, toast } from 'react-hot-toast';
import { UserProvider } from './contexts/UserContext';
import Header from './components/Header';
import Home from './pages/Home';
import Films from './pages/Films';
import Reviews from './pages/Reviews';
import Search from './pages/Search';
import Film from './pages/Film';
import Member from './pages/Member';
import About from './pages/About';
import Settings from './pages/Settings';
import Footer from './components/Footer';
import Overlay from './components/Overlay';
import SignUp from './components/SignUp';
import './App.css';

function App() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowSignIn(false);
  }, [location.pathname]);

  const toggleShowSignUp = () => {
    setShowSignUp((prevShowSignUp) => !prevShowSignUp);
  };

  const toggleShowSignIn = () => {
    setShowSignIn((prevShowSignIn) => !prevShowSignIn);
  };

  return (
    <div id="App" className="App">
      <UserProvider>
        <Header
          openSignUp={toggleShowSignUp}
          showSignIn={showSignIn}
          toggleShowSignIn={toggleShowSignIn}
        />
        <Routes>
          <Route path="/" element={<Home openSignUp={toggleShowSignUp} />} />
          <Route path="/films" element={<Films />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/search/:category/:query?" element={<Search />} />
          <Route
            path="/film/:id"
            element={<Film openSignIn={toggleShowSignIn} />}
          />
          <Route path="/member/:uid/:tab?" element={<Member />} />
          <Route path="/about/:path" element={<About />} />
          <Route
            path="/settings/:tab?"
            element={<Settings openSignIn={() => setShowSignIn(true)} />}
          />
        </Routes>
        <Footer />
        {showSignUp && (
          <Overlay>
            <SignUp closePanel={toggleShowSignUp} />
          </Overlay>
        )}
      </UserProvider>
      <Toaster
        position="top-left"
        reverseOrder
        containerStyle={{ inset: '6px' }}
        toastOptions={{
          style: {
            boxSizing: 'border-box',
            maxWidth: 'unset',
            width: '480px',
            padding: '10px 15px 10px 10px',
            borderRadius: '5px',
            alignItems: 'start',
            columnGap: '15px',
            fontFamily: 'GraphikRegular',
            fontSize: '0.9rem',
            lineHeight: 1.2,
          },
          success: {
            duration: 5000,
            style: {
              backgroundColor: '#00c030',
              color: '#fff',
            },
          },
          error: {
            duration: 20000,
            style: {
              backgroundColor: '#ee7000',
              color: '#fff',
            },
          },
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ message }) => (
              <>
                <div
                  style={{
                    flex: '1',
                    display: 'flex',
                  }}
                >
                  <span>{message}</span>
                </div>
                <button
                  type="button"
                  style={{ fontSize: '1.2rem' }}
                  onClick={() => toast.dismiss(t.id)}
                >
                  ×
                </button>
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </div>
  );
}

export default App;
