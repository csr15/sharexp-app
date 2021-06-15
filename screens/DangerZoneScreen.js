import React, { useState } from "react";
import { AsyncStorage, Linking, StyleSheet, Text, View } from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";

const DangerZone = (props) => {
  const [doConfirmation, setDoConfirmation] = useState(false);

  const dispatch = useDispatch();
  const logoutHandler = async () => {
    AsyncStorage.getAllKeys()
      .then((keys) => AsyncStorage.multiRemove(keys))
      .then(() => {
        dispatch({ type: "LOGOUT" });
        props.navigation.navigate("Startup");
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={logoutHandler}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <TouchableWithoutFeedback style={styles.button}>
        <Text style={styles.buttonText}>Version 1.0.0</Text>
      </TouchableWithoutFeedback>
      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL("https://sharexp.netlify.app")}
      >
        <Text style={styles.buttonText}>Visit Website </Text>
        <Ionicons name="arrow-forward-sharp" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          doConfirmation ? { borderBottomWidth: 0, paddingBottom: 5 } : null,
        ]}
        onPress={() => setDoConfirmation(!doConfirmation)}
      >
        <Text style={[styles.buttonText, , { color: "#ee3902" }]}>
          Delete My Account
        </Text>
      </TouchableOpacity>
      {doConfirmation && (
        <View style={styles.confirmationContainer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={
              doConfirmation ? () => setDoConfirmation(!doConfirmation) : null
            }
          >
            <Text style={styles.confirmButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default DangerZone;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  button: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText: {
    fontFamily: "Poppins_600SemiBold",
    color: "black",
  },
  confirmationContainer: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  confirmButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: Colors.border,
    borderRadius: 1000,
    marginRight: 20,
  },
  confirmButtonText: {
    color: "black",
    fontFamily: "Poppins_500Medium",
    textTransform: "uppercase",
    fontSize: 13,
  },
  deleteButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#f5dbd3",
    borderRadius: 1000,
  },
  deleteButtonText: {
    color: "#ee3902",
    fontFamily: "Poppins_500Medium",
    textTransform: "uppercase",
    fontSize: 13,
  },
  icon: {
    fontSize: 20,
    marginLeft: 5,
    paddingRight: 7,
    color: Colors.accent,
    transform: [{ rotate: "-45deg" }],
  },
});
