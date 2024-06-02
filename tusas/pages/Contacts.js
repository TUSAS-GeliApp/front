import React, {useState,useEffect  } from "react";
import { Image, ScrollView, Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, StatusBar, Modal, Linking } from "react-native";
import { Searchbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import { FlatList } from "react-native-gesture-handler";
import { ip_adress } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Contacts({navigation}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [profilData, setprofilData] = useState([]);

    useEffect (() => {
        const fetchprofils = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('accesToken');
                const response = await fetch(`http://${ip_adress}:8080/users/lists`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                const data = await response.json();
                setprofilData(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching profil data:', error);
            }
        };

        fetchprofils();
    }, []); 

    const handleSearch = (query) => {
        setSearchQuery(query);
        const results = profilData.filter(item => {
            const fullName = `${item.name} ${item.surname}`; // Tam isim oluştur
            return fullName.toLowerCase().includes(query.toLowerCase()); // Arama sorgusunu tam isimde yap
        });
        setSearchResults(results);
    };
    
   
    return(

        <View style={{flex:1}}>
            <StatusBar barStyle="auto"/>
            <View style={{backgroundColor: 'white'}}>
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
                                                    <View onStartShouldSetResponder={() => true} style={{alignItems:'center'}}>
                                                        <Image
                                                            source={{ uri: selectedItem.photo }}
                                                            style={{ width: 200, height: 200, borderRadius: 50 }}
                                                            />
                                                        <Text style={{ fontWeight: 'bold', fontSize: 30, marginBottom: 10 }}>{selectedItem.name} {selectedItem.surname}</Text>
                                                        <Text style={{ fontStyle: 'italic', fontSize: 18, marginBottom: 30 }}>{selectedItem.location}</Text>

                                                        <View style={{width:'100%'}}>

                                                            <Text style={{ fontStyle: 'italic', marginBottom: 30 }}>{selectedItem.job}</Text>

                                                            <TouchableOpacity onPress={() => Linking.openURL(`tel:${selectedItem.phone}`)}>
                                                                <Text style={{fontSize:15, fontWeight:'400', color: '#rgb(41, 64, 153)'}}>
                                                                    <Text style={{color: 'black',fontWeight:'bold'}}>Telefon: </Text> {selectedItem.phone} {"\n"}
                                                                </Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => {Linking.openURL(`mailto:${selectedItem.email}`);}}>
                                                                <Text style={{fontSize: 15, fontWeight: '400', color: '#rgb(41, 64, 153)'}}>
                                                                    <Text style={{color: 'black',fontWeight:'bold'}}>Mail: </Text> {selectedItem.email} {"\n"}
                                                                </Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => Linking.openURL(`https://www.instagram.com/${selectedItem.instagram}`)}>
                                                                <Text style={{fontSize:15, fontWeight:'400', color: '#rgb(41, 64, 153)'}}>
                                                                    <Text style={{color: 'black',fontWeight:'bold'}}>Instagram: </Text> {selectedItem.instagram} {"\n"}
                                                                </Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => Linking.openURL(`https://twitter.com/@${selectedItem.twitter}`)}>
                                                                <Text style={{fontSize:15, fontWeight:'400', color: '#rgb(41, 64, 153)'}}>
                                                                    <Text style={{color: 'black',fontWeight:'bold'}}>Twitter: </Text> {selectedItem.twitter}{"\n"}
                                                                </Text>
                                                            </TouchableOpacity>
                                                            
                                                            <TouchableOpacity onPress={() => Linking.openURL(`https://facebook.com/@${selectedItem.facebook}`)}>
                                                                <Text style={{fontSize:15, fontWeight:'400', color: '#rgb(41, 64, 153)'}}>
                                                                    <Text style={{color: 'black',fontWeight:'bold'}}>Facebook: </Text> {selectedItem.facebook}{"\n"}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>
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
                                data={searchResults.length === 0 ? profilData : searchResults}
                                style={{ marginHorizontal: 20 }}
                                scrollEnabled={false}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => { setSelectedItem(item); setModalVisible(true); }}>
                                        <View style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10, flexDirection:'row', justifyContent:'space-between' }}>
                                            <View style={{ flexDirection:'row', alignItems: 'center' }}>
                                                {!item.photo ? (
                                                    <Avatar.Text
                                                        size={70}
                                                        label={item.name.charAt(0) + item.surname.charAt(0)}
                                                        style={{ backgroundColor: 'white', borderWidth: 1 }}
                                                    />
                                                ) : (
                                                    <Image
                                                        source={{ uri: item.photo }}
                                                        style={{ width: 70, height: 70, borderRadius:70}}
                                                    />
                                                )}
                                                <View style={{ marginLeft: 10, width:'80%' }}>
                                                    <Text style={{ fontWeight: 'bold' }}>{item.name} {item.surname}</Text>
                                                    <Text>{item.job}</Text>
                                                </View>
                                            </View> 
                                        </View>


                                    </TouchableOpacity>
                                )}
                                keyExtractor={item => item.user_id.toString()}
                            />
                    </ScrollView>
            </View> 
                     
        </View>

    )

}