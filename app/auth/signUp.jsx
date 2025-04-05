import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground,ScrollView, Animated, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // For Eye Icon

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const scale = new Animated.Value(1);

  // Handle API Request for SignUp
  const handleSignUp = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true); // Start loading
    console.log("Sign Up Details:", { name, email, password });
    setLoading(false); // Stop loading

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/auth/create-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      setLoading(false); // Stop loading
      if (data.success) {
        console.log("Signup Successful:");
        router.push("/auth/login"); // Redirect to Home
      } else {
        console.error("Signup Error:", data);
        alert(data.message || "Signup Failed");
      }
    } catch (error) {
      setLoading(false);
      console.error("Network Error:", error);
      alert("Network Error, Please try again");
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
          paddingTop: Platform.OS === "ios" ? 40 : 0,
        }}
        resizeMode="cover"
      >

      </ImageBackground>


      <View style={{ padding: 20, borderRadius: 10 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", color: "black", padding: 10, borderRadius: 5 }}>
          Register
        </Text>
        

        {/* Name Input */}
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            padding: 15,
            marginBottom: 15,
            backgroundColor: "white",
            fontWeight: "bold", // User input bold hoga
          }}
          placeholder="Enter your name"
          placeholderTextColor="#aaa" // Placeholder light gray dikhega
          value={name}
          onChangeText={setName}
        />


        {/* Email Input */}
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            padding: 15,
            marginBottom: 15,
            backgroundColor: "white",
            fontWeight:'bold'
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
            fontWeight: "bold",
          }}
        >
          <TextInput
            style={{ flex: 1, padding: 15,fontWeight: "bold", }}
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

        {/* Sign Up Button with Animation */}
        <Animated.View style={{ transform: [{ scale }] }}>
          <TouchableOpacity
            style={{ backgroundColor: "#007bff", padding: 12, borderRadius: 5, marginBottom: 15 }}
            onPress={handleSignUp}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>Sign Up</Text>
          </TouchableOpacity>
        </Animated.View>



        {/* Navigate to Login */}
        <TouchableOpacity onPress={() => router.push("/auth/login")}>
          <Text style={{ textAlign: "center", marginTop: 15, color: "#007bff" }}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
