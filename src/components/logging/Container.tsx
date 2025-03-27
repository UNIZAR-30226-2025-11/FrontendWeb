// Code from: https://github.com/cooljasonmelton/cool-sign-up
import React, {useState} from 'react';

// components
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

const Container = (
  {
    logIn
  } : {
    logIn:boolean
  }
) => {
  const [welcome, setWelcome] = useState(!logIn)

  const setBannerClass = () => {
    const classArr = ["banner-side cfb shadow-game"]
    if (welcome) classArr.push('send-right')
    return classArr.join(' ')
  }

  const setFormClass = () => {
    const classArr = ["form-side cfb shadow-game"] 
    if (welcome) classArr.push('send-left')
    return classArr.join(' ')
  }

  return (
    <div className="Container cfb shadow-game">

      <div className={setBannerClass()}> 

        {welcome ? 
          <h2>Do you have an account?</h2>
            : <h2>Don&apos;t have an account?</h2>}

        <button onClick={()=> setWelcome(!welcome)}>
          {welcome ?
            "Log In"
              : "Create Account"}
        </button>
      </div>

      <div className={setFormClass()}> 
          {welcome ? 
            <SignUp /> 
              : <SignIn/>
          }
          
      </div>
    </div>
  );
}

export default Container;