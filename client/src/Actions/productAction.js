import axios from "axios";
const URL = process.env.REACT_APP_SERVER_URL;

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "allProductsRequest" });

    const { data } = await axios.get(`${URL}/api/product/getAll`);

    dispatch({ type: "allProductsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "allProductsFail",
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "clearErrors" });
};
