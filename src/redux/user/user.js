import { createSlice } from '@reduxjs/toolkit';
import {
  addUser,
  getUser,
  loginUser,
} from '../actions/auth';

const initialState = {
  user: null,
  error: false,
  message: '',
  loading: false,
  logged: false,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLog: (state) => {
      try {
        const auth = localStorage.getItem('meli_auth');

        return {
          ...state,
          user: JSON.parse(auth),

        };
      } catch {
        return {
          ...state,
          user: null,
        };
      }
    },
  },
  extraReducers: {
    [getUser.fulfilled]: (state, action) => {
      const response = action.payload;
      if (response.user) {
        return {
          ...state,
          logged: true,
          user: response,
        };
      }

      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.error,
      };
    },
    [addUser.fulfilled]: (state, action) => {
      const response = action.payload;
      if (response.user) {
        const collect = JSON.stringify(response);
        localStorage.setItem('meli_auth', collect);
        return {
          ...state,
          logged: true,
          user: response,
          message: 'sign up successfull',
        };
      }

      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.error,
      };
    },
    [addUser.rejected]: (state) => ({
      ...state,
      error: true,
      message: 'failed to create an account',
    }),
    [addUser.pending]: (state) => ({
      ...state,
      loading: true,
    }),
    [loginUser.fulfilled]: (state, action) => {
      const response = action.payload;

      if (response.user) {
        const collect = JSON.stringify(response);
        localStorage.setItem('meli_auth', collect);

        return {
          ...state,
          logged: true,
          user: action.payload,
        };
      }

      return {
        ...state,
        logged: false,
        error: true,
        message: action.payload.error,
      };
    },
    [loginUser.rejected]: (state, action) => ({
      ...state,
      error: true,
      message: action.error,
    }),
  },
});

export default userSlice.reducer;
export const { toLogin, userLog } = userSlice.actions;
