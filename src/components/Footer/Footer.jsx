import React from 'react';
import Navigation from '../Navigation/Navigation';
import './Footer.css';
function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__date"> &#169; 2022</p>
        <nav className="footer__navigation">
          <a
            className="footer__link"
            href="https://practicum.yandex.ru/"
            target="_blank"
          >
            Яндекс.Практикум
          </a>
          <a
            className="footer__link"
            href="https://github.com/NIKIH449"
            target="_blank"
          >
            Github
          </a>
          <a
            className="footer__link"
            href="https://www.facebook.com/profile.php?id=100001510245328"
            target="_blank"
          >
            Facebook
          </a>
          <p className="footer__date-mobile"> &#169; 2022</p>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
