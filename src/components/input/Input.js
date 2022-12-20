import {useEffect, useRef, useState} from "react";

export default function Input(props) {

    const [ inp,setInp ] = useState('');
    const value = useRef('');

    function handleChange(e) {
        const val= e.target.value;
        value.current = value.current + val;
    }

    useEffect(()=>{

        let inpVal;
        if( typeof props.value === 'undefined' ) {
            inpVal = props.initialValue || '';
        } else {
            inpVal = props.value;
        }
        setInp(<input value={ inpVal }
                      className={ props.className || ''}
                      type={ props.type || '' }
                      placeholder={ props.placeholder || '' }
                      onChange={ handleChange }
                      onBlur={ ()=>props.onChange( value.current ) }
                      onClick={ props.onClick }
                      max={ props.max || '' }
                      min={ props.min || '' }
        />)

    },[ props.initialValue,props.value,props.className ])

    return (<>
        { inp }
    </>)
}