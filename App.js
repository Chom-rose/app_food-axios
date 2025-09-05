import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/Screen/HomeScreen";
import RecipDetailScreen from "./src/Screen/RecipDetailScreen";
import FavoritesScreen from "./src/Screen/FavoritesScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#ff6f61" },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 24, fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "gin Laew Tie" }}
        />
        <Stack.Screen
          name="RecipeDetail"
          component={RecipDetailScreen}
          options={{ title: "รายละเอียดสูตรอาหาร" }}
        />
        <Stack.Screen
          name="FavoritesScreen"
          component={FavoritesScreen}
          options={{ title: "รายการโปรด" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
