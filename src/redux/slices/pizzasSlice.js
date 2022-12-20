import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async ({ order, sortBy, category, search, currentPage }, thunkAPI) => {
    const { data } = await axios.get(
      `https://6381e85d53081dd5498b0e4f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );

    if (data.length === 0) {
      return thunkAPI.rejectWithValue('Пиццы украли на запросе');
    }
    
    return thunkAPI.fulfillWithValue(data);
  },
);

const initialState = {
  items: [],
  status: 'loading', // loading | success | error
};

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const selectPizzaData = (state) => state.pizzasReducer

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
