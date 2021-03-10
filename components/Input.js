import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Colors from "../constants/Colors";

const Input = ({
  id,
  label,
  placeHolder,
  validationHandler,
  onFocusHandler,
  inputHandler,
  errorMessage,
  isPassword,
  mailError,
}) => {
  console.log(mailError)
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeHolder}
        onFocus={onFocusHandler}
        onChangeText={inputHandler}
        onBlur={validationHandler}
        secureTextEntry={isPassword}
        autoCompleteType="off"
        autoCapitalize="none"
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      {mailError && <Text style={styles.error}>{mailError}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    marginBottom: 5,
    color: Colors.accent,
  },
  input: {
    width: "100%",
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    borderRadius: 7,
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#d9d7d7",
  },
  error: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    marginBottom: 5,
    color: Colors.error,
    marginTop: 5,
  },
});
