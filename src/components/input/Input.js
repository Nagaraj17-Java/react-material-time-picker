import {useTheme} from "../../ThemeContext.js";
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
            color:colors.onPrimaryContainer,
            border: `2px solid ${colors.primary}`
        }
    };


    // useEffect(()=>{
    //     if(!!props.active) {
    //         if(props.error){
    //             setCurrentStyle(styles.warning);
    //         }else{
    //             setCurrentStyle(styles.focused)
    //         }
    //     }else{
    //         setCurrentStyle(styles.default);
    //     }
    // },[props.active, props.error,props.warning,setCurrentStyle, styles])

    const currentStyle = props.active ? (props.error ? styles.warning : styles.focused) : styles.default;

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