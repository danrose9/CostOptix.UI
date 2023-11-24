import { createSlice } from '@reduxjs/toolkit';
import { fetchUserProfile, incrementLoginCount, fetchUserPhoto, setOrganizationName } from '../thunks/userProfileThunk';

const initialState = {
  id: null,
  name: null,
  email: null,
  organization: {
    id: null,
    name: null,
    createdDate: null,
    status: null,
    error: null,
    remainingLogins: 0,
  },
  photo: {
    image: null,
    status: null,
    error: null,
  },
  status: null,
  isDemo: false,
  isAuthenticated: false,
  error: null,
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: initialState,
  reducers: {
    updateUserName(state, action) {
      state.name = action.payload;
    },
    updateIsAuthenticated(state, action) {
      state.name = action.payload;
    },
    updateAvatarUrl(state, action) {
      state.photo = action.payload;
    },
    setIsDemo(state, action) {
      state.isDemo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
        state.isAuthenticated = false;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isAuthenticated = true;

        state.status = 'success';
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.organization = action.payload.organization;

        if (action.payload.email === 'demo@costoptix.com') {
          state.isDemo = true;
        } else state.isDemo = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.isAuthenticated = false;
        state.error = action.error;
      });
    // incrementLoginCount
    builder
      .addCase(incrementLoginCount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementLoginCount.fulfilled, (state) => {
        state.status = 'success';
        state.organization.remainingLogins = state.organization.remainingLogins - 1;
      })
      .addCase(incrementLoginCount.rejected, (state) => {
        state.status = 'failed';
      });
    // fetchUserPhoto
    builder
      .addCase(fetchUserPhoto.pending, (state) => {
        state.photo.status = 'loading';
      })
      .addCase(fetchUserPhoto.fulfilled, (state, action) => {
        state.photo.status = 'success';
        state.photo.image = action.payload;
      })
      .addCase(fetchUserPhoto.rejected, (state, action) => {
        state.photo.status = 'failed';
        state.photo.error = action.error;
      });
    // setOrganizationName
    builder
      .addCase(setOrganizationName.pending, (state) => {
        state.organization.status = 'pending';
      })
      .addCase(setOrganizationName.fulfilled, (state, action) => {
        state.photo.status = 'success';
        state.organization.name = action.meta.arg;
      })
      .addCase(setOrganizationName.rejected, (state, action) => {
        state.organization.status = 'failed';
        state.organization.error = action.error;
      });
  },
});

export const { updateUserName, updateAvatarUrl, updateOrganizationName, updateIsAuthenticated, setIsDemo } =
  userProfileSlice.actions;

export default userProfileSlice.reducer;
