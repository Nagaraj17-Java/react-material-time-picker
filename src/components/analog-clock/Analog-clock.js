import {useEffect, useMemo, useRef, useState} from "react";
import {Clock} from "./Clock.js";
import {decode,normalize} from "../../utilities.js";
import"./analog-clock.scss"
import {useTheme} from "../../ThemeContext.js";
// import {angelToPos,getAngel,radToDegree} from "./analogClockHandy.js";

export default function AnalogClock(props) {

    const clockFace = useRef();
    const hand = useRef();
    let animationId = 0;
    const clockPos = clockFace.current?.getBoundingClientRect() || { left:0, top:0 };
    const pointerFace = useRef();
    const hoursClockFace = useMemo(()=>{ return new Clock()},[]);
    const minutesClockFace = useMemo(()=>{ return new Clock()},[]);
    const [ hoursDigits, setHoursDigits ] = useState([]);
    const [ minutesDigits, setMinutesDigits ] = useState([]);
    const [ hoursPointerDigit,setHoursPointerDigit ] = useState(  0);
    const [ minutesPointerDigit,setMinutesPointerDigit ] = useState(  0);
    const [ radius,setRadius ] = useState(128);
    const pageIsLoaded = useRef(false);
    const [ colors ] = useTheme();
    const digits = props.mode === 'hours' ? hoursDigits : minutesDigits;
    const pointer = props.mode === 'hours' ? hoursPointerDigit :minutesPointerDigit;
    const setPointer = props.mode === 'hours' ? setHoursPointerDigit : setMinutesPointerDigit;
    let clock = props.mode === 'hours' ? hoursClockFace : minutesClockFace;

    function handleAnimatedRelocation( destIdx ) {

        const start = props.mode === 'hours' ? pointer%12 : pointer;
        const path = shortestPath( start , destIdx );
        console.log(path)
        const waitTime = 300/path.length

        function wait(ms) {
            return new Promise(resolve => setTimeout(resolve , ms))
        }

        async function loop(counter) {
            if(counter >= path.length){
                setPointer( destIdx );
                return;
            }
            await relocatePointerByIndex(path[ counter ].value);
            await wait(waitTime);
            requestAnimationFrame(()=>{ loop(counter+1)})
        }
        loop(0);

    }

    function shortestPath( start,dest ) {
        let path;
        let difference = dest - start;
        let distance,fullClock;

        if(props.mode === 'minutes') {
            fullClock = 60;
        }else{
            fullClock = 12;
        }

        if( ( difference > 0 && difference < fullClock/2 ) || fullClock - start + dest <= fullClock/2) {

            distance = difference > 0 ? difference : fullClock - start + dest;
            path = clock.goClockwise( start, distance )
        } else {

            distance = Math.abs (dest - start) >= fullClock/2 ? fullClock - dest+ start : start - dest;
            path = clock.goCounterClockwise( start, distance )
        }

        return path;
    }

    function drawClock (radius,offset) {

        hoursClockFace.draw( radius , 12);
        minutesClockFace.draw( radius , 60);

        setHoursDigits( hoursClockFace.getDigits() );
        setMinutesDigits( minutesClockFace.getDigits() );

        const clockFaceElement = document.getElementById('digits-clockFace');
        const pointerElement = document.getElementById('pointer');

        pointerElement.style.width = offset * 3+'px';
        pointerElement.style.height = offset * 3+'px';

        pointerElement.style.top = radius - offset+'px';
        pointerElement.style.left = radius - offset+'px';

        clockFaceElement.style.transform = 'translate('+radius+'px,'+radius+'px)'

    }

    function radToDegree (rad) {

        return  rad *180 /Math.PI;
    }

    function getAngel (x,y) {

        const rad = Math.atan2( y,x );
        return Math.round(rad * 100 )/ 100
    }

    function getAngelByIndex ( idx ) {

        const numberOfUnits = props.mode === 'hours' ? 12 : 60;

        if ( idx >= 0 && idx < numberOfUnits ){
            return getAngel( digits[idx].placement.x, digits[idx].placement.y);
        }
    }

    function handleDrag (e) {

        let mousePos;
        let angel = getAngelByIndex( pointer) //the last position of the hand clock

        function handleRelease() {

            window.removeEventListener('mousemove',startAnimation);
            window.removeEventListener('mouseup',handleRelease);

            let closestDigit = clock.getTheClosestDigit(angel);
            setPointer( closestDigit );
            setGlobalTime( closestDigit )
            relocatePointerByIndex( closestDigit )
        }

        function startAnimation(e){

            if( animationId ) cancelAnimationFrame( animationId );
            animationId = requestAnimationFrame(() => trackMouse(e));
        }

        function trackMouse (e) {
            mousePos = getPosFromClockCenter( e.clientX,e.clientY );
            angel = getAngel( mousePos.x,mousePos.y );

            relocatePointerByAngel( angel,null, clock.getTheClosestDigit(angel) )
        }
        e.preventDefault();
        window.addEventListener( "mousemove", startAnimation );
        window.addEventListener( 'mouseup', handleRelease );

    }

    function getPosFromClockCenter( xPosFromDoc,yPosFromDoc ) {

        let posFromParent={};

        posFromParent.x = xPosFromDoc - clockPos.left - radius;
        posFromParent.y = yPosFromDoc - clockPos.top - radius;

        return posFromParent;
    }

    function angelToPos ( radian ) {

        return {
            x: Math.round( Math.cos( radian )* radius),
            y: Math.round( Math.sin( radian )* radius)
        }
    }

    function relocatePointerByAngel( angel,pointPlacement=null,value=null ) {

        const degree = radToDegree( angel );
        if( pointPlacement === null ) pointPlacement = angelToPos( angel,radius );
        if( value === null) value = pointer;

        pointerFace.current.style.transform = "translate("+ pointPlacement.x+"px,"+ pointPlacement.y+"px)";
        pointerFace.current.innerHTML = props.mode === 'hours'
            ? value === 0 ? 12 : value
            : value;

        hand.current.style.transform = "rotate("+degree+"deg)"
    }

    function relocatePointerByIndex( idx ) {

        if( digits.length === 0) return;
        let point = digits[ idx ].placement;
        const rad = clock.angel( idx );
        relocatePointerByAngel( rad,point,idx )
    }

    function handleAutoRelocate( index ) {

        handleAnimatedRelocation( index );
        setGlobalTime( index );
    }

    function setGlobalTime( newTime ) {

        let time = decode( props.time );
        ( props.mode === 'hours'
                ? props.onChange( `${ props.dayMode === 'pm' 
                        ? parseInt( newTime ) +12 
                        : normalize( newTime ) }${ time.minute }`)
                : props.onChange( `${ time.hour }${ normalize( newTime ) }`)
        )
    }

    function getGlobalTime( mode ) {

        const time = decode( props.time );
        return mode === 'hours'
            ? parseInt( time.hour%12 )
            : parseInt( time.minute );
    }

    useEffect(()=>{

        if( typeof props.time !== 'undefined' && digits.length >0 ) {

            const digit = getGlobalTime( props.mode )
            if( digit !== pointer ){
                handleAnimatedRelocation( digit );
            }
        }
    },[ props.time,props.mode ])

    useEffect(()=>{

        if( typeof clockFace.current !== 'undefined') {

            const diameter = clockFace.current?.getBoundingClientRect().width;
            const offset = parseFloat( window.getComputedStyle( clockFace.current, null ).getPropertyValue('font-size' ));
            const radius = Math.round(diameter- offset - 2*offset/( diameter/4 ))/2;
            setRadius( radius );
            drawClock( radius, offset);
        }
    },[ clockFace ])

    useEffect(()=>{

        if( digits.length > 0 && pageIsLoaded.current === false ) {

            relocatePointerByIndex( getGlobalTime( props.mode ))
            pageIsLoaded.current = true;
        }
    },[ digits,pageIsLoaded ])

    useEffect(()=>{
        relocatePointerByIndex(pointer)
    },[pointer])

    return (
        <div ref= { clockFace }
             className='clock'
             style={{ background:colors.surfaceVariant ,
                 color: colors.onSurfaceVariant
                }}
        >
            <div className='center'
                 style={{ backgroundColor:colors.primary }}
            />

            <div id='digits-clockFace'>
            { Object.values( digits ).length > 0

                ? Object.values( digits ).map(( point,index)=>(
                    <span key={ index }
                          id={ index.toString()}
                          onClick={ ()=> handleAutoRelocate( index ) }
                          style= {{ transform: "translate("+
                                  point.placement.x +"px,"+
                                  point.placement.y +"px)"
                          }}>
                                { props.mode === 'hours'
                                    ? index === 0 ? 12 : index
                                    : index%5 === 0 ? index :<span className='no-show-minutes'>.</span>
                                }
                    </span>
                ))
                : ''
            }
            </div>
            <div ref ={ hand }
                 className='hand'
                 style={{ background:`linear-gradient( 250deg, ${ colors.primary } 50%, #AC6BFF00 0%)`}}
            />
            <div ref ={ pointerFace }
                 onMouseDown ={ handleDrag }
                 className ='pointer'
                 style={{ backgroundColor:colors.primary,
                        color:colors.onPrimary
                    }}
                 id = 'pointer'
            />
        </div>)
}



