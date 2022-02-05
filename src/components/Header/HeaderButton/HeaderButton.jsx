import React from 'react';
import './HeaderButton.css';
import { Link } from 'react-router-dom';
function HeaderButton({ title, link, background }) {
  return (
    <Link
      style={
        background === 'signin'
          ? { backgroundColor: '#2BE080', borderRadius: '3px' }
          : background === 'profile'
          ? { backgroundColor: '#F9F9F9', borderRadius: '20px' }
          : { backgroundColor: '#FFFFFF' }
      }
      to={link}
      className="header-button"
    >
      {title}
    </Link>
  );
}

export default HeaderButton;
