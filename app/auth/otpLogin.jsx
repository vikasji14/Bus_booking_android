import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { auth, signInWithPhoneNumber, RecaptchaVerifier } from "../config/firebase";

export default function OtpLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  // useEffect(() => {
  //   if (!window.recaptchaVerifier) {
  //     window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
  //       size: "invisible",
  //     });
  //   }
  // }, []);

  // Send OTP to Phone Number
  const sendOtp = async () => {
    if (!phone || !phone.startsWith("+") || phone.length < 10) {
      alert("Please enter a valid phone number with country code (e.g., +91XXXXXXXXXX)");
      return;
    }

    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmation(confirmationResult);
      alert("OTP Sent Successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert(`Failed to send OTP: ${error.message}`);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    if (!otp) {
      alert("Please enter the OTP");
      return;
    }

    try {
      if (confirmation) {
        await confirmation.confirm(otp);
        alert("Login Successful!");
      } else {
        alert("Please request OTP again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert(`Failed to verify OTP: ${error.message}`);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f0f2f5", padding: 20 }}>
      {/* reCAPTCHA Container (Hidden) */}
      <View id="recaptcha-container" />

      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#333" }}>
        Phone Number Login
      </Text>

      <Text style={{ fontSize: 16, color: "#555", marginBottom: 10 }}>Enter Phone Number</Text>
      <TextInput
        style={{
          width: "90%",
          height: 50,
          borderColor: "#007bff",
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 15,
          fontSize: 16,
          backgroundColor: "#fff",
          marginBottom: 20,
        }}
        keyboardType="phone-pad"
        placeholder="+91XXXXXXXXXX"
        onChangeText={setPhone}
      />

      <TouchableOpacity
        style={{
          width: "90%",
          backgroundColor: "#007bff",
          padding: 15,
          borderRadius: 8,
          alignItems: "center",
          marginBottom: 20,
        }}
        onPress={sendOtp}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Send OTP</Text>
      </TouchableOpacity>

      {confirmation && (
        <>
          <Text style={{ fontSize: 16, color: "#555", marginBottom: 10 }}>Enter OTP</Text>
          <TextInput
            style={{
              width: "90%",
              height: 50,
              borderColor: "#007bff",
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 15,
              fontSize: 16,
              backgroundColor: "#fff",
              marginBottom: 20,
            }}
            keyboardType="number-pad"
            placeholder="Enter OTP"
            onChangeText={setOtp}
          />

          <TouchableOpacity
            style={{
              width: "90%",
              backgroundColor: "#28a745",
              padding: 15,
              borderRadius: 8,
              alignItems: "center",
            }}
            onPress={verifyOtp}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
