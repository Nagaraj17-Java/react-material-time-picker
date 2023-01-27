import './modal.scss'
import {useTheme} from "../../ThemeContext.js";
import React from "react";

function Modal( props ) {
    const [colors]=useTheme();
    const internalStyle = {
        background : colors.surface3,
        zIndex:`${ props.zIndex+1 || 1002}`,
        color : colors.onSurface,
        width: props.width+'px',
        top:(props.top || '10%'),
        fontFamily: 'Roboto,-apple-system, Ubuntu, sans-serif',
    }
    return (
        props.show ? (
            <div className='modal-component'>
                <div
                    className='scrim'
                    onClick={ props.hide }
                    style={{ zIndex:`${ props.zIndex || 1001}`,
                            backgroundColor:`${colors.scrim}`
                    }}

                />
                <div id='modal-container'
                     style={{...internalStyle,...props.style}}
                >
                    { props.children }

                </div>
            </div>
        ) : (
         ''
        )
    );
}
export { Modal };
