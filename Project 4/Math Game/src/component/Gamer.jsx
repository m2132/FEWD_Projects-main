import ChangeNumberButtons from "./change-number-buttons"
import WhatsNext from "./whats-next"



export default function Gamer (props) {

    return (
        <div className="gamer">
            <h4>{props.name}</h4>
            <span>{props.isEnable? '▶': '⏸'}</span>
            <p className="number">{props.number}</p>
            <p>Steps: {props.steps}</p>
            {
                props.number === 100
                ? <WhatsNext removeGamer={props.removeGamer} newGame={props.newGame}/>
                : <ChangeNumberButtons changeNumber={props.changeNumber} isEnable={props.isEnable}/>
            }
            <p>Score: {props.score}</p>
            <p>History: {props.history.map(s => <span>#{s} </span>)}</p>
        </div>
    )
}