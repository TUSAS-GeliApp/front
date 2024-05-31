import React, { useState } from "react";
import { Image, Button, Modal, Pressable, Text, TextInput, View, Alert } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ip_adress } from "@env";

export default function Login({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
    console.log(ip_adress);

        try {
            const response = await fetch(`http://${ip_adress}:8080/login`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });
            const data = await response.json();
            if (response.ok) {
                const { accesToken, refreshToken, isAdmin } = data;
                console.log(accesToken + "      --- -- -- - -   "+  refreshToken);
                if (accesToken && refreshToken) { // Check if accessToken and refreshToken are not undefined
                    await AsyncStorage.setItem('accesToken', accesToken);
                    await AsyncStorage.setItem('refreshToken', refreshToken);
                    navigation.navigate('Home');
                } else {
                    Alert.alert('Login Failed', 'Invalid access or refresh token received from the server.');
                }
            } else {
                Alert.alert('Login Failed', 'Please check your email and password.');
            }
        } catch (error) {
            console.error('Login error', error);
            Alert.alert('Login Failed', 'No response from the server. Please try again later.');
        }
    };
    

    /* const refreshAccessToken = async () => {
        try {
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            if (!refreshToken) {
                throw new Error('No refresh token found');
            }

            const response = await axios.post('http://localhost:8080/refresh-token', {
                refreshToken
            });

            const { accessToken } = response.data;
            await AsyncStorage.setItem('accessToken', accessToken);

            return accessToken;
        } catch (error) {
            Alert.alert('Session Expired', 'Please log in again.');
            // Handle token refresh failure, possibly redirect to login
            navigation.navigate('Login');
        }
    }; */
    const [emailForReset, setEmailForReset] = useState('');
    const [otpModalVisible, setOtpModalVisible] = useState(false);
    const [otpCode, setOtpCode] = useState();
    const [newPassword, setNewPassword] = useState();
    
    const handleResetPassword = async () => {
        try {
    
            // Sunucuya e-posta adresini gönder
            const response = await fetch(`http://${ip_adress}:8080/users/request-password-reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "email"  : emailForReset })

            });
            console.log(emailForReset)
            if (response.ok) {
                setModalVisible(false); // Şifre sıfırlama isteği gönderildikten sonra modalı kapat
                setOtpModalVisible(true); // OTP modalını aç
                Alert.alert('Password Reset Email Sent', 'A password reset email has been sent to your email address.');
            } else {
                throw new Error('Failed to send password reset email.');
            }
        } catch (error) {
            console.error('Password Reset Error', error);
            Alert.alert('Password Reset Failed', 'Failed to send password reset email. Please try again later.');
        }
    };
    
    const handlePasswordReset = async () => {
        try {
    
            // Sunucuya OTP kodunu ve yeni şifreyi gönder
            const response = await fetch(`http://${ip_adress}:8080/users/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "otpCode" :otpCode,
                                        "email":emailForReset,
                                        "newPassword":newPassword })
            });
            console.log({ "otpCode" :otpCode,
                            "email":emailForReset,
                            "newPassword":newPassword });
            if (response.ok) {
                setOtpModalVisible(false); // OTP modalını kapat
                Alert.alert('Password Reset Successful', 'Your password has been successfully reset.');
            } else {
                throw new Error('Failed to reset password.');
            }
        } catch (error) {
            console.error('Password Reset Error', error);
            Alert.alert('Password Reset Failed', 'Failed to reset password. Please try again later.');
        }
    };
    
    

    return (
        <KeyboardAwareScrollView behavior='padding' extraScrollHeight={200} style={{ paddingHorizontal: 30, paddingTop: 120 }}>
            <Image source={require('../assets/login_logo.png')}
                style={{
                    resizeMode: 'center',
                    height: 150,
                    width: '100%',
                    marginBottom: 40,
                }} />

            <Text style={{ fontSize: 25, fontFamily: 'Times New Roman', paddingBottom: 10 }}>
                Giriş Yap
            </Text>
            <Text style={{ fontSize: 15, fontFamily: 'Times New Roman', color: '#888' }}>
                Hoşgeldiniz! Sizi aramızda gördüğümüze sevindik.
            </Text>
            <Text style={{ marginTop: 40, marginBottom: 10, color: '#rgb(237,52,53)', fontWeight: '600' }}>
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
                    placeholder="Email adresinizi giriniz"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            <Text style={{ marginBottom: 10, color: '#rgb(237,52,53)', fontWeight: '600' }}>
                Şifre
            </Text>
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between',
                borderBottomWidth: 2,
                borderColor: "#c9d6df",
                height: 40,
                marginBottom: 20
            }}>
                <TextInput
                    placeholder="Şifrenizi  giriniz"

                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    style={{ width: '90%' }}
                />
                <MaterialCommunityIcons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="black"
                    onPress={toggleShowPassword}
                />
            </View>
            <Pressable
                onPress={handleLogin}
                style={({ pressed }) => [{
                    backgroundColor: pressed ? 'white' : '#rgb(237,52,53)',
                    borderRadius: 15,
                    marginBottom: 10,
                }]}>
                {({ pressed }) => (
                    <Text style={{ padding: 20, margin: 1, textAlign: 'center', color: 'white', fontWeight: '900' }}>
                        {pressed ? 'w' : 'Giriş Yap'}
                    </Text>
                )}
            </Pressable>

            <View style={{ justifyContent: "space-between", flexDirection: "row", }}>
                <Modal
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => { setModalVisible(!modalVisible); }} >
                    <KeyboardAwareScrollView behavior='padding' style={{ paddingHorizontal: 30, paddingVertical: 120 }}>
                        <Image source={require('../assets/login_logo.png')}
                            style={{
                                resizeMode: 'center',
                                height: 150,
                                width: '100%',
                                marginBottom: 40,
                            }} />
                        <Text style={{ fontSize: 25, fontFamily: 'Times New Roman', paddingBottom: 10 }}>
                            Reset your password
                        </Text>
                        <Text style={{ fontSize: 15, fontFamily: 'Times New Roman', color: '#888' }}>
                            Enter your user account's verified email address and we will send you a password reset link.
                        </Text>
                        <Text style={{ marginTop: 40, marginBottom: 10, color: '#rgb(237,52,53)', fontWeight: '600' }}>
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
                                value={emailForReset}
                                onChangeText={setEmailForReset}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <Pressable
                            onPress={handleResetPassword}
                            style={({ pressed }) => [{
                                backgroundColor: pressed ? 'white' : '#rgb(237,52,53)',
                                borderRadius: 15,
                                marginBottom: 10,
                            }]}>
                            {({ pressed }) => (
                                <Text style={{ padding: 20, margin: 1, textAlign: 'center', color: 'white', fontWeight: '900' }}>
                                    {pressed ? 'w' : 'Send password reset email'}
                                </Text>
                            )}
                        </Pressable>
                        <Button
                            onPress={() => setModalVisible(false)}
                            title="Girşe geri dön!"
                            color='#666' />
                    </KeyboardAwareScrollView>
                </Modal>
                <Button
                    onPress={() => setModalVisible(true)}
                    title="Şifremi unuttum?"
                    color='#666' />
                <Button
                    onPress={() => navigation.navigate('Signup')}
                    title="Hesap Oluşturun!"
                    color="#rgb(237,52,53)" />
                <Modal
                    animationType="slide"
                    visible={otpModalVisible}
                    onRequestClose={() => {setOtpModalVisible(!otpModalVisible); }} >
                    <KeyboardAwareScrollView behavior='padding' style={{ paddingHorizontal: 30, paddingVertical: 120 }}>
                        <Text style={{ fontSize: 25, fontFamily: 'Times New Roman', paddingBottom: 10 }}>
                            Enter OTP and New Password
                        </Text>
                        <Text style={{ marginTop: 40, marginBottom: 10, color: '#rgb(237,52,53)', fontWeight: '600' }}>
                            OTP Code
                        </Text>
                        <TextInput
                            style={{
                                borderBottomWidth: 2,
                                borderColor: "#c9d6df",
                                height: 40,
                                marginBottom: 20,
                                

                            }}
                            placeholder="OTP Code"
                            value={otpCode}
                            onChangeText={setOtpCode}
                            keyboardType={'numeric'}
                        />
                        <Text style={{ marginTop: 40, marginBottom: 10, color: '#rgb(237,52,53)', fontWeight: '600' }}>
                            New Password
                        </Text>
                        <TextInput
                            style={{
                                borderBottomWidth: 2,
                                borderColor: "#c9d6df",
                                height: 40,
                                marginBottom: 20,
                            }}
                            placeholder="New Password"
                            secureTextEntry={true}
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        <Button
                            onPress={handlePasswordReset}
                            title="Reset Password"
                            color="#rgb(237,52,53)"
                        />
                        <Button
                            onPress={() => setOtpModalVisible(!otpModalVisible)}
                            title="close"
                            color="#rgb(237,52,53)"
                        />
                    </KeyboardAwareScrollView>
                </Modal>
            </View>
        </KeyboardAwareScrollView>
    );
}
