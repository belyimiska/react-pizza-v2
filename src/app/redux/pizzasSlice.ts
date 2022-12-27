import { RootState } from "./store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type TPizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  category: number;
  rating: number;
};

export enum EStatus {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface IPizzaSLice {
  items: TPizzaItem[];
  status: EStatus;
}

export const fetchPizzas = createAsyncThunk<
  TPizzaItem[],
  Record<string, string>
>("pizza/fetchPizzasStatus", async (params) => {
  const { currentCategory, currentSort, currentOrder } = params;
  const { data } = await axios.get<TPizzaItem[]>(
    `https://639492654df9248eada64052.mockapi.io/items?${currentCategory}&sortBy=${currentSort}&order=${currentOrder}`
  );
  return data;
});

const initialState: IPizzaSLice = {
  items: [],
  status: EStatus.LOADING,
};

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    pizzasReceived: (state, action: PayloadAction<TPizzaItem[]>) => {
      state.items = action.payload;
      state.status = EStatus.SUCCESS;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = EStatus.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = EStatus.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = EStatus.ERROR;
      state.items = [];
    });
  },
});

const { reducer: pizzaReducer, actions } = pizzasSlice;
const { pizzasReceived } = actions;

// export const loadPizzasList = (data:TPizzaItem[]) => (dispatch) => {
//   dispatch(pizzasReceived(data));
// };

export const getPizzas = () => (state: RootState) => state.pizza.items;
export const getPizzasLoadingStatus = () => (state: RootState) =>
  state.pizza.status;

export default pizzaReducer;
