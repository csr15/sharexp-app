import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import StoryGrid from "../components/StoryGrid";

import Colors from "../constants/Colors";
import * as actions from "../store/actions/profile-actions";

const MyStoriesScreen = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const userDetails = useSelector((state) => {
    return state.profile.userDetails;
  });

  const dispatch = useDispatch();
  const fetchUserDetailsHandler = async () => {
    setIsRefreshing(true);
    if (userDetails) {
      dispatch(actions.fetchUserDetails(userDetails._id))
        .then(() => {
          setIsRefreshing(false);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <View style={styles.container}>
      {userDetails ? (
        <>
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              {userDetails.userDetails.hasOwnProperty("avatar") ? (
                <Image
                  source={{ uri: userDetails.userDetails.avatar }}
                  style={styles.avatar}
                />
              ) : (
                <Image
                  source={require("../assets/images/shareXP-draw.png")}
                  style={styles.avatar}
                />
              )}
            </View>
            <View style={styles.headerWrapper}>
              <Text style={styles.userName} numberOfLines={1}>
                {userDetails.userDetails.userName}
              </Text>
              <Text style={styles.count}>
                {userDetails.stories.length} Stories
              </Text>
            </View>
          </View>
          <Text style={styles.title}>My Stories</Text>
          <View style={styles.storiesContainer}>
            <StoryGrid
              fetchHandler={fetchUserDetailsHandler}
              refreshHandler={isRefreshing}
              data={userDetails.stories}
              navigation={props.navigation}
              myStories
            />
          </View>
        </>
      ) : (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.seconary} />
        </View>
      )}
    </View>
  );
};

export default MyStoriesScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
  header: {
    paddingVertical: 25,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
  },
  avatarContainer: {
    height: 70,
    width: 70,
    overflow: "hidden",
  },
  avatar: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: 1000,
    backgroundColor: Colors.primary,
  },
  userName: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
  },
  headerWrapper: {
    marginLeft: 10,
  },
  count: {
    fontFamily: "Poppins_400Regular",
    color: Colors.accent,
    fontSize: 13,
  },
  storiesTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins_400Regular",
    textTransform: "uppercase",
    color: Colors.accent,
    marginTop: 10,
    marginBottom: 15,
  },
  storiesContainer: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
