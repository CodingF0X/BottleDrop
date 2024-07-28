import { createAsyncThunk } from '@reduxjs/toolkit';

//-- Here i simulate a function to simulate login --//
const loginApi = async ({ email, password }) => {
    if (email === 'warehouse@gmail.com') {
      return { role: 'Warehouse-Assistant', email };
    } else if (email === 'bartender@gmail.com') {
      return { role: 'Bartender', email };
    } else {
      throw new Error('Invalid credentials');
    }
  };


  export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
      const response = await loginApi({ email, password });
      return response;
    }
  );