import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DefaultTheme, DarkTheme, Theme } from "@react-navigation/native";
import OnboardingScreen from "../screens/OnboardingScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import React from "react";
import LoginScreen from "../screens/LoginScreen";
import TabNavigator from "./TabNavigator";
import RegisterScreen from "../screens/RegisterScreen";
import { useAuthContext } from "../providers/AuthProvider";
import CartScreen from "../screens/CartScreen";
import { useAppTheme } from "../theme/useAppTheme";

export type RootStackParamList = {
  Tabs: undefined;
  Onboarding: undefined;
  Login: undefined;
  Auth: undefined;
  Register: undefined;
  ProductDetailScreen: { productId: string };
  CartScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);  

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
    <Stack.Screen name="Tabs" component={TabNavigator} />
    <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
    <Stack.Screen name="CartScreen" component={CartScreen} />
  </Stack.Navigator>
);

const RootNavigator = () => {
  const { isAuthenticated, token } = useAuthContext();
  const { colors, isDark } = useAppTheme();

  const theme: Theme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.notification,
    },
  };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated && token ? (
          <Stack.Screen name="Tabs" component={AppStack} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;