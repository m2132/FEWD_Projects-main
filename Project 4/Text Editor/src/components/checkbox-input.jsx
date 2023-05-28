export default function CheckboxInput (props) {
    return (
        <div>
            <input type="checkbox" id={props.propKey} onChange={event => props.change(props.propKey, event.target.checked)}/>
            <label htmlFor={props.propKey}>
                <img src={props.src} height='40px' />
            </label>
        </div>
    )
}