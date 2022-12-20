import { createSlice } from "@reduxjs/toolkit";
import { initialCategory } from "../api/categories";
import { initialSortItem } from "../api/sorts";

const initialState = {
  categoryId: initialCategory.id,
  sortItemId: initialSortItem.id,
  searchValue: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    categoryIdReceived: (state, action) => {
      state.categoryId = action.payload;
    },
    sortItemIdReceived: (state, action) => {
      state.sortItemId = action.payload;
    },
    searchValueReceived: (state, action) => {
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

export const setCategory = (id) => (dispatch) => {
  dispatch(categoryIdReceived(id));
};

export const setSortItem = (id) => (dispatch) => {
  dispatch(sortItemIdReceived(id));
};

export const setSearchValue = (data) => (dispatch) => {
  dispatch(searchValueReceived(data));
};

export const clearSearchValue = () => (dispatch) => {
  dispatch(searchValueCleared());
};

export const getCategoryId = () => (state) => state.filter.categoryId;
export const getSortItemId = () => (state) => state.filter.sortItemId;
export const getSearchValue = () => (state) => state.filter.searchValue;

export default filterReducer;
