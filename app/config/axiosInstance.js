// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const axiosInstance = axios.create({
//   baseURL: process.env.EXPO_PUBLIC_SERVER_URL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const token = await AsyncStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance; // 👈 default export



import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SERVER_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
});

// Attach token from AsyncStorage to headers (React Native only)
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
