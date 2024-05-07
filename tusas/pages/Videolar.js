import React, { useState, useEffect } from 'react';
import { Image, Button, Modal, TouchableWithoutFeedback, ScrollView, Text, TextInput, View, TouchableOpacity, Switch, Alert } from "react-native";
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import { FlatList } from "react-native-gesture-handler";

export default function Videolar({navigation}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [itemId, setitemId] = useState();
    const [searchResults, setSearchResults] = useState([]);

    const dataForVideolar = {
        videolar: [
            { id: 1, videoLink: "https://www.youtube.com/watch?v=HYdkSVDT-Vs",  title:"#GökVatan KAAN’ın kanatları altında! ✈️" },
            { id: 2, videoLink: "https://www.youtube.com/watch?v=t39EztQspyo",  title:"HÜRJET MANEVRA TESTLERİNE DEVAM EDİYOR!"  },
            { id: 3, videoLink: "https://www.youtube.com/watch?v=np4Wdk5G_fk",  title:"Hayallerimizle gökyüzünü boyuyoruz! 🎨🖐🏻✈️ #23Nisan"  },
            ] 
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const results = dataForVideolar.videolar.filter(item => {
            return item.title.toLowerCase().includes(query.toLowerCase());
        });
        setSearchResults(results);
    };


    const [videoInfo, setVideoInfo] = useState(null);
    const [videoLink, setVideoLink] = useState("https://www.youtube.com/watch?v=HYdkSVDT-Vs");

    useEffect(() => {
      const fetchVideoInfo = async () => {
        try {
          const apiKey = 'AIzaSyBtWZDRbk9lIoQ_HLbRXlmkmH_AonFaTws';
          const videoId = extractVideoId(videoLink);
          const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails`);
          const data = await response.json();
          setVideoInfo(data.items[0]);
        } catch (error) {
          console.error('Error fetching video info:', error);
        }
      };
  
      if (videoLink) {
        fetchVideoInfo();
      }
    }, [videoLink]);
  
    const extractVideoId = (videoLink) => {
      const matches = videoLink.match(/[?&]v=([^&]+)/);
      return matches ? matches[1] : null;
    };
  
    if (!videoInfo) {
      return <Text>Loading...</Text>;
    }
  
    const { snippet, contentDetails } = videoInfo;
    const { title, description, publishedAt } = snippet;
    const { duration } = contentDetails;
    
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
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 22,
                            }}>
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
                                        {modalVisible && (
                                            <View>
                                                {dataForVideolar.videolar.map((item) => {

                                                    if (item.id === itemId) {
                                                        return (
                                                            <ScrollView key={item.id} style={{marginTop:40}}>
                                                                <View onStartShouldSetResponder={() => true}>
                                                                    <Image source={{ uri: `https://img.youtube.com/vi/${extractVideoId(item.videoLink)}/maxresdefault.jpg` }} style={{ width: "90%", height:200 }} /> 
                                                                    <Text style={{fontWeight:'bold', fontSize:20}}>{title}</Text>
                                                                    <Text style={{marginTop:15}}>{description}</Text>
                                                                    <Text style={{marginTop:15}}>{duration}</Text>
                                                                    <Text style={{marginTop:15}}>{publishedAt}</Text>
                                                                </View>
                                                                
                                                            </ScrollView>
                                                        );
                                                    }
                                                })}
                                            </View>
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
                        data={searchResults.length === 0 ? dataForVideolar.videolar : searchResults}
                        style={{ flex: 1, width: "100%", marginHorizontal: 20 }}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <View style={{ marginVertical: 20 }}>                                                         
                                <TouchableOpacity onPress={() => {setModalVisible(true), setitemId(item.id), setVideoLink(item.videoLink)}} >
                                    <View>
                                        <Image source={{ uri: `https://img.youtube.com/vi/${extractVideoId(item.videoLink)}/maxresdefault.jpg` }} style={{ width: "90%", height:200 }} /> 
                                       
                                    </View>
                                </TouchableOpacity>
                                <Text style={{width: '90%', marginVertical:10,fontWeight:'bold'}}>
                                    {item.title}
                                </Text>
                            </View>
                        )}
                        keyExtractor={item => item.id.toString()}
                        />

                    
                </ScrollView>
            </View>   
                     
        </View>

    )

}