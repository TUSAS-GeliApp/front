import { useState } from "react";
import {  Linking,Image, ScrollView, Text,  View, TouchableOpacity, Switch, Alert, LayoutAnimation } from "react-native";
import Constants from 'expo-constants'
import {  Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import { FlatList } from "react-native-gesture-handler";

export default function Profile({navigation}) {
    const dataForProfile = {
        bilgiler: [
            {id:1 , name:'Fevzi', surname:'KILAS', lokasyon:'Çankaya, ANKARA'},
        ],
        katilim: [
            { id: 1, title: "Hangar Kampus 2021"},
            { id: 2, title: "Hangar Kampus 2022"},
            { id: 3, title: "Hangar Kampus 2023/2022"},
            { id: 4, title: "Hangar"},
            { id: 5, title: "Hangar 2024"},
            { id: 6, title: "Hangar Kampus 2023"},
            { id: 7, title: "Inavasyon Soylesileri 2023"},  
        ],
        iletisim_bilgileri:[ 
            {tel:'0544 444 44 44',email:'f.klas2000@gmail.com', insta:'@niexche', twitter:'@niexche'}
        ]
    };
    
    return(
        
        <View style={{flex:1}}>
            
            <View style={{backgroundColor:'rgba(255, 255, 255, 1)'}}>
                
                <View style={{position: "absolute",zIndex:1}}>
                    <TouchableOpacity  style={{padding: 5, top: Constants.statusBarHeight, left:'5%',flexDirection:'row', justifyContent:'flex-end', alignItems:'center', }} onPress={() => navigation.navigate("Ana sayfa")}>
                        <Ionicons name="chevron-back" color="white" style={{fontSize:30}} />
                        <Text style={{color:'white',fontWeight:'500',fontSize:20}}>{"Back"}</Text>
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
                    
                        <View  style={{}} >
                            <FlatList 
                                scrollEnabled={false}
                                data={dataForProfile.bilgiler}
                                renderItem={
                                    ({item})=>(
                                        <View style={{}}>
                                            <View style={{height: 150}}>
                                                <View style={{position: 'absolute', top: 0, width: '100%', height: '50%'}} />
                                                <View style={{position: 'absolute', bottom: 0, width: '100%', height: '50%', backgroundColor: 'white'}} />
                                                <View style={{position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                                    <Avatar.Text size={150} label={item.name.charAt(0) + item.surname.charAt(0)}  style={{backgroundColor: 'white', borderWidth: 1}} />
                                                </View>
                                            </View>
                                            <View style={{alignItems:'center',  backgroundColor: 'white', paddingTop:20}}>
                                                <Text style={{color:'#rgb(49, 49, 91)',fontSize:45}}> 
                                                    {item.name} {item.surname}
                                                </Text>
                                                <Text style={{color:'#rgb(49, 49, 91)', fontSize:18}}> 
                                                    {item.lokasyon}
                                                </Text>
                                            </View>
                                        </View>)
                                }/>
                        </View>
                        <View style={{ backgroundColor:'white'}}>  
                            <FlatList 
                                data={dataForProfile.iletisim_bilgileri}
                                scrollEnabled={false}
                                renderItem={
                                    ({item})=>(
                                        <View style={{paddingTop:40}}>
                                            <View style={{flexDirection:'row',justifyContent:'center'}}>
                                                <View style={{backgroundColor:'#rgb(237, 52, 53)', width:140,
                                                        height:40, borderRadius:10, 
                                                        flexDirection:'column',justifyContent:'center'}}>
                                                    <Text style={{fontWeight:'bold',color:'white'}}>
                                                        {'    '}İletişim Bilgileri{'    '}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{zIndex:-1,top:-20,width:'100%',height:2, backgroundColor:'#rgb(233, 236, 239)'}}/>
                                
                                            <View style={{alignItems:'flex-start', padding:30}}>
                                                <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.tel}`)}>
                                                    <Text style={{fontSize:15, fontWeight:'400', color: '#rgb(41, 64, 153)'}}>
                                                        <Text style={{color: 'black',fontWeight:'bold'}}>Telefon numarasi:</Text> {item.tel} {"\n"}
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {

                                                    Linking.openURL(`mailto:${item.email}`);
                                                }}>
                                                    <Text style={{fontSize: 15, fontWeight: '400', color: '#rgb(41, 64, 153)'}}>
                                                        <Text style={{color: 'black',fontWeight:'bold'}}>Mail:</Text> {item.email} {"\n"}
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => Linking.openURL(`https://www.instagram.com/${item.insta}`)}>
                                                    <Text style={{fontSize:15, fontWeight:'400', color: '#rgb(41, 64, 153)'}}>
                                                        <Text style={{color: 'black',fontWeight:'bold'}}>Instagram:</Text> {item.insta} {"\n"}
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => Linking.openURL(`https://twitter.com/${item.twitter}`)}>
                                                    <Text style={{fontSize:15, fontWeight:'400', color: '#rgb(41, 64, 153)'}}>
                                                        <Text style={{color: 'black',fontWeight:'bold'}}>Twitter:</Text> {item.twitter}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{flexDirection:'row',justifyContent:'center', paddingTop:20}}>
                                                <View style={{backgroundColor:'#rgb(237, 52, 53)', width:156,
                                                        height:40, borderRadius:10, 
                                                        flexDirection:'column',justifyContent:'center'}}>
                                                    <Text style={{fontWeight:'bold',color:'white'}}>
                                                        {'    '}Katıldığı Etkinlikler{'    '}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{zIndex:-1,top:-20,width:'100%',height:2, backgroundColor:'#rgb(233, 236, 239)'}}/>
                                
                                        </View>
                                    )}
                                        />
                        </View >   
                        <View  style={{ flex: 1, paddingTop:40, backgroundColor: 'white'}}  >
                            <FlatList
                                data={dataForProfile.katilim}
                                numColumns={2}
                                scrollEnabled={false}
                                renderItem={({ item, index}) => (
                                    <View>
                                        <View style={{ 
                                            flexDirection:'row', flexWrap:"wrap",maxWidth:'110%', paddingBottom:10, paddingHorizontal:20
                                            }}>
                                                
                                            <TouchableOpacity >{/* on press go to item.link */}
                                                <View style={{alignItems:'center',backgroundColor:'#rgb(41, 64, 153)' ,
                                                            height:30, borderRadius:5, width:"110%", 
                                                            flexDirection:'column',justifyContent:'center'}}>
                                                    <Text style={{fontWeight:'bold',color:'white'}}>
                                                        {' '}{item.title}{' '}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity> 
                                            
                                        </View>
                                    </View>
                                            
                                )}
                                keyExtractor={item => item.id.toString()}
                                
                                />
                        </View >   
                        
                        
                                        
                        <View  style={{height:800}} />
                    </View>
                </ScrollView>
            </View>   
                     
        </View>

    )

}