import {Input} from "../input/Input2.js";
import './digital-clock.scss';
import {useEffect, useRef, useState} from "react";
import {decode,normalize} from "../../utilities.js";

export default function DigitalClock( props ) {

    const hours = useRef();
    const minutes = useRef();
    const [ msg,setMsg ] = useState('');
    const dayMode = props.dayMode;

    function checkValue(inputValue) {

    }
    function handleTimeChange(e,mode) {
        console.log(e.target.value)
    }


    function handleDayModeChange() {

        let value = parseInt( hours.current );
        if( dayMode === 'am' ){

            value = value === 12 ? 12 : normalize(value + 12)
            props.setDayMode('pm');
        }else if( dayMode === 'pm'){

            value = normalize(value % 12);
            props.setDayMode('am')
        }
        props.onChange( `${ value }${ minutes.current }` )
    }
    useEffect( ()=>{

        if ( typeof props.time !== 'undefined'){

            let time = decode( props.time );
            hours.current =  time.hour;
            minutes.current = time.minute;
        }

    },[ props.time ])


    return (<><div id='digital-clock-component'>
            <div className= 'inps-container'>
                <Input value={ decode( props.time || 0).hour }
                       onChange={ e => handleTimeChange( e,'hours' ) }
                       onBlur={ value => checkValue( value ) }
                       onClick={ ()=> props.setMode( 'hours' )}
                       className={ props.className }
                       // max={ dayMode === 'pm' ? 24 : 12 }
                       // min={ dayMode === 'pm' ? 12 : 0 }
                />
                <div className='labels'>
                    { props.label1 || 'Hours' }
                </div>
            </div>
            :
            <div className= 'inps-container'>
                <Input value={ decode( props.time || 0).minute }
                       onChange={ e => handleTimeChange( e,'minutes') }
                       onClick={ ()=>props.setMode( 'minutes' ) }
                       className={ props.className }
                       // max={ 60 }
                       // min={ 0 }
                />
                <div className='labels'>
                    { props.label2 || 'Minutes' }
                </div>
            </div>
            <div className='switch'>
                <div className={ props.dayMode === 'am'
                    ? 'active up'
                    : 'up'
                }
                     onClick={ handleDayModeChange }
                >
                    AM
                </div>
                <div className={ props.dayMode === 'pm'
                    ? 'active down'
                    : 'down'
                }
                     onClick={ handleDayModeChange }
                >
                    PM
                </div>
            </div>
        </div>
    <div className='msg'>{ msg }</div>
    </>)
}
