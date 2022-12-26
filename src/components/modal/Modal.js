import './modal.scss'
import {useTheme} from "../../ThemeContext.js";

function Modal( props ) {
    const [colors,]=useTheme();
    const style = {
        background : colors.surface3,
        zIndex:`${ props.zIndex || 1002}`,
        color : colors.onSurface
    }
    return (
        props.show ? (
            <div className='modal-component'>
                <div
                    className='scrim'
                    onClick={ props.hide }
                    style={{ zIndex:`${ props.zIndex || 1002}` }}

                />
                <div
                    id='modal-container'
                    style={{...style}}
                    // style={{  }}
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
//todo add z-index props.