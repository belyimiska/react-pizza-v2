import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import filterReducer from "./filterSlice";
import pizzaReducer from "./pizzasSlice";

export const store = configureStore({
  reducer: { filter: filterReducer, cart: cartReducer, pizza: pizzaReducer },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
