import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import Navigation from '../Navigation/Navigation';
import './Auth.css';
function Auth({
  title,
  children,
  buttonName,
  paragraph,
  onSubmit,
  disable,
  disabledWhenMoint,
}) {
  disabledWhenMoint;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <form onSubmit={onSubmit} className="auth" noValidate>
      <div className="auth__container">
        <div onClick={() => navigate('/')} className="auth__logo" />
        <h2 className="auth__title">{title}</h2>
        <div>{children}</div>
        <button
          type="submit"
          style={{ opacity: disabledWhenMoint || !disable ? 0.5 : '' }}
          className="auth__button"
          disabled={disabledWhenMoint || !disable}
        >
          {buttonName}
        </button>
        <div className="auth__link-container">
          <p className="auth__paragpraph">{paragraph}</p>{' '}
          <Navigation
            green
            title={pathname === '/signin' ? 'Зарегистрироваться' : 'Войти'}
            link={pathname === '/signin' ? '/signup' : '/signin'}
          />
        </div>
      </div>
    </form>
  );
}

export default Auth;
