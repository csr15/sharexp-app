import React from "react";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
// import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";
import Tags from "./Tags";

const NewStoryTitle = (props) => {
  const [addedTags, setAddedTags] = useState([]);
  const [tagName, setTagName] = useState("");
  const [title, setTitle] = useState("");

  const addtagHandler = () => {
    if (tagName === "") {
      return;
    } else {
      if (tagName.indexOf("#") === -1) {
        setAddedTags((prevAddedTags) => [
          ...prevAddedTags,
          `#${tagName.toLowerCase()}`,
        ]);
        setTagName("");
      } else {
        setAddedTags((prevAddedTags) => [
          ...prevAddedTags,
          tagName.toLowerCase(),
        ]);
        setTagName("");
      }
    }
  };

  const removeTag = (tag) => {
    const filteredTags = addedTags.filter((el) => {
      return el !== tag;
    });
    setAddedTags([...filteredTags]);
  };

  const nextHandler = () => {
    if (addedTags.length === 0 || title === "") {
      Alert.alert(
        "Please fill all fields",
        "Fill all fields to write a new story",
        [{ text: "okay" }],
        { cancelable: true }
      );
    }

    props.writeStoryHandler({
      title: title,
      tags: addedTags,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Add a <Text style={styles.spanText}>Title & Tags</Text> to Your
            Story
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.titleTagContainer}>
            <Text style={styles.label}>Add a title</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="How to ..?"
                value={title}
                onChangeText={(text) => setTitle(text)}
              />
            </View>
          </View>
          <View style={styles.titleTagContainer}>
            <Text style={styles.label}>Add some tags</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="#technology"
                value={tagName}
                onChangeText={(text) => setTagName(text)}
              />
              {tagName ? (
                <TouchableOpacity style={styles.tagButton}>
                  <Text style={styles.tagButtonText} onPress={addtagHandler}>
                    ADD
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
            {addedTags.length > 0 && (
              <View style={styles.allTags}>
                <Text style={styles.label}>All Tags</Text>
                <ScrollView horizontal>
                  {addedTags.map((tagTitle, index) => {
                    return (
                      <Tags
                        newTags
                        key={index}
                        tagTitle={tagTitle}
                        removeTagHandler={removeTag.bind(this, tagTitle)}
                      />
                    );
                  })}
                </ScrollView>
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.button} onPress={nextHandler}>
            <Text style={styles.buttonText}>
              Write a story
              {/* <Ionicons color="white" name="arrow-forward-outline" size={16} /> */}
            </Text>
          </TouchableOpacity>
          <View style={styles.steps}>
            <Text style={styles.stepsText}>Step: 1/2</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default NewStoryTitle;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: "center",
  },
  header: {
    justifyContent: "center",
    marginTop: 150,
  },
  headerText: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    color: "black",
    textAlign: "center",
  },
  spanText: {
    color: Colors.primary,
  },
  inputContainer: {
    width: "100%",
  },
  titleTagContainer: {
    marginVertical: 10,
  },
  inputWrapper: {
    // backgroundColor: Colors.commentInput,
    padding: 0,
    flexDirection: "row",
    width: "100%",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#d9d7d7",
  },
  label: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    marginBottom: 5,
    color: Colors.accent,
  },
  input: {
    width: "80%",
    paddingVertical: 13,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
  },
  allTags: {
    marginTop: 20,
  },
  tagButton: {
    paddingVertical: 15,
    marginRight: 10,
  },
  tagButtonText: {
    color: "black",
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
  },
  button: {
    paddingVertical: 13,
    width: "100%",
    marginVertical: 20,
    backgroundColor: Colors.primary,
    borderRadius: 7,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins_500Medium",
    textTransform: "capitalize",
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    paddingVertical: 13,
    width: "100%",
    borderWidth: 1,
    borderColor: "#d9d7d7",
    borderRadius: 7,
    alignItems: "center",
    marginTop: 20,
  },
  imageContainerText: {
    color: Colors.accent,
    fontFamily: "Poppins_500Medium",
    textTransform: "capitalize",
    flexDirection: "row",
    alignItems: "center",
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
