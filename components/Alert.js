import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";

const Alert = ({ error, message }) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.wrapper,
          error ? { backgroundColor: Colors.errorMessage } : null,
        ]}
      ></View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default Alert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    width: "80%",
    borderRadius: 7,
    backgroundColor: Colors.buttonText,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  message: {
    color: "white",
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
  },
});
