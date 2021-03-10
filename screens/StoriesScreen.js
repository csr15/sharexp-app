import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../constants/Colors";
import Story from "../components/Story";
import * as actions from "../store/actions/stories-actions";
import StoryGrid from "../components/StoryGrid";

const StoriesScreen = (props) => {
  const [refreshLoader, setRefreshLoader] = useState(true);
  const [storyType, setStoryType] = useState("top");

  //MapStateToProps;
  const dispatch = useDispatch();
  const mapDispatchtoProps = {
    topStories: actions.fetchTopStories(),
    latestStories: actions.fetchLatestStories(),
  };

  //MapStatetoProps
  const state = useSelector((state) => {
    return {
      topStories: state.stories.topStories,
      latestStories: state.stories.latestStories,
    };
  });

  useEffect(() => {
    if (storyType === "top") fetchTopStoriesHandler();
    else if (storyType === "latest") fetchLatestStoriesHandler();
  }, [storyType]);

  const fetchTopStoriesHandler = () => {
    dispatch(mapDispatchtoProps.topStories);
  };

  const fetchLatestStoriesHandler = () => {
    dispatch(mapDispatchtoProps.latestStories);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
        <ScrollView horizontal style={styles.options}>
          <TouchableOpacity
            style={styles.optionView}
            onPress={() => setStoryType("top")}
          >
            <Text
              style={[
                styles.optionText,
                storyType === "top" ? { color: "#000000" } : null,
              ]}
            >
              Top Stories
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionView}
            onPress={() => setStoryType("latest")}
          >
            <Text
              style={styles.optionText}
              style={[
                styles.optionText,
                storyType === "latest" ? { color: "#000000" } : null,
              ]}
            >
              Recent Stories
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionView}
            onPress={() => setStoryType("following")}
          >
            <Text
              style={styles.optionText}
              style={[
                styles.optionText,
                storyType === "following" ? { color: "#000000" } : null,
              ]}
            >
              Following Tags
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {storyType === "top" &&
        (state.topStories ? (
          <StoryGrid
            fetchHandler={fetchTopStoriesHandler}
            refreshHandler={refreshLoader}
            data={state.topStories}
            navigation={props.navigation}
          />
        ) : (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={Colors.seconary} />
          </View>
        ))}

      {storyType === "latest" ? (
        state.latestStories ? (
          <StoryGrid
            fetchHandler={fetchLatestStoriesHandler}
            refreshHandler={refreshLoader}
            data={state.latestStories}
            navigation={props.navigation}
          />
        ) : (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={Colors.seconary} />
          </View>
        )
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
  },
  logo: {
    width: 20,
    height: 20,
    marginHorizontal: 15,
  },
  optionView: {
    marginHorizontal: 10,
  },
  optionText: {
    color: "#000000",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: Colors.accent,
  },
  loader: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

StoriesScreen.navigationOptions = (navData) => {
  return {
    headerShown: false,
    cardStyle: {
      backgroundColor: "white",
    },
  };
};

export default StoriesScreen;
