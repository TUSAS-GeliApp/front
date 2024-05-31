import React, { useEffect , useState } from "react";
import { Image, ScrollView, Text, TextInput, View, TouchableOpacity, Alert, StatusBar } from "react-native";

import { FlatList } from "react-native-gesture-handler";
import { ip_adress } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Homepage({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);

    const images = {
        '../assets/etkinlikler/soylesi2.jpg': require('../assets/etkinlikler/soylesi2.jpg'),
        '../assets/etkinlikler/soylesi.jpg': require('../assets/etkinlikler/soylesi.jpg'),
        '../assets/etkinlikler/demodaydavet.jpg': require('../assets/etkinlikler/demodaydavet.jpg'),
        '../assets/etkinlikler/sinemadavet.jpg': require('../assets/etkinlikler/sinemadavet.jpg'),
    };
      
    
    const extractVideoId = (videos_path) => {
        const matches = videos_path.match(/[?&]v=([^&]+)/);
        return matches ? matches[1] : null;
      };

      const [etkinlikler, setEtkinlikler] = useState([]);
      const [podcastler, setPodcastler] = useState([]);
      const [bultenler, setBultenler] = useState([]);
      const [videolar, setVideolar] = useState([]);
  
      
      useEffect (() => {

        const fetchAllData = async () => {
            const token = await AsyncStorage.getItem('accesToken');
            try {
                const responses = await Promise.all([
                    fetch(`http://${ip_adress}:8080/events/all_events`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }),
                    fetch(`http://${ip_adress}:8080/podcasts/all_podcasts`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }),
                    
                    fetch(`http://${ip_adress}:8080/videos/all_videos`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }),
                     fetch(`http://${ip_adress}:8080/newsletter/all_newsletters`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }), 
                ]);
    
                const data = await Promise.all(responses.map(response => response.json()));

                setEtkinlikler(data[0]);
                setPodcastler(data[1]);
                setBultenler(data[3]);
                setVideolar(data[2]);


                }catch (error) {
                    console.error('Error fetching bulten data:', error);
                }
            };
            fetchAllData();
            }, []);
    

    return(

        <View style={{flex:1}}>
            <StatusBar barStyle="auto"/>
            <View style={{backgroundColor: 'white',}}>
                <ScrollView style={{height:'100%'}}>
                    <View style={{backgroundColor:'white', padding:10}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between', marginVertical:20, marginHorizontal:10, alignItems:'center'}}>
                            <Text style={{fontSize:25, fontWeight:'700'}}>
                                Etkinlikler
                            </Text>
                            
                            <TouchableOpacity style={{ }} onPress={() => navigation.navigate('Etkinlikler')} >
                                <Text style={{fontSize:13, color:'blue'}}>Daha fazla</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <FlatList
                            data={etkinlikler}
                            style={{padding:10}}
                            renderItem={({ item }) => (
                                <View style={{ 
                                    width: 150,
                                    height: 150,
                                    marginBottom: 15,
                                    marginEnd: 25,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    }}>
                                    <Image
                                        style={{ width: '100%',
                                        height: '100%',}}
                                        source={images[item.image_path] }
                                    />
                                    <Text style={{marginTop:10}}>
                                        {item.name}
                                    </Text>
                                </View>
                            )}
                            keyExtractor={item => item.event_id.toString()}
                            horizontal
                        />

                        
                    </View>
                    <View style={{backgroundColor:'white',padding:10}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between', marginVertical:20, marginHorizontal:10, alignItems:'center'}}>
                            <Text style={{fontSize:25, fontWeight:'700'}}>
                                Podcastler
                            </Text>
                            <TouchableOpacity style={{ }} onPress={() =>navigation.navigate('Podcastler')} >
                                <Text style={{fontSize:13, color:'blue'}}>Daha fazla</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <FlatList
                                horizontal
                                style={{padding:10}}
                                data={podcastler}
                                renderItem={({ item }) => (
                                    <View style={{
                                        width: 150,
                                        height: 150,
                                        marginBottom: 35,
                                        marginEnd: 25,
                                        justifyContent: 'center',
                                        alignItems: 'center'}}>
                                        <Image
                                            style={{ width: '100%',
                                                    height: '100%'}}
                                            source={{uri: item.cover_image_path}}
                                        />
                                        <Text style={{marginTop:5}}>
                                            {item.title}
                                        </Text>
                                    </View>
                                )}
                                keyExtractor={item => item.podcast_id.toString()}
                            />
                        
                    </View>
                    <View style={{backgroundColor:'white',padding:10}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between', marginVertical:20, marginHorizontal:10, alignItems:'center', alignItems:'center'}}>
                            <Text style={{fontSize:25, fontWeight:'700'}}>
                                Bulten
                            </Text>
                            <TouchableOpacity style={{ }} onPress={() => navigation.navigate('Bulten')} >
                                <Text style={{fontSize:13, color:'blue'}}>Daha fazla</Text>
                            </TouchableOpacity>
                        </View>
                        
                            <FlatList
                                horizontal
                                style={{padding:10}}
                                data={bultenler}
                                renderItem={({ item }) => (
                                    <View style={{marginBottom: 15,
                                                    justifyContent: 'center',
                                                    alignItems: 'center'}}>
                                        <View style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginEnd:20 }}>
                                            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                                            <Text>{item.author_name}</Text>
                                        </View>
                                    </View>
                                )}
                                keyExtractor={item => item.newsletter_id.toString()}
                            />
                    </View>
                    <View style={{backgroundColor:'white',padding:10}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between', marginVertical:20, marginHorizontal:10, alignItems:'center'}}>
                            <Text style={{fontSize:25, fontWeight:'700'}}>
                                Videolar
                            </Text>
                            <TouchableOpacity style={{ }} onPress={() => navigation.navigate('Videolar')} >
                                <Text style={{fontSize:13, color:'blue'}}>Daha fazla</Text>
                            </TouchableOpacity>
                        </View>
                        
                                <FlatList
                                    horizontal
                                    style={{padding:10}}
                                    data={videolar}
                                    renderItem={({ item }) => (
                                        <View style={{ width: 150,
                                            height: 150,
                                            marginBottom: 15,
                                            marginEnd: 25,
                                            justifyContent: 'center',
                                            alignItems: 'center',}}>
                                            <Image source={{ uri: `https://img.youtube.com/vi/${extractVideoId(item.videos_path)}/maxresdefault.jpg` }} style={{ width: "100%", height:"60%" }} /> 
                                       
                                            <Text style={{marginTop:10}}>
                                                {item.title}
                                            </Text>
                                        </View>
                                    )}
                                    keyExtractor={item => item.videos_id.toString()}
                                />
                    </View>
                </ScrollView>
            </View>   
                     
        </View>

    )

}