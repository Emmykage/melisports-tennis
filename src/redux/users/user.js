import { createSlice } from '@reduxjs/toolkit';
import {
  delUsers,
  getUser,
  getUsers,
  updateUser,
} from '../actions/auth';

const initialState = {
  user: null,
  users: [],
  error: false,
  message: '',
  loading: false,
  logged: false,
};
const usersSlice = createSlice({
  name: 'users',
  initialState,

  extraReducers: {
    [delUsers.fulfilled]: (state) => {
      return{
        ...state,
        notice: "",
        loading: false,


      }
    },
    [delUsers.pending]: (state) => {
      return{
        ...state,
        notice: "",
        loading: true,
        

      }
    },
    [updateUser.fulfilled]: (state) => {
      return{
        ...state,
        notice: "",
        loading: false,


      }
    },
    [updateUser.pending]: (state) => {
      return{
        ...state,
        notice: "",
        loading: true,
        

      }
    },
    [updateUser.rejected]: (state) => {
      return{
        ...state,
        notice: "",
        loading: false,        

      }
    },
    [getUser.fulfilled]: (state, action) => {
      const response = action.payload;

      if (response) {

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
    [getUsers.fulfilled]: (state, action) => {
      const response = action.payload;
      console.log(response)

      if (response) {
        return {
          ...state,
          logged: true,
          users: response,
        };
      }

      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.error,
      };
    },
    
  },
  reducers: {

    updateUserInput: (state, action) => {
      console.log(action.payload.value)
      return{
        ...state,
        user: {...state.user, [action.payload.name]: action.payload.value}
      }
    },

  },
});

export default usersSlice.reducer;
export const {  updateUserInput } = usersSlice.actions;
