import React from 'react';
import NavTab from '../NavTab/NavTab';
import './Promo.css';
function Promo({ children }) {
  return (
    <section className="promo">
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <nav className="promo__navigation">
        <NavTab title="О проекте" />
        <NavTab title="Технологии" />
        <NavTab title="Студент" />
      </nav>
    </section>
  );
}

export default Promo;
