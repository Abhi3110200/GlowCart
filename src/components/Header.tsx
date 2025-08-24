import {View, Text} from 'react-native'
import SearchBar from './SearchBar'
const Header = () => {
  return (
    <View style={{padding:20, backgroundColor:'white',}}>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{
                color:'#B84953'
            }}>Viorra</Text>
            <View>
                <Text>Profile</Text>
            </View>
        </View>
        <SearchBar/>
    </View>
  )
}

export default Header
