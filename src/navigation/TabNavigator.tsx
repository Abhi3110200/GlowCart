import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Text } from "react-native";
import WishListScreen from "../screens/WishListScreen";
import OfferScreen from "../screens/OfferScreen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarActiveTintColor: '#B84953',
      tabBarInactiveTintColor: '#4B4B4B',
      tabBarStyle: { backgroundColor: 'white',
        height: 70,
        paddingTop: 10,
       },
    }}>
      <Tab.Screen name="Home" 
      options={{ 
        tabBarIcon: ({ focused }) => <Ionicons name="home" size={24} color={focused ? "#B84953" : "#4B4B4B"} />, 
        tabBarLabel: ({focused}) => <Text style={{fontFamily: 'Inter_18pt-Medium', fontSize: 12, color: focused ? '#B84953' : '#4B4B4B'}}>Home</Text>,
      }} 
      component={HomeScreen} />
      <Tab.Screen name="Offer" 
      options={{ 
        tabBarIcon: ({ focused }) => <Ionicons name= "local-offer" size={24} color={focused ? "#B84953" : "#4B4B4B"} />, 
        tabBarLabel: ({focused}) => <Text style={{fontFamily: 'Inter_18pt-Medium', fontSize: 12, color: focused ? '#B84953' : '#4B4B4B'}}>Offer</Text>, 
      }} 
      component={OfferScreen} />
      <Tab.Screen name="WishList" 
      options={{ 
        tabBarIcon: ({ focused }) => <MaterialIcons name= {focused ? "heart" : "heart-outline"} size={24} color={focused ? "#B84953" : "#4B4B4B"} />, 
        tabBarLabel: ({focused}) => <Text style={{fontFamily: 'Inter_18pt-Medium', fontSize: 12, color: focused ? '#B84953' : '#4B4B4B'}}>WishList</Text>, 
      }} 
      component={WishListScreen} />
      <Tab.Screen name="Profile" 
      options={{ 
        tabBarIcon: ({ focused }) => <Ionicons name="person" size={24} color={focused ? "#B84953" : "#4B4B4B"} />, 
        tabBarLabel: ({focused}) => <Text style={{fontFamily: 'Inter_18pt-Medium', fontSize: 12, color: focused ? '#B84953' : '#4B4B4B'}}>Profile</Text>, 
      }} 
      component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigator
