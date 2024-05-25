import { useState } from "react";
import { View, Text, FlatList, StatusBar } from "react-native";
import moment from "moment";

// Örnek bildirim verileri
const dataForBildirim = [
    { id: '1', message: 'Yeni mesajınız var.', timestamp: '10-05-2024 13:50' },
    { id: '2', message: 'Toplantı yarın saat 10:00’da.', timestamp: '10-05-2024 12:50' },
    { id: '3', message: 'Proje teslim tarihi yaklaşıyor.', timestamp: '09-05-2024 13:50' },
    { id: '4', message: 'Yeni bir görev atandı.', timestamp: '17-05-2024 13:50' },
    { id: '5', message: 'Sistem güncellemesi tamamlandı.', timestamp: '10-05-2024 13:40' },
    { id: '6', message: 'Takım arkadaşınız bir yorum yaptı.', timestamp: '10-05-2024 13:20' },
    { id: '7', message: 'Dosyanız başarıyla yüklendi.', timestamp: '10-05-2024 01:50' },
    { id: '8', message: 'Profil bilgileriniz güncellendi.', timestamp: '10-05-2024 08:50' },
    { id: '9', message: 'Yeni etkinlik davetiniz var.', timestamp: '10-05-2024 13:30' },
    { id: '10', message: 'Görev süresi dolmak üzere.', timestamp: '10-05-2024 10:50' },
    { id: '11', message: 'Bir mesajınız var.', timestamp: '10-05-2024 13:25' },
    { id: '12', message: 'Yeni bağlantı isteğiniz var.', timestamp: '10-05-2024 13:35' },
    { id: '13', message: 'Toplantı notları yüklendi.', timestamp: '10-04-2024 06:50' },
    { id: '14', message: 'Bildirim ayarlarınız güncellendi.', timestamp: '10-03-2024 13:45' },
    { id: '15', message: 'Yeni proje başlatıldı.', timestamp: '10-05-2024 05:50' },
];

// Geçen süreyi hesaplayan fonksiyon
const timeAgo = (timestamp) => {
    return moment(timestamp, 'DD-MM-YYYY HH:mm').fromNow();
};

// Timestamp'i formatlayan fonksiyon
const formatTimestamp = (timestamp) => {
    return moment(timestamp, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY HH:mm');
};

export default function Bildirimler({ navigation }) {
    // Bildirimleri zamanına göre sıralama
    const sortedData = [...dataForBildirim].sort((a, b) => moment(b.timestamp, 'DD-MM-YYYY HH:mm') - moment(a.timestamp, 'DD-MM-YYYY HH:mm'));

    const renderItem = ({ item }) => (
        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
                <Text>{item.message}</Text>
                <Text style={{ color: 'gray', fontSize: 12 }}>{formatTimestamp(item.timestamp)}</Text>
            </View>
            <Text style={{ color: 'gray', fontSize: 12 }}>{timeAgo(item.timestamp)}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="auto" />
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Bildirimler</Text>
                <FlatList
                    data={sortedData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    );
}
