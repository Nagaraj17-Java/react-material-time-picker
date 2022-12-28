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

function getTheClosestDigit (angel ){

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

`npm install react-material-time-picker`

## Usage

To use TimePicker in your React application, import the TimePicker component and use it in your JSX code:

import TimePicker from 'react-material-time-picker';

Once you have imported the component, you can use it in your app as follows:

```jsx
const App = () => {
    const [ show,setShow ] = useState(false);
    const [ theme,setTheme ] = useState('light');
    return (<>
      <button onClick={()=>setShow(true)}>
        Click Me!
      </button>
      <button onClick={()=>setTheme(theme === 'dark' ? 'light': 'dark')}>
        { theme }
      </button>
      { show === true
              ? <TimePicker
                      theme={ theme }
                      title={ 'Time' }
                      zIndex={ 50 }
                      width={ 400 }
                      onChange={ checkValidity }
                      show={ ()=>setShow(true) }
                      defaultValue={ '1246' }
                      hide={ ()=>setShow(false) }
                      buttons={[
                        {
                          label:'Cancel',
                          onClick: ()=>setShow(false)
                        },
                        {
                          label:'Save',
                          onClick: ()=>alert('Saved!')
                        }
                      ]}
              />
              : ''
      }
  
    </>)
};
```


## Props

TimePicker has the following props:

- `title`: The title that will be displayed at the top of the TimePicker modal.
- `hide`: A function for hiding the modal from the page
- `show`: A function for showing the modal from the page
- `buttons`: An array including One or more buttons that will be placed at the bottom of the modal. These button objects must include function which will trigger after clicking on the button named 'onClick',and the label of the button named 'label'.
- `onChange`: Is a function which takes the updated time value in every changes happening.
- `defaultValue`: Is an optional value of time at the beginning in form of a 4 characters string.
- `theme` : Which can have two values of 'light' or 'dark'. This variable has set 'light' by default.
- `zIndex`: Is an optional variable for z-index of the modal which by default is on '1001'
- `width`: Is an optional variable for the width size of the modal
- `colors`: An optional variable in form of an object including two possible theme light and dark, which by default is on 'light' mode

### `Colors` Variables

Each of the objects in the light and dark modes must include the following variables:
- `primary`: a CSS color value that represents the primary color of the theme 
- `surfaceVariant`: a CSS color value that represents the surface variant color of the theme 
- `onSurfaceVariant`: a CSS color value that represents the color of text or other elements on top of the surface variant color
- `surface`: a CSS color value that represents the surface color of the theme
- `onSurface`: a CSS color value that represents the color of text or other elements on top of the surface color
- `outline`: a CSS color value that represents the outline color of the theme
- `scrim`: a CSS color value that represents the scrim color of the theme
- `tertiaryContainer`: a CSS color value that represents the tertiary container color of the theme
- `onPrimary`: a CSS color value that represents the color of text or other elements on top of the primary color
- `errorContainer`: a CSS color value that represents the error container color of the theme
- `primaryContainer`: a CSS color value that represents the primary container color of the theme
- `onPrimaryContainer`: a CSS color value that represents the color of text or other elements on top of the primary container color
- `error`: a CSS color value that represents the error color of the theme
- `surface3`: a CSS color value that represents the surface3 color of the theme, which is a linear gradient combining the surface color and a semi-transparent variant of the primary color.

## Programming Paradigms
This program is designed based on objective-oriented programming, with classes and objects representing the various components of our system, and uses some concepts like inheritance and encapsulation 
