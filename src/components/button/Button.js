import './button.scss'
import {useTheme} from "../../ThemeContext.js";
import {useEffect, useRef, useState} from "react";
import {hexToRGB} from '../../utilities.js'

export default function Button(props) {
    const [ colors ] =useTheme();
    const [ state, setState ] = useState('default');
    let button = useRef();
    function formatColor(color) {
        if(typeof color === "string") {
            if(color.startsWith('#')) return hexToRGB(color)
            else return color;
        }
    }


    const styles = {
        outline : {
            border: `2px solid ${ colors.outline }`,
            color : colors.primary
        },
        filled : {
            color : colors.onPrimary,
            backgroundColor: colors.primary,
            border: 'none',
        },
        text : {
            default:{
                color : colors.primary,
                backgroundColor: 'transparent',

            },

            hovered:{
                color : colors.primary,
                backgroundColor:`rgba(${ formatColor(colors.primary) }, .08)` ,
            },
            activated: {
                color : colors.primary,
                backgroundColor:`rgba(${ formatColor(colors.primary) }, .12)` ,
            }
        }
    }
    let buttonStyle = {...styles[ props.type ][state]};

    const handleClick =(e)=>{
        e.stopPropagation();
        props.click();
    }
    return <div className='buttons'>
        <button ref={button} className = { typeof props.size !== 'undefined'
                    ? props.type+' btn '+props.size
                    : props.type+' btn'
                }
                onClick = { handleClick }
                style={ buttonStyle }
                onMouseEnter={()=>setState('hovered')}
                onMouseLeave={()=>setState('default')}
                onMouseDown={()=>setState('activated')}
        >
            { props.children }
        </button>
        <div></div>
    </div>
}


