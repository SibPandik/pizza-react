import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: string[];
  types: string[];
  rating: number;
}

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  'pizza/fetchPizzasStatus',
  async (params, thunkAPI) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://6381e85d53081dd5498b0e4f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );

    if (data.length === 0) {
      return thunkAPI.rejectWithValue('Пиццы украли на запросе');
    }
    
    return thunkAPI.fulfillWithValue(data);
  },
);

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzasSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzasSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    })
  }
});

export const selectPizzaData = (state: RootState) => state.pizzasReducer

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
