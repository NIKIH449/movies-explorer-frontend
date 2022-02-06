import React from 'react';
import NavTab from '../NavTab/NavTab';
import './Techs.css';
function Techs() {
  return (
    <section className="techs">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__container">
        <p className="techs__paragraph-heading">7 технологий</p>
        <p className="techs__paragraph">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
      </div>
      <div className="techs__tabs">
        <NavTab isTech title="HTML" />
        <NavTab isTech title="CSS" />
        <NavTab isTech title="JS" />
        <NavTab isTech title="React" />
        <NavTab isTech title="Git" />
        <NavTab isTech title="Express.js" />
        <NavTab isTech title="mongoDB" />
      </div>
    </section>
  );
}

export default Techs;
