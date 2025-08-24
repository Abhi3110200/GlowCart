import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import OnboardingScreen from "../screens/OnboardingScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator
