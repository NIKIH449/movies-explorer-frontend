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
  const initialMovies = JSON.parse(localStorage.getItem('initialMovies'));
  const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
  const allMovies = JSON.parse(localStorage.getItem('allMovies'));
  const initialFavoriteMovies = JSON.parse(
    localStorage.getItem('initialFavoriteMovies')
  );
  const searchAllMovies = localStorage.getItem('searchAllMovies');
  const checkBoxMovieStatus = JSON.parse(
    localStorage.getItem('checkBoxMovieStatus')
  );

  const [movieList, setMovieList] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isMoviesLoading, setIsMoviesLoading] = useState(
    allMovies ? false : true
  );
  const [isFavMoviesLoading, setIsFavMoviesLoading] = useState(false);
  const [isTokenLoading, setIsTokenLoading] = useState(true);
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [isMovieFound, setIsMovieFound] = useState(true);
  const [shortAllFilmsOnly, setShortAllFilmsOnly] = useState(false);
  const [shortFavoriteFilmsOnly, setShortFavoriteFilmsOnly] = useState(false);
  const [isChangeInfoSuccess, setIsChangeInfoSuccess] = useState(false);
  const isLoading = isMoviesLoading && isFavMoviesLoading && isTokenLoading;
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
    localStorage.removeItem('allMovies');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('initialFavoriteMovies');
    localStorage.removeItem('checkBoxMovieStatus');
    localStorage.removeItem('searchAllMovies');
    localStorage.removeItem('checkBoxFavMovieStatus');
    setFavoriteList([]);
    setMovieList([]);
    setCurrentUser([]);
    setLoggedIn(false);
    navigate('/');
  }
  useEffect(() => {
    setIsTokenLoading(true);
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token)
        .then((data) => {
          if (data) {
            setCurrentUser(data.user);
            setLoggedIn(true);
            setIsTokenLoading(() => {
              setTimeout(setIsTokenLoading(false));
            }, 1000);
          }
        })
        .catch((err) => {
          setIsTokenLoading(false);
          console.log(err);
        });
    } else {
      setIsTokenLoading(false);
    }
  }, []);

  useEffect(() => {
    const allMovies = JSON.parse(localStorage.getItem('allMovies'));
    if (!allMovies) {
      setIsMoviesLoading(true);
      getMovies()
        .then((data) => {
          localStorage.setItem('allMovies', JSON.stringify(data));
          localStorage.setItem('initialMovies', JSON.stringify(data));
          setIsMoviesLoading(false);
          setMovieList(data);
        })
        .catch((err) => console.log(err));
    } else {
      setMovieList(allMovies);
    }
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    if (!savedMovies && loggedIn) {
      setIsFavMoviesLoading(true);
      getUserMovies()
        .then((data) => {
          setFavoriteList(data.data);
          localStorage.setItem('savedMovies', JSON.stringify(data.data));
          localStorage.setItem('initialSavedMovies', JSON.stringify(data.data));
        })
        .catch((err) => console.log(err));
    } else {
      setFavoriteList(savedMovies);
    }
  }, []);
  function setData() {
    const profileInfo = getUserInfo();
    const initialMovies = getMovies();
    const favoriteMovies = getUserMovies();
    Promise.all([profileInfo, initialMovies, favoriteMovies])
      .then((data) => {
        setCurrentUser(data[0].user);
        setMovieList(data[1]);
        setFavoriteList(data[2].data);
        localStorage.setItem('initialMovies', JSON.stringify(data[1]));
        localStorage.setItem(
          'initialFavoriteMovies',
          JSON.stringify(data[2].data)
        );
        localStorage.setItem('allMovies', JSON.stringify(data[1]));
        localStorage.setItem('savedMovies', JSON.stringify(data[2].data));
        setIsTokenLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function signinHandler(email, password) {
    setIsTokenLoading(true);
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
    putLike(movie)
      .then((data) => {
        setFavoriteList([...favoriteList, data.data]);
        localStorage.setItem(
          'savedMovies',
          JSON.stringify([...favoriteList, data.data])
        );
        localStorage.setItem(
          'initialFavoriteMovies',
          JSON.stringify([...favoriteList, data.data])
        );
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
          localStorage.setItem('savedMovies', JSON.stringify(arr));
          localStorage.setItem('initialFavoriteMovies', JSON.stringify(arr));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const filterMoviesByName = (data, searchQuery, mount) => {
    if (searchQuery && pathname === '/movies') {
      const regex = new RegExp(searchQuery, 'gi');
      const filterData = allMovies.filter(
        (item) => regex.test(item.nameRU) || regex.test(item.nameEN)
      );
      setMovieList(filterData);
    } else if (!searchQuery && pathname === '/movies') {
      setMovieList(initialMovies);
    } else if (searchQuery && pathname === '/saved-movies') {
      const regex = new RegExp(searchQuery, 'gi');
      const filterData = savedMovies.filter(
        (item) => regex.test(item.nameRU) || regex.test(item.nameEN)
      );
      setFavoriteList(filterData);
    } else if (!searchQuery && pathname === '/saved-movies') {
      setFavoriteList(initialFavoriteMovies);
    }
  };

  const showShortFilms = () => {
    if (pathname === '/movies' && shortAllFilmsOnly === false) {
      localStorage.setItem('checkBoxMovieStatus', true);
      setShortAllFilmsOnly(true);
    } else if (pathname === '/movies' && shortAllFilmsOnly === true) {
      localStorage.setItem('checkBoxMovieStatus', false);
      setShortAllFilmsOnly(false);
    } else if (
      pathname === '/saved-movies' &&
      shortFavoriteFilmsOnly === true
    ) {
      localStorage.setItem('checkBoxFavMovieStatus', false);
      setShortFavoriteFilmsOnly(false);
    } else if (
      pathname === '/saved-movies' &&
      shortFavoriteFilmsOnly === false
    ) {
      localStorage.setItem('checkBoxFavMovieStatus', true);
      setShortFavoriteFilmsOnly(true);
    }
  };

  useEffect(() => {
    pathname === '/movies' &&
      filterMoviesByName(allMovies, searchAllMovies, checkBoxMovieStatus);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {isHeaderNeed && <Header isLoading={isLoading} loggedIn={loggedIn} />}
        {isMoviesLoading || isFavMoviesLoading || isTokenLoading ? (
          <Preloader></Preloader>
        ) : (
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Movies
                    checkBoxStatus={JSON.parse(
                      localStorage.getItem('checkBoxMovieStatus')
                    )}
                    filterMoviesByName={filterMoviesByName}
                    isLoading={isLoading}
                    showShortFilms={showShortFilms}
                    onDelete={deleteFromFavorite}
                    onLike={addToFavorite}
                    isMovieFound={isMovieFound}
                    isInputEmpty={isInputEmpty}
                    favoriteList={favoriteList}
                    movieList={movieList}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <SavedMovies
                    checkBoxStatus={shortFavoriteFilmsOnly}
                    filterMoviesByName={filterMoviesByName}
                    isLoading={isLoading}
                    onDelete={deleteFromFavorite}
                    showShortFilms={showShortFilms}
                    isMovieFound={isMovieFound}
                    isInputEmpty={isInputEmpty}
                    favoriteList={favoriteList}
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
