import exportFromJSON from 'export-from-json'
import LoadFile from './load-file';

import styles from '../styles/header-line.module.css'
import open from '../icons/open.svg'
import save from '../icons/save.svg'


export default function HeaderLine (props) {
    

    const exportType =  exportFromJSON.types.json;

    return (
        <h1 className={styles.headerLine}>
            <span>Text Editor</span>
            <div className={styles.fileButtons}>
                <input 
                    className={styles.inputText}
                    type="text" 
                    value={props.details.name} 
                    onInput={event => props.setName(event.target.value)}
                />
                <button 
                    onClick={() => exportFromJSON({data: props.details, fileName: props.details.name, exportType})}
                    className={styles.button}
                >
                    <img src={save} alt="save" />
                </button>
                <LoadFile open={props.open} src={open} />
            </div>
        </h1>
    )
}