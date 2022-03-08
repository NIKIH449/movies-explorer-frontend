import React, { useState } from 'react';
import { signUp } from '../../utils/MainApi';
import Auth from '../Auth/Auth';
import './Register.css';
function Register({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  function registerSubmit(e) {
    e.preventDefault();
    onRegister(password, email, name);
  }

  return (
    <Auth
      buttonName={'Зарегистрироваться'}
      paragraph={'Уже зарегистрированы?'}
      navigation={'Войти'}
      title={'Добро пожаловать!'}
      onSubmit={registerSubmit}
    >
      <p className="register__input-name">Имя</p>
      <input
        value={name}
        onChange={handleChangeName}
        name="name"
        placeholder="Имя"
        type="text"
        className="register__input"
      />
      <p className="register__input-name">E-mail</p>
      <input
        value={email}
        onChange={handleChangeEmail}
        name="email"
        placeholder="E-mail"
        type="email"
        className="register__input"
      />
      <p className="register__input-name">Пароль</p>
      <input
        value={password}
        onChange={handleChangePassword}
        name="password"
        placeholder="Пароль"
        type="password"
        className="register__input"
      />
    </Auth>
  );
}

export default Register;
