import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { View, Text, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";

import NewStoryTitle from "../components/NewStoryTitle";
import WriteStory from "../components/WriteStory";
import Proxy from "../constants/Proxy";

const NewStory = (props) => {
  const [story, setStory] = useState({
    title: "",
    tags: "",
    img: "",
    content: "",
  });
  const [isStoryPublishing, setIsStoryPublishing] = useState(false);

  //Cleanup function
  useEffect(() => {
    return () => {
      setIsStoryPublishing(false);
      setStory({
        title: "",
        tags: "",
      });
    };
  }, [isStoryPublishing]);

  //mapStateToProps
  const state = useSelector(state => {
    return state.profile.userDetails
  })

  //Redux dispatcher
  const dispatch = useDispatch();

  const nextHandler = async ({ title, tags, img }) => {
    setStory({ ...story, title: title, tags: tags, img: "" });
  };

  const publishHandler = async (article) => {
    setIsStoryPublishing(true);

    try {
      const { data } = await axios.post(
        `${Proxy.proxy}/publish/${state._id}`,
        {
          uid: state._id,
          userName: state.userDetails.userName,
          story: {
            ...story,
            content: article,
          },
          createdAt: new Date(),
        }
      );
      dispatch({ type: "PUBLISHED" });
      props.navigation.navigate("Profile");
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Something went wrong",
        "Soemthing went wrong on uploading pleasetry again later!"
      );
      setIsStoryPublishing(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {story.title ? (
        <>
          <WriteStory
            onPublish={publishHandler}
            onCancel={() =>
              setStory({ title: "", img: "", content: "", tags: "" })
            }
          />
          <Loader visibility={isStoryPublishing} />
        </>
      ) : (
        <NewStoryTitle writeStoryHandler={nextHandler} />
      )}
    </View>
  );
};

export default NewStory;

NewStory.navigationOptions = {
  headerShown: false,
};
