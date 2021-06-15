import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../constants/Colors";

import * as actions from "../store/actions/auth-actions";
import Button from "./Button";
import Input from "./Input";

const Signin = ({ navigation, switchToSignupHandler }) => {
  const [mail, setMail] = useState("");
  const [isMailNotValid, setIsMailNotValid] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const state = useSelector((state) => {
    return {
      signupData: state.auth.signupData,
    };
  });

  useEffect(() => {
    setMail(state.signupData.mail);
  }, [state.signupData]);

  const mailValidationHandler = () => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(mail.toLowerCase())) {
      setIsMailNotValid(true);
    } else {
      setIsMailNotValid(false);
    }
  };

  const dispatch = useDispatch();
  const formHandler = () => {
    if (mail === "" && password === "") {
      Alert.alert(
        "Please fill all fields",
        "Fill all fields to signin",
        [{ text: "okay" }],
        { cancelable: true }
      );
    } else {
      setIsLoading(true);
      dispatch(
        actions.signinHandler({
          data: {
            mail: mail.toLowerCase(),
            password: password,
          },
        })
      )
        .then((res) => {
          setIsLoading(false);
          navigation.navigate("Startup");
        })
        .catch((err) => {
          setIsLoading(false);
          Alert.alert("Problem on Signin", err.message, [{ text: "okay" }], {
            cancelable: true,
          });
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome back to shareXP</Text>
      </View>
      <Input
        placeHolder="user@mail.com"
        label="Your Mail ID"
        id="SIGIN-mail"
        keyboard="email-address"
        value={mail}
        validationHandler={mailValidationHandler}
        errorMessage={isMailNotValid ? "Please enter a valid email ID " : null}
        inputHandler={(text) => setMail(text)}
      />
      <Input
        placeHolder="*****"
        label="Enter Password"
        id="SIGIN-password"
        value={password}
        inputHandler={(text) => setPassword(text)}
        isPassword
      />
      <Button text="signin" onClickHandler={formHandler} loader={isLoading} />
      <View style={styles.signupContainer}>
        <Text style={styles.signup}>
          Don't have an account?{" "}
          <Text style={styles.signupText} onPress={switchToSignupHandler}>
            SINGNUP
          </Text>{" "}
        </Text>
      </View>
    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
  header: {
    marginVertical: 20,
    marginBottom: 30,
  },
  headerText: {
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
  },
  signupContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  signup: {
    color: Colors.accent,
    fontFamily: "Poppins_500Medium",
  },
  signupText: {
    color: "black",
    textAlign: "center",
  },
});
