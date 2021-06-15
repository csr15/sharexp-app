import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import Singin from "../components/Signin";
import Signup from "../components/Signup";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const AuthScreen = (props) => {
  const [isSignup, setIsSignup] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  //mapStateToProps
  const state = useSelector((state) => {
    return {
      signupData: state.auth.signupData,
    };
  });

  useEffect(() => {
    setIsSignup(false);
    if (state.signupData) {
      setShowAlert(true);
    }
  }, [state.signupData]);

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <View>
        <ScrollView>
          <View style={styles.header}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.headerLogo}
            />
            <Text style={styles.headerText}>shareXP</Text>
          </View>

          <>
            {!isSignup ? ( //Signin
              <Singin
                switchToSignupHandler={() => setIsSignup(true)}
                navigation={props.navigation}
              />
            ) : (
              <Signup switchToSignupHandler={() => setIsSignup(false)} />
            )}
          </>
          {showAlert ? (
            <View style={styles.alertContainer}>
              <View style={styles.alert}>
                <Text style={styles.alertMessage}>
                  Account created successfullt
                </Text>
                <TouchableOpacity>
                  <Ionicons
                    name="close-outline"
                    size={22}
                    color={Colors.accent}
                    onPress={() => setShowAlert(false)}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerLogo: {
    width: 20,
    height: 20,
    marginRight: 3,
  },
  headerText: {
    fontFamily: "Poppins_600SemiBold",
    color: Colors.primary,
  },
  alertContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  alert: {
    width: "90%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 5,
  },
  alertMessage: {
    fontFamily: "Poppins_500Medium",
  },
});

AuthScreen.navigationOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: "white" },
};

export default AuthScreen;
