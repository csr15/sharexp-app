import axios from "axios";
import Proxy from "../../constants/Proxy";

export const USER_DETAILS = "USER_DETAILS";
export const NOTIFICATION = "NOTIFICATION";

export const fetchUserDetails = (uid) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${Proxy.proxy}/profile/${uid}`);

      dispatch({ type: USER_DETAILS, payload: data[0] });
    } catch (error) {
      throw new Error("Something went wrong on fetching, please try again!");
    }
  };
};

export const fetchNotifications = (uid) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${Proxy.proxy}/profile/notifications/${uid}`
      );

      dispatch({type: NOTIFICATION, payload: data})
    } catch (error) {
      throw new Error("Unable to fetch notifications, Please try again");
    }
  };
};
