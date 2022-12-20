import {useEffect, useState} from "react";
import './timePicker.scss'
import {Modal} from "../modal/Modal.js";
import {ReactComponent as ClockIcon} from "../../scss/icons/clock.svg";
import {ReactComponent as KeyBoardIcon} from "../../scss/icons/keyboard.svg";

export default function TimePicker2( props ) {

    const [ time,setTime ]= useState();
    const [ mode,setMode ]= useState('hours');
    const [ clockDisplay,setClockDisplay ] = useState(false);
    const [ dayMode,setDayMode ]= useState('am');

    useEffect(()=>{
        if( typeof time !== 'undefined'){
            props.onChange( time  )
        }

    },[ time ])


    useEffect( ()=>{

        if( typeof props.defaultValue !== "undefined") setTime( props.defaultValue )
    },[ props.defaultValue ])

    return (<div className='time-picker-component'>

        <Modal show={ props.show } hide={ props.hide }>
            <span className='title labels'>
                { props.title || 'Enter time' }
            </span>

            <div className='footer'>
                { clockDisplay === false
                    ? <ClockIcon onClick={ ()=> setClockDisplay(true) }/>
                    : <KeyBoardIcon onClick={ ()=> setClockDisplay(false)}/>
                }
                { props.buttons }
            </div>
        </Modal>


    </div>)
}