
import React, { useEffect , useState, useCallback }  from 'react';
import {  Text, View, TouchableOpacity , Image, BackHandler, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, Header } from '@react-navigation/stack';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homepage from './pages/Homepage';
import Etkinlikler from './pages/Etkinlikler';
import Program from './pages/Program';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Podcastler from './pages/Podcastler';
import Bulten from './pages/Bulten';
import Videolar from './pages/Videolar';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerActions, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import Profile from './pages/Profile';
import { ActivityIndicator, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Contact from './pages/Contacts';
import Bildirim from './pages/Bildirimler';
import Setting from './pages/Settings';
import Takvim from './pages/Takvim';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';

import { ip_adress } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack({navigation}){
    return (
        <Tab.Navigator 
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Anasayfa') {
                        iconName = "home" ;
                        size *= 1.2;
                    } else if (route.name === 'Podcastler') {
                        iconName = "mic-circle-outline" ;
                    }else if (route.name === 'Etkinlikler') {
                        iconName = "flash-outline" ;
                    }else if (route.name === 'Program') {
                        iconName = "ellipse" ;
                    }else if (route.name === 'Bulten') {
                        iconName = "newspaper-outline" ;
                    }else if (route.name === 'Videolar') {
                        iconName = "videocam-outline" ;
                    }else if (route.name === 'Takvim') {
                        iconName = "calendar-outline" ;
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;

                },
                tabBarActiveTintColor: 'rgba(237, 52, 53, 0.9)',
                tabBarInactiveTintColor: 'rgba(41, 64, 153, 0.5)',
                })}
            initialRouteName="Anasayfa"

            >
            <Tab.Screen name="Program" component={Program} options={{

                headerStyle: { height: 120},
                headerTitleAlign: 'center',
                headerTitleStyle:{fontSize:25, fontWeight:'700'},
                headerRight: () => (<TouchableOpacity onPress={() => navigation.openDrawer()}>
                                        <FontAwesome name="bars" size={24} color="rgb(41, 64, 153)" style={{paddingRight:30}}/>
                                    </TouchableOpacity>),
                headerLeft: () => (<Image source={require('./assets/header_logo.png')} style={{marginLeft:10, height:40, width:100}}/>
            ) }} />   
            <Tab.Screen name="Etkinlikler" component={Etkinlikler} options={{
                headerStyle: { height: 120},
                headerTitleAlign: 'center',
                headerTitleStyle:{fontSize:25, fontWeight:'700'},
                headerRight: () => (<TouchableOpacity onPress={() => navigation.openDrawer()}>
                                        <FontAwesome name="bars" size={24} color="rgb(41, 64, 153)" style={{paddingRight:30}}/>
                                    </TouchableOpacity>),
                headerLeft: () => (<Image source={require('./assets/header_logo.png')} style={{marginLeft:10, height:40, width:100}}/>
                ) }} />      
            <Tab.Screen name="Podcastler" component={Podcastler} options={{
                headerStyle: { height: 120},
                headerTitleAlign: 'center',
                headerTitleStyle:{fontSize:25, fontWeight:'700'},
                headerRight: () => (<TouchableOpacity onPress={() => navigation.openDrawer()}>
                                        <FontAwesome name="bars" size={24} color="rgb(41, 64, 153)" style={{paddingRight:30}}/>
                                    </TouchableOpacity>),
                headerLeft: () => (<Image source={require('./assets/header_logo.png')} style={{marginLeft:10, height:40, width:100}}/>
                ) }} />      
            <Tab.Screen name="Anasayfa" component={Homepage} options={{
                headerStyle: {height: 120},
                headerTitleAlign: 'center',
                headerTitleStyle:{fontSize:25, fontWeight:'700'},
                
                headerRight: () => (<TouchableOpacity onPress={() => navigation.openDrawer()}>
                                        <FontAwesome name="bars" size={24} color="rgb(41, 64, 153)" style={{paddingRight:30}}/>
                                    </TouchableOpacity>),
                headerLeft: () => (<Image source={require('./assets/header_logo.png')} style={{marginLeft:10, height:40, width:100}}/>
                ) }} /> 
            <Tab.Screen name="Takvim" component={Takvim} options={{
                headerStyle: { height: 120},
                headerTitleAlign: 'center',
                headerTitleStyle:{fontSize:25, fontWeight:'700'},
                headerRight: () => (<TouchableOpacity onPress={() => navigation.openDrawer()}>
                                        <FontAwesome name="bars" size={24} color="rgb(41, 64, 153)" style={{paddingRight:30}}/>
                                    </TouchableOpacity>),
                headerLeft: () => (<Image source={require('./assets/header_logo.png')} style={{marginLeft:10, height:40, width:100}}/>
                ) }} /> 
                 
            <Tab.Screen name="Videolar" component={Videolar} options={{
                headerStyle: { height: 120},
                headerTitleAlign: 'center',
                headerTitleStyle:{fontSize:25, fontWeight:'700'},
                headerRight: () => (<TouchableOpacity onPress={() => navigation.openDrawer()}>
                                        <FontAwesome name="bars" size={24} color="rgb(41, 64, 153)" style={{paddingRight:30}}/>
                                    </TouchableOpacity>),
                headerLeft: () => (<Image source={require('./assets/header_logo.png')} style={{marginLeft:10, height:40, width:100}}/>
                ) }} />      
            <Tab.Screen name="Bulten" component={Bulten} options={{
                headerStyle: { height: 120},
                headerTitleAlign: 'center',
                headerTitleStyle:{fontSize:25, fontWeight:'700'},
                headerRight: () => (<TouchableOpacity onPress={() => navigation.openDrawer()}>
                                        <FontAwesome name="bars" size={24} color="rgb(41, 64, 153)" style={{paddingRight:30}}/>
                                    </TouchableOpacity>),
                headerLeft: () => (<Image source={require('./assets/header_logo.png')} style={{marginLeft:10, height:40, width:100}}/>
                ) }} />  
        </Tab.Navigator>
      );
}
function ContactStack({navigation}){
    return ( 
        <Stack.Navigator >
            <Stack.Screen name='Kişiler' component={Contact} options={{headerStyle: { height: 120},
                                    headerTitleAlign: 'center',
                                    headerTitleStyle:{fontSize:25, fontWeight:'700'},
                                    headerRight: () => (<TouchableOpacity onPress={() => navigation.openDrawer()}>
                                                            <FontAwesome name="bars" size={24} color="rgb(41, 64, 153)" style={{paddingRight:30}}/>
                                                        </TouchableOpacity>),
                                    headerLeft: () => (<TouchableOpacity  style={{padding: 5, left:'5%',flexDirection:'row', justifyContent:'flex-end', alignItems:'center', }} onPress={() => navigation.navigate("Ana sayfa")}>
                                                            <Ionicons name="chevron-back" color="black" style={{fontSize:30}} />
                                                            <Text style={{color:'black',fontWeight:'500',fontSize:15}}>{"Anasayfa"}</Text>
                                                        </TouchableOpacity>
                                    )}}/>
        </Stack.Navigator>
    )
}

