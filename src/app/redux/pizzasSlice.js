import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { currentCategory, currentSort, currentOrder } = params;
    const { data } = await axios.get(
      `https://639492654df9248eada64052.mockapi.io/items?${currentCategory}&sortBy=${currentSort}&order=${currentOrder}`
    );
    return data;
  }
);

const pizzasSlice = createSlice({
  name: "pizza",
  initialState: { items: [], status: "loading" },
  reducers: {
    pizzasReceived: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});

const { reducer: pizzaReducer, actions } = pizzasSlice;
const { pizzasReceived } = actions;

export const loadPizzasList = (data) => (dispatch) => {
  dispatch(pizzasReceived(data));
};

export const getPizzas = () => (state) => state.pizza.items;
export const getPizzasLoadingStatus = () => (state) => state.pizza.status;

export default pizzaReducer;
