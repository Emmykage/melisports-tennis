import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { addUser } from '../../redux/actions/auth';
import { userLog } from '../../redux/user/user';
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai"
import {BsFacebook} from "react-icons/bs"
import {FcGoogle} from "react-icons/fc"

const AdminSignUp = () => {
  const [show, setShow] = useState(true)

  const navigation = useNavigate();
  const dispatch = useDispatch();
  const {
    user, error, message, loading,
  } = useSelector((state) => state.user);

  const [formInput, setFormInput] = useState({
    user: {
      first_name: '',
      last_name: "",
      username: '',
      email: '',
      phone_no: '',
      password: '',
      role: 'admin',
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
    });}

  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formInput));
    dispatch(userLog());
  };
  const toggleReveal = () => {
    setShow(prev => !prev)
  }
  if (user == null || user == undefined) {
    return (
      <div className="wallpaper centralize">
        <div className="auth-container">
          <div className="form-content sign-up">
            <h1>Sign Up as Admin</h1>
            <form onSubmit={handleSubmit}>
            <div className="field input-field">
            <label htmlFor="first_name">First Name</label>
            <input type="text" name="first_name" value={formInput.user.first_name} onChange={handleInput} id="first_name" required />
                
            </div>
            <div className="field input-field">
            <label htmlFor="username">Last Name</label>
            <input type="text" name="last_name" value={formInput.user.last_name} onChange={handleInput} id="last_name" required />
            </div>
            <div className="field input-field">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" value={formInput.user.username} onChange={handleInput} id="last_name" required />
            </div>
            <div className="field input-field">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={formInput.user.email} onChange={handleInput} required />
              </div>
              <div className="field input-field">
              <label htmlFor="mobile">Mobile</label>
              <input type="text" name="phone_no" value={formInput.user.phone_no} onChange={handleInput} id="mobile" required />
              

              </div>
              <div className="field input-field">
              <label htmlFor="password">Password</label>
              <input
                type={show ? "password" : "text"}  onChange={handleInput} 
                value={formInput.user.password}
                name="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
              />
              
              <span onClick={toggleReveal}> {show ?  <AiOutlineEyeInvisible className='eye-icon' />: <AiOutlineEye className='eye-icon'/>}</span>
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
              <span>Sign Up with Facebook</span>
              </a>
            </div>
            <div className="media-option last-child">
              <a href="#" className="social-field google"><FcGoogle className="google-icon"/>
              <span>Sign Up with Google</span>
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
         
        </div>
      </div>
    );
  }

  navigation('/admin');
};

export default AdminSignUp;