function BildirimlerStack({navigation}){
    return ( 
        <Stack.Navigator >
            <Stack.Screen name='Bildirimler' component={Bildirim} options={{headerStyle: { height: 120},
                                    headerTitleAlign: 'center',
                                    headerTitleStyle:{fontSize:25, fontWeight:'700'},
                                    headerRight: () => (<TouchableOpacity onPress={() => navigation.openDrawer()}>
                                                            <FontAwesome name="bars" size={24} color="rgb(41, 64, 153)" style={{paddingRight:30}}/>
                                                        </TouchableOpacity>),
                                    headerLeft: () => (<TouchableOpacity  style={{padding: 5, left:'5%',flexDirection:'row', justifyContent:'flex-end', alignItems:'center', }} onPress={() => navigation.navigate("Ana sayfa")}>
                                                            <Ionicons name="chevron-back" color="black" style={{fontSize:30}} />
                                                            <Text style={{color:'black',fontWeight:'500',fontSize:15}}>{"Anasayfa"}</Text>
                                                        </TouchableOpacity>
                                    )}}/>
        </Stack.Navigator>
    )
}
function SettingStack({navigation}){
    return ( 
        <Stack.Navigator>
            <Stack.Screen name='Ayarlar' component={Setting} options={{headerStyle: { height: 120},
                                    headerTitleAlign: 'center',
                                    headerTitleStyle:{fontSize:25, fontWeight:'700'},
                                    headerRight: () => (<TouchableOpacity onPress={() => navigation.openDrawer()}>
                                                            <FontAwesome name="bars" size={24} color="rgb(41, 64, 153)" style={{paddingRight:30}}/>
                                                        </TouchableOpacity>),
                                    headerLeft: () => (<TouchableOpacity  style={{padding: 5, left:'5%',flexDirection:'row', justifyContent:'flex-end', alignItems:'center', }} onPress={() => navigation.navigate("Ana sayfa")}>
                                                            <Ionicons name="chevron-back" color="black" style={{fontSize:30}} />
                                                            <Text style={{color:'black',fontWeight:'500',fontSize:15}}>{"Anasayfa"}</Text>
                                                        </TouchableOpacity>
                                    )}}/>
        </Stack.Navigator>
    )
}

