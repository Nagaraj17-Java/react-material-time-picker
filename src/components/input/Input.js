import {useEffect, useState} from "react";

const Input = (props) => {
    const [ classes,setClasses ] = useState('')

    useEffect(()=>{
        setClasses(props.className)
    },[props.className,props.value])

    return (
        <input value={props.value}
               onChange={props.onChange}
               onClick={ props.onClick }
               max={ props.max || '' }
               min={ props.min || '' }
               className={ classes }
               type={ props.type || '' }
               placeholder={ props.placeholder || '' }
        />
    );
};

export {Input}