import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, Text, View } from "react-native";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { xxx } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';

export default function Takvim({ navigation }) {
    const [calendarData, setCalendarData] = useState([]);

    const fetchCalendarData = async () => {
        try {
            const token = await AsyncStorage.getItem('accesToken');

            // Takvim etkinliklerini al
            const eventsResponse = await fetch(`http://${xxx}:8080/calender/all_event`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!eventsResponse.ok) {
                throw new Error('Network response for calendar events was not ok');
            }

            const eventsData = await eventsResponse.json();

            // Takvim programlarını al
            const programsResponse = await fetch(`http://${xxx}:8080/calender/all_program`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!programsResponse.ok) {
                throw new Error('Network response for calendar programs was not ok');
            }

            const programsData = await programsResponse.json();

            // İki yanıtı birleştirerek tek bir dizi oluştur
            const combinedData = [...eventsData, ...programsData];
            setCalendarData(combinedData);
        } catch (error) {
            console.error('Error fetching calendar data:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchCalendarData();
        }, [])
    );

    // Tüm etkinlikleri takvimden çekme
    const markedDates = {};
    calendarData.forEach(event => {
        const formattedDate = event.date.split('/')[0].split('.').reverse().join('-');
        markedDates[formattedDate] = { selected: true, disableTouchEvent: true, selectedDotColor: 'orange', textColor: 'red' };
    });

    // Seçili tarihe benzer şekilde tarihleri takvimde gösterme
    LocaleConfig.locales['tr'] = {
        monthNames: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
        monthNamesShort: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
        dayNames: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
        dayNamesShort: ['Pzr', 'Pts', 'Sal', 'Çar', 'Per', 'Cm', 'Cts'],
        today: "Bugun"
    };
    LocaleConfig.defaultLocale = 'tr';

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: 'white', paddingHorizontal: 20 }}>
                {console.log(markedDates)}

                <Calendar
                    markedDates={markedDates}
                    theme={{
                        backgroundColor: 'white',
                        calendarBackground: 'white',
                        textSectionTitleColor: 'black',
                        selectedDayBackgroundColor: 'rgba(237, 52, 53, 1)',
                        selectedDayTextColor: 'white',
                        todayTextColor: 'rgba(237, 52, 53, 0.5)',
                        dayTextColor: 'black',
                        textDisabledColor: '#d9e1e8',
                        dotColor: 'rgba(237, 52, 53, 0.5)',
                        selectedDotColor: '#ffffff',
                        arrowColor: 'rgba(237, 52, 53, 0.5)',
                        disabledArrowColor: '#d9e1e8',
                        monthTextColor: 'black',
                        indicatorColor: 'rgba(237, 52, 53, 0.5)',
                        textDayFontFamily: 'monospace',
                        textMonthFontFamily: 'monospace',
                        textDayHeaderFontFamily: 'monospace',
                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '300',
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16
                    }}
                />
            </View>
            <Text style={{ textAlign: 'center', fontSize: 35, fontWeight: 'bold', paddingTop: 10, backgroundColor:'rgba(256,256,256,0.6)'  }}>Etkinlikler</Text>
            <ScrollView style={{ flex: 1,backgroundColor:'rgba(256,256,256,0.6)'}}>
                {calendarData.map(event => (
                    <View key={event.event_id} style={{borderRadius:10, borderBottomWidth: 1, borderBottomColor: '#ccc', paddingHorizontal: 12, marginHorizontal: 8, marginVertical: 3, paddingVertical: 7 , backgroundColor:'rgba(0, 0, 0,0.1)' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="ellipse" size={24} color="rgb(237, 52, 53)" />
                            <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 10 }}>{event.name}</Text>
                        </View>
                        <Text style={{ textAlign: 'left', fontSize: 13, paddingRight: 10, paddingLeft: 29, color: "rgba(237, 52, 53,0.6)"}}> {event.date}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
