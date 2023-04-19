import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { loginUser } from '../../redux/actions/auth'
import { useNavigate } from 'react-router-dom'
import './auth.css'
import { userLog } from '../../redux/user/user'
let auth = localStorage.getItem("meli_auth")

const AdminLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

    const {user, error, logged, loading} = useSelector((state) => state.user)
    const [formInput, setFormInput] = useState({
      user: {
      username: '',
      password: ''
      }
    })

 
  useEffect(()=>{
 dispatch(userLog())
  }, [])


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
    dispatch(loginUser(formInput))
    dispatch(userLog())
  
  }
  console.log(user)
  if(user == null || user == undefined || Object.keys(user) == 0){


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
            Don't have an account? <NavLink to="/auth/admin_sign_up">Admin Sign up</NavLink>
        </p>
    </div>
</div>


</div>
  )
}else if(user.user.role == "client"){
  console.log(user.user.role)
  return(
         <div>
           <h1>You are not Authorized Please sign in <NavLink to="/auth/login">here</NavLink> </h1>
          
       </div>
  )
}
else{
  navigate('/admin')
}
}

export default AdminLogin
// else if( user.user.role == "client"){
//   return(
//     <div>
//       <h1>You are not Authorized Please sign in <NavLink to="/auth/login">here</NavLink> </h1>
      
//     </div>
//   )

// }

// || Object.keys(user == 0)