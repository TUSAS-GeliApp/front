import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, StatusBar } from "react-native";
import moment from "moment";
import { ip_adress } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function Bildirimler({ navigation }) {
    const [bildirimData, setBildirimData] = useState([]);

    const fetchBildirims = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accesToken');
            const response = await fetch(`http://${ip_adress}:8080/notifications/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            const sortedData = data.sort((a, b) => moment(b.created_at).valueOf() - moment(a.created_at).valueOf());
            setBildirimData(sortedData);
            console.log(sortedData);
        } catch (error) {
            console.error('Error fetching bildirim data:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchBildirims();
        }, [])
    );

    // Geçen süreyi hesaplayan fonksiyon
    const timeAgo = (timestamp) => {
        const timeDifference = moment().diff(moment(timestamp));
        const duration = moment.duration(timeDifference);
        const days = Math.floor(duration.asDays());
        const hours = duration.hours();
    
        if (days > 0) {
            return `${days} gün ${hours} saat önce`;
        } else if (hours > 0) {
            return `${hours} saat önce`;
        } else {
            return 'Daha şimdi gönderildi.';

        }
    };
 
    // Timestamp'i formatlayan fonksiyon
    const formatTimestamp = (timestamp) => {
        return moment(timestamp).format('DD-MM-YYYY HH:mm');
    };

    const renderItem = ({ item }) => (
        <View key={item.id} style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
                <Text style={{ color: 'black', fontSize: 16, fontWeight:'500' }}>{item.message}</Text>
                <Text style={{ color: 'gray', fontSize: 13 }}>{formatTimestamp(item.created_at)}</Text>
            </View>
            <Text style={{ color: '#FF8080', fontSize: 10 }}>{timeAgo(item.created_at)}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="auto" />
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Bildirimler</Text>
                <FlatList
                    data={bildirimData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id ? item.id.toString() : Math.random().toString()}
                />
            </View>
        </View> 
    );
}
