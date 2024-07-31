import { configureStore } from "@reduxjs/toolkit";
import chemicalsReducer from "./ChemicallSlice";

const store = configureStore({
  reducer: {
    chemicals: chemicalsReducer,
  },
});
export default store;
