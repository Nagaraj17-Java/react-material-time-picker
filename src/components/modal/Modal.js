import './modal.scss'
function Modal( props ) {

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
                    style={{ zIndex:`${ props.zIndex || 1002}` }}
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