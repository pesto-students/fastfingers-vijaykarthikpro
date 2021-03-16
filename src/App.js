import React from 'react';
import './App.css';
import SignUp from './components/SignUpPage/SignUp'
import FastFingersCoverImage from './images/FastFingersCoverImage.svg'

function App() {
  return (
    <div className="App">
      <img className="cover-image" src={FastFingersCoverImage} alt="CoverImage"/>
      <SignUp />
    </div>
  );
}

export default App;
