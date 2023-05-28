import React from 'react'

import styles from '../styles/header-line.module.css'

class LoadFile extends React.Component {

    constructor (props) {
        super(props);
        this.input = null;
    }
    
    openFile = file => {
        const fr = new FileReader();
        fr.onload = event => {
                this.props.open(JSON.parse(event.target.result))
        }
        fr.readAsText(file);
    }

    render () {
        return (
        <div className={styles.fileInput}>
            <input
                ref={el => this.input = el}
                style={{display: 'none'}}
                type="file"
                onChange={event => this.openFile(event.target.files[0])}
                onError={err => console.log(err)}
                accepts={['.json']}
            />
            <img src={this.props.src} alt="save" onClick={() => this.input.click() }/>
        </div>
        )
    }
    
}

export default LoadFile