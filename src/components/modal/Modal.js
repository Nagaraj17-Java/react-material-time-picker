import './modal.scss'
import {useTheme} from "../../ThemeContext.js";

function Modal( props ) {
    const [colors]=useTheme();
    return (
        props.show ? (
            <div className='modal-component' >
                <div
                    className='scrim'
                    onClick={ props.hide }
                    style={{ zIndex:`${ props.zIndex || 1001}` }}

                />
                <div
                    id='modal-container'
                    style={{ background : colors.surface3,
                             zIndex:`${ props.zIndex+1 || 1002}`,
                             color : colors.onSurface
                    }}
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
