import React from 'react';
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
  shortFavoriteFilmsOnly,
  filterShortFilms,
  filterMoviesByName,
  checkBoxStatus,
}) {
  function moviesMiddleware() {
    if (checkBoxStatus === true) {
      return favoriteList.filter((item) => item.duration < 40);
    } else {
      return favoriteList;
    }
  }
  
  return (
    <div className="savedMovies">
      <SearchForm
        shortFavoriteFilmsOnly={shortFavoriteFilmsOnly}
        checkBoxStatus={checkBoxStatus}
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
        isLoading={isLoading}
        onDelete={onDelete}
        isMovieFound={isMovieFound}
        favoriteList={moviesMiddleware()}
      />
    </div>
  );
}

export { SavedMovies };
