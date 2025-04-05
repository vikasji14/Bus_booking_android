import { useState } from "react";
import { View, Text, TextInput,ScrollView, TouchableOpacity, ImageBackground, Animated, Platform } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons"; // Eye icon for password visibility
import { BASE_URL } from "../config/url"; // Import your base URL
// import {PhoneNumberLogin} from ""; // Import PhoneNumberLogin component
export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const scale = new Animated.Value(1);
  console.log("base url", BASE_URL);
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true); // Start loading
    console.log("Login Details:", { email, password });
  
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // ✅ JSON header
        },
        credentials: "include", // ✅ If your backend uses cookies (Optional)
        body: JSON.stringify({ email, password }), // ✅ Convert to JSON
      });
  
      const data = await response.json();
      console.log("Response Data:", data); // Log the response data
      setLoading(false); // Stop loading
  
      if (data.success) {
        console.log("Login Successful:", data);
        await AsyncStorage.setItem("token", data.data);
        await AsyncStorage.setItem("user-id", data.user._id);
        router.push("/home"); // Redirect to Home
      } else {
        console.log("Login Failed:", data.message);
        alert(data.message || "Login Failed"); // Show error message
      }
    } catch (error) {
      setLoading(false); // Stop loading
      console.error("Error logging in:", error);
    }
  };
  


  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "rgba(255, 255, 255, 0.85)" }}>


      {/* HEADER WITH BACKGROUND IMAGE */}
      <ImageBackground
        source={{ uri: "https://buscdn.cardekho.com/in/ashok-leyland/oyster-tourist-bus/ashok-leyland-oyster-tourist-bus.jpg" }}
        style={{
          height: 300, // Only header height
          justifyContent: "center",
          alignItems: "center",
          paddingTop: Platform.OS === "ios" ? 20 : 40,
        }}
        resizeMode="cover"
      >

      </ImageBackground>

      {/* LOGIN FORM */}
      <View style={{ padding: 20, borderRadius: 10 }}>
        <Text style={{ fontSize: 28, fontWeight: "bold", color: "black", padding: 10, borderRadius: 5 }}>
          Login
        </Text>
        
        {/* Email Input */}
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            padding: 15,
            marginBottom: 15,
            backgroundColor: "white",
            fontSize: 16,
            fontWeight: "bold",

          }}
          placeholder="Enter your email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input with Toggle Icon */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            backgroundColor: "white",
            paddingHorizontal: 10,
            marginBottom: 15,
          }}
        >
          <TextInput
            style={{ flex: 1, padding: 15, fontSize: 16, fontWeight: "bold" }}
            placeholder="Enter your password"
            placeholderTextColor="#aaa"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye" : "eye-off"} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Login Button with Animation */}
        <Animated.View style={{ transform: [{ scale }] }}>
          <TouchableOpacity
            style={{ backgroundColor: "#007bff", padding: 12, borderRadius: 5, marginBottom: 15 }}
            onPress={handleLogin}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>Login</Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={{  flexDirection: "row", alignItems: "center", width: "70%", marginVertical: 10, justifyContent:'center', marginLeft: 50 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
          <Text style={{ marginHorizontal: 10, color: "#555", fontSize: 16, textAlign: "center" }}>OR</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
        </View>



        {/* Google Login */}
        <TouchableOpacity
          style={{ backgroundColor: "red", padding: 12, borderRadius: 5, marginBottom: 10 }}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>Login with Google</Text>
        </TouchableOpacity>

        {/* Facebook Login */}
        <TouchableOpacity
          style={{ backgroundColor: "blue", padding: 12, borderRadius: 5 }}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>Login with Facebook</Text>
        </TouchableOpacity>

        {/* Navigate to Signup */}
        <TouchableOpacity onPress={() => router.push("/auth/signUp")}>
          <Text style={{ textAlign: "center", marginTop: 15, color: "#007bff" }}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
