import React from 'react'
import { NavLink } from 'react-router-dom'
import './auth.css'

const Signup = () => {
  return (
    <div className='wallpaper centralize'>
      <div className='auth-container'>
        <div className='sign-up'>
          <h1>Sign Up</h1>
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
                already have an account? <NavLink to="/auth/login">Login here</NavLink>
            </p>
        </div>
    
    </div>
    </div>


  )
}

export default Signup