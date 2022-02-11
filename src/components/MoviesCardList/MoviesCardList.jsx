import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList() {
  const [moviesList, setMoviesList] = useState([]);
  const [moviesCount, setMoviesCount] = useState(12);

  useEffect(() => {
    //это временное решение, сделаю все красиво на следующем этапе
    return fetch('https://api.nomoreparties.co/beatfilm-movies', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => data.json())
      .then((data) => setMoviesList(data));
  }, []);

  return (
    <div className="moviesCardList">
      <div className="moviesCardList__grid">
        {moviesList &&
          moviesList.map((item, index) => {
            if (index + 1 <= moviesCount) {
              return <MoviesCard movie={item} key={index} />;
            } else {
              return '';
            }
          })}
      </div>
      {moviesCount < 100 && (
        <button
          onClick={() => setMoviesCount(moviesCount + 12)}
          className="movieCardList_button-add"
        >
          Ещё
        </button>
      )}
    </div>
  );
}

export default MoviesCardList;
