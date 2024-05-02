import { useState } from "react";
import { Image, Button, Modal, Pressable, ScrollView, Text, TextInput, View, TouchableOpacity, Switch } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Signup({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [timesPressed, setTimesPressed] = useState(0);

    const [password, setPassword] = useState(''); 
    const [showPassword, setShowPassword] = useState(false); 

    const [password2, setPassword2] = useState(''); 
    const [showPassword2, setShowPassword2] = useState(false); 

    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    }; 
    const toggleShowPassword2 = () => { 
        setShowPassword2(!showPassword2); 
    }; 

    return(
        <KeyboardAwareScrollView behavior='padding' style={{paddingHorizontal: 30, paddingTop: 120}}>
            <Image source={require('../assets/login_logo.png')} 
            style={{resizeMode: 'center',
                    height: 150,
                    width: '100%',
                    marginBottom: 40,
                    }}/>
            
            <Text style={{fontSize:25, fontFamily:'Times New Roman',paddingBottom:10}}>
                Sign Up
            </Text>

            <Text style={{marginTop:40,marginBottom:10, color:'#rgb(237,52,53)', fontWeight:'600'}}>
                Email
            </Text>
            <View style={{
                    borderBottomWidth:2, 
                    borderColor:"#c9d6df", 
                    height:40,
                    marginBottom:20,
                    justifyContent:"center"}}>
                <TextInput placeholder="Your email address" />
            </View>
            <Text style={{marginBottom:10, color:'#rgb(237,52,53)', fontWeight:'600'}}>
                Password
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between',
                    borderBottomWidth:2, 
                    borderColor:"#c9d6df",  
                    height:40,
                    marginBottom:20}}>
                <TextInput placeholder="Your password" 
                            secureTextEntry={!showPassword} 
                            value={password} 
                            onChangeText={setPassword} 
                            style={{width:'90%'}}/>   
                <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} 
                    size={24} 
                    color="black"
                    style={{}} 
                    onPress={toggleShowPassword} >

                </MaterialCommunityIcons>
            </View>
            <Text style={{marginBottom:10, color:'#rgb(237,52,53)', fontWeight:'600'}}>
                Password again
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between',
                    borderBottomWidth:2, 
                    borderColor:"#c9d6df",  
                    height:40,
                    marginBottom:20}}>
                <TextInput placeholder="Write your password again!" 
                            secureTextEntry={!showPassword2} 
                            value={password2} 
                            onChangeText={setPassword2} 
                            style={{width:'90%'}}/>   
                <MaterialCommunityIcons name={showPassword2 ? 'eye-off' : 'eye'} 
                    size={24} 
                    color="black"
                    style={{}} 
                    onPress={toggleShowPassword2} >

                </MaterialCommunityIcons>
            </View>
        
            <Pressable
                onPress={() => {
                setTimesPressed(current => current + 1);
                }}
                style={({pressed}) => [{
                    backgroundColor: pressed ? 'white' : '#rgb(237,52,53)',
                    borderRadius:15,
                    marginBottom:10,
                },]}>
                {({pressed}) => (
                <Text style={{padding: 20, margin: 1, textAlign:'center', color:'white',fontWeight:'900'}}>
                        {pressed ? 'w' : 'Sign up'}</Text>
                )}
            </Pressable>

            <TouchableOpacity onPress={() =>
                                    navigation.navigate('Login')
                                } 
                                style={{ marginTop: 10, flexDirection:'row', justifyContent: 'center',
                                alignItems:'center',}}>
                <Text style={{color:'#666', }}>Already have an account? </Text>
                <Text style={{ color:"#rgb(237,52,53)" }}>Sign In</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
        

    )
}