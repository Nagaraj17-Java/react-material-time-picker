import {createContext, useContext, useState} from "react";

const ThemeContext = createContext(null);
let themes = {
    light:{},
    dark: {
        primary : '#6750A4',
        surfaceVariant: 'rgba(231, 224, 236, 1)',
        onSurfaceVariant: '#49454F',
        surface: '#FFFBFE',
        outline: '#79747E',
        scrim:'rgb(0,0,0,0.25)',
        tertiaryContainer:'#FFD8E4',
        onPrimary: '#ffffff',
        errorContainer: '#F9DEDC',
        error : '#B3261E',
    }
}
function ThemeProvider(props){

    const [ theme,setTheme ] = useState( themes.light );
    function updateColors(colors) {
        setTheme(colors)
    }

    function updateTheme(theme) {
        if(theme === 'light') setTheme(themes.light)
        else if (theme === 'dark') setTheme(themes.dark)
        else throw new Error('Theme not found!')
    }

    return <ThemeContext.Provider {...props} value={[ theme,updateTheme,updateColors ]}/>
}
function useTheme() {
    const context = useContext(ThemeContext);
    if(!context) throw new Error('Not inside the provider.')
    return context; //returns [theme,updateTheme,updateColors]
}
export { ThemeProvider,useTheme }