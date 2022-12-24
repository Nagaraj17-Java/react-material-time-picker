import {Input} from "../input/Input.js";
import './digital-clock.scss';
import {useState} from "react";
import {decode,normalize} from "../../utilities.js";

export default function DigitalClock( props ) {

    const [ msg,setMsg ] = useState('');
    const dayMode = props.dayMode;

    function resetWarnings(e) {
        const elementClasses = e.target.classList;
        elementClasses.remove('warning-style');
        setMsg('')
    }

    function handleTimeChange(e,mode) {

        const elementClasses = e.target.classList;
        elementClasses.remove('warning-style');

        if( isNaN( e.target.value) ) {

            setMsg( 'Entered value can be only a number.');
            elementClasses.add('warning-style');
        }
        if( mode === 'hours') {

            const minutesVal = decode( props.time || 0).minute;
            const maxHour = (dayMode === 'pm' ? 23 : 11);

            if ( e.target.value > maxHour ) {
                setMsg(`Hours has to be less than ${ dayMode === 'pm' ? 24 : 12 } in ${ dayMode.toUpperCase() } mode.`)
                elementClasses.add('warning-style');
            }

            const val = normalize( Math.min( parseInt(e.target.value), maxHour ) )
            props.onChange(`${ val }${ minutesVal }`)

        } else {
            const maxMinutes = 59;
            if (e.target.value > maxMinutes) {
                setMsg('Minutes cant be greater than 60!')
                elementClasses.add('warning-style');
            }

            const minutesVal = normalize( Math.min( parseInt(e.target.value), maxMinutes ) )
            props.onChange(`${ decode( props.time || 0).hour}${ minutesVal }`)

        }
    }

    function handleDayModeChange() {

        let time = decode( props.time);
        let hourValue = Number(time.hour);
        if( dayMode === 'am' ){

            hourValue = hourValue === 12 ? 12 : normalize(hourValue + 12)
            props.setDayMode('pm');
        }else if( dayMode === 'pm'){

            hourValue = normalize(hourValue % 12);
            props.setDayMode('am')
        }
        props.onChange( `${ hourValue }${ time.minute }` )
    }

    return (<><div id='digital-clock-component'>
            <div className= 'inps-container'>
                <Input value={ decode( props.time || 0).hour }
                       onChange={ e => handleTimeChange( e,'hours' ) }
                       onClick={ ()=>props.setMode( 'hours' ) }
                       className={ props.className }
                       onBlur={ resetWarnings }
                />
                <div className='labels'>
                    { props.label1 || 'Hours' }
                </div>
            </div>
            :
            <div
                style={{backgroundColor:props.primary}}
                className= 'inps-container'>
                <Input value={ decode( props.time || 0).minute }
                       onChange={ e => handleTimeChange( e,'minutes') }
                       onClick={ ()=>props.setMode( 'minutes' ) }
                       className={ props.className }
                       onBlur={ resetWarnings }
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
