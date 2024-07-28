import { createSlice } from '@reduxjs/toolkit';
import { getAllBars, getBarDetailsReducer, relpenishBarReducer } from './barThunk';

const initialState = {
    bars: [],
    bar:{},
    status: 'idle', 
    error: null,
  };

  const barsSlice = createSlice({
    name: 'bars',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAllBars.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getAllBars.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.bars = action.payload;
        })
        .addCase(getAllBars.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(getBarDetailsReducer.pending, (state) => {
          state.status = 'loading';
      })
      .addCase(getBarDetailsReducer.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.bar = action.payload;
      })
      .addCase(getBarDetailsReducer.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
      })
      .addCase(relpenishBarReducer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(relpenishBarReducer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log('slice')
        console.log(action.payload)
        state.bar = action.payload
         // Check if the payload is a string (indicating the Warehouse Microservice is down)
         if (typeof action.payload === 'string') {
          state.error = action.payload;
        } else {
          state.bar = action.payload;
          state.error = null;
          // Note: The bars array will be updated by the getAllBars action
        }
      })
      .addCase(relpenishBarReducer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    },
  });

  export default barsSlice.reducer;
