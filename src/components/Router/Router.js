import React, { useState } from 'react';
import SignUp from '../SignUpPage/SignUp'
import Game from '../GamePage/Game'
import { saveToSessionStorage ,getFromSessionStorage } from '../../Util'

export default function Router() {
    
    const [path, setPath] = useState('SignUp');
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(getFromSessionStorage('isUserLoggedIn'));



    // let flag = false;

    // if(getFromSessionStorage('name') && getFromSessionStorage('level') && !flag) {
    //     setPath('Game');
    //     flag = true;
    // } else {
    //     setPath('SignUp');
    // }

    let handlePageNavigation = (pathName, isUserLoggedIn) =>{
        console.log('router called path: ',pathName);
        console.log('isUserLoggedIn: ',isUserLoggedIn);
        saveToSessionStorage('isUserLoggedIn',isUserLoggedIn);
        setIsUserLoggedIn(isUserLoggedIn);
        setPath(pathName)
        //    window.location.pathname = pathName
    }

    console.log('path: ',path)
    if(!isUserLoggedIn) {
        return <SignUp 
                handlePageNavigation={handlePageNavigation} 
            />
    } else {
        return <Game 
                handlePageNavigation={handlePageNavigation}
            />
    }
}
    

