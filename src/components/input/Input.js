import {useTheme} from "../../ThemeContext.js";
import {useEffect, useState} from "react";
import './input.scss'

const Input = (props) => {
    const [ colors ] = useTheme()
    const styles = {
        default: {
            backgroundColor: colors.surfaceVariant,
            outline: 'none',
            color:colors.onSurface
        },
        warning: {
            border: `2px solid ${colors.error}`,
            backgroundColor: colors.errorContainer
        },
        focused: {
            backgroundColor: colors.primaryContainer,
            color:colors.onPrimaryContainer
        }
    };
    const [ currentStyle, setCurrentStyle ] = useState(styles.default);

    useEffect(()=>{
        if(typeof props.error !== 'undefined' ){
            if( props.error === true) setCurrentStyle( styles.warning )
        }
    },[props.error])

    useEffect(()=>{
        if( props.active === true ) {
            setCurrentStyle( styles.focused )

        }else if( props.active === false ){
            setCurrentStyle( styles.default )

        }
    },[ props.active,colors ])

    return (
        <input value={ props.value }
               onChange={ props.onChange }
               onBlur={ props.onBlur }
               onClick={ props.onClick }
               max={ props.max || '' }
               min={ props.min || '' }
               className={ props.className }
               type={ props.type || '' }
               placeholder={ props.placeholder || '' }
               style={ currentStyle }
        />
    );
};

export {Input}