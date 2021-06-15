import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import {
  Merriweather_400Regular,
  Merriweather_700Bold,
} from "@expo-google-fonts/merriweather";
import AppLoading from "expo-app-loading";

import Navigator from "./Navigaton/Navigator";
import storiesReducer from "./store/reducers/stories-reucer";
import profileReducer from "./store/reducers/profile-reducer";
import newStoryReducer from "./store/reducers/newStory-reduer";
import authReducer from "./store/reducers/auth-reducer";

const rootReducer = combineReducers({
  stories: storiesReducer,
  profile: profileReducer,
  newStory: newStoryReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [loadedFonts] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Merriweather_400Regular,
    Merriweather_700Bold,
  });

  if (!loadedFonts) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
