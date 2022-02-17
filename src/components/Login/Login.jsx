import React from 'react';
import Auth from '../Auth/Auth';
import Navigation from '../Navigation/Navigation';
import './Login.css';
function Login() {
  return (
    <Auth
      buttonName={'Зарегистрироваться'}
      paragraph={'Уже зарегистрированы?'}
      navigation={'Войти'}
      title={'Добро пожаловать!'}
    >
      <p className="login__input-name">Имя</p>
      <input placeholder="Имя" type="text" className="login__input" />
      <p className="login__input-name">E-mail</p>
      <input placeholder="E-mail" type="email" className="login__input" />
      <p className="login__input-name">Пароль</p>
      <input placeholder="Пароль" type="password" className="login__input" />
    </Auth>
  );
}

export default Login;
