import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import * as actions from "../store/actions/stories-actions";

const Comment = ({ comment, userName, dateCreated, avatar }) => {
  return (
    <View style={styles.commentContainer}>
      <View style={styles.avatarContainer}>
        <Image
          source={
            avatar
              ? { uri: avatar }
              : require("../assets/images/shareXP-draw.png")
          }
          style={styles.avatar}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.userName} numberOfLines={1}>
            {userName}
          </Text>
          <View style={styles.spacer}></View>
          <Text style={styles.date}>{moment(dateCreated).fromNow()}</Text>
        </View>
        <Text style={styles.comment}>{comment}</Text>
      </View>
    </View>
  );
};

const CommentScreen = (props) => {
  const [commentValue, setCommentValue] = useState("");
  const [loader, setLoader] = useState(false);
  const state = useSelector((state) => {
    return state.stories.comments;
  });
  const userDetails = useSelector((state) => {
    return state.profile.userDetails;
  });

  const dispatch = useDispatch();
  const addCommentHandler = () => {
    setLoader(true);
    const avatar = props.navigation.getParam("avatar");
    const authorId = props.navigation.getParam("authorId");
    const userName = userDetails.userDetails.userName;
    const uid = userDetails._id;

    const data = {
      commentText: commentValue,
      avatar: avatar,
      storyId: state._id,
      authorId: authorId,
      storyTitle: state.story.title,
      userName: userName,
      uid: uid,
    };
    dispatch(actions.addComment(data))
      .then(() => {
        Keyboard.dismiss();
        setCommentValue("");
        setLoader(false);
      })
      .catch((err) => {
        Alert.alert("Problem occured", `${err}`, [{ text: "Okay" }], {
          cancelable: true,
        });
      });
  };

  useEffect(() => {
    return () => {
      dispatch({ type: "RESET_COMMENT" });
    };
  }, []);

  //   if (state.length === 0) {
  //     props.navigation.goBack();
  //   }

  return (
    <View style={styles.container}>
      {state && state.comments.length > 0 ? (
        <View style={styles.commentWrapper}>
          <FlatList
            data={state.comments}
            keyExtractor={(key, index) => "key" + index}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Comment
                userName={item.userName}
                comment={item.comment}
                dateCreated={item.commentedAt}
                avatar={item.avatar}
              />
            )}
          />
        </View>
      ) : (
        <View style={styles.center}>
          <Text style={styles.message}>No comments, Be first to comment!</Text>
        </View>
      )}
      <View style={styles.commentInput}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={commentValue}
            placeholder="Really Inspiring"
            onChangeText={(text) => setCommentValue(text)}
          />
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={addCommentHandler}
          >
            {loader ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <Text style={styles.button}>Add</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  storyTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
  },
  commentWrapper: {
    flex: 1,
    paddingHorizontal: 10,
  },
  commentContainer: {
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatarContainer: {
    width: 50,
    height: 50,
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 1000,
    backgroundColor: Colors.primary,
  },
  content: {
    paddingLeft: 15,
    width: "80%",
  },
  contentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 0,
  },
  userName: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    lineHeight: 18,
  },
  spacer: {
    width: 5,
    height: 5,
    marginHorizontal: 10,
    borderRadius: 1000,
    position: "relative",
    backgroundColor: Colors.comment,
  },
  date: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: Colors.comment,
  },
  comment: {
    marginTop: 0,
    fontFamily: "Poppins_400Regular",
    color: Colors.accent,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontFamily: "Poppins_500Medium",
    color: Colors.accent,
  },
  commentInput: {
    height: 70,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderTopColor: Colors.border,
    borderTopWidth: 1,
  },
  inputWrapper: {
    backgroundColor: Colors.commentInput,
    padding: 0,
    flexDirection: "row",
    width: "100%",
    borderRadius: 7,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    width: "80%",
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    color: Colors.primary,
    fontFamily: "Poppins_500Medium",
    width: "100%",
    textTransform: "uppercase",
    fontSize: 12,
    paddingRight: 10,
  },
});

CommentScreen.navigationOptions = () => {
  return {
    headerTitle: () => (
      <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 20 }}>
        Comment
      </Text>
    ),
    cardStyle: { backgroundColor: "white" },
  };
};
