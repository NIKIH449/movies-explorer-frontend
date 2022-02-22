import React from 'react';
import './NavTab.css';
function NavTab({ title, isTech }) {
  return <div className={`navTab ${isTech && 'navTab__techs'}`}>{title}</div>;
}

export default NavTab;
