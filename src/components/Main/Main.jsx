import React from 'react';
import NavTab from '../NavTab/NavTab';
import Promo from '../Promo/Promo';
import './Main.css';
function Main() {
  return (
    <>
      <Promo>
        <NavTab title="О проекте" />
        <NavTab title="Технологии" />
        <NavTab title="Студент" />
      </Promo>
    </>
  );
}

export default Main;
