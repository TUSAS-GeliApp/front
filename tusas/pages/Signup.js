import React,{ useState, useEffect  } from "react";
import { Image, Button, Modal, Pressable, ScrollView, Text, TextInput, View, TouchableOpacity, Switch, Alert } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ip_adress } from "@env";

export default function Signup({navigation}) {

    const [showPassword, setShowPassword] = useState(false); 

    const [password2, setPassword2] = useState(''); 
    const [showPassword2, setShowPassword2] = useState(false); 

    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    }; 
    const toggleShowPassword2 = () => { 
        setShowPassword2(!showPassword2); 
    }; 
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [job, setJob] = useState('');

    const handleSignup = async () => {
        try {
            // Gerekli bilgileri kontrol et
            if (!name || !surname || !email || !password || !phone || !job) {
                Alert.alert('Lütfen tüm alanları doldurun.');
                return 0;
            }

            if (password !== password2) {
                Alert.alert('Şifreler eşleşmiyor.');
                return 0;
                };
            console.log({
                "name": name,
                "surname": surname,
                "email": email,
                "password": password,
                "phone": phone,
                "job": job
            });

            // Sunucuya POST isteği gönder
            const response = await fetch(`http://${ip_adress}:8080/login/sign_up`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": name,
                    "surname": surname,
                    "email": email,
                    "password": password,
                    "phone": phone,
                    "job": job
                })
            });

            if (response.ok) {
                // Kayıt başarılı
                Alert.alert('Kayıt Başarılı', 'Hesabınız başarıyla oluşturuldu.');
                navigation.navigate('Login'); // Giriş sayfasına yönlendirme
            } else {
                // Kayıt başarısız
                throw new Error('Kayıt olurken bir hata oluştu.');
            }
        } catch (error) {
            console.error('Kayıt Hatası', error);
            Alert.alert('Kayıt Hatası', error.message);
        }
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
            <Text style={{ marginBottom: 10, color: '#rgb(237,52,53)', fontWeight: '600'}}>
                Email
            </Text>
            <View style={{
                borderBottomWidth: 2,
                borderColor: "#c9d6df",
                height: 40,
                marginBottom: 20,
                justifyContent: "center"
            }}>
                <TextInput
                    placeholder="Your email address"
                    onChangeText={setEmail}
                    value={email}
                    keyboardType={"email-address"}
                />
            </View>

            <Text style={{ marginBottom: 10, color: '#rgb(237,52,53)', fontWeight: '600'}}>
                Isim
            </Text>
            <View style={{
                borderBottomWidth: 2,
                borderColor: "#c9d6df",
                height: 40,
                marginBottom: 20,
                justifyContent: "center"
            }}>
                <TextInput
                    placeholder="Isminiz"
                    onChangeText={setName}
                    value={name}
                />
            </View>

            <Text style={{ marginBottom: 10, color: '#rgb(237,52,53)', fontWeight: '600'}}>
                Soyisim
            </Text>
            <View style={{
                borderBottomWidth: 2,
                borderColor: "#c9d6df",
                height: 40,
                marginBottom: 20,
                justifyContent: "center"
            }}>
                <TextInput
                    placeholder="Soyisminiz"
                    onChangeText={setSurname}
                    value={surname}
                />
            </View>

            <Text style={{ marginBottom: 10, color: '#rgb(237,52,53)', fontWeight: '600'}}>
                Telefon Numarası
            </Text>
            <View style={{
                borderBottomWidth: 2,
                borderColor: "#c9d6df",
                height: 40,
                marginBottom: 20,
                justifyContent: "center"
            }}>
                <TextInput
                    placeholder="Telefon numaranız"
                    onChangeText={setPhone}
                    value={phone}
                    keyboardType="phone-pad"
                />
            </View>

            <Text style={{ marginBottom: 10, color: '#rgb(237,52,53)', fontWeight: '600'}}>
                Bilgi
            </Text>
            <View style={{
                borderBottomWidth: 2,
                borderColor: "#c9d6df",
                height: 40,
                marginBottom: 20,
                justifyContent: "center"
            }}>
                <TextInput
                    placeholder="Bilgileriniz"
                    onChangeText={setJob}
                    value={job}
                />
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
        
           
            <TouchableOpacity onPress={handleSignup} style={{backgroundColor: '#rgb(237,52,53)', borderRadius:15, marginBottom:10,}}>
                <Text style={{padding: 20, margin: 1, textAlign:'center', color:'white', fontWeight:'bold'}}>Kayıt Ol</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() =>
                                    navigation.navigate('Login')
                                } 
                                style={{ marginTop: 10, flexDirection:'row', justifyContent: 'center',
                                alignItems:'center',}}>
                <Text style={{color:'#666', }}>Already have an account? </Text>
                <Text style={{ color:"#rgb(237,52,53)" }}>Sign In</Text>
            </TouchableOpacity>
            <View style={{marginBottom:300}}/>
        </KeyboardAwareScrollView>
        

    )
}