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

const login = createAsyncThunk('users/login', async (data, { rejectWithValue }) => {
  const config = {
    url: `${USERS_API_URL}/login`,
    data: data
  };
  const response = await postRequest(config);
  console.log(response);
  if (response.status !== 200) return rejectWithValue({});
  console.log(response);

  return { ...data, ...response.data };
});

const signUp = createAsyncThunk('users/signUp', async (data, { rejectWithValue }) => {
  const config = {
    url: `${USERS_API_URL}/sign-up`,
    data: data
  };
  const response = await postRequest(config);
  if (response.status !== 200) return rejectWithValue({});

  return { ...data, ...response.data };
});

const getRepos = createAsyncThunk('users/getRepos', async (data, { rejectWithValue, getState }) => {
  const config = {
    url: `${USERS_API_URL}/${getState().users.username}/repos`
  };
  const response = await getRequest(config);
  if (response.status !== 200) return rejectWithValue({});

  return response.data;
});

const getFavs = createAsyncThunk('users/getFavs', async (data, { rejectWithValue, getState }) => {
  const config = {
    url: `${USERS_API_URL}/${getState().users.username}/favs`
  };
  const response = await getRequest(config);
  if (response.status !== 200) return rejectWithValue({});
  const favsIds = {};
  _.forEach(response.data.repos, ({ id }) => {
    favsIds[id] = id;
  });
  const favs = response.data.repos;

  return { favsIds, favs };
});

const putFavs = createAsyncThunk('users/putFavs', async (data, { rejectWithValue, getState }) => {
  const config = {
    url: `${USERS_API_URL}/${getState().users.username}/favs`,
    data: [data]
  };
  const response = await putRequest(config);
  if (response.status !== 200) return rejectWithValue({});
  const favsIds = {};
  _.forEach(response.data.repos, ({ id }) => {
    favsIds[id] = id;
  });
  const favs = response.data.repos;

  return { favsIds, favs };
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    dismissError: (state) => {
      state.error = false;
      state.message = '';
    },
    checkLocalStorage: (state) => {
      let users = localStorage.getItem('users');
      users = JSON.parse(users);
      if (_.isNull(users)) return;
      state.authSuccess = users.authSuccess;
      state.username = users.username;
    },
    signOut: (state) => {
      localStorage.clear();
      state.authSuccess = false;
      state.username = '';
      state.loading = false;
      state.error = false;
      state.message = '';
      state.favs = [];
      state.favsIds = {};
      state.repos = [];
    }
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
      state.error = false;
      state.message = '';
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.authSuccess = payload.auth_success;
      state.username = payload.username;

      localStorage.setItem('users', JSON.stringify(state));
    },
    [login.rejected]: (state) => {
      state.loading = false;
      state.error = true;
      state.message = 'Check your credentials';
    },
    [signUp.pending]: (state) => {
      state.loading = true;
      state.error = false;
      state.message = '';
    },
    [signUp.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.authSuccess = payload.auth_success;
      state.username = payload.username;

      localStorage.setItem('users', JSON.stringify(state));
    },
    [signUp.rejected]: (state) => {
      state.loading = false;
      state.error = true;
      state.message = 'Check your credentials';
    },
    [getRepos.pending]: (state) => {
      state.loading = true;
      state.error = false;
      state.message = '';
    },
    [getRepos.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.repos = payload.repos;
    },
    [getRepos.rejected]: (state) => {
      state.loading = false;
      state.error = true;
      state.message = "Can't get repos";
    },
    [getFavs.pending]: (state) => {
      state.loading = true;
      state.error = false;
      state.message = '';
    },
    [getFavs.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.favsIds = payload.favsIds;
      state.favs = payload.favs;
    },
    [getFavs.rejected]: (state) => {
      state.loading = false;
      state.error = true;
      state.message = "Can't get favs";
    },
    [putFavs.pending]: (state) => {
      state.loading = true;
      state.error = false;
      state.message = '';
    },
    [putFavs.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.favsIds = payload.favsIds;
      state.favs = payload.favs;
    },
    [putFavs.rejected]: (state) => {
      state.loading = false;
      state.error = true;
      state.message = "Can't update favs";
    }
  }
});

// Action creators are generated for each case reducer function
export const loginThunk = login;
export const signUpThunk = signUp;
export const getReposThunk = getRepos;
export const getFavsThunk = getFavs;
export const putFavsThunk = putFavs;
export const { checkLocalStorage, signOut, dismissError } = usersSlice.actions;

export default usersSlice.reducer;
