import React from 'react'
import Search from '../../components/Search'
import { View, Platform } from 'react-native' 
const home = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#f8f9fa",paddingTop: Platform.OS === "ios" ? 40 : 20, }}>
      <Search/>
    </View>
  )
}

export default home
