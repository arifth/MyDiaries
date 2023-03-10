import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchText: "",
  page: 1,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    WORD_TYPED: (state, action) => {
      state.searchText = action.payload;
    },
    NUMBER_CLICKED: (state, action) => {
      state.page = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { WORD_TYPED, NUMBER_CLICKED } = searchSlice.actions;

const { reducer } = searchSlice;
export default reducer;
