import {useEffect, useState} from "react";
import './timepicker.scss'
import {Modal} from "../modal/Modal.js";
import {ReactComponent as ClockIcon} from "./clock.svg";
import {ReactComponent as KeyBoardIcon} from "./keyboard.svg";
import DigitalClock from "../digital-clock/Digital-clock.js";
export default function TimePicker( props ) {

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
            <DigitalClock mode={ mode }
                          time={ time }
                          onChange={ setTime }
                          setMode={ setMode }
                          dayMode={ dayMode }
                          setDayMode={ setDayMode }
            />

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