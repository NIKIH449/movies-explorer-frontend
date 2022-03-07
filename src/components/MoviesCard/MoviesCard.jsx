import React from 'react';
import { useLocation } from 'react-router';
import './MoviesCard.css';

function MoviesCard({ favoriteList, movie, onDelete, onLike }) {
  const { pathname } = useLocation();

  function isFavorite() {
    return favoriteList.some((item) => item.movieId === movie.id);
  }
  const movieImage =
    movie.image.url === undefined
      ? movie.image
      : `https://api.nomoreparties.co${movie.image.url}`;

  const trailer =
    movie.trailer === undefined ? movie.trailerLink : movie.trailer;
  const transformDuration = () => {
    return `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`;
  };

  function addToFavorite() {
    onLike(movie);
  }

  function deleteMovie() {
    onDelete(movie);
  }

  return (
    <div className="moviesCard">
      <div className="moviesCard__container">
        <div className="moviesCard__info">
          <p className="moviesCard__title">{movie.nameRU}</p>
          <p className="moviesCard__duration">{transformDuration()}</p>
        </div>
        {pathname === '/movies' ? (
          <button
            type="submit"
            onClick={isFavorite() ? deleteMovie : addToFavorite}
            className={`moviesCard__favorite-button ${
              isFavorite() && `moviesCard__favorite-button_acitve`
            }`}
          ></button>
        ) : (
          <button
            type="submit"
            onClick={deleteMovie}
            className="moviesCard__delete-button"
          ></button>
        )}
      </div>
      <a href={trailer} target="_blank">
        <img
          src={movieImage}
          alt={movie.nameRU}
          className="moviesCard__poster"
        ></img>
      </a>
    </div>
  );
}

export default MoviesCard;
