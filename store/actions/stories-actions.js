import axios from "axios";
import Proxy from "../../constants/Proxy";

export const TOP_STORIES = "TOP_STORIES";
export const LATEST_STORIES = "LATEST_STORIES";

export const fetchTopStories = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${Proxy.proxy}/userStories/stories/topStories`
      );

      dispatch({ type: TOP_STORIES, payload: data });
    } catch (error) {
      throw new Error("Something went wrong on fetching stories");
    }
  };
};

export const fetchLatestStories = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${Proxy.proxy}/userStories/stories/latestStories`
      );

      dispatch({ type: LATEST_STORIES, payload: data });
    } catch (error) {
      throw new Error("Something went wrong on fetching stories");
    }
  };
};

export const addComment = (data) => {
  const {
    commentText,
    avatar,
    storyId,
    authorId,
    storyTitle,
    uid,
    userName,
  } = data;

  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${Proxy.proxy}/publish/comment/${storyId}`,
        {
          comment: {
            userName: userName,
            uid: uid,
            comment: commentText,
            commentedAt: new Date(),
            avatar: avatar,
          },
          notification: {
            storyId: storyId,
            uid: uid,
            authorId: authorId,
            userName: userName,
            storyTitle: storyTitle,
          },
        }
      );

      dispatch({ type: "COMMENTS", payload: data });
    } catch (error) {
      throw new Error(
        "Something went wrong on updating comment, Please try again!"
      );
    }
  };
};
