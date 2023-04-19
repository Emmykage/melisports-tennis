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

  const [formMsg, setFormMsg] = useState({username: {msg: "", color: "red"}, email: {msg: "", color: "red"}, phone_no: {msg: "", color: "red"}, password: {msg: "", color: "red"}})
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
    if(formInput.username == "" || formInput.username == null){
      setFormMsg({username: {msg: "Enter a username", color: "red"}})
    }else if(formInput.email == "" || formInput.email == null){
      setFormMsg({email: {msg: "Enter a email", color: "red"}})
    }else if(formInput.phone_no == "" || formInput.phone_no == null){
      setFormMsg({phone_no: {msg: "Enter a valid number", color: "red"}})
    }
    else if(formInput.password == "" || formInput.password == null){
      setFormMsg({password: {msg: "Enter a password", color: "red"}})
    }else{
      console.log("hey i am stupid enouggh to respond")
      setFormMsg({username: {msg: "", color: "green"}, email: {msg: "", color: "green"}, phone_no: {msg: "", color: "green"}, password: {msg: "", color: "green"}})
    }
    // switch(formInput){
    //   case formInput.username == "" || formInput.username == null : 
    //     setFormMsg({msg: "Enter a username", color: "red"})
    //     break;
    //     case formInput.email == "" || formInput.email == null: 
    //     setFormMsg({msg: "Enter a email", color: "red"})
    //     break; 
    //   case formInput.phone_no == "" || formInput.phone_no == null: 
    //     setFormMsg({msg: "Enter a valid number", color: "red"})
    //     break;
    //   case formInput.password == "" || formInput.password == null: 
    //     setFormMsg({msg: "Enter a password", color: "red"})
    //     break;
    //     default:
    //       console.log("hey i am stupid enouggh to respond")
          // dispatch(addUser(formInput))
          // dispatch(updater())
          // dispatch(userLog())    }


  }
  if(user == null || user == undefined){
  return (
    <div className='wallpaper centralize signup'>
      <div className='auth-container'>
        <div className='sign-up'>
          <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex-space'>
            <label htmlFor="username">username</label><span className={formMsg.color}> {formMsg.username.msg}</span>
          </div>
          <input type='text' name='username' value={formInput.user.username} onChange={handleInput} placeholder="username" id='username'/>
          <div className='flex-space'>
            <label htmlFor="email">email</label><span className='red'> {formMsg.email.msg}</span>
          </div>
          <input type={'email'} name="email" value={formInput.user.email} onChange={handleInput} placeholder="email" />
          <div className='flex-space'>
          <label htmlFor="mobile">mobile</label><span className='red'>{formMsg.phone_no.msg}</span>
          </div> 
          <input type={'text'} name="phone_no" value={formInput.user.phone_no} onChange={handleInput} placeholder="phone no" id='mobile'/>
          <div className='flex-space'>
          <label htmlFor="password">password</label><span className='red'> {formMsg.password.msg}</span>
          </div> 
          <input type="password" value={formInput.user.password} onChange={handleInput} name="password" placeholder='Enter password' />
          <div className='flex-space'>
          <label htmlFor="role"></label><span className='red'> {formMsg.msg}</span>
          </div>   
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