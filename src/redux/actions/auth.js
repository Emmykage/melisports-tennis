import { createAsyncThunk } from '@reduxjs/toolkit';
import baseURL from '../baseURL';
import { fetchToken, removeToken, setToken } from '../../hooks/localStorage';
import { refreshToken } from '../../utils/refreshToken';

const addUser = createAsyncThunk('user/addUser', async (data) => {
  const response = await fetch(`${baseURL}users`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json());
  return response;
});
const loginUser = createAsyncThunk('user/logUser', async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseURL}login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (!response.ok) {
      const errorMessage = result.error || result.message || 'unknownerror occured ';
      return rejectWithValue({ message: errorMessage });
    }

    setToken(result.token);
    return result;
  } catch (error) {
    console.error('error thrown', error);
    return rejectWithValue({ message: 'Spmething went wrong, check your internet Connection!!' });

    // throw new Error(error);
  }
});
const getUser = createAsyncThunk('user/getUser', async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseURL}users/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${fetchToken()}`,
      },
    });
    const result = await response.json();
    if (!response.ok) {
      return rejectWithValue({ messsage: result?.message });
    }
    return result;
  } catch (error) {
    return rejectWithValue({ message: 'Something went wrong' });
  }
});

const userProfile = createAsyncThunk('user/userProfile', async (_, { rejectWithValue }) => {
  try {
    let response = await fetch(`${baseURL}users/userProfile`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${fetchToken()}`,
      },
    });

    let result = await response.json();
    if (!response.ok) {
      const refreshSuccess = await new Promise((resolve, reject) => {
        refreshToken(
          async () => {
            response = await fetch(`${baseURL}users/userProfile`, {
              method: 'GET',
              headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${fetchToken()}`,
              },
            });
            result = await response.json();
            resolve(response);
          },
          () => {
            removeToken();
            reject(response);
          },
        );
      })
        .catch((error) => error);

      if (!refreshSuccess.ok) {
        return rejectWithValue({ message: result.message });
      }
    }

    return result;
  } catch (error) {
    return rejectWithValue({ message: 'Something went wrong' });
  }
});



export const userProfileUpdate = createAsyncThunk('users/USER_PROFILE_UPDATE', async (userData, { rejectWithValue }) => {
  try {
    let response = await fetch(`${baseURL}users/user_profile_update`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${fetchToken()}`,
      },
      body: JSON.stringify(userData.data)
    });

    let {data, message} = await response.json();

    if(!response.ok){
      throw new Error (message || "failed to update")
    }    

    return data;

  } catch (error) {
    if(error?.message){
      return rejectWithValue({ message: error.message || 'Something went wrong' });

    }
    return rejectWithValue({ message: 'Something went wrong' });

  }
});

export const userProfiledelete = createAsyncThunk('users/USER_PROFILE_UPDATE', async (_, { rejectWithValue }) => {
  try {
    let response = await fetch(`${baseURL}users/user_profile_delete`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${fetchToken()}`,
      },
    });

    let {data, message} = await response.json();

    if(!response.ok){
      throw new Error (message || "failed to update")
    }    

    return data;

  } catch (error) {
    if(error?.message){
      return rejectWithValue({ message: error.message || 'Something went wrong' });

    }
    return rejectWithValue({ message: 'Something went wrong' });

  }
});



export const userPasswordUpdate = createAsyncThunk('users/USER_PROFILE_UPDATE', async (userData, { rejectWithValue }) => {
  try {
    let response = await fetch(`${baseURL}users/user_password_update`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${fetchToken()}`,
      },
      body: JSON.stringify(userData)
    });

    let {data, message} = await response.json();

    if(!response.ok){
      throw new Error (message || "failed to update")
    }    

    return data;

  } catch (error) {
    if(error?.message){
      return rejectWithValue({ message: error.message || 'Something went wrong' });

    }
    return rejectWithValue({ message: 'Something went wrong' });

  }
});

const getUsers = createAsyncThunk('users/getusers', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseURL}users`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${fetchToken()}`,
      },
    });

    const result = await response.json();
    if (!response.ok) {
      return rejectWithValue({ message: result.message });
    }
    return result;
  } catch (error) {
    return rejectWithValue({ message: 'Something went wrong' });
  }
});

const delUsers = createAsyncThunk('users/del_users', async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseURL}users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${fetchToken()}`,
      },
    });

    const result = await response.json();
    if (!response.ok) {
      return rejectWithValue({ message: result.message });
    }
    return result;
  } catch (error) {
    return rejectWithValue({ message: 'response.error' });
  }
});

const updateUser = createAsyncThunk('users/update_user', async ({ id, user }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseURL}users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${fetchToken()}`,
      },
      body: JSON.stringify(user),
    });

    const result = await response.json();
    if (!response.ok) {
      return rejectWithValue({ message: result.message ?? result.error });
    }

    return result;
  } catch (err) {
    return ({ message: 'Something went wrong' });
  }
  // .then(res => res.json())
  return response;
});
export {
  addUser, loginUser, getUser, getUsers, delUsers, updateUser, userProfile,
};
