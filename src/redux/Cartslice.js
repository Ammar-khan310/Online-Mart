import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("martlyCart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: savedCart,
  reducers: {
    addToCart: (state, action) => {
      const product = state.find((item) => item.id === action.payload.id);

      if (product) {
        product.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }

      localStorage.setItem("martlyCart", JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      const updatedCart = state.filter((item) => item.id !== action.payload);

      localStorage.setItem("martlyCart", JSON.stringify(updatedCart));
      return updatedCart;
    },

    updateQuantity: (state, action) => {
      const product = state.find((item) => item.id === action.payload.id);

      if (product) {
        product.quantity = action.payload.quantity;
      }

      localStorage.setItem("martlyCart", JSON.stringify(state));
    },

    clearCart: () => {
      localStorage.removeItem("martlyCart");
      return [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
