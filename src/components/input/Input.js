import {useTheme} from "../../ThemeContext.js";
import {useState} from "react";


const Input = (props) => {
    const [ colors,setTheme,setColors] = useTheme()
    const [focused, setFocused] = useState(false)

    function handleFocus(e) {
        setFocused(false)
        props.onBlur(e)
    }
    return (
        <input value={ props.value }
               onChange={ props.onChange }
               onBlur={handleFocus}
               onClick={ props.onClick }
               max={ props.max || '' }
               min={ props.min || '' }
               className={ props.classes }
               type={ props.type || '' }
               placeholder={ props.placeholder || '' }
               onFocus={() => setFocused(true)}
               style={{ backgroundColor: colors.surfaceVariant,
                        color: colors.onSurfaceVariant,
                        border: focused ? `2px solid ${colors.primary}` : "none"
                }}

        />
    );
};

export {Input}