import { useState } from "react";
import { Image, ScrollView, Text, TextInput, View, TouchableOpacity, Alert, StatusBar } from "react-native";

import { FlatList } from "react-native-gesture-handler";

export default function Homepage({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);

    const dataForHome = {
        etkinlik: [
            { id: 1, Image: require('../assets/kare.png'), title: "Title 1", link: "Link" },
            { id: 2, Image: require('../assets/kare.png'), title: "Title 2", link: "Link" },
            { id: 3, Image: require('../assets/kare.png'), title: "Title 3", link: "Link" },
            { id: 4, Image: require('../assets/kare.png'), title: "Title 4", link: "Link" },
            { id: 5, Image: require('../assets/kare.png'), title: "Title 5", link: "Link" },
        ],
        bulten: [
            { id: 1, Image: require('../assets/kare.png'), title: "Title 1", link: "Link" },
            { id: 2, Image: require('../assets/kare.png'), title: "Title 2", link: "Link" },
            { id: 3, Image: require('../assets/kare.png'), title: "Title 3", link: "Link" },
            { id: 4, Image: require('../assets/kare.png'), title: "Title 4", link: "Link" },
            { id: 5, Image: require('../assets/kare.png'), title: "Title 5", link: "Link" },
        ],
        podcastler: [
            { id: 1, Image: require('../assets/kare.png'), title: "Title 1", link: "Link" }, 
            { id: 2, Image: require('../assets/kare.png'), title: "Title 2", link: "Link" },
            { id: 3, Image: require('../assets/kare.png'), title: "Title 3", link: "Link" },

        ],
        videolar: [
            { id: 1, Image: require('../assets/kare.png'), title: "Title 1", link: "Link" },
            { id: 2, Image: require('../assets/kare.png'), title: "Title 2", link: "Link" },
            { id: 3, Image: require('../assets/kare.png'), title: "Title 3", link: "Link" },
            { id: 4, Image: require('../assets/kare.png'), title: "Title 4", link: "Link" },
            { id: 5, Image: require('../assets/kare.png'), title: "Title 5", link: "Link" },
        ],
    };

    return(

        <View style={{flex:1}}>
            <StatusBar barStyle="auto"/>
            {/* <View style={{ width:'100%', backgroundColor:'white', height:80, marginTop: Constants.statusBarHeight, flexDirection:'row', justifyContent:'space-between'}}>
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
                        
            </View> */}
            
            <View style={{backgroundColor: 'white',}}>
                <ScrollView style={{height:'100%'}}>
                    <View style={{backgroundColor:'white', padding:10}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between', margin:20, alignItems:'center'}}>
                            <Text style={{fontSize:20, fontWeight:'700'}}>
                                Etkinlikler
                            </Text>
                            <TouchableOpacity style={{ }} onPress={() => navigation.navigate('Etkinlikler')} >
                                <Text style={{fontSize:11, color:'blue'}}>Daha fazla</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <FlatList
                            data={dataForHome.etkinlik}
                            style={{padding:10}}
                            renderItem={({ item }) => (
                                <View style={{ 
                                    width: 150,
                                    height: 150,
                                    marginBottom: 15,
                                    marginEnd: 45,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    }}>
                                    <Image
                                        style={{ width: '100%',
                                        height: '100%',}}
                                        source={item.Image }
                                    />
                                    <Text style={{marginTop:10}}>
                                        {item.title}
                                    </Text>
                                </View>
                            )}
                            keyExtractor={item => item.id.toString()}
                            horizontal
                        />

                        
                    </View>
                    <View style={{backgroundColor:'white',padding:10}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between', margin:20, alignItems:'center'}}>
                            <Text style={{fontSize:20, fontWeight:'700'}}>
                                Podcastler
                            </Text>
                            <TouchableOpacity style={{ }} onPress={() =>Alert.alert("daha fazla podast")} >
                                <Text style={{fontSize:11, paddingRight:20, color:'blue'}}>Daha fazla</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <FlatList
                                horizontal
                                style={{padding:10}}
                                data={dataForHome.podcastler}
                                renderItem={({ item }) => (
                                    <View style={{
                                        
                                        width: 150,
                                        height: 150,
                                        marginBottom: 15,
                                        marginEnd: 25,
                                        justifyContent: 'center',
                                        alignItems: 'center',}}>
                                        <Image
                                            style={{ width: '100%',
                                            height: '100%',
                                            borderRadius: 10,}}
                                            source={item.Image }
                                        />
                                        <Text style={{marginTop:10}}>
                                            {item.title}
                                        </Text>
                                    </View>
                                )}
                                keyExtractor={item => item.id.toString()}
                            />
                        
                    </View>
                    <View style={{backgroundColor:'white',padding:10}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between', margin:20, alignItems:'center', alignItems:'center'}}>
                            <Text style={{fontSize:20, fontWeight:'700'}}>
                                Bulten
                            </Text>
                            <TouchableOpacity style={{ }} onPress={() =>Alert.alert("daha fazla podast")} >
                                <Text style={{fontSize:11, paddingRight:20, color:'blue'}}>Daha fazla</Text>
                            </TouchableOpacity>
                        </View>
                        
                            <FlatList
                                horizontal
                                style={{padding:10}}
                                data={dataForHome.bulten}
                                renderItem={({ item }) => (
                                    <View style={{ width: 150,
                                        height: 150,
                                        marginBottom: 15,
                                        marginEnd: 25,
                                        justifyContent: 'center',
                                        alignItems: 'center'}}>
                                        <Image
                                            style={{ width: '100%',
                                            height: '100%',
                                            borderRadius: 10,}}
                                            source={item.Image }
                                        />
                                        <Text style={{marginTop:10}}>
                                            {item.title}
                                        </Text>
                                    </View>
                                )}
                                keyExtractor={item => item.id.toString()}
                            />
                    </View>
                    <View style={{backgroundColor:'white',padding:10}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between', margin:20, alignItems:'center'}}>
                            <Text style={{fontSize:20, fontWeight:'700'}}>
                                Videolar
                            </Text>
                            <TouchableOpacity style={{ }} onPress={() =>Alert.alert("daha fazla podast")} >
                                <Text style={{fontSize:11, paddingRight:20, color:'blue'}}>Daha fazla</Text>
                            </TouchableOpacity>
                        </View>
                        
                                <FlatList
                                    horizontal
                                    style={{padding:10}}
                                    data={dataForHome.videolar}
                                    renderItem={({ item }) => (
                                        <View style={{ width: 150,
                                            height: 150,
                                            marginBottom: 15,
                                            marginEnd: 25,
                                            justifyContent: 'center',
                                            alignItems: 'center',}}>
                                            <Image
                                                style={{ width: '100%',
                                                height: '100%',
                                                borderRadius: 10,}}
                                                source={item.Image}
                                            />
                                            <Text style={{marginTop:10}}>
                                                {item.title}
                                            </Text>
                                        </View>
                                    )}
                                    keyExtractor={item => item.id.toString()}
                                />
                    </View>
                </ScrollView>
            </View>   
                     
        </View>

    )

}