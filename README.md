# TimePicker

TimePicker is a user interface component that allows the user to easily select a specific time. It provides an analog clock interface that is easy to use and intuitive. TimePicker can be easily integrated into other user interface components, making it a perfect choice for applications that require the user to select a time.

## Features

- The user can enter the number either using the keyboard or using the analog clock.
- The clock React component is responsive and works well on different devices and screen sizes. The clock adjusts its layout on different devices and screen sizes.
- The clock's appearance is based on Material design v3 with more features to make the better user experience on selecting time.
- The user can pick a time by either clicking on a number or dragging the clock hand.
- When the user clicks on a number the clock hand is designed to smoothly move towards it, and uses a function named “shortestPath” to find the shortest path. ( moves clockwise or counterclockwise ).
- When the user releases the clock hand after dragging it to select a time, it will snap to the nearest number using a function named “getTheClosestDigit”.

## Algorithms

To move the clock hand easily back and forward among the numbers, the analog clock component uses a class named Clock which implements a circular linked-list.
The algorithm used for finding the closest digit to where the user has released the clock hand is as follows:


```javascript

getTheClosestDigit (angel ){

  const unitDegree = Math.PI/( this.numberOfUnits/2 );
  const distance = Math.round(angel / unitDegree );
  return ( distance < -( this.numberOfUnits/4 )
                  ? 5*( this.numberOfUnits /4 ) + distance
                  : distance + ( this.numberOfUnits/4 )
  );
}
```

The algorithm to find the shortest path is :

```javascript
function shortestPath( start,dest ) {
  let path;
  let difference = dest - start;
  let distance;

  const fullClock = (props.mode === 'minutes' ? 60 : 12)

  if( ( difference > 0 && difference < fullClock/2 ) || fullClock - start + dest <= fullClock/2) {

    distance = difference > 0 ? difference : fullClock - start + dest;
    path = clock.goClockwise( start, distance )
  } else {

    distance = Math.abs (dest - start) >= fullClock/2 ? fullClock - dest+ start : start - dest;
    path = clock.goCounterClockwise( start, distance )
  }

  return path;
}
```


## Installation

To install TimePicker, run the following command:



## Usage

To use TimePicker in your React application, import the TimePicker component and use it in your JSX code:


import TimePicker from 'material-timepicker';

Once you have imported the component, you can use it in your app as follows:


The "TimePicker" component needs the following variables:
- A function for applying changes, which uses the useState hook to update the time
- A function for hiding the modal from the page, called handleClose
- A title that will appear at the top of the modal
- One or more buttons that will be placed at the bottom of the modal.
  For example:

```jsx
const App = () => {
    return (
        <TimePicker setTime={ setTime }
                    time={ time }
                    handleClose={ modalClose }
                    title={ 'From' }
                    buttons={<>
                        <Button type={'text'} onClick={ handleModalBack }>
                            Back
                        </Button>
                        <Button type={'text'} onClick={ handleModalSave }>
                            Save
                        </Button>
                    </>}
    
        />
    );
};
```


## Props

TimePicker has the following props:

- `title`: The title that will be displayed at the top of the TimePicker modal.
- `setTime`: A callback function that will be called whenever the selected time is changed. The callback function will receive the new time as its only argument.
- `time`: The variable which keeps the time
- `handleClose`: A function for hiding the modal from the page
- `buttons`: One or more buttons that will be placed at the bottom of the modal.

## Programming Paradigms
This program is designed based on objective-oriented programming, with classes and objects representing the various components of our system, and uses some concepts like inheritance and encapsulation 
