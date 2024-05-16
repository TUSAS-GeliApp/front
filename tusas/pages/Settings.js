import { useState } from "react";
import { Image, ScrollView, Text, TextInput, View, TouchableOpacity, Alert, StatusBar } from "react-native";

import { FlatList } from "react-native-gesture-handler";

export default function Settings({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);

    
    return(

        <View style={{flex:1}}>
            <StatusBar barStyle="auto"/>
            <View style={{backgroundColor: 'white',padding:50}}>
                <Text>
                    Settings
                </Text>
            </View>   
                     
        </View>

    )

}