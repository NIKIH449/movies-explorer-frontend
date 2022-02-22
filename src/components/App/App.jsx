import React, { useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import './App.css';
function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const isHeaderNeed =
    pathname === '/movies' ||
    pathname === '/' ||
    pathname === '/saved-movies' ||
    pathname === '/profile';
  const isFooterNeed =
    pathname !== '/profile' && pathname !== '/signin' && pathname !== '/signup';

  function onLogOut() {
    console.log('1');
    setLoggedIn(false);
    navigate('/');
  }

  return (
    <div className="page">
      {isHeaderNeed && <Header loggedIn={loggedIn} />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile onLogOut={onLogOut} />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
      {isFooterNeed && <Footer />}
    </div>
  );
}

export default App;
