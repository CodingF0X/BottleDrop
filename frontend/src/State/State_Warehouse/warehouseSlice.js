import { createSlice } from '@reduxjs/toolkit';
import { addBeverageToWarehouse, getWarehouseDetails } from './warehouseThunk';


const initialState = {
  beverages: {},
  empties: [],
  log: {},
  status: 'idle',  // Add the `status` property to track loading state
  error: null,     // Add an `error` property to store errors
};

const warehouseSlice = createSlice({
  name: 'warehouse',
  initialState,
  reducers: {
    resetWarehouse: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWarehouseDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getWarehouseDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.beverages = action.payload.beverages;
        state.empties = action.payload.empties;
        state.log = action.payload.log;
      })
      .addCase(getWarehouseDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      //-- Add new Beverage --//
      .addCase(addBeverageToWarehouse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addBeverageToWarehouse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { newBeverages } = action.payload;

        // Integrate newBeverages into the state
        newBeverages.forEach((beverage) => {
          const { beverageType } = beverage;
          
          // Initialize the array for the beverageType if it doesn't exist
          if (!state.beverages[beverageType]) {
            state.beverages[beverageType] = [];
          }

          // Add newBeverage to the state
          state.beverages[beverageType].push({
            ...beverage,
            count: 0  // Initialize count to 0 as we do not include it from the response
          });
        });
      })
      .addCase(addBeverageToWarehouse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.error : action.error.message;
      });
  },
});

export const { resetWarehouse } = warehouseSlice.actions;
export default warehouseSlice.reducer;
