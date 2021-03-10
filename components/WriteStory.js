import React, { useState, useRef } from "react";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import {
  defaultActions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";

const WriteStory = ({ onPublish, onCancel }) => {
  const RichText = useRef(); //reference to the RichEditor component
  const [article, setArticle] = useState("");

  const confirmCancelHandler = () => {
    Alert.alert(
      "Are you sure!",
      "Cancel will discard all the changes are you sure you want to discard",
      [
        { text: "Keep Writting" },
        {
          text: "Discard",
          onPress: () => {
            setArticle("");
            onCancel();
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const formValidityHandler = () => {
    if (article === "") {
      Alert.alert(
        "Please fill all fields",
        "Write atleast 10 words to publish a story",
        [{ text: "okay" }],
        { cancelable: true }
      );
    }
    onPublish(article);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleTagContainer}>
        <View style={styles.spacer}>
          <Text style={styles.label}>Write a story</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={confirmCancelHandler}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={formValidityHandler}
            >
              <Text style={styles.saveButtonText}>PUBLISH</Text>
            </TouchableOpacity>
          </View>
        </View>
        <KeyboardAvoidingView>
          <ScrollView style={styles.editorContainer}>
            <RichEditor
              disabled={false}
              containerStyle={styles.editor}
              ref={RichText}
              style={styles.rich}
              placeholder={"Start Writing Here"}
              onChange={(text) => setArticle(text)}
            />
            <RichToolbar
              style={[styles.richBar]}
              editor={RichText}
              disabled={false}
              iconTint={Colors.accent}
              selectedIconTint={Colors.seconary}
              disabledIconTint={Colors.primaryShade}
              onPressAddImage={() => {}}
              iconSize={20}
            />
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={styles.steps}>
          <Text style={styles.stepsText}>Step: 2/2</Text>
        </View>
      </View>
    </View>
  );
};

export default WriteStory;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    paddingTop: 25,
  },
  titleTagContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontFamily: "Poppins_500Medium",
    marginVertical: 15,
    color: "black",
  },
  spacer: {
    borderBottomWidth: 1,
    borderBottomColor: "#d9d7d7",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    paddingVertical: 7,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
  },
  cancelButton: {
    marginRight: 15,
  },
  cancelButtonText: {
    color: Colors.accent,
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
  },
  // Rich Text Editor Styles
  editorContainer: {
    paddingVertical: 10,
  },
  editor: {
    backgroundColor: "black",
    borderColor: "#d9d7d7",
    borderWidth: 1,
    fontFamily: "Poppins_400Regular",
  },
  rich: {
    minHeight: 200,
    maxHeight: Dimensions.get("window").height / 2.1,
    flex: 1,
    fontFamily: "Merriweather_400Regular",
  },
  steps: {
    marginTop: 20,
  },
  stepsText: {
    color: Colors.accent,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
});
