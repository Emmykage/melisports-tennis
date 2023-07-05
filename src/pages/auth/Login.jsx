import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/actions/auth';
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai"
import './auth.css';
import { updater } from '../../redux/cart/cart';
import { userLog } from '../../redux/user/user';
import {BsFacebook} from "react-icons/bs"
import {FcGoogle} from "react-icons/fc"

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    user, error, message, logged, loading
  } = useSelector((state) => state.user);
  const [show, setShow] = useState(true)
  const [formInput, setFormInput] = useState({
    user: {
      email: '',
      password: '',
    },
  });
  useEffect(() => {
    dispatch(userLog());
  }, []);

  const handleInput = (e) => {
    if(e.target.name == "email"){
      setFormInput({
        user: {
          ...formInput.user,
          [e.target.name]: e.target.value.toLowerCase(),
        },
      })
      
    }else{


    setFormInput({
      user: {
        ...formInput.user,
        [e.target.name]: e.target.value,
      },
    });
  }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formInput));
    dispatch(updater());
    dispatch(userLog());
  };
  const toggleReveal = () => {
    setShow(prev => !prev)
    console.log(show)
  }

  if (user == null || user == undefined || user == "") {
    return (
      <div className="wallpaper centralize">
        <div className="auth-container ">
          <div className="form-content login-box">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <div className='field input-field'>
                <label htmlFor="email">Email</label>
                <input type="text" value={formInput.email} onChange={handleInput} name="email" id="email" />
              </div>

              <div className='field input-field'>
                <label htmlFor="password" />Password
                <input type={show ? "password" : "text"} value={formInput.password} onChange={handleInput} name="password"  />
                <span onClick={toggleReveal}> {show ?  <AiOutlineEyeInvisible className='eye-icon' />: <AiOutlineEye className='eye-icon'/>}</span>
              </div>
              <div className='form-link'>
                <a href='#' className='forgot-pass'>Forgot password? </a>
              </div>
              <button className="btn" type="submit">Login </button>
              <div className='form-link'>
                <span> Don't have an account?  <NavLink to="/auth/sign_up">Sign up</NavLink> </span>
              </div>
              <div className='line'></div>

            </form>
            <p className="blue">
              {' '}
              {loading && 'loading...' }
            </p>

            <p className="red">
              {' '}
              {error && message }
            </p>
            <div className="media-option">
              <a href="#" className="social-field facebook"><BsFacebook className="facebook-icon"/>
              <span>Login with Facebook</span>
              </a>
            </div>
            <div className="media-option last-child">
              <a href="#" className="social-field google"><FcGoogle className="google-icon"/>
              <span>Login with Google</span>
              </a>
            </div>
            
            <p>
              By clicking the sign up botton you agree to our
              <br />
              <a href="#">Terms and condition</a>
              {' '}
              and
              <a href="#">Policy</a>
            </p>
          </div>
          
        </div>

      </div>
    );
  }
  navigate('/');
};

export default Login;
