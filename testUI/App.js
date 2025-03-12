import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { LoginScreen, RegisterScreen } from "./screens/AuthScreens.js";
import PlacesListScreen from "./screens/PlacesListScreens";
import PlaceDetailScreen from "./screens/PlaceDetailScreen.js";
import TripManagementScreen from "./screens/TripManagementScreen.js";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Danh sách địa điểm") {
            iconName = "place";
          } else if (route.name === "Lịch trình") {
            iconName = "event";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#66FCF1",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Danh sách địa điểm" component={PlacesListScreen} />
      <Tab.Screen name="Lịch trình" component={TripManagementScreen} />
    </Tab.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} options={{ title: "Chi tiết địa điểm" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
