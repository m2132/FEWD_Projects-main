import Letter from "./letter"
import '../styles/document.css'
import cursor from '../icons/cursor.svg'

export default function Document (props) {

    return (
        <div id="document">
        <p  
            dir={props.dir}
            tabIndex={0}
            style={{textAlign: props.textAlign, background: props.bg}} 
            onKeyDown={
                event => {
                   switch(event.key) {
                    case 'Enter': props.addLetter(<br />); break;
                    case 'Backspace': props.removeLetter(); break;
                    default: if (event.key.length > 1) return; props.addLetter(event.key); break;
                   }
                }}
            > 
            {props.text.map((l, i) => <Letter {...l} key={i} index={i}/>)}
        </p>
        </div>
    )
}

