import { SafeAreaView } from "react-native-safe-area-context"
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useState } from "react"
import { Dimensions } from "react-native"
import { StatusBar } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native"

const { height, width } = Dimensions.get("window")

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const navigation = useNavigation();

  const handleLogin = () => {
    console.log("[v0] Login pressed with:", { email, password })
    navigation.navigate("Tabs")
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFEDE8", justifyContent: "space-between"}}>
      <StatusBar barStyle="dark-content" backgroundColor="#C9A7A2" />
      <View
        style={{
          height: height * 0.25,
          flexDirection: "column",
          gap: 5,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F1B0B0",
          borderBottomLeftRadius: 42,
          borderBottomRightRadius: 42,
        }}
      >
        <Text style={{ fontSize: 34, fontFamily: "PlayfairDisplay-SemiBold", color: "#B84953" }}>Hello Again!</Text>
        <Text style={{ fontSize: 26, fontFamily: "Inter_18pt-Medium", textAlign: "center", color: "#AD7373", paddingHorizontal: 50 }}>
          Welcome back you've been missed.
        </Text>
      </View>

      <View style={{ padding: 25, }}>
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 12,
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginBottom: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            borderWidth: 0.5,
            borderColor: "#989696",
          }}
        >
          <TextInput
            placeholder="Email"
            placeholderTextColor="#767676"
            style={{ flex: 1, fontSize: 16, fontFamily: "Inter_18pt-Regular" }}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Ionicons name="mail-outline" size={22} color="#767676" />
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 12,
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginBottom: 15,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            borderWidth: 0.5,
            borderColor: "#989696",
          }}
        >
          <TextInput
            placeholder="Password"
            placeholderTextColor="#767676"
            secureTextEntry={!showPassword}
            style={{ flex: 1, fontSize: 16, fontFamily: "Inter_18pt-Regular" }}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={22} color="#767676" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Inter_18pt-Regular",
              color: "#CC3D3D",
              textAlign: "right",
              textDecorationLine: "underline",
            }}
          >
            Forgot Password
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginTop: 30,
            paddingVertical: 12,
            borderRadius: 16,
            backgroundColor: "#B84953",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 100,
            elevation: 10,
          }}
          onPress={() => handleLogin()}
        >
          <Text style={{ fontSize: 24, fontFamily: "Inter_18pt-Medium", color: "#fff", textAlign: "center" }}>
            Log in
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "center", marginVertical: 30 }}>
          <View style={{ width: "25%", height: 1, backgroundColor: "#989696" }} />
          <Text style={{ fontSize: 16, fontFamily: "Inter_18pt-Medium", color: "#6C6C6C", textAlign: "center" }}>
            Or Continue With
          </Text>
          <View style={{ width: "25%", height: 1, backgroundColor: "#989696" }} />
        </View>
      <View style={{ flexDirection: "row", gap: 30, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity
          style={{
            padding: 16,
            borderRadius: 12,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => console.log("[v0] Google login pressed")}
        >
          <Image source={require('../assets/images/google.png')} style={{ width: 30, height: 30 }} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 16,
            borderRadius: 12,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => console.log("[v0] Apple login pressed")}
        >
          <Image source={require('../assets/images/apple.png')} style={{ width: 30, height: 30 }} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 16,
            borderRadius: 12,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => console.log("[v0] Facebook login pressed")}
        >
          <Image source={require('../assets/images/facebook.png')} style={{ width: 30, height: 30 }} resizeMode="contain" />
        </TouchableOpacity>
      </View>
      </View>


      <View style={{ flexDirection: "row", gap: 5, alignItems: "center", justifyContent: "center", marginVertical: 30 }}>
                <Text style={{ fontSize: 16, fontFamily: "Inter_18pt-Regular", color: "#6C6C6C", textAlign: "center" }}>Not a Member? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>

                    <Text style={{ fontSize: 16, color: "#B84953", fontFamily: "Inter_18pt-Medium" }}>Register Now</Text>
                </TouchableOpacity>
            </View>
    </SafeAreaView>
  )
}

export default LoginScreen
