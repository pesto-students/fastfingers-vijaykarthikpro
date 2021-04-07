import React from 'react';
import './App.css';
import Router from './components/Router/Router'
import FastFingersCoverImage from './images/FastFingersCoverImage.svg'


function App() {

  return (
    <div className="App">
      <img className="cover-image" src={FastFingersCoverImage} alt="CoverImage"/>
      <Router />
    </div>
  );
}

export default App;
