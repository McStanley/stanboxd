import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Film from './pages/Film';
import About from './pages/About';
import Footer from './components/Footer';
import Overlay from './components/Overlay';
import SignUp from './components/SignUp';
import './App.css';

function App() {
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleShowSignUp = () => {
    setShowSignUp((prevShowSignUp) => !prevShowSignUp);
  };

  return (
    <div className="App">
      <Header openSignUp={toggleShowSignUp} />
      <Routes>
        <Route path="/" element={<Home openSignUp={toggleShowSignUp} />} />
        <Route path="/film/:id" element={<Film />} />
        <Route path="/about/:path" element={<About />} />
      </Routes>
      <Footer />
      {showSignUp && (
        <Overlay>
          <SignUp closePanel={toggleShowSignUp} />
        </Overlay>
      )}
    </div>
  );
}

export default App;
