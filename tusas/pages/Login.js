import { useState } from "react";
import { Image, Button, Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Login({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [timesPressed, setTimesPressed] = useState(0);

    const [password, setPassword] = useState(''); 
    const [showPassword, setShowPassword] = useState(false); 

    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
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
                Sign In
            </Text>
            <Text style={{fontSize:15, fontFamily:'Times New Roman', color:'#888'}}>
                Hi there! Nice to see you again.
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
                        {pressed ? 'w' : 'Sign in'}</Text>
                )}
            </Pressable>

                
            <View style={{justifyContent: "space-between", flexDirection : "row",}}>

                <Modal animationType="slide"
                    visible = {modalVisible}
                    onRequestClose= {()=>{setModalVisible(!modalVisible); }} >

                    <KeyboardAwareScrollView behavior='padding' style={{paddingHorizontal: 30, paddingVertical: 120}}>
                                <Image source={require('../assets/login_logo.png')} 
                                style={{resizeMode: 'center',
                                        height: 150,
                                        width: '100%',
                                        marginBottom: 40,
                                        }}/>
                                
                                <Text style={{fontSize:25, fontFamily:'Times New Roman',paddingBottom:10}}>
                                    Reset your password 
                                </Text>
                                <Text style={{fontSize:15, fontFamily:'Times New Roman', color:'#888'}}>
                                    Enter your user account's verified email address and we will send you a password reset link.
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
                                            {pressed ? 'w' : 'Send password reset email'}</Text>
                                    )}
                                </Pressable>
                                <Button onPress={() => setModalVisible(false)}
                                    title="Back to the Sign In?"
                                    color='#666' /> 

                                    
                            
                            </KeyboardAwareScrollView>
                    
                </Modal>
                <Button onPress={() => setModalVisible(true)}
                        title="Forgot Password?"
                        color='#666' /> 

                <Button onPress={() =>
                        navigation.navigate('Signup')
                    }
                    title="Create an account"
                    color="#rgb(237,52,53)" />
            </View>
        </KeyboardAwareScrollView>

    )
}