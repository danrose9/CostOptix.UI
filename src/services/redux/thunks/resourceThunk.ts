import { createAsyncThunk } from '@reduxjs/toolkit';
import { RESOURCES } from '../../api/apiEndpoints';
import fetchInstance from '../../api/fetchInstance';

export const SEARCH_RESOURCES = createAsyncThunk<string, string, {}>(
  'Resources/Search',
  async (query, { rejectWithValue }) => {
    return await fetchInstance(RESOURCES + query)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch((e) => rejectWithValue(e.response.data));
  }
);

export const fetchResourceView = createAsyncThunk('Resources/ResourceView', async (args, { rejectWithValue }) => {
  return await fetchInstance(RESOURCES + '/' + args)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .catch((e) => rejectWithValue(e.response.data));
});
