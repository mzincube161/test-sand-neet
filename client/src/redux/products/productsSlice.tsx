import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk<Product[], void>(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    const URL = 'http://localhost:3000/products';
    try {
      const response = await fetch(URL);
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  },
);

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductsState {
  products: Product[];
  isLoading: boolean;
  searchQuery: string;
}

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  searchQuery: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    searchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    resetSearchQuery: (state) => {
      state.searchQuery = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { searchQuery, resetSearchQuery } = productsSlice.actions;

export default productsSlice.reducer;
