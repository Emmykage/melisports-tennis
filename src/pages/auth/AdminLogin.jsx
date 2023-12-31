import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/actions/auth';

import './auth.css';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { userLog } from '../../redux/user/user';

const AdminLogin = () => {
  const [show, setShow] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    user, error, message, loading,
  } = useSelector((state) => state.user);
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
    if (e.target.name == 'email') {
      setFormInput({
        user: {
          ...formInput.user,
          [e.target.name]: e.target.value.toLowerCase(),
        },
      });
    } else {
      setFormInput({
        user: {
          ...formInput.user,
          [e.target.name]: e.target.value,
        },
      });
    }
  };
  const toggleReveal = () => {
    setShow((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formInput));
    dispatch(userLog());
  };
  if (user == null || user == undefined || Object.keys(user) == 0) {
    return (
      <div className="wallpaper centralize">
        <div className="auth-container ">
          <div className="form-content login-box">
            <h1>Admin Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="field input-field">
                <label htmlFor="email">Email</label>
                <input type="text" value={formInput.email} onChange={handleInput} name="email" id="email" />
              </div>
              <div className="field input-field">
                <label htmlFor="password">Password </label>
                <input type={show ? 'password' : 'text'} value={formInput.password} onChange={handleInput} name="password" />
                <span onClick={toggleReveal}>
                  {' '}
                  {show ? <AiOutlineEyeInvisible className="eye-icon" /> : <AiOutlineEye className="eye-icon" />}
                </span>
              </div>
              <button className="btn" type="submit">Log in </button>
              <div className="form-link">
                <span>
                  {' '}
                  Don't have an account?
                  <NavLink to="/auth/admin_sign_up">Sign up</NavLink>
                </span>
              </div>
              <div className="line" />
            </form>
            <p className="blue">
              {' '}
              {loading && 'loading...' }
            </p>

            <p className="red">
              {' '}
              {error && message }
            </p>
            <div className="media-option ">
              <a href="#" className="social-field facebook">
                <BsFacebook className="facebook-icon" />
                <span>Login with Facebook</span>
              </a>
            </div>
            <div className="media-option last-child">
              <a href="#" className="social-field google">
                <FcGoogle className="google-icon" />
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
          {/* <div>
            <p className="para-2">
              Don't have an account?
              {' '}
              <NavLink to="/auth/admin_sign_up">Admin Sign up</NavLink>
            </p>
          </div> */}
        </div>

      </div>
    );
  } if (user.user.role == 'client') {
    return (
      <div>
        <h1>
          You are not Authorized Please sign in
          <NavLink to="/auth/admin_login">here</NavLink>
        </h1>

      </div>
    );
  }

  navigate('/admin');
};

export default AdminLogin;
// else if( user.user.role == "client"){
//   return(
//     <div>
//       <h1>You are not Authorized Please sign in <NavLink to="/auth/login">here</NavLink> </h1>

//     </div>
//   )

// }

// || Object.keys(user == 0)
