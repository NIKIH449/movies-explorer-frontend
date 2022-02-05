import React, { useState } from 'react';
import Header from '../Header/Header';
import './App.css';
function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <div className="page">
      <Header loggedIn={loggedIn}></Header>
    </div>
  );
}

export default App;
