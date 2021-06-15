import React from "react";
import { FlatList } from "react-native";

import Story from "./Story";

const StoryGrid = (props) => {
  return (
    <FlatList
      onRefresh={props.fetchHandler}
      refreshing={props.refreshHandler}
      data={props.data}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => "key" + index}
      renderItem={({ item }) => {
        console.log(item._id)
        return (
          <Story
            viewStoryHandler={() =>
              props.navigation.navigate("ViewStory", {
                storyId: item._id,
                title: item.story.title,
                authorId: item.uid,
              })
            }
            userName={item.userName}
            story={item.story}
            createdAt={item.createdAt}
            views={item.views}
          />
        );
      }}
    />
  );
};

export default StoryGrid;
