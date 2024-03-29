import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalAmount: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: {
      reducer: (state, action) => {
        state.totalAmount += 1;
        let product = state.cart.find(
          (prod) =>
            prod.id === action.payload.id &&
            prod.size === action.payload.size &&
            prod.color === action.payload.color &&
            prod.name === action.payload.name
        );
        if (product) {
          product.amount += 1;
        } else {
          product = action.payload;
          state.cart.push(product);
        }
        product.totalPrice += product.price;
        state.totalPrice += product.price;
      },
      prepare: (data) => {
        return {
          payload: {
            ...data,
            amount: 1,
            totalPrice: 0,
          },
        };
      },
    },
    removeOneProduct: (state, action) => {
      state.totalAmount -= state.totalAmount > 0 ? 1 : 0;
      const idx = state.cart.findIndex((prod) => {
        return (
          prod.id === action.payload.id &&
          prod.size === action.payload.size &&
          prod.color === action.payload.color
        );
      });
      const product = state.cart[idx];

      if (product) {
        product.amount = product.amount > 0 ? (product.amount -= 1) : 0;
        state.totalPrice -= state.totalPrice > 0 ? product.price : 0;
        product.totalPrice -= product.totalPrice > 0 ? product.price : 0;
      }

      if (product.amount < 1) {
        state.cart.splice(idx, 1);
      }
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalAmount = 0;
      state.totalPrice = 0;
    },
    removeEntireProduct: (state, action) => {
      state.cart = state.cart.filter(
        (prod) =>
          prod.size !== action.payload.size ||
          prod.color !== action.payload.color ||
          prod.name !== action.payload.name ||
          prod.id !== action.payload.id
      );

      state.totalAmount -= action.payload.amount;
      state.totalPrice -= action.payload.totalPrice;
    },
  },
});

export const { addToCart, removeOneProduct, clearCart, removeEntireProduct } =
  cartSlice.actions;

export const selectTotalAmount = (state) => state.cart.totalAmount;

const cartReducer = cartSlice.reducer;

export default cartReducer;
