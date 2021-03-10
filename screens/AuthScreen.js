import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Colors from "../constants/Colors";

const AuthScreen = () => {
  const [isSignup, setIsSignup] = useState(false);
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
            {!isSignup ? ( //Login
              <Login switchToSignupHandler={() => setIsSignup(true)} />
            ) : (
              <Signup switchToSignupHandler={() => setIsSignup(false)} />
            )}
          </>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
});

AuthScreen.navigationOptions = {
  headerShown: false,
};

export default AuthScreen;
