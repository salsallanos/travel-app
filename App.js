import React, { useState } from "react";
import { Dashboard, Place } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';

import Tabs from "./navigation/tabs";

const Stack = createStackNavigator();

const App = () => {
  const [isReady, setIsReady] = useState(false);

  const cacheFonts = (fonts) => {
    return fonts.map((font) => Font.loadAsync(font));
  };

  const loadAssetsAsync = async () => {
    const fontAssets = cacheFonts([
      { "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf") },
      { "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf") },
      { "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf") },
    ]);
    await Promise.all([...fontAssets]);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={() => {
          setIsReady(true);
        }}
        onError={(error) => console.log(error)}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Dashboard"}
      >
        <Stack.Screen name="Dashboard" component={Tabs} />

        <Stack.Screen name="Place" component={Place} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
