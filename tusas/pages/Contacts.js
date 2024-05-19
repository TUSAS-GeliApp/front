import { Exo_100Thin, Tourney_600SemiBold } from "@expo-google-fonts/dev";
import { useState } from "react";
import { Image, ScrollView, Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, StatusBar, Modal, Alert } from "react-native";
import { Searchbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { FlatList } from "react-native-gesture-handler";

export default function Contacts({navigation}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [plusPressedMap, setPlusPressedMap] = useState({}); 

    const dataForKisiler = {
        Kisiler: [{id: 1, name:'Selçuk Bayraktar', info:'TEKNOFEST Yönetim Kurulu Başkanı & T3 Vakfı Mütevelli Heyeti Başkanı', link:"https://cdn.takeoffistanbul.com/media/upload/userFormUpload/q4ovXBdrKmevSvv7kNmsf2CLjTYT6pny.jpg"},
                {id: 2, name:'Prof. Dr. Hakan Karakaş', info:'Vice President, Republic of Türkiye of Presidency of Defence Industries', link:"https://cdn.takeoffistanbul.com/media/upload/userFormUpload/oSoVX581JRORcaTlEFUjqPsKiCOmgDZW.png"},
                {id: 3, name:'Sheikh Mansoor Bin Khalifa Al-Thani', info:'Chairman of MBK Holding', link:"https://cdn.takeoffistanbul.com/media/upload/userFormUpload/86VtkHC4QIRGWTrq9eklCW0wezjITrMh.png"},
                {id: 4, name:'Prof. Dr. Mirco Kovac', info:'Founder and Director, Laboratory of Sustainability Robotics - EMPA', link:"https://cdn.takeoffistanbul.com/media/upload/userFormUpload/mg2KJ4lDxTeo1QY2b0I5Wb9k8I2ilfvS.jpg"},
                {id: 5, name:'Jean-Yves Le Gall', info:'Former President, International Astronomical Federation', link:"https://cdn.takeoffistanbul.com/media/upload/userFormUpload/Rj8FfZCczbQPvfPgq4JBpyA2wb5DoFMl.jpg"},
                {id: 6, name:'Mehmet Fatih Kacır', info:'T.C. Sanayi ve Teknoloji Bakanı & TEKNOFEST İcra Kurulu Başkanı', link:"https://cdn.takeoffistanbul.com/media/upload/userFormUpload/7XHGeNcSzyqHoLI1q97vf94nPE4Jlnyh.jpg"},
    
            ],
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const results = dataForBulten.Bulten.filter(item => {
            return item.title.toLowerCase().includes(query.toLowerCase());
        });
        setSearchResults(results);
    };

    const handlePlusPress = (itemId) => {
        // Burada artı simgesine basıldığında yapılacak işlemleri tanımlayabilirsiniz.
        Alert.alert(`Plus pressed: ${itemId}`);
        setPlusPressedMap({ ...plusPressedMap, [itemId]: !plusPressedMap[itemId] }); // Yanıt gelirse true yapın

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
                                                            source={{ uri: selectedItem.link }}
                                                            style={{ width: 200, height: 200, borderRadius: 50 }}
                                                            />
                                                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>{selectedItem.name}</Text>
                                                        <Text style={{ fontStyle: 'italic', marginBottom: 30 }}>{selectedItem.info}</Text>
                                                    </View>
                                                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
                                                        <TouchableOpacity  style={{backgroundColor: plusPressedMap[selectedItem.id] ? 'green' : 'red', padding:10, borderRadius:10, width:'45%'}} onPress={() => {handlePlusPress(selectedItem.id)}}> 
                                                            <Ionicons name="add-circle" size={30} color={plusPressedMap[selectedItem.id] ? 'green' : 'red'} style={{ textShadowRadius: 5, textShadowColor: 'white' , alignSelf:'center' }} />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity  style={{backgroundColor:'#rgb(246, 246, 246)', padding:10, borderRadius:10, width:'45%'}} onPress={() => {setModalVisible(false)}}> 
                                                                <Text style={{textAlign:'center'}}>Price</Text>
                                                        </TouchableOpacity>
                                                        
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
                                data={searchResults.length === 0 ? dataForKisiler.Kisiler : searchResults}
                                style={{ marginHorizontal: 20 }}
                                scrollEnabled={false}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => { setSelectedItem(item); setModalVisible(true); }}>
                                        <View style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10, flexDirection:'row', justifyContent:'space-between' }}>
                                            <View>
                                                <Image
                                                    source={{ uri: item.link }}
                                                    style={{ width: 80, height: 80, borderRadius: 50 }}
                                                    />
                                            </View> 
                                            <View style={{flexDirection:'column', justifyContent:'center', paddingHorizontal:10, marginRight:70}}>
                                                <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                                                <Text>{item.info}</Text>
                                            </View> 
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={item => item.id.toString()}
                            />
                    </ScrollView>
            </View> 
                     
        </View>

    )

}