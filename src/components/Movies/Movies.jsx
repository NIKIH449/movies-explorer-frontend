import React, { useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
function Movies({
  checkBoxStatus,
  showShortFilms,
  filterShortFilms,
  isMoviesListFailed,
  isMovieFound,
  filteredList,
  favoriteList,
  isInputEmpty,
  filterMovies,
  movieList,
  isLoading,
  onLike,
  filterMoviesByName,
  onDelete,
  currentCheckboxPosition,
}) {
  function moviesMiddleware() {
    if (checkBoxStatus === true) {
      const filterList = movieList.filter((item) => item.duration < 40);
      
      return filterList;
    } else {
      return movieList;
    }
  }
  return (
    <div className="movies">
      <SearchForm
        movieList={movieList}
        checkBoxStatus={checkBoxStatus}
        currentCheckboxPosition={currentCheckboxPosition}
        filterMoviesByName={filterMoviesByName}
        filterShortFilms={filterShortFilms}
        showShortFilms={showShortFilms}
        isInputEmpty={isInputEmpty}
        filterMovies={filterMovies}
      />
      <MoviesCardList
        movieList={moviesMiddleware()}
        filterMoviesByName={filterMoviesByName}
        onDelete={onDelete}
        favoriteList={favoriteList}
        onLike={onLike}
        isLoading={isLoading}
        isMoviesListFailed={isMoviesListFailed}
        isMovieFound={isMovieFound}
        filteredList={filteredList}
      />
    </div>
  );
}

export default Movies;
