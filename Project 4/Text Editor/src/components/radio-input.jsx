// <RadioInput propKey='textAlign' options={['left', 'center', 'right', 'justify'] srcs={['.jpg',]} change=}
import input from '../styles/input.module.css'

export default function RadioInput (props) {
    return (
        <div>
            {props.options.map((option, i) => (
                <span key={i}>
                    <input 
                        type="radio" 
                        name={props.propKey} 
                        id={`${props.propKey}-${i}`}
                        onChange={() => props.change(props.propKey, option)} 
                        style={{display: 'none'}}
                    />
                    <label 
                        htmlFor={`${props.propKey}-${i}`}
                    >
                        <img src={props.srcs[i]} height='40px'/>
                    </label>
                </span>
            ))}
        </div>
    )
}