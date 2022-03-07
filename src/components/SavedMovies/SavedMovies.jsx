import React, { useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
function SavedMovies({
  showShortFilms,
  isMovieFound,
  filterMovies,
  isInputEmpty,
  filteredList,
  favoriteList,
  onDelete,
  isLoading,
  moviesList,
  filterShortFilms,
  filterMoviesByName,
}) {
  useEffect(() => {
    filterMoviesByName([], '', 'mount');
  }, []);

  return (
    <div className="savedMovies">
      <SearchForm
        filterMoviesByName={filterMoviesByName}
        filteredList={filteredList}
        filterShortFilms={filterShortFilms}
        showShortFilms={showShortFilms}
        isInputEmpty={isInputEmpty}
        filterMovies={filterMovies}
        favoriteList={favoriteList}
      />
      <MoviesCardList
        filterMoviesByName={filterMoviesByName}
        filteredList={filteredList}
        moviesList={moviesList}
        isLoading={isLoading}
        onDelete={onDelete}
        isMovieFound={isMovieFound}
        favoriteList={favoriteList}
      />
    </div>
  );
}

export { SavedMovies };
