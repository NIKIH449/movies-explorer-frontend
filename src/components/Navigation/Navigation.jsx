import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';
function Navigation({ title, link, background, menuStyle }) {
  return (
    <Link
      to={link}
      className={`navigation ${menuStyle && 'navigation__menu'}`}
    >
      {title}
    </Link>
  );
}

export default Navigation;
