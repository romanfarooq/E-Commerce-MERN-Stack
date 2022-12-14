import { configureStore } from "@reduxjs/toolkit";
import { productDetailsReducer, productReducer } from "./reducers/productReducer";
import{ userReducer } from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    products: productReducer,
    product: productDetailsReducer,
    user: userReducer,
  },
});

export default store;
