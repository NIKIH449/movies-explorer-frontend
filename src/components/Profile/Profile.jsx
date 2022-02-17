import React from 'react';
import './Profile.css';
function Profile({ onLogOut }) {
  return (
    <div className="profile">
      <h2 className="profile__title">Привет, Никита!</h2>
      <div className="profile__info-container">
        <div className="profile__input-container">
          <p className="profile__input-title">Имя</p>
          <input
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
            placeholder="pochta@yandex.ru"
            type="email"
            name="email"
            className="profile__input"
            required
          />
        </div>
      </div>
      <div className="profile__buttons-container">
        <button className="profile__button profile__button_type_edit">
          Редактировать
        </button>
        <button
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
