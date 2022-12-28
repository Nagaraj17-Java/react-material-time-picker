import {Digit} from "./Digit.js";

export class Clock{
    path = [];
    radius = 126;
    constructor() {

        this.count = 0;
        this.head = undefined;
        this.tail = undefined;
        this.digits = [];
        this.numberOfUnits = undefined;
    }
    push( ) {

        let current;
        if( this.count < this.numberOfUnits ) {

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
                if( this.count === this.numberOfUnits-1 ) {

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
    draw( radius ,numberOfUnits ) {
        this.numberOfUnits = numberOfUnits;
        this.radius = radius;
        const digits = [ ...Array( this.numberOfUnits ).keys() ];
        digits.forEach( i =>{
            this.push();
        })

    }
    goClockwise( startIdx , distance ){

        this.path = []
        let current = this.digits[startIdx];

        for (let i = 0 ; i < distance ; i++ ) {

            current = current.next;
            this.path.push( current );
        }

        return this.path
    }

    goCounterClockwise( startIdx , distance ) {

        this.path = []
        let current = this.digits[startIdx];

        for (let i = 0 ; i < distance ; i++ ) {

            current = current.prev;
            this.path.push(current);
        }

        return this.path
    }

    getDigits() {

        return this.digits;
    }

    placement( idx ) {

        if( idx < this.numberOfUnits ) {

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
        if( idx >= 3*this.numberOfUnits/4 ) return (( idx - ( this.numberOfUnits/4 ) )*( fullCircle / this.numberOfUnits ))-2 * Math.PI;
        return ( idx - ( this.numberOfUnits/4 ) )*( fullCircle / this.numberOfUnits );
    }
    getTheClosestDigit (angel ) {

        const unitDegree = Math.PI/( this.numberOfUnits/2 );
        const distance = Math.round( angel / unitDegree );
        return ( distance < -( this.numberOfUnits/4 )
            ? 5*( this.numberOfUnits /4 ) + distance
            : distance + ( this.numberOfUnits/4 )
        );
    }

}