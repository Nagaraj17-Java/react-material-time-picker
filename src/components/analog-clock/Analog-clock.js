import {useEffect, useMemo, useRef, useState} from "react";
import {Clock} from "./Clock.js";
import {decode,normalize} from "../../utilities.js";
import"./analog-clock.scss"

export default function AnalogClock(props) {

    const clockFace = useRef();
    const hand = useRef();
    let animationId = 0;
    let intervalHandler;
    const clockPos = clockFace.current?.getBoundingClientRect() || { left:0, top:0 };
    const pointerFace = useRef();
    const clock = useMemo(()=>{ return new Clock()},[]);
    const [ digits, setDigits ] = useState([]);
    const [ pointerDigit,setPointerDigit ] = useState(  0);
    const [ radius,setRadius ] = useState(128);
    const pageIsLoaded = useRef(false);

    function autoRelocate( destIdx ) {

        if ( intervalHandler ) clearInterval( intervalHandler );
        let counter = 0;
        const path = shortestPath( pointerDigit % 12 , destIdx );
        intervalHandler = setInterval(()=>{

            if( counter < path.length ) {

                setPointerByIndex(path[ counter ].value);
                counter++;
            }else{

                clearInterval( intervalHandler );
                setPointerDigit( destIdx );
            }
        },80)
    }

    function shortestPath( start,dest ) {
        let path;

        let difference = dest - start;
        let distance;

        if( ( difference > 0 && difference < 6 ) || 12 - start + dest <= 6) {

            distance = difference > 0 ? difference : 12 - start + dest;
            path = clock.goClockwise( start, distance )
        } else {

            distance = Math.abs (dest - start) >= 6 ? 12 - dest+ start : start - dest;
            path = clock.goCounterClockwise( start, distance )
        }
        return path;
    }

    function drawClock (radius,offset) {

        clock.draw( radius , 0);

        setDigits( clock.getDigits() );

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
        if ( idx >= 0 && idx < 12 ){
            return getAngel( digits[idx].placement.x, digits[idx].placement.y);
        }
    }

    function handleDrag (e) {

        let mousePos;
        let angel = getAngelByIndex( pointerDigit) //the last position

        function handleRelease() {

            window.removeEventListener('mousemove',startAnimation);
            window.removeEventListener('mouseup',handleRelease);
            const closestDigit = clock.getTheClosestDigit( angel )
            setPointerDigit( closestDigit ); //todo
            setGlobalTime( closestDigit )
            setPointerByIndex( closestDigit )
        }

        function startAnimation(e){

            if( animationId ) cancelAnimationFrame( animationId );
            animationId = requestAnimationFrame(() => trackMouse(e));
        }

        function trackMouse (e) {
            mousePos = getPosFromClockCenter( e.clientX,e.clientY );
            angel = getAngel( mousePos.x,mousePos.y );

            setPointer( angel,null, clock.getTheClosestDigit(angel) )
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

    function setPointer( angel,pointPlacement=null,value=null ) {

        const degree = radToDegree( angel );
        if( pointPlacement === null ) pointPlacement = angelToPos( angel );
        if( value === null) value = pointerDigit;

        pointerFace.current.style.transform = "translate("+ pointPlacement.x+"px,"+ pointPlacement.y+"px)";
        pointerFace.current.innerHTML = props.mode === 'hours'
            ? value === 0 ? 12 : value
            : value *5 ;

        hand.current.style.transform = "rotate("+degree+"deg)"
    }

    function setPointerByIndex( idx ) {

        if( digits.length === 0) return;
        let point = digits[ idx ].placement;
        const rad = clock.angel( idx );
        setPointer( rad,point,idx )
    }

    function handleAutoRelocate( index ) {
        autoRelocate( index );
        setGlobalTime( index );
    }

    function setGlobalTime( newTime ) {
        let time = decode( props.time );
        ( props.mode === 'hours'
                ? props.onChange( `${ props.dayMode === 'pm' ? parseInt( newTime ) +12 : normalize( newTime ) }${ time.minute }`)
                : props.onChange( `${ time.hour }${ normalize(newTime * 5 ) }`)
        )
    }

    function getGlobalTime( mode ) {
        const time = decode( props.time );
        return mode === 'hours'
            ? parseInt( time.hour%12 )
            : Math.round( parseInt( time.minute / 5 ));

    }

    useEffect(()=>{

        console.log(props.time)
        if( typeof props.time !== 'undefined' && digits.length >0 ) {

            const digit = getGlobalTime( props.mode )
            if( digit !== pointerDigit ){
                autoRelocate( digit );
            }
        }
    },[ props.time,props.mode ])

    useEffect(()=>{

        if( typeof clockFace.current !== 'undefined') {

            const diameter = clockFace.current?.getBoundingClientRect().width;
            const offset = parseFloat( window.getComputedStyle( clockFace.current, null ).getPropertyValue('font-size' ));
            const radius = Math.round(diameter- offset - offset/( diameter/2 ))/ 2;
            setRadius( radius );
            drawClock( radius,offset );
        }
    },[ clockFace ])

    useEffect(()=>{

        if( digits.length > 0 && pageIsLoaded.current === false ) {
            setPointerByIndex( getGlobalTime( props.mode ))
            pageIsLoaded.current = true;
        }
    },[ digits,pageIsLoaded ])

    return (
        <div ref= { clockFace } className='clock'>
            <div className='center'/>

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
                                    ? index=== 0 ? 12 : index
                                    : index * 5
                                }
                    </span>
                ))

                : ''
            }

            </div>
            <div ref ={ hand }
                 className='hand'
            />
            <div ref ={ pointerFace }
                 onMouseDown ={ handleDrag }
                 className ='pointer'
                 id = 'pointer'
            />

        </div>)
}



