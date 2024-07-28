import { createAsyncThunk } from '@reduxjs/toolkit';
import { addBeverage, fetchWarehouseDetails } from "../API";

export const getWarehouseDetails = createAsyncThunk( 'warehouse_getDetails', async () => {
      const response = await  fetchWarehouseDetails();
      return response.data;
    }
  );

  
export const addBeverageToWarehouse = createAsyncThunk(
    'warehouse/addBeverage',
    async (beverage, { rejectWithValue }) => {
      try {
        const response = await addBeverage(beverage);
        const { newBeverages } = response.data;  // Extract newBeverages from the API response
        console.log('frontend input')
        console.log(beverage)
        console.log('--------------')
        console.log(response.data)
        return { newBeverages };  // Return newBeverages array only        
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );