import React, { useState, useEffect } from 'react';
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
}) => {
  const [search, setSearch] = useState('');
  const { pathname } = useLocation();
  function handleChangeSearch(e) {
    setSearch(e.target.value);
  }

  const submitForm = (e) => {
    e.preventDefault();
    if (search === '') {
      filterMoviesByName([], '');
    } else if (pathname === '/movies') {
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
            value={search}
            onChange={handleChangeSearch}
            name="search"
            placeholder="Фильм"
            className="searchForm__input"
          />
        </div>
        <button type="submit" className="searchForm__submit-button" />
        <div className="searchForm__checkbox-container">
          <FilterCheckbox
            filterShortFilms={filterShortFilms}
            moviesList={moviesList}
            showShortFilms={showShortFilms}
          />
          <p className="searchForm__paragraph">Короткометражки</p>
        </div>
      </div>
      <div className="searchForm__mobile">
        <FilterCheckbox
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
