import Input from "../input/Input.js";
import './digital-clock.scss';
import {useEffect, useRef, useState} from "react";
import {decode,normalize} from "../../utilities.js";

export default function DigitalClock( props ) {

    const hours = useRef();
    const minutes = useRef();
    const [ msg,setMsg ] = useState('');
    const dayMode = props.dayMode;

    function handleTimeChange(){

    }
    function handleTimeChange( e,mode ) {

        const max_chars = 2;
        const elementClasses = e.target.classList;
        console.log('ss',Number(e.target.value.length))
        const value = Number(e.target.value.length) > max_chars
            ? parseInt(e.target.value.substr(0,max_chars))
            : parseInt(e.target.value);

        elementClasses.remove('warning-style');
        setMsg('');

        if( isNaN( value )) {

            setMsg( 'Entered value can be only a number.');
            elementClasses.add('warning-style');
            return;
        }
        if( mode === 'hours') {

            if( (dayMode === 'pm' && value > 24) || (dayMode === 'am' && value >12 )) {
                elementClasses.add('warning-style');
                setMsg(' Time value is not correct! ')
                return;
            }
            hours.current = ( normalize( value ));
            props.onChange(`${ hours.current }${ minutes.current }`)

        } else {

            if( value >= 60 ){

                setMsg('Minutes cant be greater than 60!')
                elementClasses.add('warning-style');
                return;
            }
            minutes.current = ( normalize( value ) )
            props.onChange(`${ hours.current }${ minutes.current }`)
        }
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
