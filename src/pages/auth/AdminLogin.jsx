import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { loginUser } from '../../redux/actions/auth'
import { useNavigate } from 'react-router-dom'
import './auth.css'
const AdminLogin = () => {
    const {user, error} = useSelector((state) => state.user)
  console.log(user)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formInput, setFormInput] = useState({
    user: {
    username: '',
    password: ''
    }
  })
  const handleInput = (e) =>{
      setFormInput({
        user:{
        ...formInput.user,
        [e.target.name]: e.target.value
        }
      })
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    // console.log(formInput)
    dispatch(loginUser(formInput))
    if (user.user && user.token){
      navigate('/')
    }
    // dispatch(loginUser)
  }
  return (
    <div className='wallpaper centralize'>
    <div className='auth-container '>
      <div className='login-box'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">username</label>
          <input type={'text'} value={formInput.username} onChange={handleInput} name="username" id='username' placeholder="username" />
          <label htmlFor="password"></label>
          <input type="password" value={formInput.password} onChange={handleInput} name="password" placeholder='Enter password' />
          <button className='btn' type='submit'>Log in </button>
        </form>
      <p>By clicking the sign up botton you agree to our <br/>
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

export default AdminLogin