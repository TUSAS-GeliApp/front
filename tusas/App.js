
import React from 'react';
import {  Text, View, TouchableOpacity , Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, Header } from '@react-navigation/stack';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homepage from './pages/Homepage';
import Etkinlikler from './pages/Etkinlikler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Podcastler from './pages/Podcastler';
import Bulten from './pages/Bulten';
import Videolar from './pages/Videolar';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerActions} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import Profile from './pages/Profile';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack({navigation}){
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Ana sayfa') {
                iconName = "home-outline" ;
                } else if (route.name === 'Etkinlikler') {
                iconName = "planet-outline" ;
                } else if (route.name === 'Podcastler') {
                    iconName = "mic-outline" ;
                }else if (route.name === 'Bulten') {
                    iconName = "newspaper-outline" ;
                }else if (route.name === 'Videolar') {
                    iconName = "videocam-outline" ;
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;

            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            })}
            
            >
            <Tab.Screen name="Ana sayfa" component={Homepage} options={{
                headerStyle: { height: 100},
                headerTitleAlign: 'center',
                headerRight: () => (<TouchableOpacity onPress={() => navigation.openDrawer()}>
                                        <FontAwesome name="bars" size={24} color="black" style={{paddingRight:30}}/>
                                    </TouchableOpacity>),
                headerLeft: () => (<Image source={require('./assets/header_logo.png')} style={{marginLeft:10, height:40, width:100}}/>
                ) }} />    
            <Tab.Screen name="Etkinlikler" component={Etkinlikler} options={{
                headerStyle: { height: 100},
                headerTitleAlign: 'center',
                headerRight: () => (<TouchableOpacity onPress={() => navigation.openDrawer()}>
                                        <FontAwesome name="bars" size={24} color="black" style={{paddingRight:30}}/>
                                    </TouchableOpacity>),
                headerLeft: () => (<Image source={require('./assets/header_logo.png')} style={{marginLeft:10, height:40, width:100}}/>
                ) }} />      
            <Tab.Screen name="Podcastler" component={Podcastler} options={{
                headerStyle: { height: 100},
                headerTitleAlign: 'center',
                headerRight: () => (<TouchableOpacity onPress={() => navigation.openDrawer()}>
                                        <FontAwesome name="bars" size={24} color="black" style={{paddingRight:30}}/>
                                    </TouchableOpacity>),
                headerLeft: () => (<Image source={require('./assets/header_logo.png')} style={{marginLeft:10, height:40, width:100}}/>
                ) }} />      
            <Tab.Screen name="Videolar" component={Videolar} options={{
                headerStyle: { height: 100},
                headerTitleAlign: 'center',
                headerRight: () => (<TouchableOpacity onPress={() => navigation.openDrawer()}>
                                        <FontAwesome name="bars" size={24} color="black" style={{paddingRight:30}}/>
                                    </TouchableOpacity>),
                headerLeft: () => (<Image source={require('./assets/header_logo.png')} style={{marginLeft:10, height:40, width:100}}/>
                ) }} />      
            <Tab.Screen name="Bulten" component={Bulten} options={{
                headerStyle: { height: 100},
                headerTitleAlign: 'center',
                headerRight: () => (<TouchableOpacity onPress={() => navigation.openDrawer()}>
                                        <FontAwesome name="bars" size={24} color="black" style={{paddingRight:30}}/>
                                    </TouchableOpacity>),
                headerLeft: () => (<Image source={require('./assets/header_logo.png')} style={{marginLeft:10, height:40, width:100}}/>
                ) }} />  
        </Tab.Navigator>
      );
}

function Main({navigation}){
    return(
        <Drawer.Navigator initialRouteName="Ana sayfa"  >
                <Drawer.Screen name="profil" component={Profile} 
                            options={{ 
                                    headerShown:false,
                                    drawerPosition:'right',
                                    drawerStyle: {
                                        width: '60%', 
                                        alignItems:'center', 
                                        backgroundColor: 'rgb(41, 64, 153)'
                                      },
                                    drawerType: 'front',
                                    overlayVisible:true,
                                    sceneAnimationEnabled: true,
                                    keyboardDismissMode:true,
                                    drawerActiveBackgroundColor: 'rgb(41, 64, 153)',

                                    title:'Profil',
                                    drawerIcon: ({focused, size}) => (
                                        <View style={{paddingLeft: "30%",width:"70%",height:'100%', paddingBottom:"50%"}}>
                                            <Avatar.Text size={94} label="FK" style={{backgroundColor:'white'}}/>  
                                        <Text style={{color:'white',width:'200%',fontSize:18, paddingTop:20}}>Fevzi KILAS</Text>
                                    </View>
                                        
                                    ),
                                    
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
                                            name="home-sharp"
                                            size={size}
                                            color={focused ? 'white' : 'lightgrey'}
                                            
                                            
                                        />
                                        <Text style={{color:'white'}}>{"   "}Ana Sayfa</Text>
                                    </View>
                                 ),
                                
                                    
                                    }}/>
                
                                    
                
            </Drawer.Navigator>  
            
         
    );
}


export default function App() {
    const isSignedIn = true;
    return (
        <NavigationContainer >
            <Stack.Navigator>
                    {isSignedIn ? (
                <>
                    <Stack.Screen name="Home" component={Main} options={{headerShown: false}} />                    
                </>
                ) : (
                <>
                    <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                    <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}}/>
                </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}