function Main({navigation}){
    const [profileData, setProfileData] = useState(null);

    const fetchProfilData = async () => {
        const fetchProfile = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('accesToken');
                console.log(accessToken)
                const response = await fetch(`http://${ip_adress}:8080/users/user`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                const data = await response.json();
                console.log(data.bilgiler[0]);

                setProfileData(data.bilgiler[0]);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfile();
    };
    useFocusEffect(
        useCallback(() => {
            fetchProfilData();
        }, [])
    );

    const handleLogout = async () => {
        
        try {
            const token = await AsyncStorage.getItem('accesToken');
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            const response = await fetch(`http://${ip_adress}:8080/logout`, {
                method: 'POST',
                headers: {
                     'Authorization': `Bearer ${token}`,
                     'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refreshToken: refreshToken,
                }),
            });

            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
            await AsyncStorage.removeItem('accesToken');
            await AsyncStorage.removeItem('refreshToken');
    
            if (!response.ok) {
                throw new Error('Çıkış yapılırken bir hata oluştu');
            }

        } catch (error) {
            console.error('Çıkış yaparken hata oluştu', error);
        }
    };
    

    return(
        <Drawer.Navigator initialRouteName="Ana sayfa" drawerContent={props => {
                return (
                <DrawerContentScrollView {...props}  >
                    <DrawerItemList {...props} />
                    <View style={{paddingVertical: 30}}/>
                    <TouchableOpacity onPress={() => handleLogout()} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20, margin:20 ,backgroundColor: 'rgba(256,0,0,0.5)',borderRadius:30}}>
                        <Ionicons name="log-out-outline" size={24} color="white" />
                        <Text style={{ color: 'white', marginLeft: 20 }}>Çıkış Yap</Text>
                    </TouchableOpacity>
                    
                </DrawerContentScrollView>
                )
            }}>
        
        <Drawer.Screen
                name="profil"
                component={Profile}
                options={{
                    headerShown: false,
                    drawerPosition: 'right',
                    drawerStyle: {
                        width: '60%',
                        alignItems: 'center',
                        backgroundColor: 'rgb(41, 64, 153)'
                    },
                    drawerType: 'front',
                    overlayVisible: true,
                    sceneAnimationEnabled: true,
                    keyboardDismissMode: true,
                    drawerActiveBackgroundColor: 'rgb(41, 64, 153)',
                    title: 'Profil',
                    drawerIcon: ({ focused, size }) => (
                            <View style={{ alignItems: 'center', paddingBottom: "30%", paddingTop: "30%"}}>
                                {profileData ? (
                                    profileData.photo ? (
                                        <Image
                                            source={{ uri: profileData.photo }}
                                            style={{ width: 100, height: 100, borderRadius: 50, left:35 }}
                                        />
                                    ) : (
                                        <Avatar.Text
                                            size={100}
                                            label={profileData.name.charAt(0) + profileData.surname.charAt(0)}
                                            style={{ backgroundColor: 'white' , left:35 }}
                                        />
                                    )
                                ) : (
                                    <Avatar.Text size={100} label="No" style={{ backgroundColor: 'white', left:35  }} />
                                )}
                                <Text style={{ color: 'white', fontSize: 25, paddingTop: 20, textAlign: 'center' , left:35 }}>
                                    {profileData ? `${profileData.name} ${profileData.surname}` : 'Fevzi KILAS'}
                                </Text>
                            </View>
                        )
                    }}
            />

            <Drawer.Screen name="Ana sayfa" component={HomeStack}  
                        options={{ 
                            headerShown:false,
                            drawerPosition:'right',
                            drawerStyle: {
                                width: '60%', 
                                alignItems:'center', 
                                backgroundColor: 'rgb(41, 64, 153)',
                            },
                            drawerType: 'front',
                            overlayVisible:true,
                            sceneAnimationEnabled: true,
                            keyboardDismissMode:true,
                            drawerActiveBackgroundColor: '#rgba(256,256,256,0.5)',
                            title:'',
                            drawerIcon: ({focused, size}) => (
                                <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
                                    <Ionicons  
                                        name="home"
                                        size={size}
                                        color={focused ? 'white' : 'lightgrey'}
                                    />
                                    <Text style={{color:'white'}}>{"   "}Ana Sayfa</Text>
                                </View>
                                )}}/>

            <Drawer.Screen name="Contact" component={ContactStack}  
                        options={{ 
                            headerShown: false,
                            drawerPosition:'right',
                            drawerStyle: {
                                width: '60%', 
                                alignItems:'center', 
                                backgroundColor: 'rgb(41, 64, 153)',
                            },
                            drawerType: 'front',
                            overlayVisible:true,
                            sceneAnimationEnabled: true,
                            keyboardDismissMode:true,
                            drawerActiveBackgroundColor: '#rgba(256,256,256,0.5)',
                            title:'',
                            drawerIcon: ({focused, size}) => (
                                <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
                                    <Ionicons 
                                        name="person"
                                        size={size}
                                        color={focused ? 'white' : 'lightgrey'}
                                    />
                                    <Text style={{color:'white'}}>{"   "}Kişiler</Text>
                                </View>
                                )}}/>
                            
            <Drawer.Screen name="Bildirim" component={BildirimlerStack}  
                        options={{ 
                            headerShown:false,
                            drawerPosition:'right',
                            drawerStyle: {
                                width: '60%', 
                                alignItems:'center', 
                                backgroundColor: 'rgb(41, 64, 153)',
                            },
                            drawerType: 'front',
                            overlayVisible:true,
                            sceneAnimationEnabled: true,
                            keyboardDismissMode:true,
                            drawerActiveBackgroundColor: '#rgba(256,256,256,0.5)',
                            title:'',
                            drawerIcon: ({focused, size}) => (
                                <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
                                    <Ionicons 
                                        name="notifications"
                                        size={size}
                                        color={focused ? 'white' : 'lightgrey'}   
                                    />
                                    <Text style={{color:'white'}}>{"   "}Bildirimler</Text>
                                </View>
                                )}}/>

            <Drawer.Screen name="Settings" component={SettingStack}  
                        options={{ 
                            headerShown:false,
                            drawerPosition:'right',
                            drawerStyle: {
                                width: '60%', 
                                alignItems:'center', 
                                backgroundColor: 'rgb(41, 64, 153)',
                            },
                            drawerType: 'front',
                            overlayVisible:true,
                            sceneAnimationEnabled: true,
                            keyboardDismissMode:true,
                            drawerActiveBackgroundColor: '#rgba(256,256,256,0.5)',
                            title:'',
                            drawerIcon: ({focused, size}) => (
                                <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
                                    <Ionicons 
                                        name="settings"
                                        size={size}
                                        color={focused ? 'white' : 'lightgrey'}
                                    />
                                    <Text style={{color:'white'}}>{"   "}Ayarlar</Text>
                                </View>
                                )}}/>
                 
        </Drawer.Navigator>  
    );
}

