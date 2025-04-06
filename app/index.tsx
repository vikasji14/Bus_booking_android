import { View, Text, TouchableOpacity, Image, Platform, Animated } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
export default function HomeScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;
   useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handlePressIn = () => {
    Animated.timing(buttonAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(buttonAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const buttonBackgroundColor = buttonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", "#007bff"],
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#f8f9fa",paddingTop: Platform.OS === "ios" ? 40 : 0, }}>
      {/* Header with Background Image */}
      <View style={{ height: 300, overflow: "hidden", borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>
        <Image 
          source={{ uri: "https://buscdn.cardekho.com/in/ashok-leyland/oyster-tourist-bus/ashok-leyland-oyster-tourist-bus.jpg" }}
          style={{ width: "100%", height: "100%", resizeMode: "cover" }}
        />
      </View>
      
      {/* Main Content */}

      <Animated.View style={{  padding: 20, alignItems:'center', justifyContent:'center', opacity: fadeAnim }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#333" }}>
          Welcome to Bus Booking
        </Text>
        <Text style={{ fontSize: 16, fontStyle: "italic", color: "#666", marginBottom: 60, textAlign: "center" }}>
        Book online! Your journey begins with a click – secure seats, best prices, and stress-free travel.
        </Text>

        <TouchableOpacity
          style={{
            width: "80%",
            borderRadius: 10,
            alignItems: "center",
            borderWidth: 2,
            borderColor: "#007bff",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
          }}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => router.push("/home")}
        >
          <Animated.View style={{ backgroundColor: buttonBackgroundColor, padding: 15, borderRadius: 20, width: "100%", alignItems: "center" }}>
            <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>Book Your Bus</Text>
          </Animated.View>
        </TouchableOpacity>

   
      </Animated.View>

      <TouchableOpacity
  style={{
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#25D366",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  }}
  onPress={() => Linking.openURL("https://wa.me/919876543210?text=Hello, I need help with bus booking")}
>
  <FontAwesome name="whatsapp" size={30} color="white" />
</TouchableOpacity>;
    </View>
  );
}