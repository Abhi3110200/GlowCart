import { useNavigation } from '@react-navigation/native';
import {View, Text, Image, StatusBar, TouchableOpacity, Dimensions} from 'react-native'  
import { SafeAreaView } from 'react-native-safe-area-context'
const {height, width} = Dimensions.get("window");
const OnboardingScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#C9A7A2",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#C9A7A2" />

      <Image
        source={require("../assets/images/onboarding.png")}
        style={{
          width: width,
          height:height * 0.9,
          resizeMode: "contain",
          position: "absolute",
          top: height * -0.12,

        }}
      />

      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          paddingHorizontal: 40,
          paddingBottom: 60,
        }}
      >
        <Text
          style={{
            fontSize: 60,
            fontFamily:'Italiana-Regular',
            color: "#fff",
            textAlign: "center",
            marginBottom: 8,
            letterSpacing: 2,
          }}
        >
          Viorra
        </Text>

        <Text
          style={{
            fontSize: 24,
            fontFamily:'Inter_18pt-Thin',
            color: "#fff",
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          Your Beauty, Delivered.
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          activeOpacity={0.8}
          style={{
            backgroundColor: "#B84953",
            paddingHorizontal: 40,
            paddingVertical: 15,
            borderRadius: 16,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontFamily:'Inter_18pt-Regular',
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>

        {/* <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            gap: 8,
          }}
        >
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: "#fff",
            }}
          />
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: "rgba(255,255,255,0.3)",
            }}
          />
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: "rgba(255,255,255,0.3)",
            }}
          />
        </View> */}
      </View>
    </SafeAreaView>
  )
}

export default OnboardingScreen