import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Auth from '../Auth/Auth';
import './Register.css';
function Register({ onRegister, loggedIn }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [disabledNameWhenMoint, setNameDisabledWhenMoint] = useState(true);
  const [disabledPasswordWhenMoint, setPasswordDisabledWhenMoint] =
    useState(true);
  const [disabledEmailWhenMoint, setEmailDisabledWhenMoint] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate('/movies');
    }
  }, []);
  function handleChangeName(e) {
    setNameDisabledWhenMoint(false);
    const value = e.target.value;
    const regExp = /^[А-ЯA-Z-]+$/imu.test(value);
    if (regExp) {
      setIsNameValid(true);
    } else {
      setIsNameValid(false);
    }
    setName(value);
  }
  function handleChangeEmail(e) {
    setEmailDisabledWhenMoint(false);
    const value = e.target.value;
    setEmail(value);
    const regExp =
      /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i.test(
        value
      );
    if (regExp) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  }

  function handleChangePassword(e) {
    setPasswordDisabledWhenMoint(false);
    const value = e.target.value;
    if (password.length > 4) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
    setPassword(value);
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
      disabledWhenMoint={
        disabledEmailWhenMoint &&
        disabledPasswordWhenMoint &&
        disabledNameWhenMoint
      }
      disable={isEmailValid && isPasswordValid && isNameValid}
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
      {!disabledNameWhenMoint && !isNameValid && (
        <p className="register__input-error">
          Можно использовать латинские и русские буквы, а также дефис.
        </p>
      )}
      <p className="register__input-name">E-mail</p>
      <input
        value={email}
        onChange={handleChangeEmail}
        name="email"
        placeholder="E-mail"
        type="email"
        className="register__input"
      />
      {!disabledEmailWhenMoint && !isEmailValid && (
        <p className="register__input-error">
          Введите email такого вида: email@email.com.
        </p>
      )}
      <p className="register__input-name">Пароль</p>
      <input
        value={password}
        onChange={handleChangePassword}
        name="password"
        placeholder="Пароль"
        type="password"
        className="register__input"
      />
      {!disabledPasswordWhenMoint && !isPasswordValid && (
        <p className="register__input-error">Должно быть минимум 6 символов</p>
      )}
    </Auth>
  );
}

export default Register;
