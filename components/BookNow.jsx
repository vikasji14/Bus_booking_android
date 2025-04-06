// import { Text, View } from "react-native";
// import React from "react";
// import { useLocalSearchParams } from "expo-router";

// export default function BookNow() {
//   const { busId, journeyDate } = useLocalSearchParams();

//   return (
//     <View style={{ padding: 20 }}>
//       <Text style={{ fontWeight: "bold" }}>Bus ID: {busId}</Text>
//       <Text>Journey Date: {journeyDate}</Text>
//     </View>
//   );
// }



import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { BASE_URL } from '../app/config/url';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useEffect } from 'react';
import axiosInstance from '../app/config/axiosInstance';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import SeatSelection from './SeatSelection';

export default function BookNow() {

  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [busSelectedError, setBusSelectedError] = useState('');
  const [bus, setBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { busId, journeyDate } = useLocalSearchParams();

  // const totalPrice = basePrice * selectedSeats?.length;

  // const discountAmount = totalPrice * (discount / 100);
  // const finalAmount = totalPrice - discountAmount;
  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await axiosInstance.get(`${BASE_URL}/buses/${busId}`);
        const data = await response.data.data;
        setBus(data);
        console.log('Bus Details:', data);
      } catch (error) {
        console.error('Error fetching bus details:', error);
      }
    }
    fetchBusDetails();
  }, []);


  const validateMobile = () => {
    const regex = /^[6-9]\d{9}$/;
    if (!regex.test(mobile)) {
      setMobileError('Please enter a valid 10-digit Indian mobile number');
      return false;
    }
    setMobileError('');
    return true;
  };

  const validateAddress = () => {
    if (address.length > 200) {
      setAddressError('Address cannot exceed 200 characters');
      return false;
    }
    setAddressError('');
    return true;
  };

  const handleSubmit = () => {
    const isMobileValid = validateMobile();
    const isAddressValid = validateAddress();
    if (selectedSeats.length === 0) {
      setBusSelectedError('Please select at least one seat');
    }
    if (isMobileValid && isAddressValid) {
      Alert.alert('Success', 'Proceeding to payment...');
    }
  };

  const discountedPrice = (bus?.price * (1 - (bus?.discountPercentage || 0) / 100)).toFixed(2);


  return (
    <ScrollView contentContainerStyle={{ paddingTop: 40, padding: 20, backgroundColor: '#f4f4f4', flexGrow: 1 }}>
      {/* <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Book Your Seat</Text> */}

      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: 'blue' }}>{bus?.name}</Text>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Bus No. {bus?.busNumber}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, paddingLeft: 20, paddingRight: 20 }}>
          <View style={{ alignItems: 'center' }}>
            <Ionicons name="location" size={22} color="dodgerblue" />
            <Text style={{ fontWeight: 'bold', borderRadius: 5, backgroundColor: 'dodgerblue', color: 'white', padding: 7, paddingHorizontal: 8 }}>{bus?.from}</Text>
            <Text style={{ fontWeight: 'bold' }}>{moment(bus?.departure, "HH:mm").format("hh:mm A")}</Text>
          </View>
          <View style={{ flex: 1, height: 50, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            {/* Horizontal line */}
            <View style={{
              position: 'absolute',
              height: 2,
              backgroundColor: '#ccc',
              width: '100%',
              top: '35%',
            }} />

            {/* Bus Icon (Facing right, moving left to right) */}
            <MaterialCommunityIcons name="bus-side" size={20} color="black" style={{ marginTop: -22 }} />
          </View>
          <View style={{ alignItems: 'center' }}>
            <MaterialIcons name="my-location" size={22} color="green" />
            <Text style={{ fontWeight: 'bold', borderRadius: 5, backgroundColor: 'green', color: 'white', padding: 7, paddingHorizontal: 8 }}>{bus?.to}</Text>
            <Text style={{ fontWeight: 'bold' }}>{moment(bus?.arrival, "HH:mm").format("hh:mm A")}</Text>
          </View>
        </View>

        <View style={{
          height: 1,
          marginTop: 10,
          backgroundColor: 'gray',
          width: '100%',
        }} />

        <View style={{ flex: 1, paddingBottom: 24, borderBottomWidth: 1, justifyContent: 'space-between', borderBottomColor: '#374151', flexDirection: 'row', gap: 0, paddingTop: 20 }}>
          {/* Journey Date */}
          <View style={{ flexDirection: 'row', width: '48%', backgroundColor: '#fff', alignItems: 'center', gap: 12, paddingHorizontal: 7, paddingVertical: 20, borderColor: '#ccc', borderRadius: 10 }}>
            <View style={{ padding: 8, backgroundColor: '#dbeafe', borderRadius: 8 }}>
              <Fontisto name="date" size={16} color="black" />
            </View>
            <View style={{}}>
              <Text style={{ fontSize: 12, color: '#6b7280' }}>Journey Date</Text>
              <Text style={{ fontSize: 12, fontWeight: '500', color: '#111827' }}> {moment(journeyDate, 'DD-MMM-YYYY').format('DD MMM YYYY')}</Text>
            </View>
          </View>

          {/* Price Section */}
          <View style={{ flexDirection: 'row', width: '48%', backgroundColor: '#fff', alignItems: 'center', gap: 12, paddingHorizontal: 7, paddingVertical: 20, borderColor: '#ccc', borderRadius: 10 }}>
            <View style={{ padding: 8, backgroundColor: '#ddd6fe', borderRadius: 8 }}>
              <Fontisto name="ticket" size={16} color="black" />
            </View>
            <View style={{ gap: 4 }}>
              <Text style={{ fontSize: 12, color: '#6b7280' }}>Price per seat</Text>
              <View style={{ flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                  <Text style={{ fontSize: 12, fontWeight: '500', color: '#111827', textDecorationLine: 'line-through' }}>
                    ₹{bus?.price}
                  </Text>

                  {bus?.discountPercentage > 0 && (
                    <View>
                      <Text
                        style={{
                          // paddingVertical: 4,
                          paddingHorizontal: 8,
                          backgroundColor: '#fef2f2',
                          color: '#b91c1c',
                          fontSize: 12,
                          fontWeight: '600',
                          borderRadius: 9999,
                        }}
                      >
                        {bus?.discountPercentage}% off
                      </Text>
                    </View>
                  )}

                </View>
                <Text style={{ fontSize: 16, fontWeight: '500', color: '#16a34a', alignItems: 'flex-start', textAlign: 'left', paddingRight: 25 }}>
                  ₹{discountedPrice}
                </Text>

              </View>
            </View>

          </View>


        </View>


        <SeatSelection
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
          bus={bus}
          journeyDate={journeyDate}
        />


        <View>
          <View style={{ marginBottom: 4, marginTop: -20 }}>
            <Text style={{ fontSize: 14, color: "#6b7280", marginBottom: 4 }}>Selected Seats</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", flexWrap: "wrap", height: 40, borderRadius: 8 }}>
                {selectedSeats?.length > 0 ? (
                  selectedSeats?.map((seat) => (
                    <View
                      key={seat}
                      style={{
                        backgroundColor: "#dbeafe",
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 20,
                        marginRight: 6,
                        marginBottom: 6,
                      }}
                    >
                      <Text style={{ fontSize: 12, fontWeight: "500", color: "#1e40af" }}>Seat {seat}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={{ fontStyle: "italic", color: "#9ca3af" }}>No seats selected</Text>
                )}
              </View>
              <View>
                {
                  busSelectedError && selectedSeats?.length === 0 && (
                    <Text style={{ color: "red", marginTop: 4 }}>{busSelectedError}</Text>
                  )
                }
              </View>
            </ScrollView>
          </View>

          {/* Price Breakdown */}
          {
            selectedSeats?.length > 0 && (
              <View style={{ marginBottom: 10, backgroundColor: "#fff", borderRadius: 8, padding: 10 }}>
                <Text style={{ fontSize: 14, color: "#6b7280", marginBottom: 2 }}>Price Breakdown</Text>

                {/* Original Price */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                  <Text>Original Price ({selectedSeats?.length} seats):</Text>
                  <Text>₹{(bus?.price * selectedSeats?.length).toFixed(2)}</Text>
                </View>

                {/* Discount */}
                {bus?.discountPercentage > 0 && (
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                    <Text>Discount ({bus?.discountPercentage}%):</Text>
                    <Text style={{ color: "#dc2626" }}>- ₹{((bus?.price * selectedSeats?.length).toFixed(2) * (bus?.discountPercentage / 100)).toFixed(2)}</Text>
                  </View>
                )}

                {/* Total */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 4, borderTopWidth: 1, borderTopColor: "#e5e7eb" }}>
                  <Text style={{ fontWeight: "500" }}>Total Amount:</Text>
                  <Text style={{ fontWeight: "500", color: "#2563eb" }}>₹{((bus?.price * selectedSeats?.length).toFixed(2) - (bus?.price * selectedSeats?.length).toFixed(2) * (bus?.discountPercentage / 100)).toFixed(2)}</Text>
                </View>
              </View>


            )
          }


        </View>


      </View>




      <Text style={{ marginBottom: 6 }}>Mobile Number</Text>
      <TextInput
        value={mobile}
        onChangeText={setMobile}
        keyboardType="numeric"
        placeholder="Enter 10-digit mobile number"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 12,
          borderRadius: 8,
          marginBottom: 5,
          backgroundColor: 'white',
        }}
      />
      {mobileError ? (
        <Text style={{ color: 'red', marginBottom: 10 }}>{mobileError}</Text>
      ) : null}

      <Text style={{ marginBottom: 6 }}>Address</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Enter your address"
        multiline
        numberOfLines={4}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 12,
          borderRadius: 8,
          textAlignVertical: 'top',
          backgroundColor: 'white',
        }}
      />
      {addressError ? (
        <Text style={{ color: 'red', marginBottom: 10 }}>{addressError}</Text>
      ) : null}

      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          marginTop: 20,
          backgroundColor: '#2563eb',
          paddingVertical: 14,
          borderRadius: 10,
        }}
      >
        <Text style={{ textAlign: 'center', color: 'white', fontSize: 16, fontWeight: '600' }}>
          Proceed to Pay
        </Text>
      </TouchableOpacity>


    </ScrollView>
  );
}
