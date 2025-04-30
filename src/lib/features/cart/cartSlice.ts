import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { CartItem, CartState } from "@/interfaces/cart";

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  loading: false,
  error: null,
};

// ✳️ 取得所有 Posts
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/cart`);
      console.log(res);
      const resData = await res.json();
      console.log(resData);
      if (!res.ok) {
        return rejectWithValue(resData.error);
      }
      return resData;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, price, name, image, description } = action.payload;
      state.items.push({ id, quantity: 1, price, name, image, description });
      state.totalQuantity += 1;
      state.totalPrice += price;
    },
    removeItem: (state, action) => {
      const { id } = action.payload;
      const itemToRemove = state.items.find((item) => item.id === id);
      if (!itemToRemove) return;
      state.items = state.items.filter((item) => item.id !== id);
      state.totalQuantity -= 1;
      state.totalPrice -= itemToRemove.price;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        const items: CartItem[] = action.payload.cartItems;
        state.items = items;
        state.totalQuantity = items.length;
        state.totalPrice = items.reduce((total, item) => total + item.price, 0);
        state.loading = false;
        state.error = null;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
