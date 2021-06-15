import React, { useEffect } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
} from "react-native";

import * as actions from "../store/actions/profile-actions";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userDetails = await AsyncStorage.getItem("userDetails");
      const transformedData = JSON.parse(userDetails);

      if (!userDetails) {
        props.navigation.navigate("Auth");
        return;
      }

      dispatch(actions.fetchUserDetails(transformedData.uid));
      dispatch(actions.fetchNotifications(transformedData.uid));
      props.navigation.navigate("XP");
    };

    tryLogin();
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.seconary} />
    </View>
  );
};

export default StartupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
