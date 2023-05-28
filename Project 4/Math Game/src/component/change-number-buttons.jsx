export default function ChangeNumberButtons (props) {
    return (
        <div className="change-number-buttons">
            <button onClick={() => props.changeNumber(n => n + 1)} disabled={!props.isEnable}>+1</button>
            <button onClick={() => props.changeNumber(n => n - 1)} disabled={!props.isEnable}>-1</button>
            <button onClick={() => props.changeNumber(n => n * 2)} disabled={!props.isEnable}>*2</button>
            <button onClick={() => props.changeNumber(n => n / 2)} disabled={!props.isEnable}>/2</button>
        </div>
    )
}