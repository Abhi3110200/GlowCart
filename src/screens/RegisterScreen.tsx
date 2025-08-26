import { SafeAreaView } from "react-native-safe-area-context"
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useState } from "react"
import { Dimensions } from "react-native"
import { StatusBar } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native"
import { Alert } from "react-native"
import { useAuthContext } from "../providers/AuthProvider"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
const { height, width } = Dimensions.get("window")

type RootStackParamList = {
    Login: undefined;
};

const RegisterScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { register, setLoading, loading, setError } = useAuthContext();

    const handleRegister = () => {
        if(!email || !password || !name || !confirmPassword) {
            Alert.alert("Error", "All fields are required");
            return;
        }
        if(password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }
        try {
            setLoading(true);
            register(email, password, name); 
            navigation.goBack();   
        } catch (error: any) {
            setError(error.message);
            console.error("Register failed:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFEDE8" , justifyContent: "space-between"}}>
            <StatusBar barStyle="light-content" backgroundColor="#F1B0B0" />
            <View
                style={{
                    height: height * 0.184,
                    flexDirection: "column",
                    gap: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F1B0B0",
                    borderBottomLeftRadius: 42,
                    borderBottomRightRadius: 42,
                }}
            >
                <Text style={{ fontSize: 34, fontFamily: "PlayfairDisplay-SemiBold", color: "#B84953" }}>Join The Glow!</Text>
            </View>

            <View style={{ padding: 25 }}>
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
                        placeholder="Full Name"
                        placeholderTextColor="#767676"
                        style={{ flex: 1, fontSize: 16, fontFamily: "Inter_18pt-Regular" }}
                        value={name}
                        onChangeText={setName}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
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
                        placeholder="Confirm Password"
                        placeholderTextColor="#767676"
                        secureTextEntry={!showPassword}
                        style={{ flex: 1, fontSize: 16, fontFamily: "Inter_18pt-Regular" }}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={22} color="#767676" />
                    </TouchableOpacity>
                </View>



                <TouchableOpacity
                    style={{
                        marginTop: 20,
                        paddingVertical: 12,
                        borderRadius: 16,
                        backgroundColor: "#B84953",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 100,
                        elevation: 10,
                    }}
                    onPress={() => handleRegister()}
                >
                    {loading ? (
                        <View style={{
                            paddingVertical: 8,
                        }}>
                            <ActivityIndicator size="small" color="#fff" />
                        </View>
                    ) : (
                        <Text style={{ fontSize: 24, fontFamily: "Inter_18pt-Medium", color: "#fff", textAlign: "center" }}>
                            Create Account
                        </Text>
                    )}
                </TouchableOpacity>
            </View>



            <View style={{ flexDirection: "row", gap: 5, alignItems: "center", justifyContent: "center", marginVertical: 30 }}>
                <Text style={{ fontSize: 16, fontFamily: "Inter_18pt-Regular", color: "#6C6C6C", textAlign: "center" }}>Already a Member? </Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>

                    <Text style={{ fontSize: 16, color: "#B84953", fontFamily: "Inter_18pt-Medium" }}>Log in</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default RegisterScreen
