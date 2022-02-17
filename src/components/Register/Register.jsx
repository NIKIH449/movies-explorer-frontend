import React from 'react';
import Auth from '../Auth/Auth';
import './Register.css';
function Register() {
  return (
    <Auth
      buttonName={'Войти'}
      paragraph={'Ещё не зарегистрированы?'}
      navigation={'Регистрация'}
      title={'Рады видеть!'}
    >
      <p className="login__input-name">E-mail</p>
      <input placeholder="E-mail" type="email" className="login__input" />
      <p className="login__input-name">Пароль</p>
      <input placeholder="Пароль" type="password" className="login__input" />
    </Auth>
  );
}

export default Register;
