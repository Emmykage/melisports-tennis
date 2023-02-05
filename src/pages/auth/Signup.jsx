import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { addUser } from '../../redux/actions/auth'

import './auth.css'

const Signup = () => {
  const navigation = useNavigate()
  const dispatch = useDispatch()
  const [formInput, setFormInput] = useState({
    user:{
    username: '',
    email: '',
    phone_no: '',
    password: '',
    role: 'client'
    }

  })
  const handleInput = (e) =>{
    setFormInput({
      
      user:{
        ...formInput.user,
        [e.target.name]: e.target.value}
    })
    console.log(e.target.value)
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    // console.log(formInput)
    dispatch(addUser(formInput))
    // navigation('/')

  }
  return (
    <div className='wallpaper centralize'>
      <div className='auth-container'>
        <div className='sign-up'>
          <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">username</label>
            <input type='text' name='username' value={formInput.username} onChange={handleInput} placeholder="username" id='username'/>
            <label htmlFor="email">email</label>
            <input type={'email'} name="email" value={formInput.email} onChange={handleInput} placeholder="email" />
            <label htmlFor="mobile">mobile</label>
            <input type={'number'} name="phone_no" value={formInput.phone_no} onChange={handleInput} placeholder="phone no" id='mobile'/>
            <label htmlFor="password">password</label>
            <input type="password" value={formInput.password} onChange={handleInput} name="password" placeholder='Enter password' />
            <label htmlFor="role"></label>
            <input type="hidden" name='role' value={formInput.client} id='role' />
           
       
            <button className='btn' type='submit'>Sign Up</button>
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