import { createSlice } from "@reduxjs/toolkit";

import { Product as ProductType } from "@/interfaces";

interface ProductsState {
  items: ProductType[];
  reduceItems: ProductType[];
  pageSize: number;
  endPoint: number;
}
const initialState: ProductsState = {
  items: [],
  reduceItems: [],
  pageSize: 10,
  endPoint: 0,
};

const productsSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
      state.reduceItems = action.payload.slice(0, state.pageSize);
    },
    getItems: (state, action) => {
      const { endPoint } = action.payload;
      state.endPoint = endPoint;
      state.reduceItems = action.payload.slice(endPoint, state.pageSize);
    },
  },
});

export const { setItems, getItems } = productsSlice.actions;
export default productsSlice.reducer;
