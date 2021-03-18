import React, {Component} from 'react'
import './SignUp.scss'
import KeyboardSvg from '../../images/keyboard-icon.svg'
import PlayIconSvg from '../../images/play-icon.svg'
import { difficultyLevels, defaultTexts } from '../../constants'

export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            selectLevel: difficultyLevels.EASY
        }
    }

    handleNameChange = (event) => {
        let {target:{value}} = event;
        this.setState({name: value})
    }

    handleSelection = (event) =>{
        let {target:{value}} = event;
        this.setState({selectLevel: value})
    }

    handleSubmission = (e) => {
        e.preventDefault()
        this.setState({ name:"", selectLevel : difficultyLevels.EASY }) 
        window.location.pathname = "/game"
    }

    render() {

        const { name } = this.state;

        const options = Object.values(difficultyLevels).map((value, index) => {
          return  <option key={index}>{value}</option>
        })
        return (<div className="container">
            <img src={KeyboardSvg} alt="img"/>
            <span className="title">fast fingers</span>
            <div className="inner-container">
                <div className="sub-title"> 
                    <span className="red-line"/>
                    <p >the ultimate typing game</p>
                    <span className="red-line"/>
                </div>
                <form>
                    <input
                    type="text"
                    name="name"
                    placeholder={ defaultTexts.TYPE_YOUR_NAME }
                    value={name}
                    onChange={this.handleNameChange}
                    required/>

                    <select  defaultValue={defaultTexts.DIFFICULTY_LEVEL} onChange={this.handleSelection} required>
                        <option value={defaultTexts.DIFFICULTY_LEVEL}  disabled hidden>
                            {defaultTexts.DIFFICULTY_LEVEL}
                        </option>
                        {options}
                    </select>

                    <button className="start-game-btn" onClick={this.handleSubmission}>
                        <img src={PlayIconSvg} alt="play icon"/>
                        <span>{defaultTexts.START_GAME}</span>
                    </button>
                </form>
            </div>
        </div>)
    }
}
