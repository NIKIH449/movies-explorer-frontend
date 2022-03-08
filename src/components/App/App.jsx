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
  const [filteredList, setFilteredList] = useState([]);
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);
  const [isMovieFound, setIsMovieFound] = useState(true);
  const [shortFilmsOnly, setShortFilmsOnly] = useState(false);
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
    onSignOut().catch((err) => console.log(err));
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/');
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token)
        .then((data) => {
          if (data) {
            setLoggedIn(true);
            setData();
          }
        })
        .catch((err) => console.log(err));
    } else {
      setIsLoading(false);
    }
  }, []);

  function onFilterMoviees(filter) {
    if (filter === '') {
      setIsInputEmpty(true);
      setIsMovieFound(true);
    } else {
      setIsInputEmpty(false);
      const result = moviesList.filter((movie) => movie.nameRU === filter);
      if (result.length === 0) {
        setIsMovieFound(false);
        setFilteredList([]);
      } else {
        setIsMovieFound(true);
        setFilteredList(result);
      }
    }
  }

  function setData() {
    const profileInfo = getUserInfo();
    const initialMovies = getMovies();
    const favoriteMovies = getUserMovies();
    Promise.all([profileInfo, initialMovies, favoriteMovies])
      .then((data) => {
        setCurrentUser(data[0].user);
        setMoviesList(data[1]);
        setFavoriteList(data[2].data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function signinHandler(email, password) {
    signIn(email, password)
      .then((data) => {
        if (data) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          setData();
          navigate('/');
        }
      })
      .catch((err) => console.log(err));
  }

  function getCurrentUser() {
    const token = localStorage.getItem('token');
    getUserInfo(token)
      .then((data) => {
        if (data) {
          setCurrentUser(data.user);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const changeProfileInfo = (email, name) => {
    const token = localStorage.getItem('token');
    onEditProfile(name, email, token)
      .then((data) => {
        setCurrentUser(data.data);
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
        console.log(data);
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

  const showShortFilms = (movies) =>
    movies.filter((item) => item.duration < 40);

  const filterShortFilms = () =>
    setShortFilmsOnly(shortFilmsOnly === false ? true : false);

  const filterMoviesByName = (movies, query, mount) => {
    console.log('mount');
    if (query === '' && mount) {
      setFilteredList([]);
    } else if (query === '' && !mount) {
      setFilteredList([]);
      setIsInputEmpty(true);
    } else {
      setIsInputEmpty(false);
      const regex = new RegExp(query, 'gi');
      const filterMovies = movies.filter(
        (item) => regex.test(item.nameRU) || regex.test(item.nameEN)
      );
      if (filterMovies.length === 0) {
        setIsMovieFound(false);
      } else {
        setIsMovieFound(true);
      }
      setFilteredList(filterMovies);
      localStorage.setItem('filteredList', filterMovies);
      localStorage.setItem('shortFilmsStatus', shortFilmsOnly);
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
                    filterShortFilms={filterShortFilms}
                    showShortFilms={showShortFilms}
                    onDelete={deleteFromFavorite}
                    onLike={addToFavorite}
                    isMovieFound={isMovieFound}
                    isInputEmpty={isInputEmpty}
                    filterMovies={onFilterMoviees}
                    filteredList={filteredList}
                    moviesList={
                      !shortFilmsOnly
                        ? moviesList
                        : filteredList.length > 0
                        ? showShortFilms(filteredList)
                        : showShortFilms(moviesList)
                    }
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
                    filterShortFilms={filterShortFilms}
                    onDelete={deleteFromFavorite}
                    showShortFilms={showShortFilms}
                    isMovieFound={isMovieFound}
                    isInputEmpty={isInputEmpty}
                    filterMovies={onFilterMoviees}
                    filteredList={filteredList}
                    favoriteList={
                      !shortFilmsOnly
                        ? favoriteList
                        : filteredList.length > 0
                        ? showShortFilms(filteredList)
                        : showShortFilms(favoriteList)
                    }
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
                    changeProfileInfo={changeProfileInfo}
                    logOut={onLogOut}
                  />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
            <Route path="/signin" element={<Login onLogin={signinHandler} />} />
            <Route
              path="/signup"
              element={<Register onRegister={signupHandler} />}
            />
          </Routes>
        )}
        {isFooterNeed && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
