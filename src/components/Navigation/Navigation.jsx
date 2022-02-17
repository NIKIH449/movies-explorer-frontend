import React from 'react';
import './Navigation.css';
import { Link, useLocation } from 'react-router-dom';
function Navigation({ title, link, menuStyle, green }) {
  const { pathname } = useLocation();
  return (
    <Link
      style={pathname === link ? { fontWeight: 500 } : { fontWeight: 'normal' }}
      to={link}
      className={`navigation ${menuStyle && 'navigation__menu'} ${
        green && 'navigation__notFound'
      }`}
    >
      {title}
    </Link>
  );
}

export default Navigation;
