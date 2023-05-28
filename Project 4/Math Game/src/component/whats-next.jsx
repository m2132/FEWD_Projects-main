export default function WhatsNext (props) {
    return (
        <div className="what-next">
            <button  onClick={props.newGame}>NEW GAME</button>
            <button  onClick={props.removeGamer}>Exit</button>
        </div>
    )
}