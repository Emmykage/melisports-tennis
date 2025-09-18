import { createSlice } from '@reduxjs/toolkit';
import {
  delUsers,
  getUser,
  getUsers,
  updateUser,
  userProfileUpdate,
} from '../actions/auth';

const initialState = {
  user: null,
  users: [],
  error: false,
  message: '',
  loading: true,
  logged: false,
};
const usersSlice = createSlice({
  name: 'users',
  initialState,

  extraReducers: {
    [delUsers.fulfilled]: (state) => ({
      ...state,
      loading: false,

    }),
    [delUsers.pending]: (state) => ({
      ...state,
      notice: '',
      loading: true,

    }),
    [delUsers.rejected]: (state) => ({
      ...state,
      loading: false,

    }),
    [updateUser.fulfilled]: (state) => ({
      ...state,
      notice: '',
      loading: false,

    }),
    [updateUser.pending]: (state) => ({
      ...state,
      notice: '',
      loading: true,

    }),
    [updateUser.rejected]: (state) => ({
      ...state,
      notice: '',
      loading: false,

    }),

    [userProfileUpdate.fulfilled]: (state, action) => ({
      ...state,
      user: action.payload,
      loading: false,

    }),
    [userProfileUpdate.pending]: (state) => ({
      ...state,
      loading: true,

    }),
    [userProfileUpdate.rejected]: (state) => ({
      ...state,
      error: true,
      loading: false,

    }),
    [getUser.fulfilled]: (state, action) => {
      const { data } = action.payload;

      return {
        ...state,
        loading: false,
        user: data,
        error: true,
      };
    },
    [getUser.pending]: (state) => ({
      ...state,
      loading: true,
    }),
    [getUser.rejected]: (state, action) => {
      const response = action.payload;

      return {
        ...state,
        loading: false,
        user: response.message,
      };
    },
    [getUsers.fulfilled]: (state, action) => {
      const response = action.payload;

      return {
        ...state,
        loading: false,
        users: response,
        error: false,
      };
    },
    [getUsers.pending]: (state) => ({
      ...state,
      loading: true,
    }),
    [getUsers.rejected]: (state, action) => ({
      ...state,
      loading: false,
      error: true,
      message: action.payload.message,
    }),

  },
  reducers: {

    updateUserInput: (state, action) => ({
      ...state,
      user: { ...state.user, [action.payload.name]: action.payload.value },
    }),

  },
});

export default usersSlice.reducer;
export const { updateUserInput } = usersSlice.actions;
