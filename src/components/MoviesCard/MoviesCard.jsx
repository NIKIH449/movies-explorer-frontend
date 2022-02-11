import React, { useState } from 'react';
import './MoviesCard.css';

function MoviesCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const transformDuration = () => {
    return `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`;
  };
  console.log(transformDuration());
  return (
    <div className="moviesCard">
      <div className="moviesCard__container">
        <div className="moviesCard__info">
          <p className="moviesCard__title">{movie.nameRU}</p>
          <p className="moviesCard__duration">{transformDuration()}</p>
        </div>
        <button
          onClick={() => setIsFavorite(isFavorite === false ? true : false)}
          className={`moviesCard__favorite-button ${
            isFavorite && `moviesCard__favorite-button_acitve`
          }`}
        ></button>
      </div>
      <img
        src={`https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`}
        className="moviesCard__poster"
      ></img>
    </div>
  );
}

export default MoviesCard;
