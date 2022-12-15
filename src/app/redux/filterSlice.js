import { createSlice } from "@reduxjs/toolkit";
import { initialCategory } from "../api/categories";
import { initialSortItem } from "../api/sorts";

const initialState = {
  categoryId: initialCategory.id,
  sortItemId: initialSortItem.id,
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
  },
});

const { reducer: filterReducer, actions } = filterSlice;
const { categoryIdReceived, sortItemIdReceived } = actions;

export const setCategory = (id) => (dispatch) => {
  dispatch(categoryIdReceived(id));
};

export const setSortItem = (id) => (dispatch) => {
  dispatch(sortItemIdReceived(id));
};

export const getCategoryId = () => (state) => state.filter.categoryId;
export const getSortItemId = () => (state) => state.filter.sortItemId;

export default filterReducer;
