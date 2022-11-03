import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRequest, postRequest } from '../utils/request_manager';

const USERS_API_URL = 'https://vh5ezeclj6.execute-api.us-east-1.amazonaws.com/dev/v1/users';

const initialState = {
  authSuccess: false,
  loading: false,
  username: '',
  favs: [],
  repos: []
};

const login = createAsyncThunk('users/login', async (data) => {
  const config = {
    url: `${USERS_API_URL}/login`,
    data: data
  };
  const response = await postRequest(config);

  return { ...data, ...response };
});

const signUp = createAsyncThunk('users/signUp', async (data) => {
  const config = {
    url: `${USERS_API_URL}/sign-up`,
    data: data
  };
  const response = await postRequest(config);

  return { ...data, ...response };
});

const getRepos = createAsyncThunk('users/getRepos', async (data, { getState }) => {
  const config = {
    url: `${USERS_API_URL}/${getState().users.username}/repos`
  };
  const response = await getRequest(config);

  return response;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.authSuccess = payload.auth_success;
      state.username = payload.username;
    },
    [login.rejected]: (state) => {
      state.loading = false;
    },
    [signUp.pending]: (state) => {
      state.loading = true;
    },
    [signUp.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.authSuccess = payload.auth_success;
      state.username = payload.username;
    },
    [signUp.rejected]: (state) => {
      state.loading = false;
    },
    [getRepos.pending]: (state) => {
      state.loading = true;
    },
    [getRepos.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.repos = payload.repos;
    },
    [getRepos.rejected]: (state) => {
      state.loading = false;
    }
  }
});

// Action creators are generated for each case reducer function
export const loginThunk = login;
export const signUpThunk = signUp;
export const getReposThunk = getRepos;
export const userReducer = usersSlice.actions;

export default usersSlice.reducer;
