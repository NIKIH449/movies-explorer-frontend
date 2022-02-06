import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import './App.css';
function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <div className="page">
      <Header loggedIn={loggedIn} />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
