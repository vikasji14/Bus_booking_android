// import React, { useEffect, useState, useCallback } from 'react';
// import {
//     View,
//     Text,
//     ScrollView,
//     Alert,
//     TouchableOpacity,
//     ActivityIndicator,
//     Platform,
// } from 'react-native';
// import axiosInstance from '../app/config/axiosInstance'
// import axios from 'axios';
// import RNPickerSelect from 'react-native-picker-select';
// import DateTimePicker from '@react-native-community/datetimepicker';

// const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

// const BusSearchScreen = () => {
//     const [cities, setCities] = useState([]);
//     const [from, setFrom] = useState('');
//     const [to, setTo] = useState('');
//     const [journeyDate, setJourneyDate] = useState(new Date());
//     const [buses, setBuses] = useState([]);
//     const [status, setStatus] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [showDatePicker, setShowDatePicker] = useState(false);

//     const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
//     const fetchCities = async () => {
//         try {
//             const response = await axiosInstance.get(`${BASE_URL}/cities/get-all-cities`);
//             setCities(response.data.data);
//         } catch (err) {
//             Alert.alert("Error", "Failed to fetch cities");
//         }
//     };

  

//     const getBusesByFilter = useCallback(async () => {
//         console.log("Fetching buses with filters:", { from, to, journeyDate });
//         setLoading(true);
//         try {
//             const response = await axiosInstance.post(
//                 `${BASE_URL}/buses/get?from=${from}&to=${to}&journeyDate=${journeyDate}`
//             );
//             console.log("Filtered Buses Response:", response.data.data);
//             setBuses(response.data.data);
//             setStatus(true);
//         } catch (err) {
//             Alert.alert("Error", err?.response?.data?.message || "Failed to fetch buses");
//         } finally {
//             setLoading(false);
//         }
//     }, [from, to, journeyDate]);

//     useEffect(() => {
//         fetchCities();
//         // fetchAllBuses();
//     }, []);

//     const handleSearch = () => {
//         if (!from || !to || !journeyDate) {
//             Alert.alert("Please fill all fields");
//             return;
//         }
//         getBusesByFilter();
//     };

//     return (
//         <ScrollView
//             contentContainerStyle={{
//                 padding: 16,
//                 backgroundColor: '#f5f7fa',
//                 flexGrow: 1,
//             }}
//         >
//             <Text
//                 style={{
//                     fontSize: 24,
//                     fontWeight: 'bold',
//                     marginBottom: 24,
//                     textAlign: 'center',
//                 }}
//             >
//                 Find Your Bus
//             </Text>

//             <Text style={{ fontSize: 16, marginBottom: 6 }}>Your Location</Text>
//             <RNPickerSelect
//                 onValueChange={(value) => setFrom(value)}
//                 placeholder={{ label: 'Select location', value: null }}
//                 items={cities.map((city) => ({ label: city.ville, value: city.ville }))}
//                 style={{
                    
//                     inputAndroid: {
//                         fontSize: 16,
//                         borderWidth: 1,
//                         borderColor: '#ccc',
//                         borderRadius: 8,
//                         backgroundColor: '#fff',
//                         marginBottom: 12,
//                     },
//                 }}
//             />

//             <Text style={{ fontSize: 16, marginBottom: 6 }}>Destination</Text>
//             <RNPickerSelect
//                 onValueChange={(value) => setTo(value)}
//                 placeholder={{ label: 'Select destination', value: null }}
//                 items={cities.map((city) => ({ label: city.ville, value: city.ville }))}
//                 style={{
//                     inputIOS: {
//                         fontSize: 16,
//                         borderWidth: 1,
//                         borderColor: '#ccc',
//                         borderRadius: 8,
//                         backgroundColor: '#fff',
//                         marginBottom: 12,
//                     },
//                     inputAndroid: {
//                         fontSize: 16,
//                         borderWidth: 1,
//                         borderColor: '#ccc',
//                         borderRadius: 8,
//                         backgroundColor: '#fff',
//                         marginBottom: 12,
//                     },
//                 }}
//             />

//             <View style={{}}>
//                 <Text style={{ fontSize: 16, marginBottom: 6 }}>Journey Date</Text>

//                 {/* ✅ Touchable for mobile only */}
//                 {Platform.OS !== 'web' && (
//                     <>
//                         <TouchableOpacity
//                             onPress={() => setShowDatePicker(true)}
//                             style={{
//                                 backgroundColor: '#e2e8f0',
//                                 padding: 12,
//                                 borderRadius: 6,
//                                 alignItems: 'center',
//                                 marginBottom: 12,
//                             }}
//                         >
//                             <Text style={{ fontSize: 16, color: '#333' }}>
//                                 {journeyDate.toDateString()}
//                             </Text>
//                         </TouchableOpacity>

