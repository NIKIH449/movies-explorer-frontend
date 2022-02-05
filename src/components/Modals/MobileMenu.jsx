import React, { useEffect } from 'react';
import './MobileMenu.css';
import { createPortal } from 'react-dom';
import HeaderButton from '../Header/HeaderButton/HeaderButton';

function MobileMenu({ onClose, children }) {
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
      <nav className="mobile-menu_navigation">
        <div className="mobile-menu_container">
          <HeaderButton link="/" title="Главная" />
          <HeaderButton link="/mobies" title="Фильмы" />
          <HeaderButton link="/saved-movies" title="Сохраненные фильмы" />
        </div>
        <div className="mobile-menu_container">
          <HeaderButton background="profile" link="/profile" title="Аккаунт" />
        </div>
      </nav>
      <button onClick={onClose} className="mobile-menu__close-button"></button>
    </div>,
    document.getElementById('modal')
  );
}

export default MobileMenu;
