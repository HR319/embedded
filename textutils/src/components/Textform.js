import React, { useState } from 'react'

export default function Textform(props) {

  const handleloclick = () => {
    let nret = text.toLowerCase();
    setText(nret)
  }

  const handlespclick = () => {
    let newt = text.split(/[ ]+/);
    setText(newt.join(" "))
  }

  const handleCLclick = () => {
  setText('')
  }

  const handleonchange = (event) => {
    // console.log("written");
    setText(event.target.value)
  }

  const handleupclick = () => {
    let newt=text.toUpperCase();
    setText(newt)
  }

  const [text, setText] = useState('write something........');
  return (
    <>
    <div className="container my-3">
      <h2 className={`text-${props.mode==='dark'?'white':'black'}`}>{props.heading}</h2>
        <div className="mb-3">
        <textarea className={`form-control text-${props.mode==='dark'?'white':'black'}`} value={text} style={{backgroundColor : props.mode==='dark'?'grey':'white'}} onChange={handleonchange} id="myBox" rows="8"></textarea>
        <button className="btn btn-primary my-3 mx-2" onClick={handleupclick}>convert to Uppercase</button>
        <button className="btn btn-primary my-3 mx-2" onClick={handleloclick}>convert to lowercase</button>
        <button className="btn btn-primary my-3 mx-2" onClick={handlespclick}>remove extra space</button>
        <button className="btn btn-primary my-3 mx-2" onClick={handleCLclick}>clear</button>
      </div>
    </div>
    <div className="container">
      <h2 className={`text-${props.mode==='dark'?'white':'black'}`}>Your text summary</h2>
      <p className={`text-${props.mode==='dark'?'white':'black'}`}>{text.split(" ").length} words and {text.length} characters</p>
      <p className={`text-${props.mode==='dark'?'white':'black'}`}>{text.split(" ").length * 0.008} minutes will be taken to read</p>
      <h2 className={`text-${props.mode==='dark'?'white':'black'}`}>Preview</h2>
      <p className={`text-${props.mode==='dark'?'white':'black'}`} >{text.length>1?text:"Enter something to preview"}</p>
    </div>
    </>
  )
}
