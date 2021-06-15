import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from "react-navigation-tabs";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Dimensions, Text } from "react-native";
import IconBadge from "react-native-icon-badge";

import StoriesScreen from "../screens/StoriesScreen";
import SearchScreen from "../screens/SearchScreen";
import NewStory from "../screens/NewStory";
import NotificationScreen from "../screens/NotificationScreen";
import ViewStoryScreen from "../screens/ViewStoryScreen";
import CommentScreen from "../screens/CommentScreen";
import TagStoriesScreen from "../screens/TagStoriesScreen";
import AuthScreen from "../screens/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import Colors from "../constants/Colors";
import MyStoriesScreen from "../screens/MyStoriesScreen";
import FollowingTagsScreen from "../screens/FollowingTagsScreen";
import DangerZoneScreen from "../screens/DangerZoneScreen";

const StoryNavigator = createStackNavigator(
  {
    Story: StoriesScreen,
    ViewStory: ViewStoryScreen,
    Comment: CommentScreen,
  },
  {
    navigationOptions: (navData) => {
      let tabBarVisible = true;
      if (navData.navigation.state.index > 0) {
        tabBarVisible = false;
      }
      return {
        tabBarVisible: tabBarVisible,
      };
    },
  }
);

const SearchNavigator = createStackNavigator(
  {
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        headerTransparent: true,
      },
    },
    ViewStory: ViewStoryScreen,
    Comment: CommentScreen,
    TagStories: TagStoriesScreen,
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

const MyStoriesScreenNavigator = createStackNavigator(
  {
    MyStories: MyStoriesScreen,
    ViewStory: ViewStoryScreen,
    Comment: CommentScreen,
  },
  {
    defaultNavigationOptions: {
      cardStyle: { backgroundColor: false },
      headerShown: false,
    },
  }
);

const ProfileScreentopTabNavigator = createMaterialTopTabNavigator(
  {
    Stories: {
      screen: MyStoriesScreenNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            size={24}
            color={tintColor}
            name={focused ? "book" : "book-outline"}
          />
        ),
      },
    },
    Following: {
      screen: FollowingTagsScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <Feather size={24} color={tintColor} name="hash" />
        ),
      },
    },
    More: {
      screen: DangerZoneScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            size={24}
            color={tintColor}
            name={focused ? "nuclear" : "nuclear-outline"}
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.accent,
      inactiveTintColor: "#bab8b8",
      showIcon: Dimensions.get("window").width < 360 ? true : false,
      showLabel: Dimensions.get("window").width < 360 ? false : true,
      indicatorStyle: {
        backgroundColor: Colors.accent,
      },
      labelStyle: {
        fontFamily: "Poppins_500Medium",
      },
      style: {
        backgroundColor: "white",
      },
    },
  }
);

const ProfileNavigator = createStackNavigator({
  Profile: {
    screen: ProfileScreentopTabNavigator,
    navigationOptions: () => {
      return {
        cardShadowEnabled: false,
        cardStyle: {
          backgroundColor: "white",
        },
        headerStyle: {
          backgroundColor: "white",
          shadowOffset: { width: 0, height: 0 },
          shadowColor: "white",
          elevation: 0,
        },
        headerTitle: () => (
          <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 18 }}>
            My Profile
          </Text>
        ),
      };
    },
  },
});

const NotificationNavigator = createStackNavigator({
  Notification: NotificationScreen,
  ViewStory: ViewStoryScreen,
  Comment: CommentScreen,
});

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen,
});

const XPNavigator = createBottomTabNavigator(
  {
    Story: {
      screen: StoryNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => {
          return (
            <Ionicons
              name={focused ? "md-home" : "md-home-outline"}
              size={24}
              color={tintColor}
            />
          );
        },
      },
    },
    Search: {
      screen: SearchNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => {
          return (
            <Ionicons
              name={focused ? "md-search" : "md-search-outline"}
              size={24}
              color={tintColor}
            />
          );
        },
      },
    },
    NewStory: {
      screen: NewStoryNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => {
          return (
            <Ionicons
              name={focused ? "md-add-circle" : "md-add-circle-outline"}
              size={24}
              color={tintColor}
            />
          );
        },
      },
    },
    Notification: {
      screen: NotificationNavigator,
      navigationOptions: ({ screenProps }) => ({
        tabBarIcon: ({ tintColor, focused }) => (
          <IconBadge
            MainElement={
              <Ionicons
                name={focused ? "md-notifications" : "md-notifications-outline"}
                size={22}
                color={tintColor}
              />
            }
            BadgeElement={<Text style={{ color: "white" }}></Text>}
            IconBadgeStyle={{
              top: focused ? 18.5 : 15,
              left: 7.5,
              minWidth: 5,
              height: 7,
              width: 7,
              backgroundColor: "red",
            }}
            Hidden={false}
          />
        ),
      }),
    },

    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => {
          return (
            <Ionicons
              name={focused ? "md-person" : "md-person-outline"}
              size={24}
              color={tintColor}
            />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: Colors.accent,
    },
  }
);

const XPMainNavigator = createStackNavigator({
  XPNav: {
    screen: XPNavigator,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  XP: XPMainNavigator,
});

export default createAppContainer(MainNavigator);
