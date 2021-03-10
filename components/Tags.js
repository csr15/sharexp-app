import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

const Tags = ({ tagTitle, newTags, removeTagHandler, viewTagStories }) => {
  return (
    <TouchableOpacity
      style={styles.tag}
      onPress={newTags ? removeTagHandler : viewTagStories}
    >
      <Text style={styles.tagText}>{tagTitle}</Text>
      {newTags ? <Ionicons name="close-outline" style={styles.icon} /> : null}
    </TouchableOpacity>
  );
};

export default Tags;

const styles = StyleSheet.create({
  tag: {
    backgroundColor: Colors.border,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginRight: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  tagText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
  },
  icon: {
    color: "black",
    marginLeft: 5,
    fontSize: 14,
  },
});
