import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons, Feather } from "@expo/vector-icons";

import StoriesScreen from "../screens/StoriesScreen";
import SearchScreen from "../screens/SearchScreen";
import NewStory from "../screens/NewStory";
import ProfileScreen from "../screens/ProfileScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ViewStoryScreen from "../screens/ViewStoryScreen";
import CommentScreen from "../screens/CommentScreen";
import TagStoriesScreen from "../screens/TagStoriesScreen";
import AuthScreen from "../screens/AuthScreen";

const StoryNavigator = createStackNavigator(
  {
    Story: StoriesScreen,
    ViewStory: ViewStoryScreen,
    Comment: CommentScreen,
    TagStories: TagStoriesScreen,
  },
  {
    navigationOptions: (navData) => {
      let tabBarVisible = true;
      if (navData.navigation.state.index > 0) {
        tabBarVisible = false;
      }
      return {
        tabBarVisible: tabBarVisible,
        cardStyle: {
          backgroundColor: "white",
        },
      };
    },
  }
);

const SearchNavigator = createStackNavigator(
  {
    Search: SearchScreen,
  },
  {
    navigationOptions: () => {
      return {
        tabBarVisible: false,
        cardStyle: {
          backgroundColor: "white",
        },
      };
    },
  }
);

const NewStoryNavigator = createStackNavigator(
  {
    NewStory: NewStory,
  },
  {
    defaultNavigationOptions: {
      cardStyle: {
        backgroundColor: "white",
      },
    },
  }
);

const ProfileNavigator = createStackNavigator({
  Profile: ProfileScreen,
});

const NotificationNavigator = createStackNavigator({
  Notification: NotificationScreen,
});

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen,
});

const XPNavigator = createBottomTabNavigator(
  {
    Story: {
      screen: StoryNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="md-home-outline"
              size={24}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    Search: {
      screen: SearchNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="md-search-outline"
              size={24}
              color={tabInfo.tintColor}
            />
          );
        },
        tabBarLabel: { focused: true, tintColor: "green" },
      },
    },
    NewStory: {
      screen: NewStoryNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="md-add-circle-outline"
              size={24}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    Notification: {
      screen: NotificationNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="md-notifications-outline"
              size={24}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },

    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="md-person-outline"
              size={24}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "black",
    },
  }
);

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  XP: XPNavigator,
});

// const Navigator = createStackNavigator(
//   {
//     Navigator: MainNavigator,
//   },
//   {
//     defaultNavigationOptions: {
//       headerShown: false,
//     },
//   }
// );

export default createAppContainer(MainNavigator);
