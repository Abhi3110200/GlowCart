import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import OnboardingScreen from "../screens/OnboardingScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import React from "react";
import LoginScreen from "../screens/LoginScreen";
import TabNavigator from "./TabNavigator";
import RegisterScreen from "../screens/RegisterScreen";
const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator
