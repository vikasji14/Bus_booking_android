import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';

const user = {
  name: 'Vikas Kumar',
  email: 'vikas@example.com',
  profileImage: 'https://i.pravatar.cc/300' // Replace with actual image
};

const profile = ({ navigation }) => {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Clear user session here
            navigation.replace('login'); // Replace with your login screen route
          },
        },
      ]
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#f3f4f6',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <Image
        source={{ uri: user.profileImage }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          borderWidth: 3,
          borderColor: '#2563eb',
          marginBottom: 20,
        }}
      />

      <Text style={{ fontSize: 24, fontWeight: '600', color: '#111827', marginBottom: 6 }}>
        {user.name}
      </Text>

      <Text style={{ fontSize: 16, color: '#6b7280', marginBottom: 30 }}>
        {user.email}
      </Text>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: '#ef4444',
          paddingHorizontal: 40,
          paddingVertical: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default profile;
