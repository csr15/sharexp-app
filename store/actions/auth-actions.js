import axios from "axios";
import { AsyncStorage } from "react-native";
import Proxy from "../../constants/Proxy";

export const SIGNIN = "SIGIN";
export const SIGNUP = "SIGNUP";

export const signinHandler = (signInData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${Proxy.proxy}/auth/signin`, {
        ...signInData,
      });

      saveData(data.userDetails.uid);
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

      dispatch({ type: "SIGNUP", payload: data });
    } catch (error) {
      throw new Error("Something went wrong on creating account");
    }
  };
};

const saveData = async (data) => {
  try {
    await AsyncStorage.setItem(
      "userDetails",
      JSON.stringify({
        uid: data,
      })
    );
  } catch (error) {
    // Error saving data
    console.log(error);
  }
};
