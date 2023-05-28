export default function Letter (props) {
    return (
        <span
            data-index={props.index}
            style={{
                color: props.color,
                background: props.background,
                fontSize: props.fontSize,
                fontWeight: 200 + props.isBold * 600,
                fontStyle: props.isItalic? 'italic': 'normal',
                textDecoration: props.hasUnderline? 'underline': 'none',
            }}
        >{props.text}</span>
    );
}
