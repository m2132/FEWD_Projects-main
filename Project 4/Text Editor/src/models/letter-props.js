export default class LetterPorps {
    constructor(color = 'black',
        background = 'transparent',
        fontSize = 12,
        isItalic = false,
        hasUnderline = false,
        isBold = false,
    ) {
        this.color = color;
        this.background = background;
        this.fontSize = fontSize;
        this.isItalic = isItalic;
        this.hasUnderline = hasUnderline;
        this.isBold = isBold;
    }
}