//                         {showDatePicker && (
//                             <DateTimePicker
//                                 value={journeyDate}
//                                 mode="date"
//                                 display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//                                 minimumDate={new Date()}
//                                 onChange={(event, selectedDate) => {
//                                     setShowDatePicker(false);
//                                     if (selectedDate) setJourneyDate(selectedDate);
//                                 }}
//                             />
//                         )}
//                     </>
//                 )}

//                 {/* ✅ Input for Web */}
//                 {Platform.OS === 'web' && (
//                     <input
//                         type="date"
//                         value={journeyDate.toISOString().split('T')[0]}
//                         onChange={(e) => setJourneyDate(new Date(e.target.value))}
//                         style={{
//                             fontSize: 16,
//                             padding: 12,
//                             borderRadius: 6,
//                             border: '1px solid #ccc',
//                             marginBottom: 12,
//                         }}
//                     />
//                 )}

//             </View>


//             <TouchableOpacity
//                 onPress={handleSearch}
//                 style={{
//                     backgroundColor: '#2563eb',
//                     padding: 14,
//                     borderRadius: 8,
//                     alignItems: 'center',
//                     marginBottom: 20,
//                 }}
//             >
//                 <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
//                     Search Buses
//                 </Text>
//             </TouchableOpacity>

//             {loading && <ActivityIndicator size="large" color="#007bff" />}

//             {status && buses.length === 0 && (
//                 <Text
//                     style={{
//                         color: 'red',
//                         textAlign: 'center',
//                         marginVertical: 12,
//                     }}
//                 >
//                     No buses available for selected route and date.
//                 </Text>
//             )}

//             <Text
//                 style={{
//                     fontSize: 18,
//                     fontWeight: '600',
//                     marginBottom: 12,
//                 }}
//             >
//                 Available Buses:
//             </Text>

//             {buses.map((bus, index) => (
//                 <View
//                     key={index}
//                     style={{
//                         backgroundColor: '#fff',
//                         padding: 16,
//                         borderRadius: 10,
//                         marginBottom: 12,
//                         shadowColor: '#000',
//                         shadowOpacity: 0.1,
//                         shadowRadius: 4,
//                         elevation: 3,
//                     }}
//                 >
//                     <Text style={{ fontSize: 16, marginBottom: 4 }}>Name: {bus.name}</Text>
//                     <Text style={{ fontSize: 16, marginBottom: 4 }}>From: {bus.from}</Text>
//                     <Text style={{ fontSize: 16, marginBottom: 4 }}>To: {bus.to}</Text>
//                 </View>
//             ))}


//         </ScrollView>
//     );
// };

// export default BusSearchScreen;


import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    ScrollView,
    Alert,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    FlatList,
    Platform,
} from 'react-native';
import axiosInstance from '../app/config/axiosInstance';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BASE_URL } from '../app/config/url';

