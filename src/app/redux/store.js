import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import filterReducer from "./filterSlice";
import pizzaReducer from "./pizzasSlice";

export const store = configureStore({
  reducer: { filter: filterReducer, cart: cartReducer, pizza: pizzaReducer },
});
