import React from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = ({ showShortFilms, checkBoxStatus }) => {
  return (
    <div className="filterCheckbox">
      <input
        onClick={showShortFilms}
        className="filterCheckbox__slider"
        type="checkbox"
        checked={checkBoxStatus === true ? true : false}
        readOnly
      />
    </div>
  );
};

export default FilterCheckbox;
