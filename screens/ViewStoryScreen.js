import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  Text,
  Image,
  Share,
  Alert,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import HTMLView from "react-native-htmlview";

import Colors from "../constants/Colors";
import { StoryStyles } from "../constants/StoryStyles";
import moment from "moment";
import Tags from "../components/Tags";
import Proxy from "../constants/Proxy";

const ViewStoryScreen = (props) => {
  const storyId = props.navigation.getParam("storyId");

  const [story, setStory] = useState("");
  const [author, setAuthor] = useState("");
  const [errorOnAuthorDetails, setErrorOnAuthorDetails] = useState(false);
  const [errorOnLike, setErrorOnLike] = useState(false);
  const [likeLoader, setLikeLoader] = useState(false);

  //MapStatetoProps
  const state = useSelector((state) => {
    return state.profile.userDetails;
  });

  const AlertMessage = (message) => {
    Alert.alert("Something went wrong", message, [{ text: "okay" }], {
      cancelable: true,
    });
  };

  const { navigation } = props;

  useEffect(() => {
    navigation.addListener("didFocus", () => {
      fetchStoryHandler();
      console.log(storyId);
      fetchAuthorDetailsHandler();
    });
    return () => {
      closeStoryHandler();
    };
  }, []);

  //Fetch story
  const fetchStoryHandler = useCallback(async () => {
    try {
      const { data } = await axios.get(`${Proxy.proxy}/storyData/${storyId}`);
      setStory(data);
    } catch (error) {
      throw new Error("Something went wrong on getting story");
    }
  });

  //Update view and reset story
  const closeStoryHandler = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${Proxy.proxy}/profile/updateView/${storyId}`
      );
    } catch (error) {
      throw new Error("Something went wrong, Please try again later!");
    }
  });

  //Fetch author details
  const fetchAuthorDetailsHandler = useCallback(async () => {
    const authorId = props.navigation.getParam("authorId");

    try {
      const { data } = await axios.get(`${Proxy.proxy}/author/${authorId}`);
      setAuthor(data[0]);
    } catch (error) {
      setErrorOnAuthorDetails(true);

      setTimeout(() => {
        setErrorOnAuthorDetails(false);
      }, 3000);
    }
  });

  // //Like a story handler
  const likeHandler = useCallback(async () => {
    setLikeLoader(true);
    try {
      const { data } = await axios.post(`${Proxy.proxy}/profile/likeStory`, {
        storyId: story._id,
        uid: state._id,
        authorId: author._id,
        userName: "ragulcs",
        storyTitle: story.story.title,
      });

      setStory(data);
      setLikeLoader(false);
    } catch (error) {
      setErrorOnLike(true);

      setTimeout(() => {
        setErrorOnLike(false);
      }, 3000);
    }
  });

  // //Unlike a story handler
  const unlikeHandler = useCallback(async () => {
    setLikeLoader(true);
    try {
      const { data } = await axios.post(
        `${Proxy.proxy}/profile/unLikeStory/${story._id}/${state._id}/${story.uid}`
      );

      setStory(data);
      setLikeLoader(false);
    } catch (error) {
      setErrorOnLike(true);

      setLikeLoader(false);
      setTimeout(() => {
        setErrorOnLike(false);
      }, 3000);
    }
  });

  //Adding comment
  const dispatch = useDispatch();
  const commentHandlder = () => {
    dispatch({ type: "COMMENTS", payload: story });
    props.navigation.navigate("Comment", {
      avatar: state.avatar,
      storyId: story._id,
      storyTitle: story.story.title,
      authorId: story.uid,
    });
  };

  //Sharing story
  const shareHandler = async () => {
    try {
      const result = await Share.share({
        message: `Hey buddy, ${state.userName} wants you to read this awesome story "${story.story.title}" on shareXP. https://sharexp.netlify.app/viewstory/${story._id}/${author._id}`,
      });
    } catch (error) {
      AlertMessage(error.message);
    }
  };

  return (
    <>
      {story ? (
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              {author ? (
                <Image
                  style={styles.avatar}
                  source={
                    author.avatar
                      ? { uri: author.avatar }
                      : require("../assets/images/shareXP-draw.png")
                  }
                />
              ) : (
                <View style={styles.center}>
                  <ActivityIndicator size="small" color={Colors.seconary} />
                </View>
              )}
            </View>
            <View style={styles.headerContent}>
              <Text style={styles.userName} numberOfLines={1}>
                {story.userName}
              </Text>
              <View style={styles.details}>
                <Text style={styles.detailsText}>{story.views} Views</Text>
                <View style={styles.spacer}></View>
                <Text style={styles.detailsText}>
                  {moment(story.createdAt).format("ll")}
                </Text>
              </View>
            </View>
          </View>
          <ScrollView horizontal style={styles.tagsContainer}>
            {story.story.tags.map((tagTitle, index) => {
              return (
                <Tags
                  viewTagStories={() =>
                    props.navigation.navigate("TagStories", {
                      tagName: tagTitle,
                    })
                  }
                  key={index}
                  tagTitle={tagTitle}
                />
              );
            })}
          </ScrollView>
          {story.story.img && (
            <View style={styles.storyImage}>
              <Image style={styles.image} source={{ uri: story.story.img }} />
            </View>
          )}
          <View style={styles.title}>
            <Text style={styles.titleText}>{story.story.title}</Text>
          </View>
          <View style={styles.storyContent}>
            <HTMLView value={story.story.content} stylesheet={StoryStyles} />
          </View>
          <View style={styles.reaction}>
            <View style={styles.reactionIcon}>
              <View style={styles.iconWrapper}>
                {likeLoader ? (
                  <ActivityIndicator size="small" color={Colors.accent} />
                ) : story.likes.includes(state._id) ? (
                  <TouchableOpacity
                    style={styles.iconWrapper}
                    onPress={unlikeHandler}
                  >
                    <MaterialIcons
                      name="thumb-up"
                      style={[styles.icon, { color: Colors.primary }]}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.iconWrapper}
                    onPress={likeHandler}
                  >
                    <MaterialIcons name="thumb-up" style={styles.icon} />
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.iconText}>{story.likes.length}</Text>
            </View>
            <View style={styles.reactionIcon}>
              <TouchableOpacity
                style={styles.iconWrapper}
                onPress={commentHandlder}
              >
                <MaterialCommunityIcons name="comment" style={styles.icon} />
              </TouchableOpacity>
              <Text style={styles.iconText}>{story.comments.length}</Text>
            </View>
            <View style={styles.reactionIcon}>
              <TouchableOpacity
                style={styles.iconWrapper}
                onPress={shareHandler}
              >
                <MaterialCommunityIcons name="share" style={styles.icon} />
              </TouchableOpacity>
              <Text style={styles.iconText}>share</Text>
            </View>
          </View>

          {errorOnAuthorDetails &&
            AlertMessage("Something went wrong on fetching auhtor details")}

          {errorOnLike && AlertMessage("Something went wrong on updating like")}
        </ScrollView>
      ) : (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.seconary} />
          <Text style={styles.centerText}>Story is loading...</Text>
        </View>
      )}
    </>
  );
};

