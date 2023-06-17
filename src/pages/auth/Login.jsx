import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/actions/auth';

import './auth.css';
import { updater } from '../../redux/cart/cart';
import { userLog } from '../../redux/user/user';

// const auth = localStorage.getItem('meli_auth');
// const user = JSON.parse(auth)

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    user, error, message, logged,
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
    setFormInput({
      user: {
        ...formInput.user,
        [e.target.name]: e.target.value,
      },
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formInput));
    dispatch(updater());
    dispatch(userLog());
  };

  if (user == null || user == undefined || user == "") {
    return (
      <div className="wallpaper centralize">
        <div className="auth-container ">
          <div className="login-box">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">email</label>
              <input type="text" value={formInput.email} onChange={handleInput} name="email" id="email" placeholder="email" />
              <label htmlFor="password" />
              <input type="password" value={formInput.password} onChange={handleInput} name="password" placeholder="Enter password" />
              <button className="btn" type="submit">Log in </button>
            </form>
            <p>
              By clicking the sign up botton you agree to our
              <br />
              <a href="#">Terms and condition</a>
              {' '}
              and
              <a href="#">Policy</a>
            </p>
          </div>
          <div>
            <p className="para-2">
              Don't have an account?
              {' '}
              <NavLink to="/auth/sign_up">Sign up here</NavLink>
            </p>
          </div>
        </div>

      </div>
    );
  }
  navigate('/');
};

export default Login;
