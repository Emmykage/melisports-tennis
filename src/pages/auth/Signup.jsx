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
    console.log(formInput)
    e.preventDefault();
    if(formInput.user.username == "" || formInput.user.username == null){
      setFormMsg({...formMsg, username: {msg: "Enter a username", color: "red"}})
    }else if(formInput.user.email == "" || formInput.user.email == null){
      setFormMsg({...formMsg, email: {msg: "Enter a email", color: "red"}})
    }else if(formInput.user.phone_no == "" || formInput.user.phone_no == null){
      setFormMsg({...formMsg, phone_no: {msg: "Enter a valid number", color: "red"}})
    }
    else if(formInput.user.password == "" || formInput.user.password == null){
      setFormMsg({...formMsg, password: {msg: "Enter a password", color: "red"}})
    }else{
      console.log("hey i passed to respond")
      setFormMsg({username: {msg: "pass checked", color: "green"}, email: {msg: "pass checked", color: "green"}, phone_no: {msg: "pass checked", color: "green"}, password: {msg: "pass checked", color: "green"}})
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
            <label htmlFor="username">username</label><span className={formMsg.username.color}> {formMsg.username.msg}</span>
          </div>
          <input type='text' name='username' value={formInput.user.username} onChange={handleInput} placeholder="username" id='username' required/>
          <div className='flex-space'>
            <label htmlFor="email">email</label><span className={formMsg.username.color}> {formMsg.email.msg}</span>
          </div>
          <input type={'email'} name="email" value={formInput.user.email} onChange={handleInput} placeholder="email" required/>
          <div className='flex-space'>
          <label htmlFor="mobile">mobile</label><span className={formMsg.username.color}>{formMsg.phone_no.msg}</span>
          </div> 
          <input type={'text'} name="phone_no" value={formInput.user.phone_no} onChange={handleInput} placeholder="phone no" id='mobile' required/>
          <div className='flex-space'>
          <label htmlFor="password">password</label><span className={formMsg.username.color}> {formMsg.password.msg}</span>
          </div> 
          <input type="password" value={formInput.user.password} onChange={handleInput} name="password" placeholder='Enter password' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required />
          <div className='flex-space'>
          <label htmlFor="role"></label>
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