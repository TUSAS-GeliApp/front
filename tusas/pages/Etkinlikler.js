import { useState } from "react";
import { Image, Linking , Modal, TouchableWithoutFeedback, ScrollView, Text, Platform, View, TouchableOpacity, KeyboardAvoidingView, Alert } from "react-native";
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import { FlatList } from "react-native-gesture-handler";
import MapView,{Marker} from 'react-native-maps';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Etkinlikler({navigation}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [mapModalVisible, setMapModalVisible] = useState(false);
    const [isContactDetailsVisible, setIsContactDetailsVisible] = useState({});


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
                katilimcilar:[
                    {id:1, name:'Ali Veli', info:'Software Engineer'}, 
                    {id:2, name:'Ayşe Fatma', info:'Data Scientist'}, 
                    {id:3, name:'Mehmet Can', info:'Project Manager'}, 
                    {id:4, name:'Zeynep Duru', info:'UX Designer'}, 
                    {id:5, name:'Emre Yılmaz', info:'DevOps Engineer'}, 
                    {id:6, name:'Hakan Kaya', info:'Product Owner'},
                    {id:7, name:'Selin Öztürk', info:'Frontend Developer'},
                    {id:8, name:'Kaan Demir', info:'Backend Developer'},
                    {id:9, name:'Ece Kılıç', info:'Mobile Developer'},
                    {id:10, name:'Ahmet Öz', info:'Cloud Architect'}
                ]
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
                katilimcilar:[
                    {id:11, name:'Mert Yıldırım', info:'Business Analyst'}, 
                    {id:12, name:'Deniz Çelik', info:'Marketing Specialist'}, 
                    {id:13, name:'Ebru Aydın', info:'Scrum Master'}, 
                    {id:14, name:'Onur Kaplan', info:'Security Engineer'}, 
                    {id:15, name:'Pelin Şahin', info:'Quality Assurance'}, 
                    {id:16, name:'Kemal Arslan', info:'Systems Analyst'},
                    {id:17, name:'Seda Demir', info:'Data Analyst'},
                    {id:18, name:'Barış Akın', info:'Full Stack Developer'},
                    {id:19, name:'Gizem Polat', info:'Technical Writer'},
                    {id:20, name:'Tolga Koç', info:'Network Engineer'}
                ]
            },
            { 
                id: 1563, 
                event_name: "Demo Day", 
                event_content: `HANGAR Kurum içi Girişimcilik Pilot Programımız kapsamında gerçekleşecek Demo Day etkinliği 6 Mart Çarşambagünü düzenlenecektir. 3 ay boyunca Hızlandırma Programı kapsamında iş fikirleri üzerinde çalışan kurum içi girişimcilerden oluşan 16 ekibimizin sunumlarının gerçekleşeceği Demo Doy etkinliğine hepiniz davetlisiniz. Girişimci çalışma arkadaşını desteklemek için seni de bekliyoruz!`,
                event_date: "06.03.2024",
                imageUri: require("../assets/etkinlikler/demodaydavet.jpg"),
                konum: {latitude: 40.08245625122704, longitude: 32.586099681975234},
                link: "",
                is_online: false,
                katilimcilar:[
                    {id:21, name:'Okan Yılmaz', info:'Entrepreneur'}, 
                    {id:22, name:'Duygu Sarı', info:'Innovator'}, 
                    {id:23, name:'Eren Özdemir', info:'Startup Founder'}, 
                    {id:24, name:'Büşra Kuru', info:'Venture Capitalist'}, 
                    {id:25, name:'Gökhan Güven', info:'Tech Evangelist'}, 
                    {id:26, name:'Sinem Bulut', info:'Business Developer'},
                    {id:27, name:'Serkan Eren', info:'Innovation Consultant'},
                    {id:28, name:'Aslı Tan', info:'Growth Hacker'},
                    {id:29, name:'Burak Şen', info:'Sales Manager'},
                    {id:30, name:'Hande Keskin', info:'Operations Manager'}
                ]
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
                katilimcilar:[
                    {id:31, name:'Tuba Erkan', info:'Film Enthusiast'}, 
                    {id:32, name:'Berkay Can', info:'Movie Critic'}, 
                    {id:33, name:'Leyla Mutlu', info:'Cinematographer'}, 
                    {id:34, name:'Cem Gündüz', info:'Director'}, 
                    {id:35, name:'Ece Yalçın', info:'Screenwriter'}, 
                    {id:36, name:'Tuncay Özkan', info:'Producer'},
                    {id:37, name:'Bora Doğan', info:'Actor'},
                    {id:38, name:'Funda Şimşek', info:'Casting Director'},
                    {id:39, name:'Nazan Çetin', info:'Film Editor'},
                    {id:40, name:'Uğur Tekin', info:'Sound Designer'},
                    {id:41, name:'Elif Ersoy', info:'Makeup Artist'},
                    {id:42, name:'Gülay Koç', info:'Production Manager'}
                ]
            }
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
    
    const [heartPressedMap, setHeartPressedMap] = useState({});
    const [plusPressedMap, setPlusPressedMap] = useState({}); 

    const handleHeartPress = (itemId) => {
        // Burada kalp simgesine basıldığında yapılacak işlemleri tanımlayabilirsiniz.
        // Örneğin bir istek gönderip yanıt aldığınızda setHeartPressed(true) yapabilirsiniz.
        // Aşağıda benzer şekilde handlePlusPress için de bir işlev tanımlayabilirsiniz.
        // Bu örnekte Alert kullanarak basit bir bildirim gösteriyorum.
        Alert.alert(`Heart pressed: ${itemId}`);
        setHeartPressedMap({ ...heartPressedMap, [itemId]: !heartPressedMap[itemId] }); // Yanıt gelirse true yapın
    };

    const handlePlusPress = (itemId) => {
        // Burada artı simgesine basıldığında yapılacak işlemleri tanımlayabilirsiniz.
        Alert.alert(`Plus pressed: ${itemId}`);
        setPlusPressedMap({ ...plusPressedMap, [itemId]: !plusPressedMap[itemId] }); // Yanıt gelirse true yapın

    };

    const [isButtonGreenMap, setIsButtonGreenMap] = useState({});

    const handleAddContact = (itemId) => {
        setIsButtonGreenMap(prevMap => ({
            ...prevMap,
            [itemId]: !prevMap[itemId]
        }));
        // Add contact logic here
    };
    
    const [searchQueryForKatilimcilar, setSearchQueryForKatilimcilar] = useState('');
    const [searchResultsForKatilimcilar, setSearchResultsForKatilimcilar] = useState([]);


    const handleSearchForKatilimcilar = (query, eventIndex) => {
        setSearchQueryForKatilimcilar(query);
        const event = eventIndex;
        if (!event) 
            console.log("EVENT HATA");

        const results = event.filter(participant => {
            console.log(participant);

            return participant.name.toLowerCase().includes(query.toLowerCase());
        });
        setSearchResultsForKatilimcilar(results);
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
                                            <KeyboardAwareScrollView 
                                                style={{ marginTop:50, width:'100%'}} 
                                                horizontal={false} 
                                                extraScrollHeight={120}>
                                                    <View onStartShouldSetResponder={() => true}>
                                                        <View style={{height:"100%"}}>
                                                            
                                                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, marginTop:10 }}>{selectedItem.event_name}</Text>  

                                                            {renderEventContent(selectedItem)}
                                                            
                                                            <TouchableOpacity onPress={() => handleLinkPress(selectedItem.link)}>
                                                                <Text style={{marginTop:15, color: 'red', textAlign:'center', fontSize: 20, fontWeight:'bold', textShadowOffset:1 , textShadowColor:'black', textShadowRadius:2}}>Katilmak için</Text>
                                                            </TouchableOpacity>

                                                            <Image
                                                                style={{ height: 600, width: '100%',resizeMode:'contain', marginVertical:20 }}
                                                                source={selectedItem.imageUri}
                                                            />
                                                            {!selectedItem.is_online ? (
                                                                <View style={{height:500}}>
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
                                                                                    <Ionicons name="chevron-back-sharp" color={Platform.OS === 'ios' ? 'white' : 'black'} style={{ fontSize: 40, shadowOpacity:2, shadowColor:'black', shadowRadius:10, shadowOffset:1 }} />

                                                                                    <Text style={{ color: Platform.OS === 'ios' ? 'white' : 'black', fontWeight: 'bold', fontSize: 25, shadowOpacity:2, shadowColor:'black', shadowRadius:10, shadowOffset:1 }}>{"Back"}</Text>
                                                                                </View>
                                                                            </TouchableOpacity>
                                                                    </Modal>
                                                                    
                                                                </View>
                                                                ) : null}
                                    {/* KATILIMCILAR */}
                                                                <Text style={{textAlign: 'center', fontSize: 25, padding: 15, fontWeight: 'bold', marginTop: 10 }}>Katılımcılar</Text>
                                                                <Searchbar
                                                                        placeholder="Search"
                                                                        onChangeText={(query) => handleSearchForKatilimcilar(query, selectedItem.katilimcilar)}
                                                                        value={searchQueryForKatilimcilar}
                                                                        style={{margin:20, backgroundColor:'#rgb(246, 246, 246)', fontFamily:"Times New Roman"}}
                                                                    />

                                                                {searchResultsForKatilimcilar.length === 0 && searchQueryForKatilimcilar !== '' && (
                                                                    <Text style={{ paddingVertical: 40, textAlign: 'center', fontSize: 20, fontWeight:'bold' }}>
                                                                        No results found
                                                                    </Text>
                                                                )}
                                                                
                                                                {(searchQueryForKatilimcilar === '' ? selectedItem.katilimcilar : searchResultsForKatilimcilar).map((participant) => (
                                                                    <View key={participant.id}>
                                                                        <TouchableOpacity 
                                                                            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }} 
                                                                            onPress={() => setIsContactDetailsVisible(prevState => ({ ...prevState, [participant.id]: !prevState[participant.id] }))}
                                                                        >
                                                                            <Ionicons name="person" size={24} color="black" style={{ marginRight: 8 }} />
                                                                            <View>
                                                                                <Text style={{ fontSize: 16 }}>{participant.name}</Text>
                                                                                <Text style={{ fontSize: 14, color: '#888' }}>{participant.info}</Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                        {isContactDetailsVisible[participant.id] && (
                                                                            <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center', width:'80%' }}>
                                                                                <Text>{participant.name}'yi Kontağa</Text>
                                                                                <TouchableOpacity onPress={() => handleAddContact(participant.id)} style={{ marginLeft: 8 , flexDirection: 'row', alignItems: 'center'}}>
                                                                                    <Ionicons name="add-circle" size={30} color={isButtonGreenMap[participant.id] ? 'green' : 'red'} style={{ textShadowRadius: 5, textShadowColor: 'white' }} />
                                                                                    <Text style={{ textShadowRadius: 5, textShadowColor: 'white' ,color: isButtonGreenMap[participant.id] ? 'green' : 'red' , fontSize:20 }}>{isButtonGreenMap[participant.id] ? 'Çıkar' : 'Ekle'} </Text>
                                                                                </TouchableOpacity>
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
                        data={searchResults.length === 0 ? dataForEtkinlik.Etkinlik : searchResults}
                        style={{ flex: 1, width: "100%" }}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ height: 0, backgroundColor: 'black', width: '100%', marginVertical: 30 }} />

                                <View style={{ width: '100%', paddingHorizontal: 20 }}>
                                        <TouchableOpacity onPress={() => { setModalVisible(true); setSelectedItem(item) }} >
                                            <View style={{ height: 300, alignItems: 'center', borderRadius: 10, backgroundColor: '#b9b9b9' }}>
                                                <Image
                                                    style={{ height: 300, width: '100%', borderRadius: 10 }}
                                                    source={item.imageUri}
                                                />
                                                <View style={{ position: 'absolute', top: 10, right: 10, flexDirection: 'row' }}>
                                                    <TouchableOpacity onPress={() => handleHeartPress(item.id)}>
                                                        <Ionicons name="heart" size={30} color={heartPressedMap[item.id] ? 'green' : 'red'} style={{ marginRight: 10, textShadowRadius: 6, textShadowColor: 'white' }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => handlePlusPress(item.id)}>
                                                        <Ionicons name="add-circle" size={30} color={plusPressedMap[item.id] ? 'green' : 'red'} style={{ textShadowRadius: 5, textShadowColor: 'white' }} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                    <Text style={{ fontWeight: 'bold', fontSize: 15, textAlign: 'left', marginVertical: 10 }}>
                                        {item.event_name}{'\n'}
                                        {getDaysUntilEvent(item.event_date) > 0 ? (
                                            <Text style={{ color: 'rgb(154, 200, 160)', textAlign: 'left' }}>{getDaysUntilEvent(item.event_date)} gün sonra</Text>
                                        ) : (
                                            <Text style={{ color: 'rgb(250, 154, 154)', textAlign: 'left' }}>{Math.abs(getDaysUntilEvent(item.event_date))} gün önce</Text>
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