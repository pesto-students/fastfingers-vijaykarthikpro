import React, { Component } from 'react';
import SignUp from './components/SignUpPage/SignUp';
import Game from './components/GamePage/Game'

export default function Router() {

   const path = window.location.pathname

    if(path === '/') {
       return <SignUp />
    } else if (path === '/game' ) {
        return <Game />
    }
    
}

