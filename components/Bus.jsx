import { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

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

  return (
    <ScrollView>
      {bus?.map((busItem) => {
        const discountedPrice = busItem?.price * (1 - (busItem?.discountPercentage || 0) / 100);
        return (
          <View
            key={busItem?._id}
            style={{
              backgroundColor: '#fff',
              padding: 16,
              margin: 10,
              borderRadius: 12,
              elevation: 3,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 2 },
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
              <Text style={{ backgroundColor: '#eee', paddingHorizontal: 8, borderRadius: 8 }}>{moment(busItem?.journeyDate).format("DD MMM, YYYY")}</Text>
              <Text style={{ paddingHorizontal: 8, borderRadius: 8, backgroundColor: busItem?.status[0] === 'Non-AC' ? '#d4edda' : '#f8d7da', color: busItem?.status[0] === 'Non-AC' ? '#155724' : '#721c24' }}>
                {busItem?.status}
              </Text>
            </View>

            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>{busItem?.name}</Text>
            <Text style={{ color: 'black', marginBottom: 4 }}>Bus No: {busItem?.busNumber}</Text>

            {busItem?.frequency?.length > 0 && (
              <View style={{ marginBottom: 6 }}>
                <Text style={{ color: 'orange' }}>{busItem?.frequency.join(', ')}</Text>
              </View>
            )}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
              <View style={{ alignItems: 'flex-start' }}>
                <Ionicons name="location" size={18} color="dodgerblue" />
                <Text style={{ fontWeight: 'bold' }}>{busItem?.from}</Text>
                <Text>{moment(busItem?.departure, "HH:mm").format("hh:mm A")}</Text>
              </View>

              <View style={{ alignItems: 'flex-end' }}>
                <MaterialIcons name="my-location" size={18} color="green" />
                <Text style={{ fontWeight: 'bold' }}>{busItem?.to}</Text>
                <Text>{moment(busItem?.arrival, "HH:mm").format("hh:mm A")}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'green' }}>₹{discountedPrice?.toFixed(2)}</Text>
                {busItem?.discountPercentage > 0 && (
                  <Text style={{ textDecorationLine: 'line-through', color: 'gray', fontSize: 12 }}>
                    ₹{busItem?.price}
                  </Text>
                )}
                <TouchableOpacity onPress={() => setSelectedBus(busItem)}>
                  <Text style={{ color: '#007BFF', fontSize: 12 }}>View Offers</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                // onPress={() => navigation.navigate('BusDetail', { busId: busItem?._id })}
                onPress={() =>
                    router.push(
                      `/book-now?busId=${busItem?._id}&journeyDate=${moment(busItem?.journeyDate).format("DD-MMM-YYYY")}`
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
            <Text>🎉 Flat {selectedBus?.discountPercentage}% OFF on your ride!</Text>
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