const BusSearchScreen = () => {
    const [cities, setCities] = useState([]);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [fromSuggestions, setFromSuggestions] = useState([]);
    const [toSuggestions, setToSuggestions] = useState([]);
    const [journeyDate, setJourneyDate] = useState(new Date());
    const [buses, setBuses] = useState([]);
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const fetchCities = async () => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/cities/get-all-cities`);
            setCities(response.data.data);
        } catch (err) {
            Alert.alert("Error", "Failed to fetch cities");
        }
    };

    const getBusesByFilter = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(
                `${BASE_URL}/buses/get?from=${from}&to=${to}&journeyDate=${journeyDate}`
            );
            setBuses(response.data.data);
            setStatus(true);
        } catch (err) {
            Alert.alert("Error", err?.response?.data?.message || "Failed to fetch buses");
        } finally {
            setLoading(false);
        }
    }, [from, to, journeyDate]);

    useEffect(() => {
        fetchCities();
    }, []);

    const handleSearch = () => {
        if (!from || !to || !journeyDate) {
            Alert.alert("Please fill all fields");
            return;
        }
        getBusesByFilter();
    };

    const handleFromChange = (text) => {
        setFrom(text);
        const filtered = cities.filter(city =>
            city.ville.toLowerCase().includes(text.toLowerCase())
        );
        setFromSuggestions(filtered);
    };

    const handleToChange = (text) => {
        setTo(text);
        const filtered = cities.filter(city =>
            city.ville.toLowerCase().includes(text.toLowerCase())
        );
        setToSuggestions(filtered);
    };

    const selectFrom = (value) => {
        setFrom(value);
        setFromSuggestions([]);
    };

    const selectTo = (value) => {
        setTo(value);
        setToSuggestions([]);
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 16, backgroundColor: '#f5f7fa', flexGrow: 1 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' }}>
                Find Your Bus
            </Text>

            {/* From Location */}
            <Text style={{ fontSize: 16, marginBottom: 6 }}>Your Location</Text>
            <TextInput
                value={from}
                onChangeText={handleFromChange}
                placeholder="Type location"
                style={{
                    fontSize: 16,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 8,
                    backgroundColor: '#fff',
                    padding: 12,
                    marginBottom: 6,
                }}
            />
            {fromSuggestions.length > 0 && (
                <FlatList
                    data={fromSuggestions}
                    keyExtractor={(item) => item.ville}
                    style={{
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 8,
                        maxHeight: 150,
                        marginBottom: 12,
                    }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => selectFrom(item.ville)}
                            style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}
                        >
                            <Text>{item.ville}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}

            {/* To Destination */}
            <Text style={{ fontSize: 16, marginBottom: 6 }}>Destination</Text>
            <TextInput
                value={to}
                onChangeText={handleToChange}
                placeholder="Type destination"
                style={{
                    fontSize: 16,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 8,
                    backgroundColor: '#fff',
                    padding: 12,
                    marginBottom: 6,
                }}
            />
            {toSuggestions.length > 0 && (
                <FlatList
                    data={toSuggestions}
                    keyExtractor={(item) => item.ville}
                    style={{
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 8,
                        maxHeight: 150,
                        marginBottom: 12,
                    }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => selectTo(item.ville)}
                            style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}
                        >
                            <Text>{item.ville}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}

            {/* Journey Date */}
            <Text style={{ fontSize: 16, marginBottom: 6 }}>Journey Date</Text>
            {Platform.OS !== 'web' && (
  <>
    <TouchableOpacity
      onPress={() => setShowDatePicker(true)}
      style={{
        backgroundColor: '#e2e8f0',
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
        marginBottom: 12,
      }}
    >
      <Text style={{ fontSize: 16, color: '#333' }}>
        {journeyDate.toISOString().split('T')[0]}
      </Text>
    </TouchableOpacity>

    {showDatePicker && (
      <DateTimePicker
        value={journeyDate}
        mode="date"
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        minimumDate={new Date()}
        onChange={(event, selectedDate) => {
          setShowDatePicker(false);
          if (selectedDate) setJourneyDate(selectedDate);
        }}
      />
    )}
  </>
)}
            {Platform.OS === 'web' && (
                <input
                    type="date"
                    value={journeyDate.toISOString().split('T')[0]}
                    onChange={(e) => setJourneyDate(new Date(e.target.value))}
                    style={{
                        fontSize: 16,
                        padding: 12,
                        borderRadius: 6,
                        border: '1px solid #ccc',
                        marginBottom: 12,
                    }}
                />
            )}

            {/* Search Button */}
            <TouchableOpacity
                onPress={handleSearch}
                style={{
                    backgroundColor: '#2563eb',
                    padding: 14,
                    borderRadius: 8,
                    alignItems: 'center',
                    marginBottom: 20,
                }}
            >
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Search Buses</Text>
            </TouchableOpacity>

            {loading && <ActivityIndicator size="large" color="#007bff" />}

            {status && buses.length === 0 && (
                <Text style={{ color: 'red', textAlign: 'center', marginVertical: 12 }}>
                    No buses available for selected route and date.
                </Text>
            )}

            {buses.length > 0 && (
                <>
                    <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12 }}>
                        Available Buses:
                    </Text>

                    {buses.map((bus, index) => (
                        <View
                            key={index}
                            style={{
                                backgroundColor: '#fff',
                                padding: 16,
                                borderRadius: 10,
                                marginBottom: 12,
                                shadowColor: '#000',
                                shadowOpacity: 0.1,
                                shadowRadius: 4,
                                elevation: 3,
                            }}
                        >
                            <Text style={{ fontSize: 16, marginBottom: 4 }}>Name: {bus.name}</Text>
                            <Text style={{ fontSize: 16, marginBottom: 4 }}>From: {bus.from}</Text>
                            <Text style={{ fontSize: 16, marginBottom: 4 }}>To: {bus.to}</Text>
                        </View>
                    ))}
                </>
            )}
        </ScrollView>
    );
};

export default BusSearchScreen;
