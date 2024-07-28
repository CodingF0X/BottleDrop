import { createSlice } from '@reduxjs/toolkit';
import { login } from './authThunk';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      user: null,
      status: 'idle',
      error: null,
    },
    reducers: {
        logout(state) {
            state.user = null;
            state.status = 'idle';
          },
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(login.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });
  
  export const { logout } = authSlice.actions;

  export const selectCurrentUser = (state) => state.auth.user;
  export const selectIsAuthenticated = (state) => state.auth.user !== null;
  
  export default authSlice.reducer;