import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
}
interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}
const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, price, title, image, description } = action.payload;
      state.items.push({ id, quantity: 1, price, title, image, description });
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
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
