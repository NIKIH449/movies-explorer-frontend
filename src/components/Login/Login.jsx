import React, { useState } from 'react';
import { signIn } from '../../utils/MainApi';
import Auth from '../Auth/Auth';
import Navigation from '../Navigation/Navigation';
import './Login.css';
function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  function loginSubmit(e) {
    e.preventDefault();
    onLogin(password, email);
  }
  return (
    <Auth
      buttonName={'Войти'}
      paragraph={'Ещё не зарегистрированы?'}
      navigation={'Регистрация'}
      title={'Рады видеть!'}
      onSubmit={loginSubmit}
    >
      <p className="login__input-name">E-mail</p>
      <input
        onChange={handleChangeEmail}
        value={email}
        name="email"
        placeholder="E-mail"
        type="email"
        className="login__input"
      />
      <p className="login__input-name">Пароль</p>
      <input
        onChange={handleChangePassword}
        value={password}
        name="password"
        placeholder="Пароль"
        type="password"
        className="login__input"
      />
    </Auth>
  );
}

export default Login;
