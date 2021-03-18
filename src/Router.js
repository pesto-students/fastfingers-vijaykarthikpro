import React from 'react';
import SignUp from './components/SignUpPage/SignUp';
import Game from './components/GamePage/Game'

export default function Router() {

    console.log(window.location.href)
    console.log(window.location.pathname)
    let path = window.location.pathname

    if(path === '/') {
       return <SignUp />
    } else if (path === '/game' ) {
        return <Game />
    }
    
}

