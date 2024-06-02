import React, { useState, useEffect  } from "react";
import { Image, Linking , Modal, TouchableWithoutFeedback, ScrollView, Text, Platform, View, TouchableOpacity, KeyboardAvoidingView, Alert } from "react-native";
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import { FlatList } from "react-native-gesture-handler";
import MapView,{Marker} from 'react-native-maps';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Content } from "antd/es/layout/layout";
import moment from "moment";

import { ip_adress } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Etkinlikler({navigation}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [mapModalVisible, setMapModalVisible] = useState(false);
    const [isContactDetailsVisible, setIsContactDetailsVisible] = useState({});

    const images = {
        '../assets/etkinlikler/soylesi2.jpg': require('../assets/etkinlikler/soylesi2.jpg'),
        '../assets/etkinlikler/soylesi.jpg': require('../assets/etkinlikler/soylesi.jpg'),
        '../assets/etkinlikler/demodaydavet.jpg': require('../assets/etkinlikler/demodaydavet.jpg'),
        '../assets/etkinlikler/sinemadavet.jpg': require('../assets/etkinlikler/sinemadavet.jpg'),
    };
      
    
    
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (events.length > 0) {
            const results = events.filter(event => {
                return event.event_name.toLowerCase().includes(query.toLowerCase());
            });
            setSearchResults(results);
        }
    };
    
    
    const handleLinkPress = (link) => {
        if (link === "") {
            Linking.openURL("https://www.tusas.com/iletisim");
        } else {
            Linking.openURL(link);
        }
    } 
    const renderEventContent = (content) => {
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    
        const emailMatches = content.event_content.match(emailRegex);
    
        if (emailMatches) {
            const email = emailMatches[emailMatches.length - 1];
    
            const emailIndex = content.event_content.lastIndexOf(email);
            
            const lastPeriodIndex = content.event_content.lastIndexOf('.', emailIndex);
    
            const part1 = content.event_content.substring(0, lastPeriodIndex + 1);
            const part2 = content.event_content.substring(lastPeriodIndex + 1);
    
            return (
                <View>
                    <Text>{part1}</Text>
                    <Text>{'\n'}</Text>
                    <View>
                        <Text style={{textAlign: 'center', fontWeight:'bold', fontSize:17}}>{part2.split(email)[0]}</Text>
                        <TouchableOpacity onPress={() => Linking.openURL(`mailto:${email}`)}>
                            <Text style={{ color: 'blue', fontSize: 16,textAlign: 'center' }}>{email}</Text>
                        </TouchableOpacity>
                        <Text>{part2.split(email)[1]}</Text>
                    </View>
                </View>
            );
        } else {
            return <Text>{content.event_content}</Text>;
        }
    };
    
    
    const getDaysUntilEvent = (eventDate) => {
        const today = new Date();
        const parts = eventDate.split('.');
        const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        const event = new Date(formattedDate);
    
        today.setHours(0, 0, 0, 0);
        const differenceInTime = event.getTime() - today.getTime();
        const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
        
        return differenceInDays;
    };
 
    const [events, setEvents] = useState([]);
    const [isEventInCalendar, setIsEventInCalendar] = useState({});

    useEffect (() => {
        const fetchEvents = async () => {
            try {
                const token = await AsyncStorage.getItem('accesToken');
    
                const calendarResponse = await fetch(`http://${ip_adress}:8080/calender/all_event`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                if (!calendarResponse.ok) {
                    throw new Error('Network response for calendar events was not ok');
                }
    
                const calendarEvents = await calendarResponse.json();
    
                const eventsResponse = await fetch(`http://${ip_adress}:8080/events/tum_etkinlikler`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
    
                if (!eventsResponse.ok) {
                    throw new Error('Network response for events was not ok');
                }
    
                const eventData = await eventsResponse.json();
    
                const updatedEvents = eventData.map(event => {
                    const isEventInCalendar = calendarEvents.some(
                        calEvent => calEvent.event_id === event.id

                    );

                    return { ...event, isEventInCalendar };
                });
    
                const eventCalendarStatus = {};
                updatedEvents.forEach(event => {
                    eventCalendarStatus[event.id] = event.isEventInCalendar;
                });
    
                setEvents(updatedEvents);
                setIsEventInCalendar(eventCalendarStatus);

            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
    
        fetchEvents();
    }, []);
     

    const [imageUrls, setImageUrls] = useState({});

    const handleGetImage = async (item_id) => {
        try {
            const token = await AsyncStorage.getItem('accesToken');
            const imageResponse = await fetch(`http://${ip_adress}:8080/events/photos/${item_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!imageResponse.ok) {
                throw new Error('Network response for image was not ok');
            }

            const blob = await imageResponse.blob();
            const url = URL.createObjectURL(blob);
            setImageUrls(prevState => ({ ...prevState, [item_id]: url }));
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        events.forEach(event => handleGetImage(event.id));
    }, [events]);
    const handleHeartPress = async (item) => { 
        try {
            const token = await AsyncStorage.getItem('accesToken');
            const response = await fetch(`http://${ip_adress}:8080/calender/all_event`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                throw new Error('Takvimdeki etkinlikler alınamadı');
            }
    
            const calendarEvents = await response.json();
            const isEventInCalendar = calendarEvents.some(event => event.event_id === item.id);
            setIsEventInCalendar(prevState => ({ ...prevState, [item.id]: !isEventInCalendar }));
    
            if (isEventInCalendar) {
                const eventInfo = {
                    event_id: item.id,
                };
                const deleteResponse = await fetch(`http://${ip_adress}:8080/calender/event`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(eventInfo)
                });
    
                if (!deleteResponse.ok) {
                    throw new Error('Takvimden silme işlemi başarısız');
                }
    
                Alert.alert(`Takvimden Çıkarıldı!!\n \n ${item.event_name}`);
            } else {
                const eventInfo = {
                    event_id: item.id,
                };
                const addResponse = await fetch(`http://${ip_adress}:8080/calender/event`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(eventInfo)
                });
    
                if (!addResponse.ok) {
                    throw new Error('Takvime ekleme işlemi başarısız');
                }
    
                Alert.alert(`Takvime Eklendi!!\n \n ${item.event_name}`);
            }
    
            const updatedCalendarEvents = await fetch(`http://${ip_adress}:8080/calender/all_event`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!updatedCalendarEvents.ok) {
                throw new Error('Takvimdeki etkinlikler alınamadı');
            }
    
            const updatedEvents = await updatedCalendarEvents.json();

            const updatedIsEventInCalendar = {};
            updatedEvents.forEach(event => {
                updatedIsEventInCalendar[event.event_id] = true;
            });
            setEvents(prevEvents => prevEvents.map(event => {
                if (event.id === item.id) {
                    return { ...event, isEventInCalendar: updatedIsEventInCalendar[event.id] };
                }
                return event;
            }));
    
        } catch (error) {
            console.error('Takvim işlemi hatası:', error);
        }
    };
    
    
    
    
    

   

    
    const [searchQueryForKatilimcilar, setSearchQueryForKatilimcilar] = useState('');
    const [searchResultsForKatilimcilar, setSearchResultsForKatilimcilar] = useState([]);


    const handleSearchForKatilimcilar = (query, eventIndex) => {
        setSearchQueryForKatilimcilar(query);
        const event = eventIndex;
        if (!event) 
            console.log("EVENT HATA");

        const results = event.filter(participant => {
            return participant.name.toLowerCase().includes(query.toLowerCase());
        });
        setSearchResultsForKatilimcilar(results);
    };

    const extractCoordinates = (konum) => {
        const [latitude, longitude] = konum.split("/").map(Number);
        return { latitude, longitude };
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
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10 , padding:5}}>
                                <TouchableWithoutFeedback>
                                    <View style={{width: '100%',
                                                    height: '80%', 
                                                    backgroundColor: 'white',
                                                    borderRadius: 20,
                                                    padding: 20,
                                                    alignItems: 'center',
                                                    shadowColor: '#000',
                                                    shadowOpacity: 100,
                                                    shadowRadius: 100}}>
                                        {selectedItem && (
                                            <KeyboardAwareScrollView 
                                                style={{ marginTop:50, width:'100%'}} 
                                                horizontal={false} 
                                                extraScrollHeight={120}>
                                                    <View onStartShouldSetResponder={() => true}>
                                                        <View style={{height:"100%"}}>
                                                            
                                                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, marginTop:10 }}>{selectedItem.event_name}</Text>  
                                                            {renderEventContent(selectedItem)}
                                                            

                                                            
                                                            {imageUrls[selectedItem.id] ? (
                                                                <Image
                                                                    style={{ height: 600, width: '100%',resizeMode:'contain', marginVertical:20 }}
                                                                    source={{ uri: imageUrls[selectedItem.id] }}
                                                                />
                                                            ) : (
                                                                <View style={{ height: 300, width: '100%', borderRadius: 10, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }}>
                                                                    <Text>Loading...</Text>
                                                                </View>
                                                            )}
                                                            {selectedItem.konum ? (
                                                                <View style={{height:500}}>
                                                                        {/* To run this without expo check https://docs.expo.dev/versions/latest/sdk/map-view/ */}
                                                                        <Text style={{fontSize:20, fontWeight:'bold', textAlign:'center', paddingBottom:20}}>
                                                                            Etkinlik Haritası
                                                                        </Text>
                                                                        <MapView
                                                                            style={{width: "100%", height:"100%"}}
                                                                            initialRegion={{
                                                                                latitude: selectedItem && selectedItem.konum ? extractCoordinates(selectedItem.konum).latitude : 0,
                                                                                longitude: selectedItem && selectedItem.konum ? extractCoordinates(selectedItem.konum).longitude : 0,
                                                                                latitudeDelta: 0.01,
                                                                                longitudeDelta: 0.01,
                                                                            }}
                                                                            onPress ={() => {setMapModalVisible(!mapModalVisible) }}>
                                                                            <Marker
                                                                                title={selectedItem.event_name}
                                                                                coordinate={extractCoordinates(selectedItem.konum)}

                                                                                calloutVisible={true} 
                                                                            />
                                                                        </MapView>
                                                                    <Modal visible={mapModalVisible}>
                                                                        <MapView
                                                                            style={{width: "100%", height:"100%"}}
                                                                            initialRegion={{
                                                                                latitude: selectedItem && selectedItem.konum ? extractCoordinates(selectedItem.konum).latitude : 0,
                                                                                longitude: selectedItem && selectedItem.konum ? extractCoordinates(selectedItem.konum).longitude : 0,
                                                                                latitudeDelta: 0.01,
                                                                                longitudeDelta: 0.01,
                                                                            }}
                                                                            >
                                                                            <Marker
                                                                            title={selectedItem.event_name}
                                                                            coordinate={extractCoordinates(selectedItem.konum)}

                                                                            />
                                                                        </MapView>  
                                                                            <TouchableOpacity 
                                                                                onPress={() => setMapModalVisible(!mapModalVisible)} 
                                                                                style={{ 
                                                                                    position: 'absolute', 
                                                                                    top: Platform.OS === 'ios' ? 50 : 20, // Platforma göre stil belirleme
                                                                                    left: Platform.OS === 'ios' ? 10 : 5,
                                                                                }}
                                                                            >
                                                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                                    <Ionicons name="chevron-back-sharp" color={Platform.OS === 'ios' ? 'white' : 'black'} style={{ fontSize: 40, shadowOpacity:2, shadowColor:'black', shadowRadius:10, shadowOffset:1 }} />

                                                                                    <Text style={{ color: Platform.OS === 'ios' ? 'white' : 'black', fontWeight: 'bold', fontSize: 25, shadowOpacity:2, shadowColor:'black', shadowRadius:10, shadowOffset:1 }}>{"Back"}</Text>
                                                                                </View>
                                                                            </TouchableOpacity>
                                                                    </Modal>
                                                                    
                                                                </View>
                                                            ) : <TouchableOpacity onPress={() => handleLinkPress(selectedItem.link)}>
                                                                    <Text style={{marginTop:15, color: 'red', textAlign:'center', fontSize: 20, fontWeight:'bold', textShadowOffset:1 , textShadowColor:'black', textShadowRadius:2}}>Etkinliğimiz Online Yapılacaktır.{'\n'}Katılmak için Tıklayınız</Text>
                                                                </TouchableOpacity>}
                                                                {/* KATILIMCILAR */}
                                                                <Text style={{textAlign: 'center', fontSize: 25, padding: 15, fontWeight: 'bold', marginTop: 60 }}>Katılımcılar</Text>
                                                                <Searchbar
                                                                        placeholder="Search"
                                                                        onChangeText={(query) => handleSearchForKatilimcilar(query, selectedItem.katilimcilar)}
                                                                        value={searchQueryForKatilimcilar}
                                                                        style={{margin:20, backgroundColor:'#rgb(246, 246, 246)', fontFamily:"Times New Roman"}}
                                                                    />

                                                                {searchResultsForKatilimcilar.length === 0 && searchQueryForKatilimcilar !== '' && (
                                                                    <Text style={{ paddingVertical: 40, textAlign: 'center', fontSize: 20, fontWeight:'bold' }}>
                                                                        Sonuç Bulunamadı
                                                                    </Text>
                                                                )}
                                                                
                                                                {(searchQueryForKatilimcilar === '' ? selectedItem.katilimcilar : searchResultsForKatilimcilar).map((participant) => (
                                                                    <View key={participant.id}>
                                                                        <TouchableOpacity 
                                                                            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }} 
                                                                            onPress={() => setIsContactDetailsVisible(prevState => ({ ...prevState, [participant.id]: !prevState[participant.id] }))}
                                                                        >
                                                                            
                                                                            <Image
                                                                                source={{ uri: participant.photo }}
                                                                                style={{ width: 70, height: 70, borderRadius:70, marginRight:30}}
                                                                            />
                                                                            <View>
                                                                                <Text style={{ fontSize: 16 }}>{participant.name}</Text>
                                                                                <Text style={{ fontSize: 14, color: '#888' }}>{participant.info.split(',')[0]}</Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                        {isContactDetailsVisible[participant.id] && (
                                                                            <View style={{ marginTop: 8, marginLeft: 10, width:'80%' }}>

                                                                                <TouchableOpacity onPress={() => Linking.openURL(`https://instagram.com/@${participant.info.split(',')[1]}`)}>
                                                                                    <Text style={{fontSize:15, fontWeight:'400', color: '#rgb(41, 64, 153)', marginBottom:10}}>
                                                                                        <Text style={{color: 'black',fontWeight:'bold'}}>Instagram:</Text> {participant.info.split(',')[1]}
                                                                                    </Text>
                                                                                </TouchableOpacity>
                                                                                
                                                                                <TouchableOpacity onPress={() => Linking.openURL(`https://twitter.com/${participant.info.split(',')[2]}`)}>
                                                                                    <Text style={{fontSize:15, fontWeight:'400', color: '#rgb(41, 64, 153)', marginBottom:10}}>
                                                                                        <Text style={{color: 'black',fontWeight:'bold'}}>X:</Text> {participant.info.split(',')[2]}
                                                                                    </Text>
                                                                                </TouchableOpacity>
                                                                                <TouchableOpacity onPress={() => Linking.openURL(`https://linkedin.com/in/${participant.info.split(',')[3]}`)}>
                                                                                    <Text style={{fontSize:15, fontWeight:'400', color: '#rgb(41, 64, 153)', marginBottom:10}}>
                                                                                        <Text style={{color: 'black',fontWeight:'bold'}}>Linkedin:</Text> {participant.info.split(',')[3]}
                                                                                    </Text>
                                                                                </TouchableOpacity>
                                                                                <TouchableOpacity onPress={() => Linking.openURL(`https://facebook.com/${participant.info.split(',')[4]}`)}>
                                                                                    <Text style={{fontSize:15, fontWeight:'400', color: '#rgb(41, 64, 153)', marginBottom:10}}>
                                                                                        <Text style={{color: 'black',fontWeight:'bold'}}>Facebook:</Text> {participant.info.split(',')[4]}
                                                                                    </Text>
                                                                                </TouchableOpacity>
                                                                                <Text></Text>
                                                                            </View>
                                                                        )}
                                                                    </View>
                                                            ))}

                                                                        
                                                        </View> 
                                                    </View>
                                            </KeyboardAwareScrollView>
                                        )}
                                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ position: 'absolute', top: 10, left: 10, padding: 10}}>
                                            <View style={{flexDirection:'row', alignContent:'center'}}>
                                                <Ionicons name="chevron-back-sharp" color="rgb(237, 52, 53)" style={{ fontSize: 20 }} />
                                                <Text style={{ color: '#rgb(237, 52, 53)', fontWeight: 'bold', fontSize: 15 }}>{"Back"}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                        
                    </Modal>


                    <FlatList
                        data={searchResults.length === 0 ? events.sort((a, b) => moment(b.event_date, 'DD-MM-YYYY HH:mm') - moment(a.event_date, 'DD-MM-YYYY HH:mm')) : searchResults}
                        style={{ flex: 1, width: "100%" }}
                        scrollEnabled={false}
                        renderItem={({ item }) => (

                            <View style={{ alignItems: 'center' }}>

                            <Text style={{ height: 0, backgroundColor: 'black', width: '100%', marginVertical: 10 }} />

                            <View style={{ width: '100%', paddingHorizontal: 20 }}>
                                <TouchableOpacity onPress={() => { setModalVisible(true); setSelectedItem(item) }} >
                                    <View style={{ height: 300, alignItems: 'center', borderRadius: 10, backgroundColor: '#b9b9b9' }}>
                                        {imageUrls[item.id] ? (
                                            <Image
                                                style={{ height: 300, width: '100%', borderRadius: 10 }}
                                                source={{ uri: imageUrls[item.id] }}
                                            />
                                        ) : (
                                            <View style={{ height: 300, width: '100%', borderRadius: 10, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text>Loading...</Text>
                                            </View> 
                                        )}
                                        <View style={{ position: 'absolute', top: 10, right: 10 }}>
                                            <TouchableOpacity onPress={() => handleHeartPress(item)} style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor:'rgba(256,256,256, 0.6)', paddingLeft:10, paddingVertical:10, borderRadius:10 }}>


                                            <Ionicons
                                                    name={isEventInCalendar[item.id] ? 'heart' : 'heart-outline'}
                                                    size={30}
                                                    color={isEventInCalendar[item.id] ? 'red' : 'black'}
                                                    style={{ marginRight: 10 }}
                                                />
                                                
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </TouchableOpacity>

                                <Text style={{ fontWeight: 'bold', fontSize: 15, textAlign: 'left', marginVertical: 10 }}>
                                {item.event_name}{'\n'}
                                {getDaysUntilEvent(item.event_date.split('/')[0]) > 0 ? (
                                    <Text style={{ color: 'rgb(154, 200, 160)', textAlign: 'left' }}>{getDaysUntilEvent(item.event_date.split('/')[0])} gün sonra</Text>
                                ) : (
                                    <Text style={{ color: 'rgb(250, 154, 154)', textAlign: 'left' }}>{Math.abs(getDaysUntilEvent(item.event_date.split('/')[0]))} gün önce</Text>
                                )}
                                </Text>
                            </View>
                            </View>
                        )}
                        keyExtractor={item => item.id.toString()}
                        />

               
                    
                </ScrollView>
            </View>   
                     
        </View>

    )

}