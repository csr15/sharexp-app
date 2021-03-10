import axios from "axios";
import Proxy from "../../constants/Proxy";

export const LOGIN = "LOGIN";

export const loginHandler = (signInData) => {
  console.log(signInData);
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${Proxy.proxy}/auth/signin`, {
        data: {
          ...signInData,
        },
      });

      console.log(data);
    } catch (error) {
      console.log(error);
      throw new Error("Mail ID or Password is wrong");
    }
  };
};

export const singupHandler = (signupData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${Proxy.proxy}/auth/signup`, {
        ...signupData,
      });

      console.log(data);
      // dispatch({ type: "SIGNUP", payload: data });
    } catch (error) {
      throw new Error("Something went wrong on creating account");
    }
  };
};
