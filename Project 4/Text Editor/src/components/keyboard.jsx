export const ranges = {    
    upperCase: [65, 26],
    lowerCase: [97, 26],
    hebrew: [0x05D0, 27],
}

export const langs = Object.keys(ranges);

export default function Keyboard (props) {
    const [start, num] = ranges[props.lang];

    return <div id='keyboard'>
        <div>
            {Array(10).fill(null).map((_, i) => 
                <button onClick={() => props.addLetter(i)} key={i}>{i}</button>      
            )}
        </div>
        <div dir={props.lang === 'hebrew'? 'rtl': 'ltr'}>
            {Array(num).fill(null).map((_, i) => {
                const letter = String.fromCharCode(start + i);
                return <>
                    <button onClick={() => props.addLetter(letter)} key={letter}>{letter}</button>
                    {(i + 1) % 10 === 0 && <br />}
                </>
            })}
        </div>

        <div>
            <button onClick={() => props.removeLetter()}>Backspace</button>
            <button onClick={() => props.addLetter(<br />)}>Enter</button>
            <button onClick={() => props.addLetter(' ')}>Space</button>

            <button onClick={() => props.changeGeneral('lang', langs[(langs.indexOf(props.lang) + 1) % langs.length ])} >lang</button>
        </div>
    </div>
}

