import React, { useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
function Movies({
  showShortFilms,
  filterShortFilms,
  isMoviesListFailed,
  isMovieFound,
  filteredList,
  favoriteList,
  isInputEmpty,
  filterMovies,
  moviesList,
  isLoading,
  onLike,
  filterMoviesByName,
  onDelete,
}) {
  useEffect(() => {
    filterMoviesByName([], '', 'mount');
  }, []);
  return (
    <div className="movies">
      <SearchForm
        filterMoviesByName={filterMoviesByName}
        filterShortFilms={filterShortFilms}
        showShortFilms={showShortFilms}
        isInputEmpty={isInputEmpty}
        filterMovies={filterMovies}
        moviesList={moviesList}
      />
      <MoviesCardList
        filterMoviesByName={filterMoviesByName}
        onDelete={onDelete}
        favoriteList={favoriteList}
        onLike={onLike}
        isLoading={isLoading}
        isMoviesListFailed={isMoviesListFailed}
        isMovieFound={isMovieFound}
        filteredList={filteredList}
        moviesList={moviesList}
      />
    </div>
  );
}

export default Movies;
