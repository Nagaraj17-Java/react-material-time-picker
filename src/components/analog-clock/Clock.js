import {Digit} from "./Digit.js";

export class Clock{
    path = [];
    radius = 128;
    constructor() {

        this.count = 0;
        this.head = undefined;
        this.tail = undefined;
        this.digits = [];
    }
    push( ) {

        let current;
        if( this.count < 12 ) {

            const node = new Digit();
            node.placement = this.placement( this.count );
            node.value = this.count;

            this.digits.push(node);

            if (this.head == null) {
                this.head = node;
                node.prev = this.tail
            } else {
                current = this.head;
                while ( current.next != null && current.next !== this.tail ) {
                    current = current.next;
                }
                if( this.count === 11 ) {

                    node.next = this.head;
                    this.head.prev = node;
                    this.tail = node;
                }
                current.next = node;
                node.prev = current;
            }
            this.count +=1;
        }
    }
    draw( radius , offset ) {
        const digits = [ ...Array(12).keys() ];
        this.offset = offset;
        this.radius = radius;
        digits.forEach( i =>{
            // let p = this.placement(i);
            this.push();
        })

    }
    goClockwise( startIdx , distance ){

        let current;
        this.path = []
        current = this.getElementAt( startIdx );

        for (let i = 0 ; i < distance ; i++ ) {

            current = current.next;
            this.path.push( current );
        }

        return this.path
    }

    goCounterClockwise( startIdx , distance ) {

        let current;
        this.path = []
        current = this.getElementAt( startIdx );

        for (let i = 0 ; i < distance ; i++ ) {

            current = current.prev;
            this.path.push(current);
        }

        return this.path
    }

    getElementAt( index ) {

        if ( index >= 0 && index <= this.count ) {
            let node = this.head;
            for ( let i = 0; i < index && node != null; i++ ) {
                node = node.next;
            }
            return node;
        }
        return undefined;
    }

    getDigits() {

        return this.digits;
    }

    placement( idx ) {

        if( idx < 12 ) {

            let angel = this.angel( idx );

            return {
                x: Math.round( Math.cos( angel )* this.radius) ,
                y: Math.round( Math.sin( angel )* this.radius)
            }

        }else{
            return undefined
        }
    }

    angel (idx ) {

        let fullCircle = 2 * Math.PI;
        if( idx >= 9 ) return (( idx - 3 )*( fullCircle / 12))-2 * Math.PI;
        return ( idx - 3 )*( fullCircle / 12 );
    }
    getTheClosestDigit (angel ) {

        const unit = Math.PI/6;
        const numberOfUnits = Math.round(angel / unit );
        return ( numberOfUnits < -3 ? 15 + numberOfUnits : numberOfUnits + 3 );
    }

}