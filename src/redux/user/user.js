import { createSlice } from '@reduxjs/toolkit';
import {
  addUser,
  loginUser,
} from '../actions/auth';

const initialState = {
  user: {},
  users: [],
  userEdit: {},
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
        // console.log(JSON.parse(auth).user)
        return {
          ...state,
          user: JSON.parse(auth).user,
          logged: true,

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

    [addUser.fulfilled]: (state, action) => {
      const response = action.payload;
      if (response.user) {
        const collect = JSON.stringify(response);
        localStorage.setItem('meli_auth', collect);
        return {
          ...state,
          logged: true,
          loading: false,
          user: response.user,
          error: false,
          message: response.message,
        };
      }

      return {
        ...state,
        loading: false,
        error: true,
        logged: false,
        message: action.payload.error,
      };
    },
    [addUser.rejected]: (state) => ({
      ...state,
      error: true,
      message: 'No Internet connection',
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
          user: response.user,
          error: false,
          loading: false,
          message: 'log in successful',
        };
      }

      return {
        ...state,
        logged: false,
        loading: false,
        error: true,
        message: action.payload.error,
      };
    },
    [loginUser.rejected]: (state) => ({
      ...state,
      loading: false,
      error: true,
      message: 'No Internet connection',
    }),
    [loginUser.pending]: (state) => ({
      ...state,
      loading: true,
    }),
  },
});

export default userSlice.reducer;
export const { toLogin, userLog } = userSlice.actions;
