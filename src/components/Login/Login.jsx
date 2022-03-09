import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Auth from '../Auth/Auth';
import './Login.css';
function Login({ onLogin, loggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [disabledPasswordWhenMoint, setPasswordDisabledWhenMoint] =
    useState(true);
  const [disabledEmailWhenMoint, setEmailDisabledWhenMoint] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) {
      navigate('/movies');
    }
  }, []);

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
      disabledWhenMoint={disabledEmailWhenMoint && disabledPasswordWhenMoint}
      disable={isEmailValid && isPasswordValid}
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
      {!disabledEmailWhenMoint && !isEmailValid && (
        <p className="login__input-error">
          Введите email такого вида: email@email.com.
        </p>
      )}
      <p className="login__input-name">Пароль</p>
      <input
        name="password"
        placeholder="Пароль"
        type="password"
        className="login__input"
        onChange={handleChangePassword}
        value={password}
      />
      {!disabledPasswordWhenMoint && !isPasswordValid && (
        <p className="login__input-error">Должно быть минимум 6 символов</p>
      )}
    </Auth>
  );
}

export default Login;
