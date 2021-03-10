import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import StoryGrid from "../components/StoryGrid";
import Colors from "../constants/Colors";
import Proxy from "../constants/Proxy";

const TagStoriesScreen = (props) => {
  const [tagStories, setTagStories] = useState("");
  const [refreshLoader, setRefreshLoader] = useState(true);

  useEffect(() => {
    fetchTagStoriesHandler();
  }, []);

  const tagName = props.navigation.getParam("tagName");
  const tagImg = props.navigation.getParam("tagImg");
  const fetchTagStoriesHandler = async () => {
    try {
      const { data } = await axios.get(
        `${Proxy.proxy}/search/tagStories/${tagName.substr(1)}`
      );

      setTagStories(data);
    } catch (error) {
      Alert.alert(
        "Something went wrong!",
        `Could not fetch stories for ${tagName} tag please try again`,
        [{ text: "Okay" }],
        { cancelable: true }
      );
    }
  };

  const errorAlert = () => {
    Alert.alert(
      "Something went wrong",
      "Something went wrong on updating your request",
      [{ text: "Okay" }],
      { cancelable: true }
    );
  };

  const followTagHandler = async () => {
    try {
      const { data } = await axios.post(
        `${Proxy.proxy}/profile/followTag/5fba542cce69110017e2d13a`
      );
      console.log(data);
    } catch (error) {
      console.log(error);
      errorAlert();
    }
  };

  const unFollowTagHandler = async () => {
    try {
      const { data } = await axios.post(
        `${Proxy.proxy}/profile/unFollowTag/5fba542cce69110017e2d13a`
      );
      console.log(data);
    } catch (error) {
      console.log(error);
      errorAlert();
    }
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      {tagStories ? (
        <>
          <View style={styles.header}>
            <ImageBackground
              source={{ uri: tagImg }}
              style={styles.backgroundImage}
            >
              <LinearGradient
                colors={["rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 0.5)"]}
                start={[0, 0]}
                end={[0.5, 1]}
                style={styles.linearGradient}
              >
                <Text style={styles.tagName} numberOfLines={1}>
                  {tagName}
                </Text>
                <View style={styles.headerWrapper}>
                  <Text style={styles.views}>
                    {tagStories ? tagStories.length : 0} Stories
                  </Text>
                  <View style={styles.spacer}></View>
                  <TouchableOpacity
                    style={styles.followButton}
                    onPress={followTagHandler}
                  >
                    <Text style={styles.buttonText}>Follow</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>
          <StoryGrid
            fetchHandler={fetchTagStoriesHandler}
            refreshHandler={refreshLoader}
            data={tagStories}
            navigation={props.navigation}
          />
        </>
      ) : (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.seconary} />
        </View>
      )}
    </View>
  );
};

export default TagStoriesScreen;

const styles = StyleSheet.create({
  header: {
    height: 120,
    justifyContent: "center",
  },
  tagName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    color: "white",
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  views: {
    color: "white",
    fontFamily: "Poppins_500Medium",
  },
  spacer: {
    width: 3,
    height: 3,
    position: "relative",
    borderRadius: 1000,
    marginHorizontal: 10,
    backgroundColor: "white",
  },
  followButton: {},
  buttonText: {
    color: "white",
    fontFamily: "Poppins_500Medium",
    textTransform: "uppercase",
    color: Colors.seconary,
  },
  linearGradient: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
});

TagStoriesScreen.navigationOptions = (navData) => {
  const tagName = navData.navigation.getParam("tagName");

  return {
    headerTitle: () => (
      <Text
        numberOfLines={1}
        style={{ fontFamily: "Poppins_500Medium", fontSize: 18 }}
      >
        {tagName}
      </Text>
    ),
    cardStyle: {
      backgroundColor: "white",
    },
  };
};
