import React, { useState } from 'react';
import SignUp from '../SignUpPage/SignUp'
import Game from '../GamePage/Game'
import GameEnd from '../GameEnd/GameEnd'
import { difficultyLevels } from '../../constants';
// import { saveToSessionStorage ,getFromSessionStorage } from '../../Util'

export default function Router() {
    
    const [path, setPath] = useState('SignUp');
    const [name, setName] = useState('');
    const [difficultyLevel, setDifficultyLevel] = useState(difficultyLevels.EASY)
    const [score, setScore] = useState(0);

    let handlePageNavigation = (pathName, name, level, score) =>{
        console.log('router called path: ',pathName);
        setPath(pathName)
        if(name && level) {
            setName(name);
            setDifficultyLevel(level)
        }
        if(score) {
            setScore(score);
        }

    }

    console.log('path: ',path)

    switch(path) {
        case 'SignUp': {
            return <SignUp 
                handlePageNavigation={handlePageNavigation} 
            />
        }
        case 'Game': {
            return <Game 
                name={name}
                difficultyLevel={difficultyLevel}
                handlePageNavigation={handlePageNavigation}
            />
        }
        case 'GameEnd': {
            return <GameEnd 
                name={name}
                difficultyLevel={difficultyLevel}
                score={score}
                handlePageNavigation={handlePageNavigation}
            />
        }
        default: break;
    }
}
    

