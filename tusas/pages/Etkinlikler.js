import { useState } from "react";
import { Image, Linking , Modal, TouchableWithoutFeedback, ScrollView, Text, Platform, View, TouchableOpacity, Switch, Alert } from "react-native";
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import { FlatList } from "react-native-gesture-handler";
import MapView,{Marker} from 'react-native-maps';

export default function Etkinlikler({navigation}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [mapModalVisible, setMapModalVisible] = useState(false);


    const dataForEtkinlik = {
        Etkinlik: [
            { 
                id: 1, 
                event_name: "Teknoloji ve inavasyon toplulugu Soylesi", 
                event_content: "Teknoloji ve İnovosyon Topluluğu tarafından çevrimiçi olarak düzenlenen Fütüristler Derneği Yüksek İstişare Kurulu üyesi "+
                                 "Dr. Mustafa Aykut ile Gelecekler Günü söyleşisine davetlisiniz. Etkinliğe katılarak ilham olabilir ve alternatif gelecekleri "+
                                  "keşfetme fırsatını yakalayabilirsiniz.", 
                event_date: "25.06.2024",
                imageUri: require("../assets/etkinlikler/soylesi.jpg"),
                konum: {latitude: 39.91130050705124, longitude: 32.81831313407547},
                link: "",
                is_online: true,
            },
            { 
                id: 2, 
                event_name: "inavasyon Soylesleri", 
                event_content: `"Kurum içi girişimcilik" ve "inovasyon" konularında alanında uzman kişileri ağırlayarak bakış açımızı zenginleştirdiğimiz söyleşi serimiz devam ediyor! Ford Otosan Gölcük Ar-Ge Test Merkezi Lideri olarak öne çıkan Selçuk Çelikel, "Kurumsal Bir Firmada Girişimci Olmak" konulu söyleşisiyle nbizlerle birlikte olacak. 8 Şubat Perşembe günij saat 12.30'da gerçekleşecek olan "İnovasyon Söyleşileri"ne hepiniz davetlisiniz.`,
                event_date: "25.04.2024",
                imageUri: require("../assets/etkinlikler/soylesi2.jpg"),
                konum: {latitude: 39.91130050705124, longitude: 32.81831313407547},
                link: "",
                is_online: false,
            },
            { 
                id: 3, 
                event_name: "Demo Day", 
                event_content: `HANGAR Kurum içi Girişimcilik Pilot Programımız kapsamında gerçekleşecek Demo Day etkinliği 6 Mart Çarşambagünü düzenlenecektir. 3 ay boyunca Hızlandırma Programı kapsamında iş fikirleri üzerinde çalışan kurum içi girişimcilerden oluşan 16 ekibimizin sunumlarının gerçekleşeceği Demo Doy etkinliğine hepiniz davetlisiniz. Girişimci çalışma arkadaşını desteklemek için seni de bekliyoruz!`,
                event_date: "06.03.2024",
                imageUri: require("../assets/etkinlikler/demodaydavet.jpg"),
                konum: {latitude: 40.08245625122704, longitude: 32.586099681975234},
                link: "",
                is_online: false,
            },
            { 
                id: 4, 
                event_name: "Sinema Daveti", 
                event_content: `Teknoloji ve İnovosyon Topluluğu tarafından düzenlenen girişimcı ve inovosyon temalı film gösterimine davetlisiniz. Gerçek bir hayat hikayesinden uyarlanan, girişimciliğe dair düşündürecekleri ile arkadaş sohbetlerimizi canlandıracak heyecanlı bir filme hazır olun! Sürpriz ikramlarımızla birlikte eğlenceli vakit geçirmek isteyen herkesi bekleriz! Kontenjanımız sınırlıdır.  Kayıt ve Bilgi: Abdulsamet EKŞİ abdulsamet.eksi@tai.com.tr`,
                event_date: "21.02.2024",
                imageUri: require("../assets/etkinlikler/sinemadavet.jpg"),
                konum: {latitude: 40.08245625122704, longitude: 32.586099681975234},
                link: "",
                is_online: false,
            },
        ]
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const results = dataForEtkinlik.Etkinlik.filter(item => {
            return item.event_name.toLowerCase().includes(query.toLowerCase());
        });
        setSearchResults(results);
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

            const parts = content.event_content.split(email);
    
            return (
                <View>
                    {parts.map((part, index) => (
                        <View key={index}>
                            <Text>{part}</Text>
                            {index < parts.length - 1 && (
                                <TouchableOpacity onPress={() => Linking.openURL(`mailto:${email}`)}>
                                    <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>{email}</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
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
                        <Text style={{ paddingVertical: 40, textAlign: 'center', fontSize: 20, fontWeight:'bold' }}>
                            No results found
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
                                            <ScrollView style={{ marginTop:50}}>
                                                <View onStartShouldSetResponder={() => true}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>{selectedItem.event_name}</Text>     
                                                    {renderEventContent(selectedItem)}
                                                    <TouchableOpacity onPress={() => handleLinkPress(selectedItem.link)}>
                                                        <Text style={{marginTop:15, color: 'red', textDecorationLine: 'underline' }}>Katilmak için</Text>
                                                    </TouchableOpacity>
                                                    <Text>{selectedItem.latitude}</Text>
                                                    {!selectedItem.is_online ? (
                                                        <View>
                                                            {/* To run this without expo check https://docs.expo.dev/versions/latest/sdk/map-view/ */}
                                                                <MapView
                                                                    style={{width: "100%", height:"100%"}}
                                                                    initialRegion={{
                                                                        latitude: selectedItem.konum.latitude,
                                                                        longitude: selectedItem.konum.longitude,
                                                                        latitudeDelta: 0.01,
                                                                        longitudeDelta: 0.01,
                                                                    }}
                                                                    onPress ={() => {setMapModalVisible(!mapModalVisible) }}>
                                                                    <Marker
                                                                        title={selectedItem.event_name}
                                                                        coordinate={{ latitude: selectedItem.konum.latitude, longitude: selectedItem.konum.longitude }}
                                                                        calloutVisible={true} 
                                                                    />
                                                                </MapView>
                                                            <Modal visible={mapModalVisible}>
                                                                <MapView
                                                                    style={{width: "100%", height:"100%"}}
                                                                    initialRegion={{
                                                                        latitude: selectedItem.konum.latitude,
                                                                        longitude: selectedItem.konum.longitude,
                                                                        latitudeDelta: 0.01,
                                                                        longitudeDelta: 0.01,
                                                                    }}
                                                                    >
                                                                    <Marker
                                                                    title={selectedItem.event_name}
                                                                    coordinate={{ latitude: selectedItem.konum.latitude, longitude: selectedItem.konum.longitude }}
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
                                                                            <Ionicons name="chevron-back-sharp" color={Platform.OS === 'ios' ? 'white' : 'black'} style={{ fontSize: 40, shadowOpacity:1  }} />
                                                                            <Text style={{ color: Platform.OS === 'ios' ? 'white' : 'black', fontWeight: 'bold', fontSize: 25, shadowOpacity:1  }}>{"Back"}</Text>
                                                                        </View>
                                                                    </TouchableOpacity>

                                                                    
                                                                
                                                            </Modal>
                                                            
                                                        </View>
                                                        ) : null}
                                                    
                                                </View>
                                            </ScrollView>
                                        )}
                                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ position: 'absolute', top: 10, left: 10, padding: 10}}>
                                            <View style={{flexDirection:'row', alignContent:'center'}}>
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
                    data={searchResults.length === 0 ? dataForEtkinlik.Etkinlik : searchResults}
                    style={{ flex: 1, width: "90%", marginHorizontal: 20 }}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ alignItems: 'center', width: '90%' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, width: '110%' }}>
                                    {item.event_name}
                                    {getDaysUntilEvent(item.event_date) > 0 ? (
                                        <Text style={{ color: 'green' }}> - {getDaysUntilEvent(item.event_date)} gün sonra</Text>
                                    ) : (
                                        <Text style={{ color: 'red' }}> - {Math.abs(getDaysUntilEvent(item.event_date))} gün önce</Text>
                                    )}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => { setModalVisible(true); setSelectedItem(item) }}>
                                <Image
                                    style={{ height: 500, resizeMode: 'contain', aspectRatio: 1 }}
                                    source={item.imageUri}
                                />
                            </TouchableOpacity>
                        </View>

                    )}
                    keyExtractor={item => item.id.toString()}
                />
               
                    
                </ScrollView>
            </View>   
                     
        </View>

    )

}