import React from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Colors from "../constants/Colors";

const Button = ({ text, onClickHandler, loader }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={!loader ? onClickHandler : null}
      disabled={loader}
    >
      <Text style={styles.buttonText}>
        {loader ? <ActivityIndicator size="small" color="white" /> : text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 13,
    width: "100%",
    marginVertical: 20,
    backgroundColor: Colors.primary,
    borderRadius: 7,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins_500Medium",
    textTransform: "capitalize",
    flexDirection: "row",
    alignItems: "center",
  },
});
