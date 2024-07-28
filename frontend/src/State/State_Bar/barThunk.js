import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllBars, replenishBar,getBarDetails } from "../API";

export const getAllBars = createAsyncThunk( 'Bar/getAllBars', async () => {
    const response = await  fetchAllBars();
    return response.data;
  }
);

export const getBarDetailsReducer = createAsyncThunk('Bar/getBarDetails', async (barId, { rejectWithValue }) => {
  try {
      const response = await getBarDetails(barId);
      const {bar} = response.data
      return bar;  
  } catch (error) {
      return rejectWithValue(error.response.data);
  }
});

// export const relpenishBarReducer = createAsyncThunk(
//   'Bar/relpenishBar',
//   async ({data,id}, { rejectWithValue }) => {
//     try {
//       const response = await replenishBar(data,id);
//       return response.data ;       
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const relpenishBarReducer = createAsyncThunk(
  'Bar/replenishBar',
  async ({data, id}, { dispatch, rejectWithValue }) => {
    try {
      const response = await replenishBar(data,id);
      await dispatch(getAllBars());
      return response.data;       
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
