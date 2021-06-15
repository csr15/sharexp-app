import {  SIGNUP } from "../actions/auth-actions";

const initialState = {
  signupData: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        signupData: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
