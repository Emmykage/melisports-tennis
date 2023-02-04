import React from 'react'
import { NavLink } from 'react-router-dom'
import './auth.css'

const Login = () => {
  return (
    <div className='wallpaper centralize'>
        <div className='auth-container '>
          <div className='login-box'>
            <h1>Login</h1>
            <form>
              <label htmlFor="">email</label>
              <input type={'email'} placeholder="email" />
              <label htmlFor=""></label>
              <input type="password" placeholder='Enter password' />
              <button type='submit'></button>
            </form>
          <p>By clicking the sign up botton yo agree to our <br/>
          <a href="#">Terms and condition</a> and <a href="#">Policy</a></p>
        </div>
        <div>
            <p className='para-2'>
                Don't have an account? <NavLink to="/auth/sign_up">Sign up here</NavLink>
            </p>
        </div>
    </div>
   
    
    </div>
  )
}

export default Login