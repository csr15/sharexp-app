import { USER_DETAILS, NOTIFICATION } from "../actions/profile-actions";

const initalState = {
  userDetails: "",
  notifications: "",
};

const profileReducer = (state = initalState, action) => {
  switch (action.type) {
    case USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case NOTIFICATION:
      return {
        ...state,
        notifications: action.payload,
      };
    case "LOGOUT":
      return {
        userDetails: "",
        notifications: "",
      };
    default:
      return state;
  }
};

export default profileReducer;
