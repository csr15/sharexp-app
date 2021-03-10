import React from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

const Story = ({ viewStoryHandler, userName, createdAt, story, views }) => {
  const cleanText = story.content.replace(/<\/?[^>]+(>|$)/g, "");
  return (
    <TouchableOpacity
      style={styles.story}
      activeOpacity={0.5}
      onPress={viewStoryHandler}
    >
      <View style={styles.content}>
        <Text style={styles.author}>from {userName}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {story.title}
        </Text>
        <Text style={styles.storyContent} numberOfLines={1}>
          {cleanText}
        </Text>
        <View style={styles.reaction}>
          <View style={styles.reactionContainer}>
            <Ionicons name="time" size={14} style={styles.icon} />
            <Text style={styles.reactionText}>
              {((text) => {
                text = text.trim();
                const totalWords =
                  text.length > 0 ? text.split(/\s+/).length : 0;
                const totalMinutes = totalWords / 200;
                return Math.floor(totalMinutes);
              })(story.content)}
            </Text>
          </View>
          <View style={styles.reactionContainer}>
            <Ionicons name="eye" size={14} style={styles.icon} />
            <Text style={styles.reactionText}>{views}</Text>
          </View>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={
            story.img
              ? { uri: story.img }
              : require("../assets/images/shareXP-draw.png")
          }
          style={styles.image}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Story;

const styles = StyleSheet.create({
  story: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  imageContainer: {
    width: "30%",
    height: 130
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.primary
  },
  author: {
    color: Colors.accent,
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
  },
  title: {
    color: "black",
    fontFamily: "Poppins_600SemiBold",
    lineHeight: 21,
    fontSize: 16,
  },
  storyContent: {
    color: Colors.accent,
    fontSize: 14,
    marginVertical: 2,
    fontFamily: "Poppins_400Regular",
  },
  content: {
    justifyContent: "flex-start",
    height: "100%",
    paddingRight: 10,
    width: "70%",
  },
  reaction: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 3,
    paddingHorizontal: 5,
  },
  reactionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  icon: {
    marginRight: 5,
    color: "#939596",
  },
  reactionText: {
    color: Colors.accent,
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
  },
  spacer: {
    position: "relative",
    width: 4,
    height: 4,
    backgroundColor: "#d4d4d4",
    borderRadius: 100,
  },
});
