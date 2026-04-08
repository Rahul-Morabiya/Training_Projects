import React from 'react'
import useLocalStorage from './useLocalStorage'

const LightDarkMode = () => {
    const [theme,setTheme]=useLocalStorage('theme','dark');

    function handleToggleTheme(){
        setTheme(theme==='light'?'dark':'light');
    }
    console.log(theme);
  return (
    <div className='light-dark-mode' data-theme={theme}>
      <div className='container'>
        <p>Hello World</p>
        <button onClick={handleToggleTheme}>Change theme</button>
      </div>
    </div>
  )
}

export default LightDarkMode
