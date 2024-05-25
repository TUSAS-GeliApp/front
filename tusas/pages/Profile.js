import React, {useState, useEffect, useCallback } from "react";
import {  Linking,Image, ScrollView, Text,  View, TouchableOpacity, Switch, Alert, LayoutAnimation } from "react-native";
import Constants from 'expo-constants'
import {  Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import { FlatList } from "react-native-gesture-handler";
import { xxx } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';

export default function Profile({navigation}) {
   
    const [profilData, setprofilData] = useState([]);

    const fetchProfilData = async () => {
        const fetchprofils = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('accesToken');
                const response = await fetch(`http://${xxx}:8080/users/user`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                const data = await response.json();
                setprofilData(data);
            } catch (error) {
                console.error('Error fetching profil data:', error);
            }
        };
        fetchprofils();
    };
    useFocusEffect(
        useCallback(() => {
            fetchProfilData();
        }, [])
    );
    return(
        
        <View style={{flex:1}}>
            
            <View style={{backgroundColor:'rgba(255, 255, 255, 1)'}}>
                
                <View style={{position: "absolute",zIndex:1}}>
                    <TouchableOpacity  style={{padding: 5, top: Constants.statusBarHeight, left:'5%',flexDirection:'row', justifyContent:'flex-end', alignItems:'center', }} onPress={() => navigation.navigate("Ana sayfa")}>
                        <Ionicons name="chevron-back" color="white" style={{fontSize:30}} />
                        <Text style={{color:'white',fontWeight:'500',fontSize:18}}>{"Anasayfa"}</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{ position: 'absolute', height:500,width:"100%", backgroundColor: 'black',alignItems: 'center' }}>
                    <Image
                        source={require('../assets/profil_back.png')}
                        style={{paddingTop: Constants.statusBarHeight, height: '100%', resizeMode: 'contain'}}
                    />
                </View>
                <View style={{ position: 'absolute',top:500, height:600,width:"100%", backgroundColor: 'black'}}/>
                <ScrollView style={{height:'100%'}} scrollEnabled={true}>
                    <View style={{top: 300,height:'2000%'}}>
                        {/* PHOTO */}
                        <View  style={{}} >
                            <FlatList 
                                scrollEnabled={false}
                                data={profilData.bilgiler}
                                renderItem={
                                    ({item})=>(
                                        <View style={{}}>
                                            <View style={{height: 150}}>
                                                <View style={{position: 'absolute', top: 0, width: '100%', height: '50%'}} />
                                                <View style={{position: 'absolute', bottom: 0, width: '100%', height: '50%', backgroundColor: 'white'}} />
                                                <View style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>

                                                {!item.photo ? (
                                                     <Avatar.Text
                                                     size={150}
                                                     label={item.name.charAt(0) + item.surname.charAt(0)}
                                                     style={{ backgroundColor: 'white', borderWidth: 1 }}
                                                     />
                                                ) : (
                                                    <Image
                                                        source={{ uri: item.photo }}
                                                        style={{ width: 150, height: 150, borderRadius:150}}
                                                    />
                                                )}
                                                </View>
                                            </View>
                                            <View style={{alignItems:'center',  backgroundColor: 'white', paddingTop:20}}>
                                                <Text style={{color:'#rgb(49, 49, 91)',fontSize:45}}> 
                                                    {item.name} {item.surname}
                                                </Text>
                                                <Text style={{color:'#rgb(49, 49, 91)', fontSize:18}}> 
                                                    {item.location}
                                                </Text>
                                            </View>
                                        </View>)
                                    }/>
                        </View>
                        <View style={{ backgroundColor:'white'}}>  
                        {/* ILETISIM BILGILERI  */}
                        <FlatList 
                            data={profilData.iletisim_bilgileri}
                            scrollEnabled={false}
                            renderItem={({item}) => (
                                <View style={{paddingTop:40}}>
                                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                                        <View style={{
                                            backgroundColor:'#rgb(237, 52, 53)', 
                                            width:140,
                                            height:40, 
                                            borderRadius:10, 
                                            flexDirection:'column',
                                            justifyContent:'center'
                                        }}>
                                            <Text style={{fontWeight:'bold',color:'white'}}>
                                                {'    '}İletişim Bilgileri{'    '}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{zIndex:-1,top:-20,width:'100%',height:2, backgroundColor:'#rgb(233, 236, 239)'}}/>

                                    <View style={{alignItems:'flex-start', padding:30}}>
                                        {item.phone ? (
                                            <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.phone}`)}>
                                                <Text style={{fontSize:15, fontWeight:'400', color: '#rgb(41, 64, 153)'}}>
                                                    <Text style={{color: 'black',fontWeight:'bold'}}>Telefon numarasi:</Text> {item.phone} {"\n"}
                                                </Text>
                                            </TouchableOpacity>
                                        ) : <Text style={{color: 'gray'}}>Telefon numarası mevcut değil{"\n"}</Text>}

                                        {item.email ? (
                                            <TouchableOpacity onPress={() => {Linking.openURL(`mailto:${item.email}`);}}>
                                                <Text style={{fontSize: 15, fontWeight: '400', color: '#rgb(41, 64, 153)'}}>
                                                    <Text style={{color: 'black',fontWeight:'bold'}}>Mail:</Text> {item.email} {"\n"}
                                                </Text>
                                            </TouchableOpacity>
                                        ) : <Text style={{color: 'gray'}}>Mail adresi mevcut değil{"\n"}</Text>}

                                        {item.instagram ? (
                                            <TouchableOpacity onPress={() => Linking.openURL(`https://www.instagram.com/${item.instagram}`)}>
                                                <Text style={{fontSize:15, fontWeight:'400', color: '#rgb(41, 64, 153)'}}>
                                                    <Text style={{color: 'black',fontWeight:'bold'}}>Instagram: </Text> {item.instagram} {"\n"}
                                                </Text>
                                            </TouchableOpacity>
                                        ) : <Text style={{color: 'gray'}}>Instagram hesabı mevcut değil{"\n"}</Text>}

                                        {item.twitter ? (
                                            <TouchableOpacity onPress={() => Linking.openURL(`https://twitter.com/@${item.twitter}`)}>
                                                <Text style={{fontSize:15, fontWeight:'400', color: '#rgb(41, 64, 153)'}}>
                                                    <Text style={{color: 'black',fontWeight:'bold'}}>Twitter:</Text> {item.twitter}{"\n"}
                                                </Text>
                                            </TouchableOpacity>
                                        ) : <Text style={{color: 'gray'}}>Twitter hesabı mevcut değil{"\n"}</Text>}
                                        
                                        {item.facebook ? (
                                            <TouchableOpacity onPress={() => Linking.openURL(`https://facebook.com/@${item.facebook}`)}>
                                                <Text style={{fontSize:15, fontWeight:'400', color: '#rgb(41, 64, 153)'}}>
                                                    <Text style={{color: 'black',fontWeight:'bold'}}>Facebook: </Text> {item.facebook}
                                                </Text>
                                            </TouchableOpacity>
                                        ) : <Text style={{color: 'gray'}}>Facebook hesabı mevcut değil</Text>}
                                    </View>

                                    
                                </View>
                            )}
                        />

                        </View >   
                        <View  style={{ flex: 1, paddingTop:40, backgroundColor: 'white'}}  >
                            {/* KATILDIGI ETKINLIKLER  */}

                            
                            <View style={{flexDirection:'row',justifyContent:'center', paddingTop:20}}>
                                    <View style={{
                                        backgroundColor:'#rgb(237, 52, 53)', 
                                        width:156,
                                        height:40, 
                                        borderRadius:10, 
                                        flexDirection:'column',
                                        justifyContent:'center'
                                    }}>
                                        <Text style={{fontWeight:'bold',color:'white'}}>
                                            {'    '}Katıldığı Etkinlikler{'    '}
                                        </Text>
                                    </View>
                                </View>
                            <View style={{zIndex:-1,top:-20,width:'100%',height:2, backgroundColor:'#rgb(233, 236, 239)' , marginBottom:50}}/>
                            
                          
                            <FlatList
                                data={profilData.katilim}
                                numColumns={2}
                                scrollEnabled={false}
                                renderItem={({ item, index }) => (
                                    <View>
                                        {console.log("asddasasd")}
                                        {console.log(profilData.katilim)}
                                        <View style={{ 
                                            flexDirection: 'row', 
                                            flexWrap: "wrap",
                                            maxWidth: '110%', 
                                            paddingBottom: 10, 
                                            paddingHorizontal: 20
                                        }}>
                                            <TouchableOpacity>
                                                <View style={{
                                                    alignItems: 'center',
                                                    backgroundColor: '#293ca1', // correct color format
                                                    height: 30, 
                                                    borderRadius: 5, 
                                                    width: "110%", 
                                                    flexDirection: 'column',
                                                    justifyContent: 'center'
                                                }}>
                                                    <Text style={{ fontWeight: 'bold', color: 'white' }}>
                                                        {' '}{item.title}{' '}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity> 
                                        </View>
                                    </View>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                          

                        </View >   
                        
                        
                                        
                        <View  style={{height:800}} />
                    </View>
                </ScrollView>
            </View>   
                     
        </View>

    )

}