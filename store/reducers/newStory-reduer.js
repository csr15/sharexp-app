const initialState = {
  didPublished: false,
};

const newStoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PUBLISHED":
      return {
        didPublished: true,
      };
    case "RESET_PUBLISHED":
      return {
        didPublished: false,
      };
    default:
      return state;
  }
};

export default newStoryReducer;
