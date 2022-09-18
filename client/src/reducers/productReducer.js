import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const productReducer = createReducer(initialState, {
  allProductsRequest: (state) => {
    state.loading = true;
  },
  allProductsSuccess: (state, action) => {
    state.loading = false;
    state.products = action.payload.products;
    state.productsCount = action.payload.productsCount;
  },
  allProductsFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});