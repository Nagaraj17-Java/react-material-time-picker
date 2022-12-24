import React from "react";
export const themes = {
    light : {
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
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222',
    },
}
const ColorsContext = React.createContext(
     themes.light
)

export const ColorProvider = ({children}) =>{
    return (
        <ColorsContext.Provider value={themes.light}>
            {children}
        </ColorsContext.Provider>
    )
}
export default ColorsContext;


//

