import { Platform } from 'react-native';


export const BASE_URL =
  Platform.OS === "web"
    ? `${process.env.EXPO_PUBLIC_SERVER_URL}` // Replace with your server URL
    : "http://192.168.114.155:5000/api"; // Replace with your laptop IP

