import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { addUser } from '../../redux/actions/auth'
import { updater } from '../../redux/cart/cart'
import { userLog } from '../../redux/user/user'

import './auth.css'

const Signup = () => {
  const navigation = useNavigate()
  const dispatch = useDispatch()
  const {user, error, message, logged} = useSelector((state) => state.user)

  const [formInput, setFormInput] = useState({
    user:{
    username: '',
    email: '',
    phone_no: '',
    password: '',
    role: 'client'
    }

  })
  useEffect(()=>{
    dispatch(userLog())
  },[])
  const handleInput = (e) =>{
    setFormInput({
      
      user:{
        ...formInput.user,
        [e.target.name]: e.target.value}
    })
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(addUser(formInput))
    dispatch(updater())
    dispatch(userLog())

  }
  if(user == null || user == undefined){
  return (
    <div className='wallpaper centralize'>
      <div className='auth-container'>
        <div className='sign-up'>
          <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">username</label>
            <input type='text' name='username' value={formInput.user.username} onChange={handleInput} placeholder="username" id='username' required/>
            <label htmlFor="email">email</label>
            <input type={'email'} name="email" value={formInput.user.email} onChange={handleInput} placeholder="email" required />
            <label htmlFor="mobile">mobile</label>
            <input type={'text'} name="phone_no" value={formInput.user.phone_no} onChange={handleInput} placeholder="phone no" id='mobile' required/>
            <label htmlFor="password">password</label>
            <input type="password" value={formInput.user.password} onChange={handleInput} name="password" placeholder='Enter password' 
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required/>
            <label htmlFor="role"></label>
            <input type="hidden" name='role' value={formInput.user.client} id='role' />
           
       
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


  )}
  else{
    navigation("/")
  }
}

export default Signup