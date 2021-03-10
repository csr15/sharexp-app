import React from "react";
import { StyleSheet, Text, View, Modal } from "react-native";
import Colors from "../constants/Colors";

const Loader = ({ visibility }) => {
  return (
    <>
      <Modal transparent={true} visible={visibility}>
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}
          >
            <View
              style={{
                width: 250,
                height: 80,
                backgroundColor: 'white',
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 7,
              }}
            >
              <Text style={styles.text}>🚀 Your story is publishing...</Text>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.backdrop}></View>
    </>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 7,
    backgroundColor: "white",
  },
  text: {
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
  backdrop: {
    position: "absolute",
    flex: 1,
    backgroundColor: "red",
  },
});
