import {View, Text, Image, StatusBar} from 'react-native'  
import { SafeAreaView } from 'react-native-safe-area-context'
const OnboardingScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFEDE8' }}>
      <StatusBar barStyle='dark-content' backgroundColor='#FFEDE8' />
      <Image source={require('../assets/images/image.png')}/>
    </SafeAreaView>
  )
}

export default OnboardingScreen