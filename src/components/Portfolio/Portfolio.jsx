import React from 'react';
import './Portfolio.css';
function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            href="https://github.com/NIKIH449/react-burger"
            target="_blank"
            className="portfolio__link"
          >
            Многостраничное приложение
          </a>
          <a
            href="https://github.com/NIKIH449/react-burger"
            target="_blank"
            className="portfolio__arrow"
          ></a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://github.com/NIKIH449/react-mesto-api-full"
            target="_blank"
            className="portfolio__link"
          >
            Одностраничное приложение
          </a>
          <a
            href="https://github.com/NIKIH449/react-mesto-api-full"
            target="_blank"
            className="portfolio__arrow"
          ></a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://github.com/NIKIH449/planet-site-fact-react"
            target="_blank"
            className="portfolio__link"
          >
            Адаптивное сайт
          </a>
          <a
            target="_blank"
            href="https://github.com/NIKIH449/planet-site-fact-react"
            className="portfolio__arrow"
          ></a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
