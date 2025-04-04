import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { auth, signInWithPhoneNumber, RecaptchaVerifier } from "./config"; // Import Firebase config

export default function PhoneLoginScreen() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const sendOTP = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container");
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
      setConfirmation(confirmation);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const verifyOTP = async () => {
    try {
      await confirmation.confirm(otp);
      console.log("User signed in successfully!");
    } catch (error) {
      console.error("Invalid OTP", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <div id="recaptcha-container"></div>
      {!confirmation ? (
        <>
          <TextInput
            placeholder="Enter phone number"
            value={phone}
            onChangeText={setPhone}
            style={{ borderWidth: 1, width: 200, padding: 10, marginBottom: 10 }}
          />
          <TouchableOpacity onPress={sendOTP} style={{ backgroundColor: "blue", padding: 10 }}>
            <Text style={{ color: "white" }}>Send OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            style={{ borderWidth: 1, width: 200, padding: 10, marginBottom: 10 }}
          />
          <TouchableOpacity onPress={verifyOTP} style={{ backgroundColor: "green", padding: 10 }}>
            <Text style={{ color: "white" }}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
