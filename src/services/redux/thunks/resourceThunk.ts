import { createAsyncThunk } from '@reduxjs/toolkit';
import { RESOURCES } from '../../api/apiEndpoints';
import fetchInstance from '../../api/fetchInstance';

export const SEARCH_RESOURCES = createAsyncThunk<string | void, string, {}>(
  'Resources/Search',
  async (query, { rejectWithValue }) => {
    try {
      const response = await fetchInstance(RESOURCES + query);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // Check if the query includes 'exportToCSV=true'
      if (query.includes('&csvResponse=true')) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);

        // Creating a temporary link element for downloading
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'resources.csv'; // Provide a default file name for the CSV
        document.body.appendChild(link);
        link.click();

        // Cleanup
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);

        // Since this is a download action, no need to return a response.
        return;
      } else {
        return await response.json();
      }
    } catch (error) {
      return rejectWithValue((error as Error).message || 'An unknown error occurred');
    }
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
