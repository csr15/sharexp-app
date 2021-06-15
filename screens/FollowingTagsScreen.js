import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../store/actions/profile-actions";
import Colors from "../constants/Colors";
import axios from "axios";
import Proxy from "../constants/Proxy";

const FollowingTag = ({ tagName, unFollow }) => (
  <View style={styles.tagWrapper}>
    <Text style={styles.tagName} numberOfLines={1}>
      {tagName}
    </Text>
    <TouchableOpacity style={styles.tagButton} onPress={unFollow}>
      <Text style={styles.tagButtonText}>UNFOLLOW</Text>
    </TouchableOpacity>
  </View>
);

const FollowingTagsScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const userDetails = useSelector((state) => {
    return state.profile.userDetails;
  });

  const dispatch = useDispatch();
  const fetchUserDetailsHandler = () => {
    setIsRefreshing(true);
    dispatch(actions.fetchUserDetails(userDetails._id))
      .then(() => {
        setIsRefreshing(false);
      })
      .catch((err) => console.log(err));
  };

  const unFollowTagHandler = async (tagName) => {
    try {
      const { data } = await axios.post(
        `${Proxy.proxy}/profile/unFollowTag/${userDetails._id}`,
        {
          tagName: tagName,
        }
      );

      fetchUserDetailsHandler();
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Something Went Wrong",
        "Can't update following list, Please try again!",
        [{ text: "Okay" }],
        { cancelable: true }
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Following Tags</Text>
      {userDetails ? (
        userDetails && userDetails.userDetails.following.length === 0 ? (
          <View style={styles.messageContainer}>
            <Text style={styles.message}></Text>
          </View>
        ) : (
          <View>
            <View style={styles.tagContainer}>
              <FlatList
                onRefresh={fetchUserDetailsHandler}
                refreshing={isRefreshing}
                data={userDetails.userDetails.following}
                keyExtractor={(key, index) => "key" + index}
                renderItem={({ item }) => (
                  <FollowingTag
                    tagName={item}
                    unFollow={unFollowTagHandler.bind(this, item)}
                  />
                )}
              />
            </View>
          </View>
        )
      ) : (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.seconary} />
        </View>
      )}
    </View>
  );
};

export default FollowingTagsScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
  title: {
    fontFamily: "Poppins_400Regular",
    textTransform: "uppercase",
    color: Colors.accent,
    marginTop: 10,
  },
  tagContainer: {
    marginTop: 10,
  },
  tagWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tagName: {
    width: "80%",
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: 'black'
  },
  tagButton: {
    paddingRight: 5,
  },
  tagButtonText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#EE3902",
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontFamily: "Poppins_500Medium",
    color: "black",
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
