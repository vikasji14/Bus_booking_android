
import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    Alert,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    FlatList,
    Platform,
} from 'react-native';
import fromImage from '../assets/images/from.png'
import toImage from '../assets/images/to.png';
import axiosInstance from '../app/config/axiosInstance';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BASE_URL } from '../app/config/url';
import Bus from './Bus';

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
    console.log("search buses", buses);
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
    // console.log("Buses",buses);

    return (
        <View style={{ padding: 16, backgroundColor: '#f5f7fa', flex: 1 }}>


            {/* From Location */}
            <Text style={{ fontSize: 16, marginBottom: 6, fontFamily: 'bold' }}>Your Location</Text>
            <View
                style={{
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 10,
                    backgroundColor: '#fff',
                    overflow: 'hidden',
                    marginBottom: 12,
                    position: 'relative'

                }}
            >

                {/* FROM SECTION */}
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={fromImage}
                            style={{ width: 20, height: 20, marginRight: 6 }}
                        />
                        <Text style={{ fontSize: 14, color: '#888' }}>From</Text>
                    </View>


                    <TextInput
                        value={from}
                        onChangeText={handleFromChange}
                        placeholder="Type location"
                        style={{ fontSize: 16, paddingVertical: 8, outlineStyle: 'none', borderWidth: 0 }}
                        underlineColorAndroid="transparent"
                    />

                </View>

                {/* VERTICAL DIVIDER */}
                <View style={{ width: 1, backgroundColor: '#ccc', marginVertical: 10 }} />

                {/* TO SECTION */}
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={toImage}
                            style={{ width: 20, height: 20, marginRight: 6 }}
                        />
                        <Text style={{ fontSize: 14, color: '#888' }}>To</Text>
                    </View>
                    <TextInput
                        value={to}
                        onChangeText={handleToChange}
                        placeholder="Type destination"
                        style={{ fontSize: 16, paddingVertical: 8, outlineStyle: 'none', borderWidth: 0 }}
                    />

                </View>


            </View>


            {fromSuggestions.length > 0 && (
                <View
                    style={{
                        position: 'absolute',
                        top: 120, // change based on input position
                        left: 16,
                        // right: 16,
                        width: '45%',
                        zIndex: 999,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', // 👈 semi-transparent white
                        borderWidth: 1,
                        borderColor: '#eee',
                        borderRadius: 8,
                        maxHeight: 150,
                        elevation: 5, // Android shadow
                        shadowColor: '#000', // iOS shadow
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                    }}
                >
                    <FlatList
                        data={fromSuggestions}
                        keyExtractor={(item) => item.ville}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => selectFrom(item.ville)}
                                style={{
                                    padding: 12,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#eee',
                                }}
                            >
                                <Text>{item.ville}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}


            {toSuggestions.length > 0 && (
                <View
                    style={{
                        position: 'absolute',
                        top: 120, // change based on input position
                        // left: 16,
                        right: 16,
                        zIndex: 999,
                        width: '45%',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', // 👈 semi-transparent white
                        borderWidth: 1,
                        borderColor: '#eee',
                        borderRadius: 8,
                        maxHeight: 150,
                        elevation: 5, // Android shadow
                        shadowColor: '#000', // iOS shadow
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                    }}
                >
                    <FlatList
                        data={toSuggestions}
                        keyExtractor={(item) => item.ville}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => selectTo(item.ville)}
                                style={{
                                    padding: 12,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#eee',
                                }}
                            >
                                <Text>{item.ville}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
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
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}> Find Your Bus</Text>
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
                        <Bus bus={buses} />
                </>
            )}



        </View>
    );
};

export default BusSearchScreen;
