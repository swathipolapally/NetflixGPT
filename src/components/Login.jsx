import React, { useState, useRef } from 'react'
import Header from './Header'
import { checkValidateEmail, checkValidateName, checkValidatePassword } from '../utils/validate';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [emailErrorMessage,setEmailErrorMessage] = useState(null);
  const [pwdErrorMessage,setPwdErrorMessage] = useState(null);
  const [nameErrorMessage,setNameErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm)
  }

  const handleSubmitButton = () => {
    console.log(email.current.value);
    console.log(password.current.value);
    setEmailErrorMessage(checkValidateEmail(email?.current?.value));
    setPwdErrorMessage(checkValidatePassword(password?.current?.value));
    if(!isSignInForm) setNameErrorMessage(checkValidateName(name.current.value));
    if(emailErrorMessage || pwdErrorMessage || nameErrorMessage) return null;
    if(!isSignInForm){
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + " - " + errorMessage);
      })
    }else{
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        setErrorMessage(error.code + " - " + error.message);
      })
    }
  }

  return (
    <div>
      <Header/>
      <div className="absolute">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/435e8bb8-7f1b-49cb-8da8-bff997124294/web/IN-en-20260511-TRIFECTA-perspective_ec39852e-0b48-4e8a-b415-dd8376cd83ce_small.jpg"
        alt='bg-image'/>
      </div>
      <form onSubmit={(event) => event.preventDefault()} className="absolute w-4/12 my-36 mx-auto right-0 left-0 p-12 bg-black rounded-lg bg-opacity-80">
        <h1 className='text-3xl font-bold text-white p-3 my-3'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        <div>
        <input ref={email} className="p-3 my-3 w-full bg-gray-800 outline-none text-gray-400" type='text' placeholder='Email Address' />        
        <div className='text-red-500 font-bold text-sm'>{emailErrorMessage}</div>
        </div> 
        
        {!isSignInForm &&
        <div>
            <input ref={name} className="p-3 my-3 w-full bg-gray-800 outline-none text-gray-400" type='text' placeholder='Name' />
            <div className='text-red-500 font-bold text-sm'>{nameErrorMessage}</div>
        </div>
        } 
              
        <div>
        <input ref={password} className="p-3 my-3 w-full bg-gray-800 outline-none text-gray-400"  type='password' placeholder='Password' />
        <div className='text-red-500 font-bold text-sm'>{pwdErrorMessage}</div>
        </div>
        <div className='text-red-500 font-bold text-sm'>{errorMessage}</div>
        <button  className="text-white bg-red-700 p-3 my-3 w-full rounded-lg cursor-pointer outline-none hover:bg-red-800 focus-visible:bg-red-1000" onClick={handleSubmitButton}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className=" my-3 text-white text-sm">{isSignInForm ? "New to Netflix?" : "Already registed user!"} <span className='cursor-pointer hover: hover:underline hover:text-blue-500' onClick={toggleSignInForm}>{isSignInForm ? "Sign Up" : "Sign In"}</span> Now</p>
      </form>
    </div>
  )
}

export default Login
