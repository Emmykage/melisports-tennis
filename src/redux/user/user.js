import { createSlice } from '@reduxjs/toolkit';
import {
  addUser,
  loginUser,
  userProfile,
} from '../actions/auth';

const initialState = {
  user: null,
  users: [],
  userEdit: {},
  error: false,
  message: '',
  loading: true,
  logged: false,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLog: (state) => ({
      ...state,
      logged: false,
    }),
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
      return {
        ...state,
        logged: true,
        error: false,
        loading: false,
        message: response.message,
        user: response.data,
      };
    },
    [loginUser.rejected]: (state, action) => ({
      ...state,
      loading: false,
      error: true,
      message: action.payload.message,
    }),
    [loginUser.pending]: (state) => ({
      ...state,
      loading: true,
    }),

    [userProfile.fulfilled]: (state, action) => ({
      ...state,
      user: action.payload.data,
      loading: false,
    }),
    [userProfile.rejected]: (state, action) => ({
      ...state,
      message: action.payload.message,
      user: null,
      loading: false,
    }),
    [userProfile.pending]: (state) => ({
      ...state,
      loading: true,
    }),
  },
});

export default userSlice.reducer;
export const { toLogin, userLog } = userSlice.actions;
