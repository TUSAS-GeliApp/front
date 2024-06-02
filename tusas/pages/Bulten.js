import React, { useState, useEffect  } from "react";
import { Image, Button, Modal, TouchableWithoutFeedback, ScrollView, Text, TextInput, View, TouchableOpacity, Switch, Alert } from "react-native";
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import { FlatList } from "react-native-gesture-handler";
import { ip_adress } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Bulten({navigation}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    const [bultenData, setbultenData] = useState([]);

    useEffect (() => {
        const fetchbultens = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('accesToken');
                const response = await fetch(`http://${ip_adress}:8080/newsletter/all_newsletters`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                const data = await response.json();
                setbultenData(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching bulten data:', error);
            }
        };
        fetchbultens();
    }, []);

        

    const handleSearch = (query) => {
        setSearchQuery(query);
        const results = bultenData.filter(item => {
            return item.title.toLowerCase().includes(query.toLowerCase());
        });
        setSearchResults(results);
    };

    return(

        <View style={{flex:1}}>            
            <View style={{backgroundColor: 'white',}}>
                <ScrollView style={{height:'100%'}}>
                    <Searchbar
                        placeholder="Search"
                        onChangeText={handleSearch}
                        value={searchQuery}
                        style={{margin:20, backgroundColor:'#rgb(246, 246, 246)', fontFamily:"Times New Roman"}}
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
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10, padding:5}}>
                                <TouchableWithoutFeedback>
                                
                                    <View style={{ width: '100%',
                                                    height: '80%', 
                                                    backgroundColor: 'white',
                                                    borderRadius: 20,
                                                    padding: 20,
                                                    alignItems: 'center',
                                                    shadowColor: '#000',
                                                    shadowOpacity: 100,
                                                    shadowRadius: 100}}>
                                        {selectedItem && (
                                            
                                                <ScrollView style={{marginTop:50}}>
                                                    <View onStartShouldSetResponder={() => true} style={{width: '100%', height: '100%'}}>

                                                        <Image 
                                                            style={{ width: '100%', height: 200, marginBottom: 10 }}
                                                            source={{uri: selectedItem.thumbnail_path}}/>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>{selectedItem.title}</Text>
                                                        <Text style={{ fontStyle: 'italic', marginBottom: 30 }}>{selectedItem.author_name}</Text>
                                                        <Text style={{}}>{selectedItem.content}</Text>
                                                    </View>
                                                </ScrollView>
                                            
                                        )}
                                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ position: 'absolute', top: 10, left: 10, padding: 10}}>
                                            <Text style={{ color: 'blue' }}>Close</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableWithoutFeedback>

                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>

                    <FlatList
                        data={searchResults.length === 0 ? bultenData : searchResults}
                        style={{ marginHorizontal: 20 }}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => { setSelectedItem(item); setModalVisible(true); }}>
                                <View style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}>
                                    <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                                    <Text>{item.author_name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.newsletter_id.toString()}
                    />
                    
                </ScrollView>
            </View>   
                     
        </View>

    )
}