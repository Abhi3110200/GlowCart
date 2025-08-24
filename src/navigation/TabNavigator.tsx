import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true
    }}>
      <Tab.Screen name="Home" options={{tabBarIcon: ({focused}) => <Ionicons name="home" size={24} color={focused ? "#B84953" : "#4B4B4B"} />}} component={HomeScreen} />
      <Tab.Screen name="Profile" options={{tabBarIcon: ({focused}) => <Ionicons name="person" size={24} color={focused ? "#B84953" : "#4B4B4B"} />}} component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigator
