import React from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import Colors from "../constants/Colors";

const Tag = ({ tagTitle, views, tagStoriesHandler }) => {
  const [randomImg, setRandomImg] = React.useState("");
  React.useEffect(() => {
    (async () => {
      try {
        const {
          data: { results },
        } = await axios.get(
          `https://api.unsplash.com/search/photos?page=1&query=${tagTitle.substr(
            1
          )}&client_id=oK47xmnNqY_owM3f9ykIWivKOe3RxSDB9qQlWf1r55M`,
          {
            withCredentials: false,
          }
        );

        if (results.length === 0) {
          const { data } = await axios.get(
            `https://api.unsplash.com/photos/?client_id=oK47xmnNqY_owM3f9ykIWivKOe3RxSDB9qQlWf1r55M`,
            {
              withCredentials: false,
            }
          );

          // console.log(results);
          setRandomImg(data[Math.floor(Math.random() * 10)].urls.regular);
        } else {
          // console.log(results);
          setRandomImg(results[0].urls.regular);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      {randomImg ? (
        <TouchableOpacity
          style={styles.tag}
          onPress={tagStoriesHandler.bind(this, tagTitle, randomImg)}
        >
          <ImageBackground
            source={{ uri: randomImg }}
            style={styles.backgroundImage}
          >
            <LinearGradient
              // Background Linear Gradient
              colors={["rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 0.5)"]}
              start={[0, 0]}
              end={[0.5, 1]}
              style={styles.tagLinearGradient}
            >
              <Text style={styles.tagTitle}>{tagTitle}</Text>
              <Text style={styles.tagViews}>{views} Stories</Text>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      ) : (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.seconary} />
        </View>
      )}
    </>
  );
};

export default Tag;

const styles = StyleSheet.create({
  tag: {
    width: Dimensions.get("window").width / 1.1,
    height: 130,
    borderRadius: 10,
    marginVertical: 10,
    marginBottom: 15,
    overflow: "hidden",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
  },
  tagTitle: {
    color: "white",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
  },
  tagViews: {
    color: "white",
    marginLeft: "auto",
    fontFamily: "Poppins_500Medium",
  },
  tagLinearGradient: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  center: {
    width: Dimensions.get("window").width / 1.1,
    height: 130,
    borderRadius: 10,
    marginVertical: 10,
    marginBottom: 15,
    overflow: "hidden",
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
  },
});
