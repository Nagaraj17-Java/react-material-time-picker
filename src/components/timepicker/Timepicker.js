import React ,{useEffect, useState} from "react";
import './timepicker.scss'
import {Modal} from "../modal/Modal.js";
import {ReactComponent as ClockIcon} from "./clock.svg";
import {ReactComponent as KeyBoardIcon} from "./keyboard.svg";
import DigitalClock from "../digital-clock/Digital-clock.js";
import AnalogClock from "../analog-clock/Analog-clock.js";
import {ThemeProvider, useTheme} from "../../ThemeContext.js";
import Button from "../button/Button.js";

const TimePicker = props=>(<ThemeProvider><ActualTimePicker {...props} /></ThemeProvider>)

function ActualTimePicker( props ) {

    const [ time,setTime ]= useState('0000');
    const [ mode,setMode ]= useState('hours');
    const [ clockDisplay,setClockDisplay ] = useState(false);
    const [ dayMode,setDayMode ]= useState('am');
    const [ colors , setTheme, setColors ] = useTheme()


    useEffect(()=>{
        if( typeof props.colors !== "undefined"){
            setColors (props.colors)
            setTheme('light');
        }

    },[ props.colors ])

    useEffect(()=>{
        if( typeof props.theme !== "undefined") setTheme( props.theme )

    },[ props.theme ])

    useEffect(()=>{
        if( typeof time !== 'undefined'){
            props.onChange( time  )
        }

    },[ time ])

    useEffect( ()=>{

        if( typeof props.defaultValue !== "undefined") setTime( props.defaultValue )
    },[ props.defaultValue ])

    return (
            <div className='time-picker-component' >
                    <Modal show={ props.show }
                           hide={ props.hide }
                           zIndex ={ props.zIndex || 1002 }
                           width={ props.width }
                    >
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
                        { clockDisplay === true
                            ? <AnalogClock time={time}
                                     dayMode={ dayMode }
                                     onChange={ setTime }
                                     mode={ mode }
                            />
                            : ''
                        }
                        <div className='footer'
                             style={{ fill:`${ colors.onSurfaceVariant }`}}
                        >
                            { clockDisplay === false
                                ? <ClockIcon onClick={ ()=> setClockDisplay(true) }/>
                                : <KeyBoardIcon onClick={ ()=> setClockDisplay(false)}/>
                            }
                            { props.buttons.map(x=>
                                <Button type='text'
                                        click={ x.onClick }
                                >
                                    { x.label }
                                </Button>
                            ) }
                        </div>
                    </Modal>
            </div>
    )
}

export default TimePicker;