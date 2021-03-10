import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";

const PublishedAlert = () => {
  const dispatch = useDispatch();
  const closeAlertHandler = () => {
    dispatch({ type: "RESET_PUBLISHED" });
  };
  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={closeAlertHandler}
    >
      <View style={styles.wrapper}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../assets/images/check-circle.gif")}
            style={styles.gif}
          />
          <Text style={styles.text}>Hurray! Your story published</Text>
        </View>
        <TouchableOpacity>
          <Ionicons
            name="close-outline"
            size={22}
            color={Colors.accent}
            onPress={closeAlertHandler}
          />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PublishedAlert;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    width: "90%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 8,
    backgroundColor: "white",
    borderRadius: 5,
  },
  gif: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  text: {
    fontFamily: "Poppins_500Medium",
  },
});
