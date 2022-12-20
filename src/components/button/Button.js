import './button.scss'

export default function Button(props) {
    const handleClick =(e)=>{
        e.stopPropagation();
        props.click();
    }
    return <div className='buttons'>
        <button className = { typeof props.size !== 'undefined'
                ? props.type+' btn '+props.size
                : props.type+' btn'
            }
                onClick = { handleClick }>
            {props.children}
        </button>
    </div>
}


