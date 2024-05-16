import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Calendar, LocaleConfig , Agenda } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

export default function Takvim({ navigation }) {
    const [selected, setSelected] = useState('');
    const dataForTakvim = {
        Takvim: [
            {
                event_id: 1,
                event_name: "Event 1",
                event_date: "2024-05-01",
                event_saat: "11:50",
                isCanceled: false,
            },{
                event_id: 2,
                event_name: "Event 2",
                event_date: "2024-05-02",
                event_saat: "11:50",
                isCanceled: false,
            },{
                event_id: 3,
                event_name: "Event 3",
                event_date: "2024-05-05",
                event_saat: "11:50",
                isCanceled: false,
            },{
                event_id: 4,
                event_name: "Event 4",
                event_date: "2024-05-07",
                event_saat: "11:50",
                isCanceled: true,
            },
        ]
    };

    // Tüm etkinlikleri takvimden çekme
    const markedDates = {};
    dataForTakvim.Takvim.forEach(event => {
        markedDates[event.event_date] = { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' };
    });

    // Seçili tarihe benzer şekilde tarihleri takvimde gösterme
    const eventsForSelectedDate = selected ? dataForTakvim.Takvim.filter(event => event.event_date === selected) : [];
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
            <Text style={{backgroundColor:'white', textAlign:'center', fontSize:35,fontWeight:'bold', paddingTop:20}}>Etkinlikler</Text>
            <View style={{ backgroundColor: 'white', paddingHorizontal: 20 }}>
                <Calendar
                    onDayPress={day => {
                        setSelected(day.dateString);
                    }}
                    markedDates={markedDates}
                    theme={{
                        backgroundColor: 'white',
                        calendarBackground: 'white',
                        textSectionTitleColor: 'black',
                        selectedDayBackgroundColor: 'rgba(237, 52, 53, 0.5)',
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
            <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
                {dataForTakvim.Takvim.map(event => (
                    <View key={event.event_id} style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            {event.isCanceled ? (
                                <Ionicons name="ellipse" size={24} color="black" style={{ marginRight: 10, textShadowRadius:3, textShadowColor: 'black'}} />
                            ) : (
                                <Ionicons name="ellipse" size={24} color="rgb(237, 52, 53)" style={{ marginRight: 10 }} />
                            )}
                            <Text style={{ fontWeight: event.isCanceled ? 'bold' : 'normal', textDecorationLine: event.isCanceled ? 'line-through' : 'none', textShadowRadius: event.isCanceled ? 3:0, textShadowColor: event.isCanceled ? 'black':0 }}>{event.event_name}</Text>
                        </View>
                        <Text style={{fontWeight: event.isCanceled ? 'bold' : 'normal'}}>{event.isCanceled ? "İptal Edildi" : `${event.event_date} / ${event.event_saat}`}</Text>
                    </View>
                ))}
            </ScrollView>

        </View>
    );
}
