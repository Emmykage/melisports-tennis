import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { addUser } from '../../redux/actions/auth';
import { updater } from '../../redux/cart/cart';
import { userLog } from '../../redux/user/user';
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai"
import {BsFacebook} from "react-icons/bs"
import {FcGoogle} from "react-icons/fc"

import './auth.css';

const Signup = () => {
  const navigation = useNavigate();
  const [show, setShow] = useState(true)

  const dispatch = useDispatch();
  const {
    user, error, message, loading, logged
  } = useSelector((state) => state.user);

  const [formInput, setFormInput] = useState({
    user: {
      last_name: '',
      first_name: '',
      username:'',
      email: '',
      phone_no: '',
      password: '',
      role: 'client',
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
  const toggleReveal = () => {
    setShow(prev => !prev)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formInput));
    dispatch(updater());
    dispatch(userLog());
  };
  if (user == null || user == undefined) {
    return (
      <div className="wallpaper centralize">
        <div className="auth-container">
          <div className="form-content sign-up">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
              <div className='field input-field'>
                <label htmlFor="first_name">First Name</label>
                <input type="text" name="first_name" value={formInput.user.first_name} onChange={handleInput} id="first_name" required />
              </div>
              <div className='field input-field'>
                <label htmlFor="last_name">Last Name</label>
                <input type="text" name="last_name" value={formInput.user.last_name} onChange={handleInput} id="lsat_name" required />
              </div>
              <div className='field input-field'>
                <label htmlFor="username">Username</label>
                <input type="text" 
                  name="username" 
                  value={formInput.user.username}
                  onChange={handleInput} id="username" required />
              </div>
              <div className='field input-field'>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={formInput.user.email}
                onChange={handleInput} required />
              </div>
              <div className='field input-field'>
                <label htmlFor="mobile">Mobile</label>
                <input type="text" name="phone_no" value={formInput.user.phone_no} onChange={handleInput}  id="mobile" required />
             

              </div>
              <div className='field input-field'>
              <label htmlFor="password">Password</label>
              <span onClick={toggleReveal}> {show ?  <AiOutlineEyeInvisible className='eye-icon' />: <AiOutlineEye className='eye-icon'/>}</span>
              
              <input
                type={show ? "password" : "text"}  onChange={handleInput} 

                value={formInput.user.password}
                name="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
              />
              

              </div>
             
              <button className="btn" type="submit">Sign Up</button>
              <div className='form-link'>
                <span> Already have an account?  <NavLink to="/auth/login">Login in</NavLink> </span>
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
              By clicking the sign up botton yo agree to our
              <br />
              <a href="#">Terms and condition</a>
              {' '}
              and
              <a href="#">Policy</a>
            </p>

          </div>
          <div>
            <p className="para-2">
              already have an account?
              {' '}
              <NavLink to="/auth/login">Login here</NavLink>
            </p>
          </div>

        </div>
      </div>

    );
  }

  navigation('/');
};

export default Signup;
