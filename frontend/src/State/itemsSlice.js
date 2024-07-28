import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  items: []
};

// Create a slice of the state
const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    // Add an item
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    // Remove an item by id
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    // Update an item
    updateItem: (state, action) => {
      const { id, newName } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.name = newName;
      }
    }
  }
});

// Export actions and reducer
export const { addItem, removeItem, updateItem } = itemsSlice.actions;
export default itemsSlice.reducer;
