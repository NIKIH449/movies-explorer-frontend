import React, { useState } from 'react';
import { useLocation } from 'react-router';
import './MoviesCard.css';

function MoviesCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { pathname } = useLocation();
  const transformDuration = () => {
    return `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`;
  };
  return (
    <div className="moviesCard">
      <div className="moviesCard__container">
        <div className="moviesCard__info">
          <p className="moviesCard__title">{movie.nameRU}</p>
          <p className="moviesCard__duration">{transformDuration()}</p>
        </div>
        {pathname === '/movies' ? (
          <button
            onClick={() => setIsFavorite(isFavorite === false ? true : false)}
            className={`moviesCard__favorite-button ${
              isFavorite && `moviesCard__favorite-button_acitve`
            }`}
          ></button>
        ) : (
          <button className="moviesCard__delete-button"></button>
        )}
      </div>
      <img
        src={`https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`}
        alt={movie.nameRU}
        className="moviesCard__poster"
      ></img>
    </div>
  );
}

export default MoviesCard;