export default ViewStoryScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 7,
    paddingVertical: 10,
    paddingBottom: 20,
    flex: 1,
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  avatarContainer: {
    height: 50,
    width: 50,
    borderRadius: 1000,
    backgroundColor: Colors.primary,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  headerContent: {
    marginLeft: 10,
  },
  userName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    marginBottom: 0,
    lineHeight: 16,
  },
  details: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 3,
  },
  detailsText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: Colors.accent,
    lineHeight: 16,
  },
  spacer: {
    width: 5,
    height: 5,
    backgroundColor: Colors.accent,
    position: "relative",
    borderRadius: 1000,
    marginHorizontal: 10,
  },
  tagsContainer: {
    marginTop: 15,
    marginBottom: 10,
  },
  storyImage: {
    marginVertical: 10,
    width: "100%",
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  title: {
    marginVertical: 10,
    marginBottom: 7,
  },
  titleText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    lineHeight: 38,
  },
  storyContent: {
    fontFamily: "Poppins_700Bold",
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  reaction: {
    marginTop: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 120,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  iconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 1000,
    backgroundColor: Colors.border,
  },
  reactionIcon: {
    alignItems: "center",
  },
  icon: {
    color: Colors.accent,
    fontSize: 20,
  },
  iconText: {
    marginTop: 7,
    color: Colors.accent,
    fontFamily: "Poppins_500Medium",
    textTransform: "uppercase",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerText: {
    fontFamily: "Poppins_500Medium",
    color: Colors.accent,
    marginTop: 5,
  },
});

ViewStoryScreen.navigationOptions = (navData) => {
  const title = navData.navigation.getParam("title");
  return {
    headerTitle: () => (
      <Text
        numberOfLines={1}
        style={{ fontFamily: "Poppins_500Medium", fontSize: 18 }}
      >
        {title}
      </Text>
    ),
    cardStyle: {
      backgroundColor: "white",
    },
  };
};
