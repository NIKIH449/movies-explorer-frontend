import React, { useState } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import './App.css';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="page">
      <Header loggedIn={loggedIn} />
      <Main />
    </div>
  );
}

export default App;
