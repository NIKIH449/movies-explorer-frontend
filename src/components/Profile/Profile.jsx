import React, { useContext, useState } from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../context/CurrentUserContext';
function Profile({ logOut, changeProfileInfo }) {
  const currentUser = useContext(CurrentUserContext);
  const [email, setEmail] = useState(currentUser.email);
  const [name, setName] = useState(currentUser.name);
  const changed = currentUser.email === email && currentUser.name === name;
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function changeInfo(e) {
    e.preventDefault();
    changeProfileInfo(email, name);
  }

  function onLogOut(e) {
    e.preventDefault();
    logOut();
  }
  return (
    <div className="profile">
      <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
      <div className="profile__info-container">
        <div className="profile__input-container">
          <p className="profile__input-title">Имя</p>
          <input
            value={name}
            onChange={handleChangeName}
            placeholder="Имя"
            required
            name="name"
            type="text"
            className="profile__input"
          />
        </div>
        <div className="profile__input-container">
          <p className="profile__input-title">E-mail</p>
          <input
            onChange={handleChangeEmail}
            value={email}
            placeholder="pochta@yandex.ru"
            type="email"
            name="email"
            className="profile__input"
            required
          />
        </div>
      </div>
      <div className="profile__buttons-container">
        <button
          disabled={changed}
          onClick={changeInfo}
          type="submit"
          className="profile__button profile__button_type_edit"
        >
          Редактировать
        </button>
        <button
          type="submit"
          onClick={onLogOut}
          className="profile__button profile__button_type_exit"
        >
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}

export default Profile;