export default function App() {
    const [isSignedIn, setIsSignedIn] = useState(null);

    useEffect (() => {
        const checkToken = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('accesToken');
                setIsSignedIn(accessToken ? true : false);
            } catch (error) {
                console.error('Error checking token', error);
                setIsSignedIn(false);
            }
        };

        checkToken();

        const backAction = () => {
            if (!isSignedIn) {
                // Kullanıcı oturum açık değilse geri tuşuna basıldığında uygulamayı kapat
                Alert.alert("Uygulamadan çıkmak istediğinize emin misiniz?", "", [
                    {
                        text: "Hayır",
                        onPress: () => null,
                        style: "cancel"
                    },
                    { text: "Evet", onPress: () => BackHandler.exitApp() }
                ]);
                return true;
            }
            // Kullanıcı oturum açıksa normal geri tuşu davranışını devam ettir
            return false;
        };

        // Geri tuşuna basıldığında backAction fonksiyonunu çağır
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        // Bileşen kaldırıldığında event listener'ı temizle
        return () => {
            backHandler.remove();
        };
    }, [isSignedIn]);

    if (isSignedIn === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={isSignedIn ? "Home" : "Login"}>
                {!isSignedIn && (
                    <>
                        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                    </>
                )}
                <Stack.Screen name="Home" component={Main} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
