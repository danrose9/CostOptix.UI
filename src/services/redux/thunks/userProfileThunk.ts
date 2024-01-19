import { createAsyncThunk } from '@reduxjs/toolkit';
import { ACCOUNT_ME, INCREMENT_LOGIN_COUNT, UPDATE_ORGANIZATION_NAME, ACCOUNT_PHOTO } from '../../api/apiEndpoints';
import fetchInstance from '../../api/fetchInstance';
import { getDefaultAvatarUrl } from '../../../utils/getDefaultAvatarUrl';

export const fetchUserProfile = createAsyncThunk('Profile/fetchUserProfile', async (args, { rejectWithValue }) => {
  const response = fetchInstance(ACCOUNT_ME)
    .then((response) => response.json())
    .catch((error) => {
      return rejectWithValue({ message: error.message, status: error.response?.status });
    });

  console.log('fetchUserProfile', response);
  return response;
});

export const fetchUserPhoto = createAsyncThunk('Profile/fetchUserPhoto', async (args, { rejectWithValue }) => {
  const response = await fetchInstance(ACCOUNT_PHOTO)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.blob();
    })
    .then((imageBlob) => {
      return URL.createObjectURL(imageBlob);
    })
    .catch(function (error) {
      return getDefaultAvatarUrl();
    });

  return response;
});

export const incrementLoginCount = createAsyncThunk(
  'Profile/incrementLoginCount',
  async (args, { rejectWithValue }) => {
    return await fetchInstance(INCREMENT_LOGIN_COUNT, { method: 'POST' })
      .then((response) => response)
      .catch((e) => rejectWithValue(e.response.data));
  }
);

export const setOrganizationName = createAsyncThunk(
  'Profile/updateOriganizationName',
  async (args: string, { rejectWithValue, dispatch }) => {
    await fetchInstance(UPDATE_ORGANIZATION_NAME, {
      method: 'PATCH',
      body: JSON.stringify({ name: args }),
    })
      .then((response) => response)
      .catch((e) => rejectWithValue(e.response.data));
  }
);
