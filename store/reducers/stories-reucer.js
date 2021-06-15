import {
  TOP_STORIES,
  LATEST_STORIES,
  FOLLOWING_STORIES,
} from "../actions/stories-actions";

const initialState = {
  topStories: "",
  latestStories: "",
  followingStories: "",
  comments: "",
};

const storiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOP_STORIES:
      return {
        ...state,
        topStories: action.payload,
      };
    case LATEST_STORIES:
      return {
        ...state,
        latestStories: action.payload,
      };
    case FOLLOWING_STORIES:
      return {
        ...state,
        followingStories: action.payload,
      };
    case "COMMENTS":
      return {
        ...state,
        comments: action.payload,
      };
    case "RESET_COMMENT":
      return {
        ...state,
        comments: [],
      };
    default:
      return state;
  }
};

export default storiesReducer;
