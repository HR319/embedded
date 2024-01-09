import { useState } from 'react';
import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import Textform from './components/Textform';

function App() {
  const [mode, setmode] = useState('light');

  const tmode = ()=> {
    if(mode === 'light'){
      setmode('dark')
      document.body.style.backgroundColor='#171818';
    }
    else{
      setmode('light')
      document.body.style.backgroundColor='white';
    }
  }
  return (
    <>
        <Navbar title="TextUtils" mode={mode} tmode={tmode}/>
        <Textform heading="Enter your text here" mode={mode}/> 
        {/* <About/> */}
    </>
  );
}

export default App;
