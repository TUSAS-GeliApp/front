import React, {useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StatusBar, Image, FlatList, Modal, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { xxx } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useFocusEffect } from '@react-navigation/native';


export default function Settings({ navigation }) {
    
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [job, setJob] = useState('');
    const [photo, setPhoto] = useState('');
    
    const [socialMediaLinks, setSocialMediaLinks] = useState({
        twitter: '',
        facebook: '',
        instagram: '',
        linkedin: ''
    });


    const fetchAyarlarData = async () =>{
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
                setId(data.bilgiler[0].id);
                setLocation(data.bilgiler[0].location);
                setName(data.bilgiler[0].name);
                setSurname(data.bilgiler[0].surname);
                setProfilePhoto(data.bilgiler[0].photo);
                setPhoto(data.bilgiler[0].photo); 

                setPhone(data.iletisim_bilgileri[0].phone);
                setEmail(data.iletisim_bilgileri[0].email);
                setJob(data.iletisim_bilgileri[0].job);

                setSocialMediaLinks({
                    twitter: data.iletisim_bilgileri[0].twitter,
                    facebook: data.iletisim_bilgileri[0].facebook,
                    instagram: data.iletisim_bilgileri[0].instagram,
                    linkedin: data.iletisim_bilgileri[0].linkedin
                });

            } catch (error) {
                console.error('Error fetching profil data:', error);
            }
        };
        fetchprofils();
    };
    useFocusEffect(
        useCallback(() => {
            fetchAyarlarData();
        }, [])
    );

    const handleSave = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accesToken');
            const response = await fetch(`http://${xxx}:8080/users`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    name,
                    surname,
                    phone,
                    email,
                    job,
                    location,
                    instagram: socialMediaLinks.instagram,
                    twitter: socialMediaLinks.twitter,
                    linkedin: socialMediaLinks.linkedin,
                    facebook: socialMediaLinks.facebook
                }),
            });
            const data = await response.json();
            if (response.ok) {
                Alert.alert("Success", data.result);
            } else {
                Alert.alert("Error", data.error);
            }
        } catch (error) {
            console.error('Error saving profile changes:', error);
            Alert.alert("Error", "An error occurred while saving profile changes.");
        }
    };
    
    const handleChoosePhoto = async () => {
        try {
            setModalVisible(true);
        } catch (error) {
            console.error('Error opening photo selection modal:', error);
            Alert.alert("Error", "An error occurred while opening photo selection modal.");
        }
    };
    
    const [modalVisible, setModalVisible] = useState(false);
    const [newPhotoLink, setNewPhotoLink] = useState('');

    const handlePhotoLinkUpdate = async () => {
        try {
            setModalVisible(false);
            
            const accessToken = await AsyncStorage.getItem('accesToken');
            const response = await fetch(`http://${xxx}:8080/users/pp`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    photo: newPhotoLink
                }),
            });
            const data = await response.json();
            if (response.ok) {
                Alert.alert("Success", data.result);
            } else {
                Alert.alert("Error", data.error);
            }
        } catch (error) {
            console.error('Error updating photo link:', error);
            Alert.alert("Error", "An error occurred while updating photo link.");
        }
    };
    const cancelPhotoLinkUpdate = () => {
        setModalVisible(false);
        setNewPhotoLink(photo);
    };

    const getInitials = () => {
        return `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase();
    };

    return (
        <KeyboardAwareScrollView 
            contentContainerStyle={{ flexGrow: 1 }}
            extraScrollHeight={200}
            enableOnAndroid={true}
            keyboardShouldPersistTaps="handled"
            style={{flex: 1, padding:20}}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => {
                        Keyboard.dismiss();
                        setModalVisible(false);
                    }}>
                    <View style={{ backgroundColor: '#FFF', width: '80%', padding: 20, borderRadius: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 30 }}>Yeni Profil Fotografi Linki</Text>
                        <TextInput
                            style={{ height: 40, marginBottom: 10, backgroundColor: '#f2f2f2', borderRadius: 5, paddingHorizontal: 10 }}
                            placeholder={photo}
                            value={newPhotoLink}
                            onChangeText={setNewPhotoLink}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={cancelPhotoLinkUpdate}>
                                <Text style={{ color: 'red', fontWeight: 'bold' }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handlePhotoLinkUpdate}>
                                <Text style={{ color: 'red', fontWeight: 'bold' }}>Update</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>


            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{ alignItems: 'center', marginBottom: 20 }}>
                {profilePhoto ? (
                    <Image source={{ uri: profilePhoto }} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }} />
                ) : (
                    <View style={{ width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ccc', marginBottom: 10 }}>
                        <Text style={{ fontSize: 40, color: 'white' }}>{getInitials()}</Text>
                    </View>
                )}
                <Text style={{ textAlign: 'center', color: 'blue' }}>Profil Resmini Degistir</Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 16, marginBottom: 5 }}>Name</Text>
            <TextInput
                style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15 }}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
            />

            <Text style={{ fontSize: 16, marginBottom: 5 }}>Surname</Text>
            <TextInput
                style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15 }}
                placeholder="Enter your surname"
                value={surname}
                onChangeText={setSurname}
            />

            <Text style={{ fontSize: 16, marginBottom: 5 }}>Lokasyon</Text>
            <TextInput
                style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15 }}
                placeholder="Enter some information about you"
                value={location}
                onChangeText={setLocation}
            />

            <Text style={{ fontSize: 16, marginBottom: 5 }}>Telefon</Text>
            <TextInput
                style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15 }}
                placeholder="Enter some information about you"
                value={phone}
                onChangeText={setPhone}
            />
            <Text style={{ fontSize: 16, marginBottom: 5 }}>Email</Text>
            <TextInput
                style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15 }}
                placeholder="Enter some information about you"
                value={email}
                onChangeText={setEmail}
            />
            <Text style={{ fontSize: 16, marginBottom: 5 }}>Info</Text>
            <TextInput
                style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15 }}
                placeholder="Enter some information about you"
                value={job}
                onChangeText={setJob}
            />
            <Text style={{ fontSize: 16, marginBottom: 5 }}>Twitter</Text>
            <TextInput
                style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15 }}
                placeholder="Enter your Twitter link"
                value={socialMediaLinks.twitter}
                onChangeText={(text) => setSocialMediaLinks({ ...socialMediaLinks, twitter: text })}
            />

            <Text style={{ fontSize: 16, marginBottom: 5 }}>Facebook</Text>
            <TextInput
                style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15 }}
                placeholder="Enter your Facebook link"
                value={socialMediaLinks.facebook}
                onChangeText={(text) => setSocialMediaLinks({ ...socialMediaLinks, facebook: text })}
            />

            <Text style={{ fontSize: 16, marginBottom: 5 }}>Instagram</Text>
            <TextInput
                style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15 }}
                placeholder="Enter your Instagram link"
                value={socialMediaLinks.instagram}
                onChangeText={(text) => setSocialMediaLinks({ ...socialMediaLinks, instagram: text })}
            />

            <Text style={{ fontSize: 16, marginBottom: 5 }}>LinkedIn</Text>
            <TextInput
                style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15 }}
                placeholder="Enter your LinkedIn link"
                value={socialMediaLinks.linkedin}
                onChangeText={(text) => setSocialMediaLinks({ ...socialMediaLinks, linkedin: text })}
            />

            <TouchableOpacity style={{ backgroundColor: 'blue', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 20 }} onPress={handleSave}>
                <Text style={{ color: 'white', fontSize: 16 }}>Save Changes</Text>
            </TouchableOpacity>
            <View style={{marginBottom:200}}/>
        </KeyboardAwareScrollView>
    );
}
