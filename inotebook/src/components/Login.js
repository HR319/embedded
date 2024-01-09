import React from 'react'
import { useState } from 'react'
const Login = () => {

    const [credentials, setcredentials] = useState({email:"", password:""})

    const handlesubmit = async(e) => {
        e.preventdefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password}),
    });
    const json = await response.json()
    }

    const handlechange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    
      }

  return (
    <div>
      <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label" >Email address</label>
    <input type="email" className="form-control" onChange={handlechange} id="email" name="email" value={credentials.email} aria-describedby="emailHelp" />
    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label" >Password</label>
    <input type="password" className="form-control" onChange={handlechange} id="password" name="password" value={credentials.password} />
  </div>
  
  <button type="submit" className="btn btn-primary" >Login</button>
</form>
    </div>
  )
  
  }
export default Login
