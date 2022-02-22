import React from 'react';
import './AboutProject.css';
function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__container">
        <div className="about-project__info">
          <p className="about-project__paragraph-heading">
            Дипломный проект включал 5 этапов
          </p>
          <p className="about-project__paragraph">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__info">
          <p className="about-project__paragraph-heading">
            На выполнение диплома ушло 5 недель
          </p>
          <p className="about-project__paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__bar-panel">
        <div className="about-project__bar about-project__bar_type_backend">
          1 неделя
        </div>
        <p className="about-project__bar_tech">Back-end</p>
        <div className="about-project__bar about-project__bar_type_frontend">
          4 недели
        </div>
        <p className="about-project__bar_tech">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
