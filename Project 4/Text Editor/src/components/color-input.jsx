import React from 'react'

export default class ColorInput extends React.Component {
    constructor (props) {
        super(props);
        this.state = {color: props.initColor}
        this.label = null;
        this.input = null;
    }

    render () {
        return (
            <div style={{position: 'relative'}}>
                <img src={this.props.src} height='40px' onClick={() => this.input.click()} />

                <label className='color-label' style={{background: this.state.color}} ref={element => this.label = element} >
                    <input 
                        ref={element => this.input = element} 
                        type="color" 
                        onInput={event => {
                            this.props.change(this.props.propKey, event.target.value);
                            this.setState({color: event.target.value})
                        }}
                    />
                </label>
            </div>
        )
    }
}