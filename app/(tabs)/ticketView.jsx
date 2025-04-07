
import { useEffect, useState } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { BASE_URL } from '../config/url'
import axiosInstance from '../config/axiosInstance'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TicketView() {
    const [tickets, setTickets] = useState([])




    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const userId = await AsyncStorage.getItem('user-id');
                console.log("user id ", userId)
                if (!userId) return;

                const response = await axiosInstance.get(`${BASE_URL}/bookings/${userId}`);
                setTickets(response?.data.data)
            } catch (error) {
                console.error("Error fetching tickets:", error);
            }
        };

        fetchTickets();
    }, []);
    console.log("Tickets:", tickets);

    return (

        <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
            {tickets?.map((ticket) => (
                <View
                    key={ticket?._id}
                    style={{
                        backgroundColor: '#f9fafb',
                        padding: 16,
                        marginVertical: 10,
                        marginHorizontal: 20,
                        borderRadius: 12,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 3,
                        borderLeftWidth: 6,
                        borderLeftColor: '#2563eb',
                    }}
                >
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>
                        {ticket?.bus?.name || "Bus Name"}
                    </Text>

                    <Text style={{ fontSize: 14, color: '#4b5563', marginBottom: 2 }}>
                        Journey Date:{' '}
                        <Text style={{ fontWeight: '500' }}>{ticket?.seats?.map(seat => seat.date)}</Text>
                    </Text>

                    {/* Uncomment this if you want to show seats */}
                    <Text style={{ fontSize: 14, color: '#4b5563', marginBottom: 2 }}>
                        Seats:{' '}
                        <Text style={{ fontWeight: '500' }}>
                            {ticket?.seats?.map(seat => seat.seatNumbers).join(', ')}
                        </Text>
                    </Text>

                    <Text style={{ fontSize: 14, color: '#4b5563', marginBottom: 2 }}>
                        Mobile: <Text style={{ fontWeight: '500' }}>{ticket?.mobile}</Text>
                    </Text>

                    <Text style={{ fontSize: 14, color: '#4b5563' }}>
                        Transaction ID:{' '}
                        <Text style={{ fontWeight: '500' }}>{ticket?.transactionId}</Text>
                    </Text>
                </View>
            ))}
        </ScrollView>
    )
}