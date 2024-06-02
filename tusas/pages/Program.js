import React, { useState, useEffect  } from "react";
import { Image, Linking, Modal, ScrollView, Text, TouchableOpacity, View, Platform, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { Searchbar } from 'react-native-paper';
import { ip_adress } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Program({ navigation }) {
    const [mapModalVisible, setMapModalVisible] = useState(false);
    const [katilimciModalVisible, setKatilimciModalVisible] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isContactDetailsVisible, setIsContactDetailsVisible] = useState({});
    const [combinedData, setcombinedData] = useState([]);

    useEffect (() => {
        const fetchprograms = async () => {
            try { 
                const accessToken = await AsyncStorage.getItem('accesToken');
                const response = await fetch(`http://${ip_adress}:8080/program/all_program`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                const data = await response.json();

                const responseKonusmacilar = await fetch(`http://${ip_adress}:8080/program/all_program_speaker`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                const dataKonusmacilar = await responseKonusmacilar.json();
                const responseKatilimcilar = await fetch(`http://${ip_adress}:8080/program/all_program_user`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                const dataKatilimcilar = await responseKatilimcilar.json();
                
                const combinedData = {...data[0], 'konusmacilar':dataKonusmacilar, 'katilimcilar': dataKatilimcilar};
                setcombinedData([combinedData]);

            } catch (error) {
                console.error('Error fetching program data:', error);
            }
        };

        fetchprograms();
    }, []);
 
    
    const renderTextWithLinks = (text, index) => {
        const parts = text.split(/(\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b)/g);
        return (
            <React.Fragment key={index}>
                {parts.map((part, idx) => {
                    if (part.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/)) {
                        return (
                            <TouchableOpacity key={idx} onPress={() => Linking.openURL('mailto:' + part)} style={{ padding: 20 }}>
                                <View style={{ backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', padding: 10, shadowOpacity: 0.4 }}>
                                    <Text style={{ color: 'white', textAlign: 'center' }}>
                                        {part}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    } else {
                        return <Text key={idx}>{part}</Text>;
                    }
                })}
            </React.Fragment>
        );
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (combinedData.length > 0 && combinedData[0].katilimcilar && Array.isArray(combinedData[0].katilimcilar)) {
            const results = combinedData[0].katilimcilar.filter(katilimci =>
                katilimci.name.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };
    


    const getInitials = (name) => {
        const initials = name.split(' ').map(word => word[0]).join('').slice(0, 2);
        return initials;
    };


    const extractCoordinates = (konum) => {
        const [latitude, longitude] = konum.split("/").map(Number);
        return { latitude, longitude };
    };
    return (
        <ScrollView style={{ flex: 1}}>
            {combinedData.map((item) => (
                <View key={item.id} style={{ alignItems: 'center' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            style={{ width:'100%', resizeMode: 'cover', aspectRatio: 1 }}
                            source={{ uri: item.image_path }}
                        />
                        <Text style={{shadowOpacity:1, textShadowColor:'black', textShadowRadius:10, fontSize:50, color:'white', fontWeight:'bold', position: 'absolute', top: 200, bottom: 0}}>
                            {item.name}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Text style={{padding:20, marginTop: -50}}>
                            {item.content.split('\n').map((content, index) => {
                                content = content.trim();
                                if (content.trim().startsWith('//') && content.trim().endsWith('//')) {
                                    return (
                                        <Text key={index} style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 22, textShadowRadius:2, textShadowColor:'#rgb(237, 52, 53)'}}>
                                            {content.replace(/\/\//g, '\n\n')}
                                        </Text>
                                    );
                                } else if (content.trim().startsWith('/') && content.trim().endsWith('/')) {
                                    return (
                                        <Text key={index} style={{ fontWeight: 'bold', fontSize: 18 , textShadowRadius:1, textShadowColor:'#rgb(237, 52, 53)'}}>
                                            {content.replace(/\//g, '\n')}
                                        </Text>
                                    );
                                } else {
                                    return <Text key={index}>{'\n'}{renderTextWithLinks(content, index)}{'\n'}</Text>;
                                }
                            })}
                        </Text>
                    </View>
    
                    {/* Konuşmacılar */}
                    <Text style={{height:2, backgroundColor:'black', width:'100%', marginBottom:30, marginTop:-70}}/>
    
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 35, marginBottom: 10, textShadowRadius:2, textShadowColor:'rgb(41, 64, 153)' }}>
                            Konuşmacılar
                        </Text>
                        {item.konusmacilar.map((konuşmacı) => (
                            <View key={konuşmacı.id} style={{ alignItems: 'center', padding: 20 }}>
                                {konuşmacı.link == " " ? (
                                    <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>
                                            {konuşmacı.name.split(' ').map(word => word[0]).join('')}
                                        </Text>
                                    </View>
                                ) : (
                                    <Image
                                        source={{ uri: konuşmacı.link }}
                                        style={{ width: 100, height: 100, borderRadius: 50 }}
                                    />
                                )}
                                <Text style={{ fontWeight: 'bold', marginTop: 10, textShadowRadius:1, textShadowColor:'rgb(41, 64, 153)',fontSize:20 }}>{konuşmacı.name}</Text>
                                <Text style={{textAlign:'center'}}>{konuşmacı.info}</Text>
                            </View>
                        ))}
                    </View>
    
                    {/* SSS */}
                    
                    <Text style={{height:2, backgroundColor:'black', width:'100%', marginBottom:-20}}/>
    
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 35, paddingBottom: 10, paddingTop: 50, textShadowRadius:2, textShadowColor:'rgb(41, 64, 153)' }}>
                            Sıkça Sorulan Sorular
                        </Text>
                        
                        <Text style={{ padding: 20, marginTop: -50 }}>
                            
                            {item.sss.split('\n').map((content, index) => {
                                content = content.trim();
                                if (content.trim().endsWith('?')) {
                                    return (
                                        <Text key={index} style={{ fontWeight: 'bold', textAlign: 'left', fontSize: 22, textShadowRadius:2, textShadowColor:'#rgb(237, 52, 53)' }}>
                                            {'\n'}
                                            {'\n'}
                                            {content}
                                            {'\n'}
                                        </Text>
                                    );
                                } else {
                                    return <Text key={index}>{'\n'}{content}</Text>;
                                }
                            })}
                        </Text>
                    </View>
    
                    {/* Apply Program  BUNDAN EMIN DEGILIM */}
                    <View style={{ width: "100%", alignItems:'center'}}>
                        <Text style={{height:2, backgroundColor:'black', width:'100%', marginBottom:20}}/>
                        <Text style={{fontSize:25, fontWeight:'bold', textShadowRadius:2, textShadowColor:'rgb(41, 64, 153)'}}>
                            Programa kayıt olabilmek için!
                        </Text>
                        <TouchableOpacity>
                            <Text style={{fontSize:25, backgroundColor:'black', color: 'white', padding: 20, borderRadius: 10, marginTop: 20, marginBottom: 20, width: '80%', shadowOpacity:0.4, textShadowRadius:2, textShadowColor:'#rgb(237, 52, 53)' }}>
                                Kayıt Ol
                            </Text>
                        </TouchableOpacity>
                    </View>
    
                    {/* Harita */}
                    <Text style={{height:2, backgroundColor:'black', width:'100%', marginTop:30}}/>
                    <View style={{ width: "100%", height: 500 }}>
                        <Text style={{ fontSize: 30, textAlign: 'center', fontWeight: 'bold', marginTop: 30, marginBottom: 30 , textShadowRadius:2, textShadowColor:'#rgb(237, 52, 53)'}}>
                            Etkinlik Alanına Gitmek İçin
                        </Text>
                        <MapView
                            style={{ width: "100%", height: "80%" }}
                            initialRegion={{
                                latitude: item && item.location ? extractCoordinates(item.location).latitude : 0,
                                longitude: item && item.location ? extractCoordinates(item.location).longitude : 0,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                            onPress={() => setMapModalVisible(!mapModalVisible)}
                        >
                            <Marker
                                title={item.name}
                                coordinate={extractCoordinates(item.location)}
                                calloutVisible={true}
                            />
                        </MapView>
                        <Modal visible={mapModalVisible}>
                            <View style={{ flex: 1 }}>
                                <MapView
                                    style={{ flex: 1 }}
                                    initialRegion={{
                                        latitude: item && item.location ? extractCoordinates(item.location).latitude : 0,
                                        longitude: item && item.location ? extractCoordinates(item.location).longitude : 0,
                                        latitudeDelta: 0.01,
                                        longitudeDelta: 0.01,
                                    }}
                                >
                                    <Marker
                                        title={item.name}
                                        coordinate={extractCoordinates(item.location)}
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
                                    <View style={{ flexDirection: 'row', alignItems: 'center', shadowRadius:1, shadowColor:'black' }}>
                                        <Ionicons name="chevron-back-sharp" color={Platform.OS === 'ios' ? 'white' : 'black'} style={{ fontSize: 40, shadowOpacity:1  }} />
                                        <Text style={{ color: Platform.OS === 'ios' ? 'white' : 'black', fontWeight: 'bold', fontSize: 25, shadowOpacity:1  }}>{"Back"}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
    
                    {/* Kayıt olanları gör */}
                    <View style={{ width: "100%", alignItems:'center'}}>
                        <Text style={{height:2, backgroundColor:'black', width:'100%', marginBottom:20}}/>
                        <TouchableOpacity onPress ={() => setKatilimciModalVisible(!katilimciModalVisible)} >
                            <Text style={{fontSize:25, backgroundColor:'black', color: 'white', padding: 20, borderRadius: 10, marginTop: 20, marginBottom: 20, width: '80%', shadowOpacity:0.4, textShadowRadius:2, textShadowColor:'#rgb(237, 52, 53)' }}>
                                Katılımcılar
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Modal visible={katilimciModalVisible}>
                        <View style={{ flex: 1, backgroundColor:'black' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width:'100%',height: 50 }}>
                                <TouchableOpacity onPress={() => setKatilimciModalVisible(!katilimciModalVisible)} >
                                    <View style={{top: Platform.OS === 'ios' ? 50 : 20, flexDirection:'row', justifyContent:'flex-start', padding:10}}>
                                        <Ionicons name="chevron-back-sharp" color={Platform.OS === 'ios' ? 'white' : 'black'} style={{ fontSize: 30, marginLeft:10  }} />
                                        <Text style={{ color:'white', fontWeight:'bold', fontSize:20}}>Back</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Text style={{textAlign:'center',marginTop: 15, color:'white', fontWeight:'bold', fontSize:20}}>Katılımcılar</Text>
                            <Searchbar
                                placeholder="Search"
                                onChangeText={handleSearch}
                                value={searchQuery}
                                style={{ margin: 20, backgroundColor: 'grey', fontFamily: "Times New Roman" }}
                            />
    
                            <View style={{alignItems:'center', paddingVertical:60, borderBottomColor:'white', borderWidth:0.3}}>
                                <Text style={{color:'white', fontSize:25}}>{item.katilimcilar.length} kişi katıldı</Text>
                            </View>
    
                            <ScrollView style={{ height: '100%' }}>
                                {searchResults.length === 0 && searchQuery !== '' && (
                                    <Text style={{ paddingVertical: 40, textAlign: 'center', fontSize: 20, fontWeight:'bold', color:'red' }}>
                                        Sonuç Bulunamadı
                                    </Text>
                                )}
                                {(searchQuery === '' ? item.katilimcilar : searchResults).map((katilimci) => (
                                    <View key={katilimci.id}>
                                        {/* Katilimci görüntüsü */}
                                        <TouchableOpacity
                                            onPress={() => {
                                                setIsContactDetailsVisible({ ...isContactDetailsVisible, [katilimci.id]: !isContactDetailsVisible[katilimci.id] });
                                            }}
                                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, borderRadius: 10, margin: 10}}
                                        >
                                            {katilimci.pp_link == " "  ? (
                                                <View style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                                                        {getInitials(katilimci.name)}
                                                    </Text>
                                                </View>
                                            ) : (
                                                <Image
                                                    source={{ uri: katilimci.pp_link }}
                                                    style={{ width: 50, height: 50, borderRadius: 50 }}
                                                />
                                            )}
                                            <View style={{ marginLeft: 10, width: '100%' }}>
                                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white'}}>  {katilimci.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        {/* Detaylar */}
                                        {isContactDetailsVisible[katilimci.id] && (
                                            <View style={{ backgroundColor: 'lightgrey', padding: 10, margin: 10, borderRadius: 10}}>
                                                <Text style={{fontSize:22, fontWeight:'bold'}}>{katilimci.name}</Text>
                                                <Text style={{fontSize:17, fontWeight:'700'}}>{katilimci.info}</Text>
                                                <TouchableOpacity onPress={() => Linking.openURL(`https://instagram.com/${katilimci.socials.split(' ')[0]}`)}>
                                                    <Text style={{fontSize:13, fontWeight:'400', color: '#rgb(41, 64, 153)'}}>
                                                        <Text style={{color: 'black',fontWeight:'600'}}>Instagram:</Text> {katilimci.socials.split(' ')[0]}
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => Linking.openURL(`https://twitter.com/${katilimci.socials.split(' ')[1]}`)}>
                                                    <Text style={{fontSize:13, fontWeight:'400', color: '#rgb(41, 64, 153)'}}>
                                                        <Text style={{color: 'black',fontWeight:'600'}}>X:</Text> {katilimci.socials.split(' ')[1]}
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => Linking.openURL(`https://linkedin.com/in/${katilimci.socials.split(' ')[2]}`)}>
                                                    <Text style={{fontSize:13, fontWeight:'400', color: '#rgb(41, 64, 153)'}}>
                                                        <Text style={{color: 'black',fontWeight:'600'}}>Linkedin:</Text> {katilimci.socials.split(' ' )[2]}
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => Linking.openURL(`https://facebook.com/${katilimci.socials.split(' ')[3]}`)}>
                                                    <Text style={{fontSize:13, fontWeight:'400', color: '#rgb(41, 64, 153)'}}>
                                                        <Text style={{color: 'black',fontWeight:'600'}}>Facebook:</Text> {katilimci.socials.split(' ')[3]}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    </Modal>
                </View>
            ))}
        </ScrollView>
    );
}    
