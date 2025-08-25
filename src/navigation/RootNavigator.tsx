import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DefaultTheme, DarkTheme, Theme } from "@react-navigation/native";
import OnboardingScreen from "../screens/OnboardingScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import React from "react";
import LoginScreen from "../screens/LoginScreen";
import TabNavigator from "./TabNavigator";
import RegisterScreen from "../screens/RegisterScreen";
import { useAuth } from "../hooks/useAuth";
import CartScreen from "../screens/CartScreen";
import { useAppTheme } from "../theme/useAppTheme";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { isAuthenticated } = useAuth();
  const { colors, isDark } = useAppTheme();

  // const theme: Theme = {
  //   ...(isDark ? DarkTheme : DefaultTheme),
  //   colors: {
  //     ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
  //     primary: colors.primary,
  //     background: colors.background,
  //     card: colors.card,
  //     text: colors.text,
  //     border: colors.border,
  //     notification: colors.notification,
  //   },
  // };

  return (
    <NavigationContainer 
    // theme={theme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Tabs" component={TabNavigator} />
            <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
            <Stack.Screen name="CartScreen" component={CartScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator
