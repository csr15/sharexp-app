import axios from "axios";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import Proxy from "../constants/Proxy";
import Button from "./Button";
import Input from "./Input";
import * as actions from "../store/actions/auth-actions";

const Signup = ({ switchToSignupHandler }) => {
  const [signupData, setSignupData] = useState({
    userName: "",
    sureName: "",
    mail: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isMailAvailable, setIsMailAvailable] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isMailValidityError, setIsMailValidityError] = useState(false);
  const [isSurenameError, setIsSurenameError] = useState(false);
  const [isUserNameError, setIsUserNameError] = useState(false);

  const ErrorAlert = () => {
    Alert.alert(
      "Something Went Wrong",
      "Something went wrong on updating details please try again",
      [{ text: "Ok" }],
      { cancelable: true }
    );
  };

  //Verifyin whether the entered mail ID is valid or not
  const mailValidationHandler = () => {
    if (signupData.mail) {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(signupData.mail.toLowerCase())) {
        setIsMailValidityError(true);
      } else {
        setIsMailValidityError(false);
      }
    }
  };

  //Checking whether the entered mail ID is available or not
  const mailAvailabilityHandler = async () => {
    if (!isMailValidityError) {
      try {
        const { data } = await axios.post(
          `${Proxy.proxy}/auth/mailValidation/${signupData.mail}`
        );

        console.log(data);
        if (data.length === 0) {
          setIsMailAvailable(false);
        } else setIsMailAvailable(true);
      } catch (error) {
        console.log(error);
        ErrorAlert();
      }
    }
  };

  //Validting the entered password
  const passwordValidationHandler = () => {
    if (signupData.password.length < 8) {
      setIsPasswordError(true);
    } else {
      setIsPasswordError(false);
    }
  };

  //Validting the entered username is available or not
  const userNameHandler = async () => {
    if (signupData.userName !== "") {
      try {
        const { data } = await axios.post(
          `${Proxy.proxy}/auth/checkUserName/${signupData.userName}`
        );

        if (data.length > 0) {
          setIsUserNameError(true);
        } else {
          setIsUserNameError(false);
        }
      } catch (error) {
        ErrorAlert();
      }
    }
  };

  //Validting the entered surename is valid nor not
  const sureNameHandler = (e) => {
    if (signupData.sureName !== "")
      if (/^[a-zA-Z ]+$/.test(signupData.sureName)) {
        setIsSurenameError(false);
      } else {
        setIsSurenameError(true);
      }
  };

  //Creating an account handler
  const dispatch = useDispatch();
  const formHandler = () => {
    if (
      signupData.mail === "" ||
      signupData.password === "" ||
      signupData.userName === "" ||
      signupData.sureName === ""
    ) {
      Alert.alert(
        "Please fill all fields",
        "Fill all fields to create an account",
        [{ text: "okay" }],
        { cancelable: true }
      );
    } else {
      console.log(
        isMailAvailable,
        !isUserNameError,
        !isSurenameError,
        !isPasswordError
      );
      if (
        (isMailAvailable !== "" || isMailAvailable === true) &&
        !isUserNameError &&
        !isSurenameError &&
        !isPasswordError
      ) {
        setIsLoading(false);
        dispatch(
          actions.singupHandler({
            data: {
              userName: signupData.userName,
              sureName: signupData.sureName,
              mail: signupData.mail.toLowerCase(),
              password: signupData.password,
            },
          })
        )
          .then((res) => {
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            Alert.alert(
              "Please fill all fields",
              err.message,
              [{ text: "okay" }],
              { cancelable: true }
            );
          });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to shareXP</Text>
      </View>
      <Input
        placeHolder="john_doe"
        label="Enter an User Name"
        id="SIGNUP-userName"
        validationHandler={userNameHandler}
        value={signupData.userName}
        errorMessage={
          isUserNameError ? "This user name is already in use " : null
        }
        inputHandler={(text) =>
          setSignupData({ ...signupData, userName: text })
        }
      />
      <Input
        placeHolder="John Doe"
        label="Enter Sure Name"
        id="SIGNUP-sureName"
        validationHandler={sureNameHandler}
        value={signupData.sureName}
        errorMessage={isSurenameError ? "Please enter a valid sure name" : null}
        inputHandler={(text) =>
          setSignupData({ ...signupData, sureName: text })
        }
      />
      <Input
        placeHolder="user@mail.com"
        label="Enter a Mail ID"
        id="SIGNUP-mail"
        validationHandler={mailValidationHandler}
        keyboard="email-address"
        value={signupData.mail}
        errorMessage={
          isMailValidityError ? "Please enter a valid Mail ID" : null
        }
        mailError={
          isMailAvailable && isMailAvailable
            ? "This mail ID is already in use"
            : null
        }
        inputHandler={(text) => setSignupData({ ...signupData, mail: text })}
      />
      <Input
        placeHolder="*****"
        label="Enter Password"
        id="SIGNIN-password"
        inputHandler={(text) =>
          setSignupData({ ...signupData, password: text })
        }
        value={signupData.password}
        onFocusHandler={mailAvailabilityHandler}
        isPassword
        validationHandler={passwordValidationHandler}
        errorMessage={
          isPasswordError ? "Password length should be minimum 8" : null
        }
      />
      <Button text="signup" onClickHandler={formHandler} loader={isLoading} />
      <View style={styles.signupContainer}>
        <Text style={styles.signup}>
          Already have an account?{" "}
          <Text style={styles.signupText} onPress={switchToSignupHandler}>
            SIGNIN
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Signup;

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
