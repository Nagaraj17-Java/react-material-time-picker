import {useTheme} from "../../ThemeContext.js";
import {useEffect, useState} from "react";
import './input.scss'

const Input = (props) => {
    const [ colors,] = useTheme()
    const styles = {
        default: {
            backgroundColor: colors.surfaceVariant,
            outline: 'none'
        },
        warning: {
            border: `2px solid ${colors.error}`,
            backgroundColor: colors.errorContainer
        },
        focused: {
            border: `2px solid ${colors.primary}`,
            backgroundColor: colors.primaryContainer,
        }
    };
    const [ currentStyle, setCurrentStyle ] = useState(styles.default);

    useEffect(()=>{
        if(typeof props.error !== 'undefined' ){
            if( props.error === true) setCurrentStyle(styles.warning)
            else setCurrentStyle(styles.default)
        }
    },[props.error])

    function handleFocusOut(e) {
        setCurrentStyle(styles.default)
        props.onBlur(e)
    }
    return (
        <input value={ props.value }
               onChange={ props.onChange }
               onBlur={ handleFocusOut }
               onClick={ props.onClick }
               max={ props.max || '' }
               min={ props.min || '' }
               className={ props.className }
               type={ props.type || '' }
               placeholder={ props.placeholder || '' }
               onFocus={() => setCurrentStyle(styles.focused)}
               style={ currentStyle }
        />
    );
};

export {Input}