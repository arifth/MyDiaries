import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import searchReducer from "./searchSlice";

const reducer = {
  auth: authReducer,
  search: searchReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
