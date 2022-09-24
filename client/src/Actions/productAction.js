import axios from "axios";
const URL = process.env.REACT_APP_SERVER_URL;

export const getProducts = (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) => async (dispatch) => {
  try {
    dispatch({ type: "allProductsRequest" });

    let link;

    if (category) {
      link = `${URL}/api/product/getAll?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    } else {
      link = `${URL}/api/product/getAll?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
    }

    const { data } = await axios.get(link);

    dispatch({ type: "allProductsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "allProductsFail",
      payload: error.response.data.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "productDetailsRequest" });

    const { data } = await axios.get(`${URL}/api/product/get/${id}`);

    dispatch({ type: "productDetailsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "productDetailsFail",
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: "clearErrors" });
};
