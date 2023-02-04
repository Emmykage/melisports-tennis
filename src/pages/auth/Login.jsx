import React from 'react'
import './auth.css'

const Login = () => {
  return (
    <div>
        <div className='form-cont'>

       
        <form action="">
            <div className='input-div'>
                <label htmlFor="username">
                    <input type="text" />
                </label>
                
            </div>
            <div className='input-div'>
                <label htmlFor="username"> 
                    <input type="password" />
                </label>
                
            </div>
            <p>
                Don't have an account? <a>Sign in</a>
            </p>
        </form>
        </div>
    </div>
  )
}

export default Login