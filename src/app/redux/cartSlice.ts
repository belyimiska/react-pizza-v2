import { RootState } from "./store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartItemsFromLS } from "../utils/getItemsFromLS";
import { calcTotalPrice } from "../utils/calcTotalPrice";

export type TCartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface ICartSlice {
  totalPrice: number;
  items: TCartItem[];
}

const { totalPrice, items } = getCartItemsFromLS();

const initialState: ICartSlice = {
  totalPrice,
  items,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    productAdded: (state, action: PayloadAction<TCartItem>) => {
      const isProductAdded = state.items.find(
        (i) => i.id === action.payload.id
      );

      if (isProductAdded) {
        isProductAdded.count++;
      } else {
        state.items.push(action.payload);
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    productRemoved: (state, action: PayloadAction<string>) => {
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
    productCountDecreased: (state, action: PayloadAction<string>) => {
      const currentProduct = state.items.find((i) => i.id === action.payload);

      if (currentProduct) {
        currentProduct.count--;
      }

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

export const addProductToCart = (data: TCartItem) => (dispatch: any) => {
  dispatch(productAdded(data));
};

export const decreaseProductCount =
  (id: string) => (dispatch: any, getState: any) => {
    const { items } = getState().cart;
    const currentProduct = items.find((i: any) => i.id === id);
    if (currentProduct.count === 1) {
      dispatch(productRemoved(id));
    } else {
      dispatch(productCountDecreased(id));
    }
  };

export const removeProduct = (id: string) => (dispatch: any) => {
  dispatch(productRemoved(id));
};

export const clearCart = () => (dispatch: any) => {
  dispatch(cartCleared());
};

export const getCartItems = () => (state: RootState) => state.cart.items;
export const getTotalPrice = () => (state: RootState) => state.cart.totalPrice;
export const getCartItemsCount = () => (state: RootState) =>
  state.cart.items.reduce((sum, item) => item.count + sum, 0);
export const getProductCount = (id: string) => (state: RootState) => {
  const currentProduct = state.cart.items.find((i) => i.id === id);
  if (currentProduct) {
    return currentProduct.count;
  }
  return 0;
};

export default cartReducer;
