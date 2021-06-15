import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../components/Notification";
import Proxy from "../constants/Proxy";

import * as actions from "../store/actions/profile-actions";

const NotificationScreen = (props) => {
  const [isRefreshing, setiIsRefreshing] = useState(false);

  useEffect(() => {
    fetchNotificationHandler();
  }, []);

  const state = useSelector((state) => {
    return {
      notifications: state.profile.notifications,
      userDetails: state.profile.userDetails,
    };
  });

  const dispatch = useDispatch();
  const fetchNotificationHandler = () => {
    setiIsRefreshing(true);
    dispatch(actions.fetchNotifications(state.userDetails._id))
      .then(() => {
        setiIsRefreshing(false);
      })
      .catch((err) => {
        setiIsRefreshing(false);
        console.log(err);
      });
  };

  const deleteNotificationHandler = async (id) => {
    try {
      const { data } = await axios.patch(
        `${Proxy.proxy}/profile/clearNotification/${id}/${state.userDetails._id}`
      );

      fetchNotificationHandler();
    } catch (error) {
      Alert.alert(
        "Something Went Wrong",
        "Can't able to clear notification, please try again !",
        [{ text: "OKay" }],
        { cancelable: true }
      );
    }
  };

  const confirmDeletionHandler = (id) => {
    Alert.alert(
      "Are you sure",
      "Are you sure to delete this notification?",
      [
        { text: "okay", onPress: () => deleteNotificationHandler(id) },
        { text: "cancel" },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {state.notifications && state.notifications.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.message}>No Notifications</Text>
        </View>
      ) : (
        <FlatList
          data={state.notifications}
          onRefresh={fetchNotificationHandler}
          refreshing={isRefreshing}
          keyExtractor={(key, index) => key + index}
          renderItem={({ item }) => {
            return (
              <Notification
                style={{ flex: 1 }}
                userName={item.userName}
                content={item.content}
                storyTitle={item.storyTitle}
                createdAt={item.createdAt}
                confirmDeletion={confirmDeletionHandler.bind(this, item._id)}
                viewStory={() =>
                  props.navigation.navigate("ViewStory", {
                    storyId: item.storyId,
                    title: item.storyTitle,
                    authorId: item.authorId,
                  })
                }
              />
            );
          }}
        />
      )}
    </View>
  );
};

export default NotificationScreen;

NotificationScreen.navigationOptions = {
  cardStyle: { backgroundColor: "white" },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontFamily: "Poppins_500Medium",
  },
});
