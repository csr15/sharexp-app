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
      "Something went wrong on updaying details please try again",
      [{ text: "Ok" }],
      { cancelable: true }
    );
  };

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

  const mailAvailabilityHandler = async () => {
    if (signupData.mail) {
      try {
        const { data } = await axios.post(
          `${Proxy.proxy}/auth/mailValidation/${signupData.mail}`
        );

        console.log(data);
        if (data.length === 0) {
          setIsMailAvailable(data);
        } else setIsMailAvailable("");
      } catch (error) {
        ErrorAlert();
      }
    }
  };

  const passwordValidationHandler = () => {
    if (signupData.password.length < 8) {
      setIsPasswordError(true);
    } else {
      setIsPasswordError(false);
    }
  };

  const userNameHandler = async () => {
    if (signupData.userName !== "") {
      try {
        const { data } = await axios.post(
          `${Proxy.proxy}/auth/checkUserName/${signupData.userName}`
        );

        console.log(data);
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

  const sureNameHandler = (e) => {
    if (signupData.sureName !== "")
      if (/^[a-zA-Z ]+$/.test(signupData.sureName)) {
        setIsSurenameError(false);
      } else {
        setIsSurenameError(true);
      }
  };

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
      if (
        isMailAvailable &&
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
            console.log(res);
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
        errorMessage={
          isMailValidityError ? "Please enter a valid Mail ID" : null
        }
        mailError={isMailAvailable ? "This mail ID is already in use" : null}
        inputHandler={(text) => setSignupData({ ...signupData, mail: text })}
      />
      <Input
        placeHolder="*****"
        label="Enter Password"
        id="LOGIN-password"
        inputHandler={(text) =>
          setSignupData({ ...signupData, password: text })
        }
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
            LOGIN
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
