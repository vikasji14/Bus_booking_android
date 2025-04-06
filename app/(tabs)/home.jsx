
import React, { useEffect, useState } from 'react'
import { View, Platform } from 'react-native'
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router'

import Search from '../../components/Search'
import BookNow from '../../components/BookNow'

const Home = () => {
  const { busId } = useLocalSearchParams();

  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      router.replace('/home'); // 🔥 this removes the busId from URL
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === "ios" ? 40 : 20 }}>
      {busId ? (
        <BookNow />
      ) : (
        <Search />
      )}
    </View>
  );
}

export default Home;
