import React from 'react';
import './App.css';
import FastFingersCoverImage from './images/FastFingersCoverImage.svg'
import Router from './Router'

function App() {

  return (
    <div className="App">
      <img className="cover-image" src={FastFingersCoverImage} alt="CoverImage"/>
      <Router />
    </div>
  );
}

export default App;
