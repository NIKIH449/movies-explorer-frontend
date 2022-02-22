import React, { useState } from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = () => {
  const [isCheckboxActive, setIsCheckboxActive] = useState(false);
  return (
    <div
      onClick={() => {
        setIsCheckboxActive(isCheckboxActive === false ? true : false);
      }}
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
