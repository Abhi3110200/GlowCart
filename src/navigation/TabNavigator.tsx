import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Text } from "react-native";
import WishListScreen from "../screens/WishListScreen";
import OfferScreen from "../screens/OfferScreen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ActiveHomeIcon from "../assets/svg/ActiveHomeIcon";
import InActiveHomeIcon from "../assets/svg/InActiveHomeIcon";
import InActiveOfferIcon from "../assets/svg/InActiveOfferIcon";
import ActiveProfileIcon from "../assets/svg/ActiveProfileIcon";
import InActiveProfileIcon from "../assets/svg/InActiveProfileIcon";
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
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return <ActiveHomeIcon width={24} height={24} />;
          } else {
            return <InActiveHomeIcon width={24} height={24} />;
          }
        }, 
        tabBarLabel: ({focused}) => <Text style={{fontFamily: 'Inter_18pt-Medium', fontSize: 12, color: focused ? '#B84953' : '#4B4B4B'}}>Home</Text>,
      }} 
      component={HomeScreen} />
      <Tab.Screen name="Offer" 
      options={{ 
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return <MaterialIcons name="local-offer" size={24} color="#B84953" />;
          } else {
            return <InActiveOfferIcon width={24} height={24} />;
          }
        }, 
        tabBarLabel: ({focused}) => <Text style={{fontFamily: 'Inter_18pt-Medium', fontSize: 12, color: focused ? '#B84953' : '#4B4B4B'}}>Offer</Text>, 
      }} 
      component={OfferScreen} />
      <Tab.Screen name="WishList" 
      options={{ 
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return <Ionicons name= {"heart"} size={24} color={"#B84953"} />;
          } else {
            return <Ionicons name= {"heart-outline"} size={24} color={"#4B4B4B"} />;
          }
        }, 
        tabBarLabel: ({focused}) => <Text style={{fontFamily: 'Inter_18pt-Medium', fontSize: 12, color: focused ? '#B84953' : '#4B4B4B'}}>WishList</Text>, 
      }} 
      component={WishListScreen} />
      <Tab.Screen name="Profile" 
      options={{ 
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return <ActiveProfileIcon width={24} height={24} />;
          } else {
            return <InActiveProfileIcon width={24} height={24} />;
          }
        }, 
        tabBarLabel: ({focused}) => <Text style={{fontFamily: 'Inter_18pt-Medium', fontSize: 12, color: focused ? '#B84953' : '#4B4B4B'}}>Profile</Text>, 
      }} 
      component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigator
