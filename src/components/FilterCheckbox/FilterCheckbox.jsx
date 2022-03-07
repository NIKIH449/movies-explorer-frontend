import React, { useEffect, useState } from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = ({ filterShortFilms }) => {
  const [isCheckboxActive, setIsCheckboxActive] = useState(false);

  function showShortFilms() {
    setIsCheckboxActive(isCheckboxActive === false ? true : false);
    filterShortFilms();
  }
  return (
    <div
      onClick={showShortFilms}
      className={`filterCheckbox ${
        isCheckboxActive && 'filterCheckbox_active'
      }`}
    >
      <div
        className={`filterCheckbox__slider ${
          isCheckboxActive && 'filterCheckbox__slider_active'
        }`}
      ></div>
    </div>
  );
};

export default FilterCheckbox;
