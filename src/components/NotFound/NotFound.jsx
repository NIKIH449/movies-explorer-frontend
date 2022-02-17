import React from 'react';
import Navigation from '../Navigation/Navigation';
import './NotFound.css';
function NotFound({ background }) {
  console.log(background);
  return (
    <div className="notFound">
      <div>
        <h2 className="notFound__title">404</h2>
        <p className="notFound__paragraph">Страница не найдена</p>
        <Navigation link={'/'} green title="Назад" />
      </div>
    </div>
  );
}

export default NotFound;
