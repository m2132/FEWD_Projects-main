import React from 'react'
import Keyboard from './keyboard'
import CheckboxInput from './checkbox-input'

import keyboard from '../icons/keyboard.svg'

import '../styles/status-bar.css'


export default class StatusBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            showKeyboard: false,
        }
    }

    showKeyboard = () => {
        this.setState(state => ({showKeyboard: !state.showKeyboard}))
    }


    render () {
        return (
            <footer>
                <span> {this.props.lettersCount} letters </span>
                <span> {this.props.lang === 'hebrew'? 'Hebrew': 'English'}</span>
                <CheckboxInput
                    propKey='showKeyboard'
                    src={keyboard}
                    change={this.showKeyboard}
                />

                {this.state.showKeyboard && <Keyboard {...this.props}/>}
            </footer>
        )
    }
    
}