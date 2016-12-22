import React, { Component } from 'react';
import '../../ressources/App.css';
import Header from '../Header';
import Footer from '../Footer';
import NavBar from '../NavBar';
import Draftjs from '../Draftjs';
import Universes from '../Universes';

const App = ({ children }) => {
  return (
    <head>
      <meta charset="utf-8" />
    </head> ,
    <div className="App">
      <Header />
      <NavBar />
      { children }
      <Footer />
    </div>
  )
}



export default App;
