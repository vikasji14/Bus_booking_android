import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const SeatSelection = ({ selectedSeats, setSelectedSeats, bus, journeyDate }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const capacity = bus?.capacity || 40;
    const discountedPrice = bus?.price * (1 - (bus?.discountPercentage || 0) / 100);
    const totalPrice = selectedSeats?.length * discountedPrice;

    const selectOrUnselectSeats = (seatNumber) => {
        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
        } else {
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
    };
    const formatDate = (dateStr) => new Date(dateStr).toISOString().split('T')[0];
    let bookedSeats = [];

    if (bus?.seatsBooked && Array.isArray(bus.seatsBooked)) {
        const match = bus.seatsBooked.find(seat => seat.date === journeyDate);
        bookedSeats = match?.seats || [];
    }


    return (
        <View style={{ flex: 1, padding: 20 }}>


            {/* ✅ Choose Seats Button */}
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{
                    backgroundColor: "#dbeafe",
                    color: "black",
                    paddingVertical: 10,
                    borderRadius: 6,
                    marginBottom: 15,
                    borderColor: "#ccc",
                    borderWidth: 1

                }}
            >
                <Text style={{ color: "white", textAlign: "center", fontSize: 16, color: "black" }}>
                    Choose your seats
                </Text>
            </TouchableOpacity>

            {/* Modal */}
            <Modal visible={modalVisible} animationType="slide">
                <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
                    {/* Close Button */}
                    <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        style={{
                            position: "absolute",
                            top: 20,
                            right: 20,
                            zIndex: 999,
                            backgroundColor: "#ef4444",
                            borderRadius: 20,
                            width: 30,
                            height: 30,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>X</Text>
                    </TouchableOpacity>
                    <Text style={{ color: "gray", fontSize: 14 }}>
                        Total Selected Seat:  {selectedSeats?.length}
                    </Text>

                    <ScrollView
                        contentContainerStyle={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            paddingTop: 60,
                            gap: 10,
                            justifyContent: "center"
                        }}
                    >
                        {Array.from(Array(capacity).keys()).map((seatNumber) => {
                            const seatNum = seatNumber + 1;
                            const isBooked = bookedSeats?.includes(seatNum);
                            const isSelected = selectedSeats?.includes(seatNum);
                            // console.log("set Numer", seatNum, isBooked,isSelected)

                            let backgroundColor = "#e5e7eb"; // default: gray

                            if (isBooked) {
                                backgroundColor = "#fca5a5"; // red-500
                            } else if (isSelected) {
                                backgroundColor = "#86efac"; // green-500
                            }

                            return (
                                <TouchableOpacity
                                    key={seatNum}
                                    disabled={isBooked}
                                    onPress={() => selectOrUnselectSeats(seatNum)}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        backgroundColor,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: 6
                                    }}
                                >
                                    <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                                        <FontAwesome5
                                            name="chair"
                                            size={24}
                                            color={isBooked ? "red" : isSelected ? "white" : "gray"}
                                        />
                                        <Text
                                            style={{
                                                // position: 'absolute',
                                                fontSize: 14,
                                                color: isSelected ? "white" : "black",
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {seatNum}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>

                    {/* Legend */}
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 20, height: 20, backgroundColor: "#e5e7eb", borderRadius: 4, marginRight: 5 }} />
                            <Text>Available</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 20, height: 20, backgroundColor: "#22c55e", borderRadius: 4, marginRight: 5 }} />
                            <Text>Selected</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 20, height: 20, backgroundColor: "#ef4444", borderRadius: 4, marginRight: 5 }} />
                            <Text>Booked</Text>
                        </View>
                    </View>

                    {/* Done Button */}
                    <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        style={{
                            backgroundColor: "#22c55e",
                            paddingVertical: 12,
                            borderRadius: 8,
                            marginTop: 20
                        }}
                    >
                        <Text style={{ textAlign: "center", color: "#fff", fontSize: 16 }}>Done</Text>
                    </TouchableOpacity>
                </View>
            </Modal>


        </View>
    );
};

export default SeatSelection;
