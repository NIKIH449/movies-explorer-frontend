import React from 'react';
import AboutProject from '../AboutProject/AboutProject';
import NavTab from '../NavTab/NavTab';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import './Main.css';
function Main() {
  return (
    <>
      <Promo>
        <NavTab title="О проекте" />
        <NavTab title="Технологии" />
        <NavTab title="Студент" />
      </Promo>
      <AboutProject />
      <Techs />
    </>
  );
}

export default Main;
