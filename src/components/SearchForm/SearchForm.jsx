import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

const SearchForm = () => {
  const submitForm = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={submitForm} className="searchForm">
      <div className="searchForm__input-container">
        <div className="searchForm__input-icon"> </div>
        <input placeholder="Фильм" className="searchForm__input" />
        <button className="searchForm__submit-button" />
        <div className="searchForm__checkbox-container">
          <FilterCheckbox />
          <p className="searchForm__paragraph">Короткометражки</p>
        </div>
      </div>
      <div className="searchForm__mobile">
        <FilterCheckbox />
        <p className="searchForm__paragraph">Короткометражки</p>
      </div>
    </form>
  );
};

export default SearchForm;
