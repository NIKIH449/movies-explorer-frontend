import React, { useState } from 'react';
import MobileMenu from '../Modals/MobileMenu';
import './Header.css';
import HeaderButton from './HeaderButton/HeaderButton';
function Header({ loggedIn }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalToggle = () => {
    setIsModalOpen(isModalOpen === false ? true : false);
  };
  return (
    <header className="header b">
      <a href="https://nikih449.github.io/movie-explorer-frontend">
        <div className="header__logo"></div>
      </a>
      <nav className="header__navigation">
        <div className="header__container">
          {loggedIn && (
            <>
              <HeaderButton link="/mobies" title="Фильмы" />
              <HeaderButton link="/saved-movies" title="Сохраненные фильмы" />
            </>
          )}
        </div>

        <div className="header__container">
          {!loggedIn ? (
            <>
              <HeaderButton link="/signup" title="Регистрация" />
              <HeaderButton background="signin" link="/signin" title="Войти" />
            </>
          ) : (
            <HeaderButton
              background="profile"
              link="/profile"
              title="Аккаунт"
            />
          )}
        </div>
      </nav>
      <div className="header__mobile-menu">
        {!loggedIn ? (
          <>
            <HeaderButton link="/signup" title="Регистрация" />
            <HeaderButton background="signin" link="/signin" title="Войти" />
          </>
        ) : (
          <div
            onClick={modalToggle}
            className="header__mobile-menu-button"
          ></div>
        )}
      </div>
      {isModalOpen && <MobileMenu onClose={modalToggle} />}
    </header>
  );
}

export default Header;
