import React, {createContext, useState, useEffect} from 'react';

const themes = {
    dark: {
      background: 'black',
      color: 'red'
    },
    light: {
      background: 'white',
      color: 'balck'
    }
  }


  
export const ThemeContext = createContext({
    background: 'black',
    color: 'white'
  });

export const ThemeProvider = ({children}) => {

    const [selectedTheme, setTheme] = useState(themes.light)

    const setSelectedTheme = (event) => {
      event.target.checked
       ? setTheme(themes.dark)    
       : setTheme(themes.light)    
    }

    return <ThemeContext.Provider value={{selectedTheme, setSelectedTheme}}>
        {children}
    </ThemeContext.Provider>
}
