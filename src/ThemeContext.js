import {createContext, useContext,useState} from "react";

const ThemeContext = createContext(null);
function ThemeProvider(props){

    const [ themes,setThemes ] = useState({
        light:{
            primary : '#6750A4',
            surfaceVariant: 'rgba(231, 224, 236, 1)',
            onSurfaceVariant: '#49454F',
            surface: '#FFFBFE',
            outline: '#79747E',
            scrim:'rgb(0,0,0,0.25)',
            tertiaryContainer:'#FFD8E4',
            onPrimary: '#ffffff',
            errorContainer: '#F9DEDC',
            primaryContainer: '#EADDFF',
            error : '#B3261E',
        },
        dark: {

        }
    })

    const [ theme,setTheme ] = useState( 'light' );

    let colors = (theme === 'dark' ? themes.dark : themes.light);

    return <ThemeContext.Provider {...props} value={[ colors,setTheme,setThemes ]}/>
}
function useTheme() {
    const context = useContext(ThemeContext);
    if(!context) throw new Error('Not inside the provider.')
    return context; //returns [theme,updateTheme,updateColors]
}
export { ThemeProvider,useTheme }