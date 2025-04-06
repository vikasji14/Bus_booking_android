import { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView,Linking } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Bus = ({ bus }) => {
  const navigation = useNavigation();
  const router = useRouter();
  const [selectedBus, setSelectedBus] = useState(null); // to show offers for specific bus
  const getAvailableSeats = (busItem) => {
    const formattedDate = moment(busItem?.journeyDate).format("DD-MMM-YYYY");
    const bookedEntry = busItem?.seatsBooked?.find(entry => entry.date === formattedDate);
    const bookedSeats = bookedEntry ? bookedEntry.seats.length : 0;

    return busItem?.capacity - bookedSeats;
  };

  const rawDate = bus[0]?.journeyDate;

  let displayDate = "Invalid Date";

  if (rawDate) {
    try {
      const parts = rawDate.split(" ");
      const day = parts[2]; // 24
      const month = parts[1]; // Apr
      const year = parts[3]; // 2025
      displayDate = `${day} ${month}, ${year}`;
    } catch (err) {
      displayDate = "Invalid Date";
    }
  }


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: '#f8f9fa' }}>
      {bus?.map((busItem) => {
        const discountedPrice = busItem?.price * (1 - (busItem?.discountPercentage || 0) / 100);
        return (
          <View
            key={busItem?._id}
            style={{
              backgroundColor: '#fff',
              padding: 16,
              margin: 10,
              marginTop: 20,
              borderRadius: 12,
              elevation: 3,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 2 },
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6, marginTop: -28 }}>
              <View
                style={{
                  backgroundColor: '#eee',
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 8,
                  alignSelf: 'flex-start',
                }}
              >
                <Text>{displayDate}</Text>

              </View>

              <Text style={{ paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, backgroundColor: busItem?.status[0] === 'Non-AC' ? '#d4edda' : '#f8d7da', color: busItem?.status[0] === 'Non-AC' ? '#155724' : '#721c24' }}>
                {busItem?.status}
              </Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2, alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>{busItem?.name}</Text>
              <Text style={{ color: 'black', marginBottom: 4 }}>Bus No: {busItem?.busNumber}</Text>
            </View>

            {busItem?.frequency?.length > 0 && (
              <View style={{ marginBottom: 6 }}>
                <Text style={{ color: 'orange' }}>{busItem?.frequency.join(', ')}</Text>
              </View>
            )}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
              <View style={{ alignItems: 'center' }}>
                <Ionicons name="location" size={22} color="dodgerblue" />
                <Text style={{ fontWeight: 'bold' }}>{busItem?.from}</Text>
                <Text>{moment(busItem?.departure, "HH:mm").format("hh:mm A")}</Text>
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
                <Text style={{ fontWeight: 'bold' }}>{busItem?.to}</Text>
                <Text>{moment(busItem?.arrival, "HH:mm").format("hh:mm A")}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                {busItem?.discountPercentage > 0 && (
                  <Text style={{ textDecorationLine: 'line-through', color: 'gray', fontSize: 13 }}>
                    ₹{busItem?.price}
                  </Text>
                )}
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'green' }}>₹{discountedPrice?.toFixed(2)}</Text>

                {
                  busItem?.offers?.length > 0 && (
                    <TouchableOpacity onPress={() => setSelectedBus(busItem?.offers)}>
                      <Text style={{ color: '#007BFF', fontSize: 12, paddingTop: 4 }}>View Offers</Text>
                    </TouchableOpacity>
                  )
                }
              </View>

              <View>
                <View style={{
                  backgroundColor: 'rgba(232, 227, 227, 0.5)',
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8
                }}>
                  <MaterialIcons name="people" size={14} color="black" />
                  <Text style={{ fontSize: 12 }}>{busItem?.capacity} </Text>
                  <Text style={{ backgroundColor: '#f8d7da', color: '#721c24', fontSize: 12, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2, marginLeft: 2 }}>{getAvailableSeats(busItem)} left</Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    router.push(
                      `/home?busId=${busItem?._id}&journeyDate=${displayDate}`
                    )
                  }

                  style={{
                    backgroundColor: '#28a745',
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Book Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      })}

      {/* Offers Modal */}
      <Modal
        visible={selectedBus !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedBus(null)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{
            backgroundColor: '#fff',
            padding: 20,
            width: '80%',
            borderRadius: 12
          }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Offers</Text>

            {
              selectedBus?.map((offers, index) => (
                <View key={index} style={{ marginBottom: 10}}>
                  <Text> {offers.text}</Text>
                  <TouchableOpacity onPress={() => Linking.openURL(offers?.link)}>
                    <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                      Claim Offers
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            }
            <TouchableOpacity
              onPress={() => setSelectedBus(null)}
              style={{
                marginTop: 16,
                backgroundColor: '#dc3545',
                padding: 10,
                borderRadius: 6,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#fff' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Bus;
