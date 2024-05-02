import { useState } from "react";
import { Image, Button, Modal, Pressable, ScrollView, Text, TextInput, View, TouchableOpacity, Switch, Alert } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Constants from 'expo-constants'
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Card, Divider, Drawer } from "react-native-paper";

export default function Bulten({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    return(

        <View style={{flex:1}}>
           {/*  <View style={{ width:'100%', backgroundColor:'white', height:80, marginTop: Constants.statusBarHeight, flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{flex:1, flexDirection:'row'}}>
                    <Image source={require('../assets/logo-small.jpg')} 
                            style={{resizeMode: 'contain',
                            height: '100%',
                            width: '15%',
                            }}/>
                    <Text style={{marginLeft: '-3%', marginTop: '8%',fontFamily:'AmericanTypewriter', fontWeight:'900'}}>
                        TURKISH{'\n'}AEROSPACE
                    </Text>
                </View>  

                <View style={{ flexDirection:'row', justifyContent:'flex-end', marginRight:"3%", marginTop:"5%"}}>
                    <Ionicons name="notifications" size={40} color="black"/>
                    <Text>  </Text>
                
                        <Modal  visible = {modalVisible}>
                            <View>
                                <Text>
                                    {'\n'}
                                    {'\n'}
                                </Text>
                                <Button onPress ={() => setModalVisible(!modalVisible)} title='exit'/>
                                
                                <View style={{backgroundColor:'black',height:200,width:200}}>
                                    
                                </View>
                            </View>
                        </Modal>
                    
                    <Entypo name="menu" size={40} color="black" onPress ={() => setModalVisible(!modalVisible)} />
                </View>   
                        
            </View>*/}
            
            <View style={{backgroundColor: 'white',}}>
                <ScrollView style={{height:'100%'}}>
                    <Text style={{padding:50}}>
                        Bulten
                    </Text>
                
                </ScrollView>
            </View>   
                     
        </View>

    )

}