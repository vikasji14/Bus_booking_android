// import React from "react";
// import { View, Text, TouchableOpacity, ScrollView } from "react-native";

// const SeatSelection = ({ selectedSeats, setSelectedSeats, bus, journeyDate }) => {
//     const capacity = bus?.capacity || 40;
//     const discountedPrice = bus?.price * (1 - (bus?.discountPercentage || 0) / 100);
//     const totalPrice = selectedSeats?.length * discountedPrice;

//     const selectOrUnselectSeats = (seatNumber) => {
//         if (selectedSeats.includes(seatNumber)) {
//             setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
//         } else {
//             setSelectedSeats([...selectedSeats, seatNumber]);
//         }
//     };

//     let bookedSeats = bus?.seatsBooked?.filter((seat) => seat.date === journeyDate);
//     bookedSeats = bookedSeats?.length > 0 ? bookedSeats[0]?.seats : [];

//     return (
//         <View style={{ flex: 1, padding: 20 }}>
//             {/* Price Section */}
//             <View style={{ marginBottom: 20 }}>
//                 {bus?.discountPercentage > 0 && (
//                     <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
//                         <Text style={{ textDecorationLine: "line-through", fontSize: 16, color: "gray", marginRight: 10 }}>
//                             ₹{bus?.price * selectedSeats?.length}
//                         </Text>
//                         <Text style={{ backgroundColor: "#dc2626", color: "#fff", paddingHorizontal: 6, borderRadius: 4 }}>
//                             {bus?.discountPercentage}% off
//                         </Text>
//                     </View>
//                 )}
//                 <Text style={{ fontSize: 20, fontWeight: "bold" }}>₹{totalPrice?.toFixed(2)}</Text>
//                 <Text style={{ color: "gray", fontSize: 14 }}>
//                     Total for {selectedSeats?.length} seat{selectedSeats?.length !== 1 ? "s" : ""}
//                 </Text>
//             </View>

//             {/* ✅ Scrollable Seat Grid */}
//             <ScrollView
//                 style={{
//                     maxHeight: 300,
//                     borderWidth: 1,
//                     borderColor: "#ccc",
//                     borderRadius: 10,
//                     marginBottom: 10,
//                 }}
//                 contentContainerStyle={{
//                     flexDirection: "row",
//                     flexWrap: "wrap",
//                     padding: 10,
//                     gap: 10
//                 }}
//                 vertical={true}
//                 showsHorizontalScrollIndicator={true}
//             >
//                 {Array.from(Array(capacity).keys()).map((seatNumber) => {
//                     const seatNum = seatNumber + 1;
//                     const isBooked = bookedSeats.includes(seatNum);
//                     const isSelected = selectedSeats.includes(seatNum);

//                     let backgroundColor = "#e5e7eb";
//                     if (isBooked) backgroundColor = "#d1d5db";
//                     if (isSelected) backgroundColor = "#22c55e";

//                     return (
//                         <TouchableOpacity
//                             key={seatNum}
//                             disabled={isBooked}
//                             onPress={() => selectOrUnselectSeats(seatNum)}
//                             style={{
//                                 width: 50,
//                                 height: 50,
//                                 backgroundColor,
//                                 justifyContent: "center",
//                                 alignItems: "center",
//                                 borderRadius: 6
//                             }}
//                         >
//                             <Text>{seatNum}</Text>
//                         </TouchableOpacity>
//                     );
//                 })}
//             </ScrollView>

//             {/* Info */}
//             <Text style={{ fontSize: 14, color: "gray", marginBottom: 10 }}>
//                 Click on a seat to select/unselect it
//             </Text>

//             {/* Legend */}
//             <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
//                 <View style={{ flexDirection: "row", alignItems: "center" }}>
//                     <View style={{ width: 20, height: 20, backgroundColor: "#e5e7eb", borderRadius: 4, marginRight: 5 }} />
//                     <Text>Available</Text>
//                 </View>
//                 <View style={{ flexDirection: "row", alignItems: "center" }}>
//                     <View style={{ width: 20, height: 20, backgroundColor: "#22c55e", borderRadius: 4, marginRight: 5 }} />
//                     <Text>Selected</Text>
//                 </View>
//                 <View style={{ flexDirection: "row", alignItems: "center" }}>
//                     <View style={{ width: 20, height: 20, backgroundColor: "#d1d5db", borderRadius: 4, marginRight: 5 }} />
//                     <Text>Booked</Text>
//                 </View>
//             </View>
//         </View>
//     );
// };

// export default SeatSelection;
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal } from "react-native";

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

    let bookedSeats = bus?.seatsBooked?.filter((seat) => seat.date === journeyDate);
    bookedSeats = bookedSeats?.length > 0 ? bookedSeats[0]?.seats : [];

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
                            const isBooked = bookedSeats.includes(seatNum);
                            const isSelected = selectedSeats.includes(seatNum);

                            let backgroundColor = "#e5e7eb";
                            if (isBooked) backgroundColor = "#d1d5db";
                            if (isSelected) backgroundColor = "#22c55e";

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
                                    <Text>{seatNum}</Text>
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
                            <View style={{ width: 20, height: 20, backgroundColor: "#d1d5db", borderRadius: 4, marginRight: 5 }} />
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
