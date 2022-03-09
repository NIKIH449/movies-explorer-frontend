import React, { useEffect, useState } from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = ({ showShortFilms }) => {
  return (
    <div className="filterCheckbox">
      <input
        onClick={showShortFilms}
        className="filterCheckbox__slider"
        type="checkbox"
      />
    </div>
  );
};

export default FilterCheckbox;
