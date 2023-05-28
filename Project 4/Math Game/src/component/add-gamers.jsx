export default function AddGamers (props) {

    const addGamer = () => {
        let name = window.prompt('Enter your name');
        if (name === null) return;
        props.addGamer(name || 'anonymous');
    }

    return (
        <div className="add-gamers">
            <button onClick={addGamer} disabled={props.didGameStart}>Add Gamer</button>
            <button onClick={props.startGames} disabled={props.didGameStart || !props.hasUsers}>Start Games</button>
        </div>
    )
}