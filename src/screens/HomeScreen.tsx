import {View, Text, StatusBar, TextInput} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
const HomeScreen = () => {
  return (
    <SafeAreaView>
        <StatusBar barStyle='dark-content' backgroundColor='white'/>
        <View style={{padding:20, backgroundColor:'white',}}>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{
                color:'#B84953',
                fontFamily:'Italiana-Regular',
                fontSize:24,
            }}>Viorra</Text>
            <View>
                <Text style={{
                    fontFamily:'PlayfairDisplay-Regular',
                    fontSize:24,
                }}>Profile</Text>
            </View>
        </View>
         <View style={{
                marginTop:20,
            }}>
                
                <TextInput placeholder='Search for all products' placeholderTextColor='#4B4B4B' style={{
                    height:42,
                    borderWidth:0.6,
                    borderColor:'#8F8F8F',
                    borderRadius:24,
                    color:'#4B4B4B',
                    fontSize:12,
                    lineHeight:21,
                    // paddingHorizontal:10,
                }}/>
            </View>
    </View>

    <Ionicons name="home" size={24} color="black" />
    </SafeAreaView>
  )
}

export default HomeScreen
