import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "react-native"

const OfferScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFEDE8', justifyContent: 'center', alignItems: 'center' }}>
            <StatusBar barStyle='dark-content' backgroundColor='#FFEDE8' />
            <Text style={{ fontSize: 24, color: '#B84953', fontFamily: 'Inter_18pt-Regular' }}>Coming Soon</Text>
        </SafeAreaView>
    )
}

export default OfferScreen