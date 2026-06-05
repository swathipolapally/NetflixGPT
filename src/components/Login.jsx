import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm)
  }

  return (
    <div>
      <Header/>
      <div className="absolute">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/435e8bb8-7f1b-49cb-8da8-bff997124294/web/IN-en-20260511-TRIFECTA-perspective_ec39852e-0b48-4e8a-b415-dd8376cd83ce_small.jpg"
        alt='bg-image'/>
      </div>
      <form className="absolute w-4/12 my-36 mx-auto right-0 left-0 p-12 bg-black rounded-lg bg-opacity-80">
        <h1 className='text-3xl font-bold text-white p-3 my-3'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        <input className="p-3 my-3 w-full bg-gray-800 outline-none text-gray-400" type='text' placeholder='Email Address' />        
        {!isSignInForm &&
        <input className="p-3 my-3 w-full bg-gray-800 outline-none text-gray-400" type='text' placeholder='Name' />}
        <input className="p-3 my-3 w-full bg-gray-800 outline-none text-gray-400"  type='password' placeholder='Password' />
        <button onClick={toggleSignInForm}  className="text-white bg-red-700 p-3 my-3 w-full rounded-lg cursor-pointer outline-none hover:bg-red-800">{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className=" my-3 text-white text-sm">{isSignInForm ? "New to Netflix?" : "Already registed user!"} <span className='cursor-pointer hover: hover:underline' onClick={toggleSignInForm}>{isSignInForm ? "Sign Up" : "Sign In"}</span> Now</p>
      </form>
    </div>
  )
}

export default Login
