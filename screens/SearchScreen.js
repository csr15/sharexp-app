import React, { useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import axios from "axios";
import Proxy from "../constants/Proxy";
import Tag from "../components/Tag";

const SearchScreen = (props) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [topTags, setTopTags] = React.useState("");
  const [searchedTag, setSearchedTag] = React.useState("");
  const [isErrorOnSearch, setIsErrorOnSearch] = React.useState(false);

  useEffect(() => {
    fetchTopTags();
  }, []);

  let fieldsNotFilled = () =>
    Alert.alert(
      "Please type something to search",
      "To search a tag you need to enter some search term",
      [{ text: "Ok" }],
      { cancelable: true }
    );

  let errorOnFetching = () =>
    Alert.alert(
      "Problem Occured",
      "Something went wrong on fetching detil please try again",
      [{ text: "Ok" }],
      { cancelable: true }
    );

  const fetchTopTags = useCallback(async () => {
    try {
      const { data } = await axios.get(`${Proxy.proxy}/search/topTags`);

      setTopTags(data);
    } catch (error) {
      Alert.alert(
        "Problem occured",
        "went wrong on fetching tags",
        [{ text: "Ok" }],
        { cancelable: true }
      );
    }
  });

  const searchHandler = useCallback(async () => {
    if (searchValue !== "") {
      if (searchValue.indexOf("#") === -1) {
        try {
          const { data } = await axios.get(
            `${Proxy.proxy}/search?search=%23${searchValue.toLocaleLowerCase()}`
          );

          setSearchedTag(data);
        } catch (error) {
          errorOnFetching();
        }
      } else {
        try {
          const { data } = await axios.get(
            `${Proxy.proxy}/search?search=%23${searchValue
              .substr(1)
              .toLocaleLowerCase()}`
          );

          setSearchedTag(data);
        } catch (error) {
          errorOnFetching();
        }
      }
    } else {
      fieldsNotFilled();
    }
  });

  let searchDOM;

  if (searchValue !== "" && searchedTag) {
    searchDOM = (
      <View style={styles.tagsContainer}>
        <FlatList
          data={searchedTag}
          keyExtractor={(key, index) => "key" + index}
          renderItem={({ item }) => {
            return (
              <Tag
                tagTitle={item._id}
                views={item.totalStories}
                tagStoriesHandler={(tagName, randomImg) =>
                  props.navigation.navigate("TagStories", {
                    tagName: tagName,
                    tagImg: randomImg,
                  })
                }
              />
            );
          }}
        />
      </View>
    );
  } else {
    searchDOM = (
      <View style={styles.tagsContainer}>
        <FlatList
          data={topTags}
          keyExtractor={(key, index) => "key" + index}
          renderItem={({ item }) => {
            return (
              <Tag
                tagTitle={item._id}
                views={item.totalStories}
                tagStoriesHandler={(tagName, randomImg) =>
                  props.navigation.navigate("TagStories", {
                    tagName: tagName,
                    tagImg: randomImg,
                  })
                }
              />
            );
          }}
        />
      </View>
    );
  }

  if (searchValue === "" && searchedTag) {
    setSearchedTag("");
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(142, 39, 246, 0.3)", "transparent"]}
        style={styles.linearGradient}
      >
        <View style={styles.header}>
          <Ionicons
            name="arrow-back-outline"
            style={styles.icon}
            onPress={() => props.navigation.navigate("Story")}
          />
          <Text style={styles.headerText}>
            Great things never come from comfort zones
          </Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={searchValue}
                placeholder="Really Inspiring"
                onChangeText={(text) => setSearchValue(text)}
              />
              <View style={styles.buttonWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    setSearchValue("");
                    setSearchedTag("");
                  }}
                >
                  <Ionicons
                    name="close-circle-outline"
                    size={18}
                    color="black"
                    style={{ marginTop: -2, marginRight: 5 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={searchHandler}>
                  <Text style={styles.button}>Search</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {searchDOM}
      </LinearGradient>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 230,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%",
    marginBottom: 10,
  },
  headerText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    textAlign: "center",
    color: "black",
    textTransform: "capitalize",
  },
  linearGradient: {
    flex: 1,
  },
  icon: {
    fontSize: 22,
    color: "black",
    position: "absolute",
    top: 50,
    left: 20,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  tagsContainer: {
    alignItems: "center",
  },
  commentInput: {
    height: 70,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  inputWrapper: {
    width: "78%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 7,
  },
  input: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    color: "black",
  },
  buttonWrapper: {
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    color: "black",
    fontFamily: "Poppins_500Medium",
    textTransform: "uppercase",
    fontSize: 12,
  },
  buttonText: {
    color: "black",
  },
});

SearchScreen.navigationOptions = {
  cardStyle: { backgroundColor: "white" },
};
