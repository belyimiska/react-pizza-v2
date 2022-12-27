import { RootState } from "./store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initCategoryId } from "../api/categories";
import { initSortItemId } from "../api/sorts";

interface IFilterSlice {
  categoryId: string;
  sortItemId: string;
  searchValue: string;
}

const initialState: IFilterSlice = {
  categoryId: initCategoryId,
  sortItemId: initSortItemId,
  searchValue: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    categoryIdReceived: (state, action: PayloadAction<string>) => {
      state.categoryId = action.payload;
    },
    sortItemIdReceived: (state, action: PayloadAction<string>) => {
      state.sortItemId = action.payload;
    },
    searchValueReceived: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    searchValueCleared: (state) => {
      state.searchValue = "";
    },
  },
});

const { reducer: filterReducer, actions } = filterSlice;
const {
  categoryIdReceived,
  sortItemIdReceived,
  searchValueReceived,
  searchValueCleared,
} = actions;

export const setCategory = (id: string) => (dispatch: any) => {
  dispatch(categoryIdReceived(id));
};

export const setSortItem = (id: string) => (dispatch: any) => {
  dispatch(sortItemIdReceived(id));
};

export const setSearchValue = (data: string) => (dispatch: any) => {
  dispatch(searchValueReceived(data));
};

export const clearSearchValue = () => (dispatch: any) => {
  dispatch(searchValueCleared());
};

export const getCategoryId = () => (state: RootState) =>
  state.filter.categoryId;
export const getSortItemId = () => (state: RootState) =>
  state.filter.sortItemId;
export const getSearchValue = () => (state: RootState) =>
  state.filter.searchValue;

export default filterReducer;
