import { useState, useRef } from "react";
import { StatusBar,Image, Button, Modal, Platform, ScrollView, Text, UIManager, View, TouchableOpacity, Switch, Alert, LayoutAnimation } from "react-native";

import Constants from 'expo-constants'
import {  Ionicons } from '@expo/vector-icons';

import { Avatar } from 'react-native-paper';
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile({navigation}) {
    const dataForProfile = {
        katilim: [
            { id: 1, title: "Hangar Kampus 2021"},
            { id: 2, title: "Hangar Kampus 2022"},
          /*{ id: 3, title: "Hangar Kampus 2023/2022"},
            { id: 4, title: "Hangar 1"},
            { id: 5, title: "Hangar 2024"},
            { id: 6, title: "Hangar Kampus 2023"},
            { id: 7, title: "Inavasyon Soylesileri 2023"}, */
        ],
        bilgiler: [
            {id:1 , name:'Fevzi', surname:'KILAS', lokasyon:'Çankaya, ANKARA', iletisim_bilgileri:[ {tel:'0544 444 44 44'},
                                                                                                    {email:'f.klas2000@gmail.com'},
                                                                                                    {insta:'@niexche'},
                                                                                                    {twitter:'@niexche'} ]},
        ]
    };
    
    return(
        
        <View style={{flex:1}}>
            
            <View style={{backgroundColor: 'white'}}>
                
                <View style={{position: "absolute",zIndex:1}}>
                    <TouchableOpacity  style={{margin: 5, top: Constants.statusBarHeight, left:'5%',flexDirection:'row', justifyContent:'center', alignItems:'center', }} onPress={() => navigation.navigate("Ana sayfa")}>
                        <Ionicons name="chevron-back-sharp" color="white" style={{fontSize:30}} />
                        <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>{"Back"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{position: 'absolute', height:400,width:"100%", backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}>
                            <Image
                                source={require('../assets/profil_back.png')}
                                style={{marginTop: Constants.statusBarHeight, height: '100%', resizeMode: 'contain'}}
                            />
                        </View>
                
                <ScrollView style={{height:'100%'}}>
                    <View style={{zIndex:1,flex: 1}}>
                        <View style={{position: 'absolute', top: 300,width:'100%',height:'50%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                            <Avatar.Text size={150} label="FK" style={{backgroundColor: 'white', borderWidth:1}} />
                        </View>
                    </View>
                    
                    <View style={{top: 300, backgroundColor:'white',height:'2000%'}}>
                        <SafeAreaView  style={{ flex: 1, marginTop:50}} >
                            <FlatList
                                data={dataForProfile.katilim}
                                style={{flexGrow:1}}
                                removeClippedSubviews
                                horizontal={false}
                                numColumns={2}
                                
                                renderItem={({ item, index}) => (
                                    <View style={{ 
                                        flexDirection:'row', flexWrap:"wrap",maxWidth:'110%', paddingBottom:10, marginHorizontal:20

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

                                            
                                )}
                                keyExtractor={item => item.id.toString()}
                                
                                />
                        </SafeAreaView >   
                        <View  style={{height:'500%'}} >
                            <FlatList 
                                data={dataForProfile.bilgiler}
                                renderItem={
                                    ({item})=>(
                                        
                                            <View style={{alignItems:'center'}}>
                                                <Text style={{color:'#rgb(49, 49, 91)',fontSize:45}}> 
                                                    {item.name} {item.surname}
                                                </Text>
                                                <Text style={{color:'#rgb(49, 49, 91)', fontSize:18}}> 
                                                    {item.lokasyon}
                                                </Text>
                                          
                                                    
                                                <View style={{backgroundColor:'#rgb(237, 52, 53)', marginTop:10,
                                                        height:40, borderRadius:10, 
                                                        flexDirection:'column',justifyContent:'center'}}>
                                                    <Text style={{fontWeight:'bold',color:'white'}}>
                                                        {'    '}İletişim Bilgileri{'    '}
                                                    </Text>
                                                    
                                                </View>
                                                <View style={{zIndex:-1,top:-20,width:'80%',height:2, backgroundColor:'#rgb(233, 236, 239)'}}/>
                                                <View style={{marginTop:10, 
                                                        flexDirection:'column',justifyContent:'center'}}>
                                                        <FlatList data={item.iletisim_bilgileri}
                                                            renderItem={
                                                                ({item})=>(
                                                                    <View style={{alignItems:'flex-start'}}>
                                                                        <Text>
                                                                            {item.tel}
                                                                            {item.email}
                                                                            {item.insta}
                                                                            {item.twitter}
                                                                        </Text>
                                                                    </View>
                                                                )}
                                                                    
                                                                    />
                                                    
                                                </View>
                                            </View>
                                                )
                                }/>
                            {/* <FlatList
                                data={dataForProfile.katilim}
                                style={{flexGrow:1}}
                                removeClippedSubviews
                                horizontal={false}
                                numColumns={2}
                                
                                renderItem={({ item, index}) => (
                                    <View style={{ 
                                        flexDirection:'row', flexWrap:"wrap",maxWidth:'110%', paddingBottom:10, marginHorizontal:10

                                        }}>
                                        <TouchableOpacity >
                                            <View style={{alignItems:'center',backgroundColor:colors[index] ,
                                                        height:30, borderRadius:5, width:"110%", 
                                                        flexDirection:'column',justifyContent:'center'}}>
                                                <Text style={{fontWeight:'bold'}}>
                                                    {item.title}
                                                </Text>
                                            </View>
                                        </TouchableOpacity> 
                                        
                                    </View>

                                            
                                )}
                                keyExtractor={item => item.id.toString()}
                                
                                /> */}
                        </View >                    
                        <View  style={{height:800}} />

                        
                    </View>
                   
                </ScrollView>
            </View>   
                     
        </View>

    )

}