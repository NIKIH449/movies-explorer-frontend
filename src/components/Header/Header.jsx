import React, { useState } from 'react';
import MobileMenu from '../Modals/MobileMenu';
import './Header.css';
import Navigation from '../Navigation/Navigation';
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
              <Navigation link="/mobies" title="Фильмы" />
              <Navigation link="/saved-movies" title="Сохраненные фильмы" />
            </>
          )}
        </div>

        <div className="header__container">
          {!loggedIn ? (
            <>
              <Navigation link="/signup" title="Регистрация" />
              <div className="header__login-button">
                <Navigation link="/signin" title="Войти" />
              </div>
            </>
          ) : (
            <div className="header__profile-button">
              <Navigation link="/profile" title="Аккаунт" />
            </div>
          )}
        </div>
      </nav>
      <div className="header__mobile-menu">
        {!loggedIn ? (
          <>
            <Navigation link="/signup" title="Регистрация" />
            <div className="header__login-button">
              <Navigation link="/signin" title="Войти" />
            </div>
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
