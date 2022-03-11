import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';

function MoviesCardList({
  isMoviesListFailed,
  favoriteList,
  onDelete,
  isLoading,
  onLike,
  movieList,
}) {
  const [size, setSize] = useState(window.innerWidth);
  const isLaptop = size > 1279;
  const isTablet = size > 767 && size < 1279;
  const { pathname } = useLocation();
  const [moviesCount, setMoviesCount] = useState(12);

  useEffect(() => {
    setMoviesCount(isLaptop ? 12 : isTablet ? 8 : 5);
  }, [size]);
  function updateSize() {
    setTimeout(() => {
      setSize(window.innerWidth);
    }, 500);
  }
  window.addEventListener('resize', updateSize);
  function showMoreMovies() {
    isLaptop
      ? setMoviesCount(moviesCount + 3)
      : isTablet
      ? setMoviesCount(moviesCount + 2)
      : setMoviesCount(moviesCount + 1);
  }
  return (
    <div className="moviesCardList">
      {isLoading && !isMoviesListFailed ? (
        <Preloader />
      ) : isMoviesListFailed ? (
        <p>
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </p>
      ) : (
        <div className="moviesCardList__grid">
          {pathname === '/movies' &&
            movieList &&
            movieList.map((item, index) => {
              if (index + 1 <= moviesCount) {
                return (
                  <MoviesCard
                    onDelete={onDelete}
                    favoriteList={favoriteList}
                    onLike={onLike}
                    movie={item}
                    key={index}
                  />
                );
              } else {
                return '';
              }
            })}{' '}
          {pathname === '/saved-movies' &&
            favoriteList &&
            favoriteList.map((item, index) => {
              if (index + 1 <= moviesCount) {
                return (
                  <MoviesCard
                    favoriteList={favoriteList}
                    onDelete={onDelete}
                    movie={item}
                    key={index}
                  />
                );
              } else {
                return '';
              }
            })}
        </div>
      )}
      {pathname === '/movies' && movieList.length === 0 ? (
        <p>Ничего не найдено</p>
      ) : pathname === '/saved-movies' && favoriteList.length === 0 ? (
        <p>Ничего не найдено</p>
      ) : (
        ''
      )}
      {pathname === '/saved-movies' && moviesCount < favoriteList.length && (
        <button onClick={showMoreMovies} className="movieCardList_button-add">
          Ещё
        </button>
      )}
      {pathname === '/movies' && moviesCount < movieList.length && (
        <button onClick={showMoreMovies} className="movieCardList_button-add">
          Ещё
        </button>
      )}
    </div>
  );
}

export default MoviesCardList;
