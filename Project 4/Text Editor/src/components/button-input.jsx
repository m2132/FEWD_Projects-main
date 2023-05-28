import input from '../styles/input.module.css'

export default function ButtonInput (props) {
    return <img 
                tabIndex={0}
                src={props.src} 
                className={input.icon} 
                onClick={event => {props.change(props.propKey, props.value); event.target.blur()}}
            />
}
