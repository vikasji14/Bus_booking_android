import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Animated, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Eye icon for password visibility
// import {PhoneNumberLogin} from ""; // Import PhoneNumberLogin component
export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const scale = new Animated.Value(1);

  const handleLogin = () => {
    if ( !email || !password) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true); // Start loading
    console.log("Sign Up Details:", { email, password });
    setLoading(false); // Stop loading
  };

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      
      {/* HEADER WITH BACKGROUND IMAGE */}
      <ImageBackground
        source={{ uri: "https://buscdn.cardekho.com/in/ashok-leyland/oyster-tourist-bus/ashok-leyland-oyster-tourist-bus.jpg" }} 
        style={{
          height: 300, // Only header height
          justifyContent: "center",
          alignItems: "center",
          paddingTop: Platform.OS === "ios" ? 40 : 0,
        }}
        resizeMode="cover"
      >
        
      </ImageBackground>

      {/* LOGIN FORM */}
      <View style={{ paddingHorizontal:8, paddingTop:60, borderRadius: 10, marginTop: -30, elevation: 5 }}>
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
            style={{ flex: 1, padding: 15, fontSize: 16 , fontWeight: "bold"}}
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

        <Text style={{ textAlign: "center", marginVertical: 10 }}>OR</Text>

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
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
