import React, { useState } from 'react';
import { useLocation } from 'react-router';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

const SearchForm = ({
  showShortFilms,
  moviesList,
  isInputEmpty,
  filterShortFilms,
  filterMoviesByName,
  favoriteList,
  currentCheckboxPosition,
}) => {
  const [search, setSearch] = useState('');
  const { pathname } = useLocation();
  const initialSearchValue = localStorage.getItem('searchAllMovies');
  const initialFavoriteSearchValue = localStorage.getItem(
    'searchFavoriteMovies'
  );
  function handleChangeSearch(e) {
    setSearch(e.target.value);
    if (pathname === '/movies') {
      localStorage.setItem('searchAllMovies', e.target.value);
    } else {
      localStorage.setItem('searchFavoriteMovies', e.target.value);
    }
  }

  const submitForm = (e) => {
    e.preventDefault();
    if (pathname === '/movies') {
      filterMoviesByName(moviesList, search);
    } else {
      filterMoviesByName(favoriteList, search);
    }
  };

  return (
    <form onSubmit={submitForm} className="searchForm">
      <div className="searchForm__input-container">
        <div className="searchForm__input-icon"></div>
        <div className="searchForm__input">
          <input
            id="search"
            value={
              pathname === ''
                ? search
                : pathname === '/movies'
                ? initialSearchValue
                : initialFavoriteSearchValue || ''
            }
            onChange={handleChangeSearch}
            name="search"
            placeholder="Фильм"
            className="searchForm__input"
          />
        </div>
        <button type="submit" className="searchForm__submit-button" />
        <div className="searchForm__checkbox-container">
          <FilterCheckbox
            currentCheckboxPosition={currentCheckboxPosition}
            filterShortFilms={filterShortFilms}
            moviesList={moviesList}
            showShortFilms={showShortFilms}
          />
          <p className="searchForm__paragraph">Короткометражки</p>
        </div>
      </div>
      <div className="searchForm__mobile">
        <FilterCheckbox
          currentCheckboxPosition={currentCheckboxPosition}
          filterShortFilms={filterShortFilms}
          moviesList={moviesList}
          showShortFilms={showShortFilms}
        />
        <p className="searchForm__paragraph">Короткометражки</p>
      </div>
      <p
        className="searchForm__error"
        style={{
          display: isInputEmpty === false ? 'none' : 'block',
        }}
      >
        Нужно ввести ключевое слово
      </p>
    </form>
  );
};

export default SearchForm;
