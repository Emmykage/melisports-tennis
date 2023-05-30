import { createSlice } from '@reduxjs/toolkit';
import {
  addUser,
  getUser,
  loginUser,
} from '../actions/auth';

const initialState = {
  user: { user: {
            email: "email@gmail.com",
            first_name: "first name",
            id:2,
            last_name: "last_name",
            phone_no: "number",
            role:"admin",
            stripe_customer_id:null,
            username: "username"
          }},
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
          user: {
          user: {
            email: "emmiemenz@gmail.com",
            first_name: null,
            id:2,
            last_name: null,
            password_digest:"$2a$12$svjsc1D1iPMJuBjtiKEdJO/m73GEBiIF.FXVYzbcTP86XSMDwmHhK",
            phone_no: "07064334160",
            role:"admin",
            stripe_customer_id:null,
            username: "morris"
          }
        }
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
      }else{

      
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.error,
      };
    }


    },
    [addUser.fulfilled]: (state, action) => {
      console.log('fulfilled');
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
      console.log('yes fulfillled but failed');

      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.error,
      };
    },
    [addUser.rejected]: (state, action) => {
      console.log('failed', action.payload.error);
      return {
        ...state,
        error: true,
        message: 'failed to create an account',
      };
    },
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

      console.log(action.payload.error);
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
