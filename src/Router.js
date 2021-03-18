import React, { Component } from 'react';
import SignUp from './components/SignUpPage/SignUp';
import Game from './components/GamePage/Game'

export default class Router extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            path: 'SignUp'
        }
    }

    handlePageNavigation = (pathName) =>{
        console.log("router called path: ",pathName);
        this.setState({path: pathName})
        //    window.location.pathname = pathName;
    }

    render() {
        let { path } = this.state;
        console.log("path: ",path)
        if(path === 'SignUp') {
            return <SignUp handlePageNavigation={this.handlePageNavigation}/>
        } else {
            return <Game handlePageNavigation={this.handlePageNavigation}/>
        }
    }
    
}

