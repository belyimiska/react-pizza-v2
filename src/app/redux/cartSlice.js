import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalPrice: 0,
    items: [],
  },
  reducers: {
    productAdded: (state, action) => {
      const isProductAdded = state.items.find(
        (i) => i.id === action.payload.id
      );

      if (isProductAdded) {
        isProductAdded.count++;
      } else {
        state.items.push(action.payload);
      }

      state.totalPrice = state.items.reduce(
        (sum, item) => item.price * item.count + sum,
        0
      );
    },
    productRemoved: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      state.totalPrice = state.items.reduce(
        (sum, item) => item.price * item.count + sum,
        0
      );
    },
    cartCleared: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
    productCountDecreased: (state, action) => {
      const currentProduct = state.items.find((i) => i.id === action.payload);

      currentProduct.count--;

      state.totalPrice = state.items.reduce(
        (sum, item) => item.price * item.count + sum,
        0
      );
    },
  },
});

const { reducer: cartReducer, actions } = cartSlice;
const { productAdded, productRemoved, cartCleared, productCountDecreased } =
  actions;

export const addProductToCart = (data) => (dispatch) => {
  dispatch(productAdded(data));
};

export const decreaseProductCount = (id) => (dispatch, getState) => {
  const { items } = getState().cart;
  const currentProduct = items.find((i) => i.id === id);
  if (currentProduct.count === 1) {
    dispatch(productRemoved(id));
  } else {
    dispatch(productCountDecreased(id));
  }
};

export const removeProduct = (id) => (dispatch) => {
  dispatch(productRemoved(id));
};

export const clearCart = () => (dispatch) => {
  dispatch(cartCleared());
};

export const getCartItems = () => (state) => state.cart.items;
export const getTotalPrice = () => (state) => state.cart.totalPrice;
export const getCartItemsCount = () => (state) =>
  state.cart.items.reduce((sum, item) => item.count + sum, 0);
export const getProductCount = (id) => (state) => {
  const currentProduct = state.cart.items.find((i) => i.id === id);
  if (currentProduct) {
    return currentProduct.count;
  }
  return 0;
};

export default cartReducer;
