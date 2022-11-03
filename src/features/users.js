import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import { getRequest, postRequest, putRequest } from '../utils/request_manager';

const USERS_API_URL = 'https://vh5ezeclj6.execute-api.us-east-1.amazonaws.com/dev/v1/users';

const initialState = {
  authSuccess: false,
  loading: false,
  error: false,
  message: '',
  username: '',
  favs: [],
  favsIds: {},
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

const getFavs = createAsyncThunk('users/getFavs', async (data, { getState }) => {
  const config = {
    url: `${USERS_API_URL}/${getState().users.username}/favs`
  };
  const response = await getRequest(config);
  const favsIds = {};
  _.forEach(response.repos, ({ id }) => {
    favsIds[id] = id;
  });
  const favs = response.repos;

  return { favsIds, favs };
});

const putFavs = createAsyncThunk('users/putFavs', async (data, { getState }) => {
  const config = {
    url: `${USERS_API_URL}/${getState().users.username}/favs`,
    data: [data]
  };
  const response = await putRequest(config);
  const favsIds = {};
  _.forEach(response.repos, ({ id }) => {
    favsIds[id] = id;
  });
  const favs = response.repos;

  return { favsIds, favs };
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    checkLocalStorage: (state) => {
      let users = localStorage.getItem('users');
      users = JSON.parse(users);
      state.authSuccess = users.authSuccess;
      state.username = users.username;
    }
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.authSuccess = payload.auth_success;
      state.username = payload.username;

      localStorage.setItem('users', JSON.stringify(state));
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

      localStorage.setItem('users', JSON.stringify(state));
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
    },
    [getFavs.pending]: (state) => {
      state.loading = true;
    },
    [getFavs.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.favsIds = payload.favsIds;
      state.favs = payload.favs;
    },
    [getFavs.rejected]: (state) => {
      state.loading = false;
    },
    [putFavs.pending]: (state) => {
      state.loading = true;
    },
    [putFavs.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.favsIds = payload.favsIds;
      state.favs = payload.favs;
    },
    [putFavs.rejected]: (state) => {
      state.loading = false;
    }
  }
});

// Action creators are generated for each case reducer function
export const loginThunk = login;
export const signUpThunk = signUp;
export const getReposThunk = getRepos;
export const getFavsThunk = getFavs;
export const putFavsThunk = putFavs;
export const { checkLocalStorage } = usersSlice.actions;

export default usersSlice.reducer;
