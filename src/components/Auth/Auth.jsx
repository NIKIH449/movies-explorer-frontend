import React from 'react';
import { useLocation } from 'react-router';
import Navigation from '../Navigation/Navigation';
import './Auth.css';
function Auth({ title, children, buttonName, paragraph, navigation }) {
  const { pathname } = useLocation();
  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__logo" />
        <h2 className="auth__title">{title}</h2>
        <div>{children}</div>
        <button className="auth__button">{buttonName}</button>
        <div className="auth__link-container">
          <p className="auth__paragpraph">{paragraph}</p>{' '}
          <Navigation
            green
            title={pathname === '/signin' ? 'Войти' : 'Зарегистрироваться'}
            link={pathname === '/signin' ? '/signup' : '/signin'}
          />
        </div>
      </div>
    </div>
  );
}

export default Auth;
