import React, { useState, useEffect } from 'react';
import { Image, Modal, TouchableWithoutFeedback, ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import { FlatList } from "react-native-gesture-handler";
import { xxx } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Videolar({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [itemId, setItemId] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [videolarData, setVideolarData] = useState([]);
    const [videoInfo, setVideoInfo] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('accesToken');
                const response = await fetch(`http://${xxx}:8080/videos/all_videos`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                const data = await response.json();
                setVideolarData(data);
                console.log(data);

            } catch (error) {
                console.error('Error fetching video data:', error);
            }
        };

        fetchVideos();
    }, []);

    useEffect(() => {
        const fetchVideoInfo = async () => {
            if (itemId) {
                const selectedVideo = videolarData.find(video => video.videos_id === itemId);
                if (selectedVideo) {
                    const videoId = extractVideoId(selectedVideo.videos_path);
                    console.log(videoId)
                    try {
                        const apiKey = 'AIzaSyBtWZDRbk9lIoQ_HLbRXlmkmH_AonFaTws';
                        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails`);
                        const data = await response.json();
                        setVideoInfo(data.items[0]);
                    } catch (error) {
                        console.error('Error fetching video info:', error);
                    }
                }
            }
        };

        fetchVideoInfo();
    }, [itemId]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const results = videolarData.filter(item => {
            return item.title.toLowerCase().includes(query.toLowerCase());
        });
        setSearchResults(results);
    };

    const extractVideoId = (videoLink) => {

        if (!videoLink || typeof videoLink !== 'string') {
            return null; // Return null if videoLink is undefined or not a string
        }
        const matches = videoLink.match(/[?&]v=([^&]+)/);

        return matches ? matches[1] : null;
        
    };
    

    const renderVideoInfo = () => {
        if (!videoInfo) {
            return <ActivityIndicator />;
        }
    
        const { snippet, contentDetails } = videoInfo;
        const { title, description, publishedAt } = snippet;
        const { duration } = contentDetails;
    
        const selectedVideo = videolarData.find(video => video.videos_id === itemId);
        const videoLink = selectedVideo ? selectedVideo.videos_path : '';
    
        return (
            <ScrollView style={{ marginTop: 40 }}>
                <View onStartShouldSetResponder={() => true}>
                    <Image source={{ uri: `https://img.youtube.com/vi/${extractVideoId(videoLink)}/maxresdefault.jpg` }} style={{ width: "90%", height: 200 }} />
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{title}</Text>
                    <Text style={{ marginTop: 15 }}>{description}</Text>
                    <Text style={{ marginTop: 15 }}>{duration}</Text>
                    <Text style={{ marginTop: 15 }}>{publishedAt}</Text>
                </View>
            </ScrollView>
        );
    };
    

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: 'white' }}>
                <ScrollView style={{ height: '100%' }}>
                    <Searchbar
                        placeholder="Search"
                        onChangeText={handleSearch}
                        value={searchQuery}
                        style={{ margin: 20, backgroundColor: '#f6f6f6', fontFamily: "Times New Roman" }}
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
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 22,
                            }}>
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
                                        {renderVideoInfo()}
                                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ position: 'absolute', top: 10, left: 10, padding: 10 }}>
                                            <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                                                <Ionicons name="chevron-back-sharp" color="#ed3435" style={{ fontSize: 20 }} />
                                                <Text style={{ color: '#ed3435', fontWeight: 'bold', fontSize: 15 }}>{"Back"}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>

                    <FlatList
                        data={searchResults.length === 0 ? videolarData : searchResults}
                        style={{ flex: 1, width: "100%", marginHorizontal: 20 }}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <View style={{ marginVertical: 20 }}>
                                <TouchableOpacity onPress={() => { setModalVisible(true); setItemId(item.videos_id); setVideoInfo(null); }}>
                                    <View>
                                        <Image source={{ uri: `https://img.youtube.com/vi/${extractVideoId(item.videos_path)}/maxresdefault.jpg` }} style={{ width: "90%", height: 200 }} />
                                    </View>
                                </TouchableOpacity>
                                <Text style={{ width: '90%', marginVertical: 10, fontWeight: 'bold' }}>
                                    {item.title}
                                </Text>
                            </View>
                        )}
                        keyExtractor={item => item.videos_id.toString()}
                    />
                </ScrollView>
            </View>
        </View>
    );
}
