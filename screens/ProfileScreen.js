import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import PublishedAlert from "../components/PublishedAlert";

const ProfileScreen = () => {
  //Redux states
  const state = useSelector((state) => {
    return {
      didPublished: state.newStory.didPublished,
    };
  });
  return (
    <View>
      <Text>Profile Screen</Text>
      {state.didPublished && <PublishedAlert />}
    </View>
  );
};

export default ProfileScreen;
