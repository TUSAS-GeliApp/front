import React, { useState, useEffect  } from "react";
import { Image, Linking, Modal, TouchableWithoutFeedback, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import { FlatList } from "react-native-gesture-handler";
import { ip_adress } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Podcastler({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [podcastData, setPodcastData] = useState([]);

    useEffect (() => { 
        const fetchPodcasts = async () => {
            const accessToken = await AsyncStorage.getItem('accesToken');
    console.log(ip_adress);
    try {
                const response = await fetch(`http://${ip_adress}:8080/podcasts/all_podcasts`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                const data = await response.json();
                setPodcastData(data);
            } catch (error) {
                console.error('Error fetching podcast data:', error);
            }
        };

        fetchPodcasts();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const results = podcastData.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
        setSearchResults(results);
    };

    const handleLinkPress = (link) => {
        Linking.openURL(link);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: 'white' }}>
                <ScrollView style={{ height: '100%' }}>
                    <Searchbar
                        placeholder="Search"
                        onChangeText={handleSearch}
                        value={searchQuery}
                        style={{ margin: 20, backgroundColor: '#rgb(246, 246, 246)', fontFamily: "Times New Roman" }}
                    />
                    {searchResults.length === 0 && searchQuery !== '' && (
                        <Text style={{ paddingVertical: 40, textAlign: 'center', fontSize: 20, fontWeight:'bold', color:'red' }}>
                            Sonuç Bulunamadı
                        </Text>
                    )}

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}>
                        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10, padding: 5 }}>
                                <TouchableWithoutFeedback>
                                    <View style={{
                                        width: '100%',
                                        height: '80%',
                                        backgroundColor: 'white',
                                        borderRadius: 20,
                                        padding: 20,
                                        alignItems: 'center',
                                        shadowColor: '#000',
                                        shadowOpacity: 100,
                                        shadowRadius: 100
                                    }}>
                                        {selectedItem && (
                                            <ScrollView style={{ marginTop: 50 }}>
                                                <View onStartShouldSetResponder={() => true}>
                                                    <Image
                                                        style={{ width: '100%', height: 200, marginBottom: 10 }}
                                                        source={{uri: selectedItem.cover_image_path}}
                                                    />
                                                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>{selectedItem.title}</Text>
                                                    <Text style={{ fontStyle: 'italic', marginBottom: 30 }}>{selectedItem.artist_name}</Text>
                                                    <Text>{selectedItem.content}</Text>
                                                    <TouchableOpacity onPress={() => handleLinkPress(selectedItem.podcast_link)}>
                                                        <Text style={{ marginTop: 15, color: 'red', textDecorationLine: 'underline' }}>Dinlemek için</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </ScrollView>
                                        )}
                                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ position: 'absolute', top: 10, left: 10, padding: 10 }}>
                                            <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                                                <Ionicons name="chevron-back-sharp" color="#rgb(237, 52, 53)" style={{ fontSize: 20 }} />
                                                <Text style={{ color: '#rgb(237, 52, 53)', fontWeight: 'bold', fontSize: 15 }}>{"Back"}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>

                    <FlatList
                        data={searchResults.length === 0 ? podcastData : searchResults}
                        style={{ flex: 1, width: "100%" }}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ width: '100%', paddingHorizontal: 20 }}>
                                    <TouchableOpacity onPress={() => { setModalVisible(true); setSelectedItem(item); }}>
                                        <View style={{ height: 200, alignItems: 'center', borderRadius: 10, backgroundColor: '#b9b9b9' }}>
                                            <Image
                                                style={{ height: 200, width: '100%', borderRadius: 10 }}
                                                source={{uri: item.cover_image_path}}
                                            />
                                            <Text style={{ fontWeight: 'bold', fontSize: 25, textAlign: 'center', marginTop: -130, color: 'white', textShadowOffset: 0.6, textShadowColor: 'black', textShadowRadius: 5 }}>
                                                {item.title}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>

                                    <Text style={{ color: 'rgb(140, 140, 140)', textAlign: 'left', marginStart: 15, marginBottom: 15, marginTop: 5 }}>
                                        {item.artist_name}
                                    </Text>
                                </View>
                            </View>
                        )}
                        keyExtractor={item => item.id ? item.id.toString() : String(Math.random())}
                    />
                </ScrollView>
            </View>
        </View>
    );
}
