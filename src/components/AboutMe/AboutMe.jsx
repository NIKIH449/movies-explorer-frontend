import React from 'react';
import './AboutMe.css';
function AboutMe() {
  return (
    <section className="about-me">
      <p className="about-me__title">Cтудент</p>
      <div className="about-me__container">
        <div className="about-me__information">
          <p className="about-me__name">Никита</p>
          <p className="about-me__position">Фронтенд-разработчик, 27 лет</p>
          <p className="about-me__bio">
            Я родился и живу в Cанкт-Петербурге, закончил факультет геодезии и
            картографии Горного Университат. Я женат. Я люблю кататься на
            велосипеде и сноуборде. С мая 2021 года начал учиться
            фронтенд-разработке. С 2015 года работал строительных компаниях
            Санкт_птербурга на должности геодезиста. В данный момент я ушел с
            работы, что полностью посвятить себя изучению нового, а так же
            поиска новой работы.
          </p>
          <div className="about-me__links">
            <a
              className="about-me__link"
              href="https://www.facebook.com/profile.php?id=100001510245328"
              target="_blank"
            >
              Facebook
            </a>
            <a
              className="about-me__link"
              href="https://github.com/NIKIH449"
              target="_blank"
            >
              Github
            </a>
          </div>
        </div>
        <div className="about-me__photo"></div>
      </div>
    </section>
  );
}

export default AboutMe;
