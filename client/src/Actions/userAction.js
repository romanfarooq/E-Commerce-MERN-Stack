import axios from "axios";
const URL = process.env.REACT_APP_SERVER_URL;

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${URL}/api/user/login`,
      { email, password },
      config
    );

    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "loginFail",
      payload: error.response.data.message,
    });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "registerRequest" });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      `${URL}/api/user/register`,
      userData,
      config
    );

    dispatch({ type: "registerSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "registerFail",
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => (dispatch) => {
    dispatch({ type: "clearErrors" });
};