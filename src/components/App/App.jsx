import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import {
  getUserInfo,
  signIn,
  signUp,
  checkToken,
  getUserMovies,
  deleteMovie,
  putLike,
  onEditProfile,
  onSignOut,
} from '../../utils/MainApi';
import { getMovies } from '../../utils/MoviesApi';
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
import { CurrentUserContext } from '../../context/CurrentUserContext';
import Preloader from '../Preloader/Preloader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);
  const [isMovieFound, setIsMovieFound] = useState(true);
  const [shortAllFilmsOnly, setShortAllFilmsOnly] = useState(false);
  const [shortFavoriteFilmsOnly, setShortFavoriteFilmsOnly] = useState(false);
  const [isChangeInfoSuccess, setIsChangeInfoSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHeaderNeed =
    pathname === '/movies' ||
    pathname === '/' ||
    pathname === '/saved-movies' ||
    pathname === '/profile';

  const isFooterNeed =
    pathname !== '/profile' && pathname !== '/signin' && pathname !== '/signup';

  function onLogOut() {
    onSignOut().catch((err) => err);
    localStorage.removeItem('token');
    localStorage.removeItem('initialMovies');
    localStorage.removeItem('initialFavoriteMovies');
    localStorage.removeItem('allMovies');
    localStorage.removeItem('savedMovies');
    setLoggedIn(false);
    navigate('/');
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token)
        .then((data) => {
          if (data) {
            setCurrentUser(data.user);
            setLoggedIn(true);
            setIsLoading(false);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setIsLoading(false);
    }
  }, []);

  function setData() {
    setIsLoading(true);
    const profileInfo = getUserInfo();
    const initialMovies = getMovies();
    const favoriteMovies = getUserMovies();
    Promise.all([profileInfo, initialMovies, favoriteMovies])
      .then((data) => {
        setCurrentUser(data[0].user);
        setMoviesList(data[1]);
        setFavoriteList(data[2].data);
        localStorage.setItem('initialMovies', JSON.stringify(data[1]));
        localStorage.setItem(
          'initialFavoriteMovies',
          JSON.stringify(data[2].data)
        );
        localStorage.setItem('allMovies', JSON.stringify(data[1]));
        localStorage.setItem('savedMovies', JSON.stringify(data[2].data));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    const allMoviesArr = JSON.parse(localStorage.getItem('allMovies'));
    if (allMoviesArr) {
      setMoviesList(allMoviesArr);
    } else {
      setData();
    }
    const saved = JSON.parse(localStorage.getItem('savedMovies'));
    if (saved) {
      setFavoriteList(saved);
    } else {
      setData();
    }
    setIsLoading(false);
  }, []);

  function signinHandler(email, password) {
    signIn(email, password)
      .then((data) => {
        if (data) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          setData();
          navigate('/movies');
        }
      })
      .catch((err) => console.log(err));
  }

  const changeProfileInfo = (email, name) => {
    const token = localStorage.getItem('token');
    onEditProfile(name, email, token)
      .then((data) => {
        setCurrentUser(data.data);
        setIsChangeInfoSuccess(true);
        setTimeout(() => {
          setIsChangeInfoSuccess(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function signupHandler(email, password, name) {
    signUp(email, password, name)
      .then((data) => {
        if (data) {
          signinHandler(email, password);
        }
      })
      .catch((err) => console.log(err));
  }
  const addToFavorite = (movie) => {
    console.log(movie);
    putLike(movie)
      .then((data) => {
        setFavoriteList([...favoriteList, data.data]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteFromFavorite = (movie) => {
    const id = movie.movieId || movie.id;
    const movieId =
      movie._id || favoriteList.find((item) => item.movieId === movie.id)._id;
    deleteMovie(movieId)
      .then((data) => {
        if (data) {
          const arr = favoriteList.filter((item) => item.movieId !== id);
          setFavoriteList(arr);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const showShortFilms = () => {
    const allMovies = JSON.parse(localStorage.getItem('allMovies'));
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    if (pathname === '/movies' && shortAllFilmsOnly === false) {
      setShortAllFilmsOnly(true);
      setMoviesList(allMovies.filter((item) => item.duration < 40));
    } else if (pathname === '/movies' && shortAllFilmsOnly === true) {
      setShortAllFilmsOnly(false);
      setMoviesList(allMovies);
    }
    if (pathname === '/saved-movies' && shortFavoriteFilmsOnly === false) {
      setShortFavoriteFilmsOnly(true);
      setFavoriteList(savedMovies.filter((item) => item.duration < 40));
    } else if (
      pathname === '/saved-movies' &&
      shortFavoriteFilmsOnly === true
    ) {
      setShortFavoriteFilmsOnly(false);
      setFavoriteList(savedMovies);
    }
  };

  const filterMoviesByName = (movies, query, mount) => {
    const initialFavoriteMovies = JSON.parse(
      localStorage.getItem('initialFavoriteMovies')
    );
    const initialMovies = JSON.parse(localStorage.getItem('initialMovies'));
    if (!query && pathname === '/movies') {
      setIsMovieFound(true);
      setMoviesList(initialMovies);
    } else if (!query && pathname === '/saved-movies') {
      setIsMovieFound(true);
      setFavoriteList(initialFavoriteMovies);
    } else if (query === '' && !mount) {
      console.log(2);
      setIsInputEmpty(true);
    } else {
      setIsInputEmpty(false);
      const regex = new RegExp(query, 'gi');
      const filterMovies = initialMovies.filter(
        (item) => regex.test(item.nameRU) || regex.test(item.nameEN)
      );
      if (pathname === '/movies') {
        setMoviesList(filterMovies);
        localStorage.setItem('allMovies', JSON.stringify(filterMovies));
      } else {
        setFavoriteList(filterMovies);
        localStorage.setItem('savedMovies', JSON.stringify(filterMovies));
      }
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {isHeaderNeed && <Header isLoading={isLoading} loggedIn={loggedIn} />}
        {isLoading ? (
          <Preloader></Preloader>
        ) : (
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Movies
                    filterMoviesByName={filterMoviesByName}
                    isLoading={isLoading}
                    showShortFilms={showShortFilms}
                    onDelete={deleteFromFavorite}
                    onLike={addToFavorite}
                    isMovieFound={isMovieFound}
                    isInputEmpty={isInputEmpty}
                    moviesList={moviesList}
                    favoriteList={favoriteList}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <SavedMovies
                    filterMoviesByName={filterMoviesByName}
                    isLoading={isLoading}
                    onDelete={deleteFromFavorite}
                    showShortFilms={showShortFilms}
                    isMovieFound={isMovieFound}
                    isInputEmpty={isInputEmpty}
                    favoriteList={favoriteList}
                    moviesList={moviesList}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Profile
                    isChangeInfoSuccess={isChangeInfoSuccess}
                    changeProfileInfo={changeProfileInfo}
                    logOut={onLogOut}
                  />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/signin"
              element={<Login loggedIn={loggedIn} onLogin={signinHandler} />}
            />
            <Route
              path="/signup"
              element={
                <Register loggedIn={loggedIn} onRegister={signupHandler} />
              }
            />
          </Routes>
        )}
        {isFooterNeed && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
