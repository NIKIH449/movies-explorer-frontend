import React, { useEffect } from 'react';
import './MobileMenu.css';
import { createPortal } from 'react-dom';
import Navigation from '../Navigation/Navigation';
import { useNavigate } from 'react-router';

function MobileMenu({ onClose }) {
  useEffect(() => {
    function onEscClose(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', onEscClose);
    return () => window.removeEventListener('keydown', onEscClose);
  }, [onClose]);


  return createPortal(
    <div className="mobile-menu">
      <nav className="mobile-menu__navigation">
        <div className="mobile-menu__container">
          <Navigation menuStyle link="/" title="Главная" />
          <Navigation menuStyle link="/movies" title="Фильмы" />
          <Navigation
            menuStyle
            link="/saved-movies"
            title="Сохраненные фильмы"
          />
        </div>
        <div className="mobile-menu__container">
          <Navigation menuStyle link="/profile" title="Аккаунт" />
        </div>
      </nav>s
      <button onClick={onClose} className="mobile-menu__close-button"></button>
    </div>,
    document.getElementById('modal')
  );
}

export default MobileMenu;
