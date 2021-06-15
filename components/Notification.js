import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";

const Notification = ({
  userName,
  content,
  storyTitle,
  createdAt,
  confirmDeletion,
  viewStory
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={confirmDeletion}
      onPress={viewStory}
    >
      <View style={styles.messageContainer}>
        <View style={styles.messageWrapper}>
          <Text style={styles.message}>
            <Text style={styles.userName}>@{userName}</Text>{" "}
            <Text style={styles.content}>{content}</Text>:{" "}
            <Text style={styles.title}>"{storyTitle}"</Text>
          </Text>
          <Text style={styles.createdAt}>{moment(createdAt).fromNow()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageWrapper: {},
  message: {
    fontFamily: "Poppins_400Regular",
  },
  content: {
    fontFamily: "Poppins_600SemiBold",
  },
  title: {
    fontFamily: "Poppins_400Regular",
    color: "black",
  },
  createdAt: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: Colors.accent,
    marginTop: 5,
  },
});
