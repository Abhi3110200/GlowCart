import {View, Text, TextInput} from 'react-native'
const SearchBar = () => {
  return (
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
  )
}

export default SearchBar
