import ColorInput from "./color-input"
import RadioInput from "./radio-input"
import CheckboxInput from "./checkbox-input"
import ButtonInput from "./button-input"

import alignCenter from '../icons/align-center.png'
import alignLeft from '../icons/align-left.svg'
import alignRight from '../icons/align-right.png'
import alignJustify from '../icons/align-justify.png'

import generalBg from '../icons/general-bg.png'

import textColor from '../icons/text-color.png'
import textBg from '../icons/text-bg.png'

import bold from '../icons/bold.png'
import italic from '../icons/italic.png'
import underline from '../icons/underline.png'

import fontMinus from '../icons/font-minus.png'
import fontPlus from '../icons/font-plus.svg'

import '../styles/inputs.css'

export default function ToolBar(props) {
    return (
        <div className="tool-bar">
            <div className="general">
                <RadioInput
                    propKey='textAlign'
                    options={['left', 'center', 'right', 'justify']}
                    srcs={[alignLeft, alignCenter, alignRight, alignJustify]}
                    change={props.changeGeneral}
                />

                <ColorInput
                    propKey='background'
                    src={generalBg}
                    change={props.changeGeneral}
                    initColor='white'
                />

            </div>
            <div>
                <ButtonInput 
                    propKey='fontSize'
                    value={n => n - 5}
                    change={props.changeSelected}
                    src={fontMinus}
                />

                <ButtonInput 
                    propKey='fontSize'
                    value={n => n + 5}
                    change={props.changeSelected}
                    src={fontPlus}
                />


                <CheckboxInput
                    propKey='isBold'
                    src={bold}
                    change={props.changeSelected}
                />

                <CheckboxInput
                    propKey='isItalic'
                    src={italic}
                    change={props.changeSelected}
                />

                <CheckboxInput
                    propKey='hasUnderline'
                    src={underline}
                    change={props.changeSelected}
                />

                <ColorInput
                    propKey='color'
                    src={textColor}
                    change={props.changeSelected}
                    initColor='black'
                />

                <ColorInput
                    propKey='background'
                    src={textBg}
                    change={props.changeSelected}
                    initColor='white'
                />

            </div>
        </div>
    )
}

