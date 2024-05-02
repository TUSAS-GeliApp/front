import { useState, useRef } from "react";
import { Image, Button, Modal, Platform, ScrollView, Text, UIManager, View, TouchableOpacity, Switch, Alert, LayoutAnimation } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Constants from 'expo-constants'
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Card, Divider, Drawer } from "react-native-paper";
import * as Animatable from 'react-native-animatable';



export default function Etkinlikler({navigation}) {
    const [secondBoxPosition, setSecondBoxPosition] = useState('left');


    return(

        <View style={{flex:1}}>
            

            {/* <View style={{width:'100%', backgroundColor:'white', height:80, marginTop: Constants.statusBarHeight, flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{flex:1, flexDirection:'row'}}>
                    <Image source={require('../assets/logo-small.jpg')} 
                            style={{resizeMode: 'contain',
                            height: '100%',
                            width: '15%',
                            }}/>
                    <Text style={{marginLeft: '-3%', marginTop: '8%', fontWeight:'900'}}>
                        TURKISH{'\n'}AEROSPACE
                    </Text>
                </View>  

                <View style={{ flexDirection:'row', justifyContent:'flex-end', marginRight:"3%", marginTop:"5%"}}>
                    <Ionicons name="notifications" size={40} color="black"/>
                    
                    <Entypo name="menu" size={40} color="black" onPress ={toggleSecondBox} />
                </View>  
                        
            </View>
             */}
            <View style={{backgroundColor: 'white'}}>
                <ScrollView style={{height:'100%'}}>
                    <Text style={{padding:50}}>
                        Etkinlikler
                    </Text>
                    
                </ScrollView>
            </View>   
                     
        </View>

    )

}