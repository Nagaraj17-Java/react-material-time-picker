import {useTheme} from "../../ThemeContext.js";

const Input = (props) => {
    const [ colors,setTheme,setColors] = useTheme()
    console.log(colors)
    return (
        <input value={ props.value }
               onChange={ props.onChange }
               onBlur={props.onBlur}
               onClick={ props.onClick }
               max={ props.max || '' }
               min={ props.min || '' }
               className={ props.classes }
               type={ props.type || '' }
               placeholder={ props.placeholder || '' }
               style={{ backgroundColor: colors.surfaceVariant,
                        color: colors.onSurfaceVariant
                }}
        />
    );
};

export {Input}