import { Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function BookNow() {
  const { busId, journeyDate } = useLocalSearchParams();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: "bold" }}>Bus ID: {busId}</Text>
      <Text>Journey Date: {journeyDate}</Text>
    </View>
  );
}
