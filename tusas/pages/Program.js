import React, { useState } from "react";
import { Image, Linking, Modal, ScrollView, Text, TouchableOpacity, View, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

export default function Program({ navigation }) {
    const [mapModalVisible, setMapModalVisible] = useState(false);

    const dataForProgram = {
        Program: [
            {
                event_name: "Take off 2024",
                event_date: "Aralık 2024",
                imageUri: "https://cdn.takeoffistanbul.com/media/upload/userFormUpload/MX8gyea7KQpyZt6X18B7SFf5WAdFMRtO.jpg",
                konum: { latitude: 40.99744292183745, longitude: 29.062630435582076 },
                link: "https://takeoffistanbul.com/tr/",
                event_content: `//Aşamalar//
                                /Erken Aşama/
                                MVP/POC süreçlerini tamamlamış, şirketleşmiş, yatırım almış ve/veya satış yapmış girişimlerdir.
                                /Büyüme Aşaması/
                                MVP/POC süreçlerini tamamlamış, şirketleşmiş, yatırım almış (1M - 25 M$), satış yapmış ve uluslararası operasyona(satışa) başlamış girişimlerdir.
                                //Girişimciler//
                                İş fikirlerini, ürün veya hizmetlerini alanlarında uzman mentorlar ile görüşme; yatırımcılarla buluşarak ticari faaliyete geçmekte hız kazanma; kurumlarla işbirliği yapma ve girişimler arasında yarışıp büyük yatırım ödülünü ve daha fazlasını kazanma şansı elde ederler.
                                //Kurumlar//
                                Girişim ekosistemindeki faaliyetlerini tanıtmak ve destekledikleri girişimler ile birlikte etkinlikte yer alma imkanı bulurlar. Zirvede yer alan girişimler ile tanışarak girişimlerin ürün veya hizmetlerini tanımak ve olası işbirlikleri yapma fırsatına sahip olurlar.
                                //Yatırımcılar//
                                Girişimcilere finansal destek sağlayarak, geleceğin şirketlerinin ortaya çıkmasına olanak sağlama ve zirvedeki etkinliklerle network geliştirme fırsatına sahip olurlar. Teknoloji odaklı yatırım yapan fonlar, yatırımcılar ve LP'ler ile tanışma ve birlikte yatırım yapma imkanı bulurlar.
                                //Partnerimiz Olun//
                                2024'te Partnerlikleri için Başvurun Küresel girişim ekosistemini İstanbul, Türkiye’de buluşturan Take Off’ta size uygun partnerlik seçeneği ile yer alarak prestijli partnerler arasında yerinizi ayırtın!
                                /BAŞVUR/
                                info@takeoffistanbul.com
                                `,
                konusmacilar: [{name:'Selçuk Bayraktar', info:'TEKNOFEST Yönetim Kurulu Başkanı & T3 Vakfı Mütevelli Heyeti Başkanı', link:"https://cdn.takeoffistanbul.com/media/upload/userFormUpload/q4ovXBdrKmevSvv7kNmsf2CLjTYT6pny.jpg"},
                                {name:'Mehmet Fatih Kacır', info:'T.C. Sanayi ve Teknoloji Bakanı & TEKNOFEST İcra Kurulu Başkanı', link:"https://cdn.takeoffistanbul.com/media/upload/userFormUpload/7XHGeNcSzyqHoLI1q97vf94nPE4Jlnyh.jpg"},
                                {name:'Prof. Dr. Hakan Karakaş', info:'Vice President, Republic of Türkiye of Presidency of Defence Industries', link:"https://cdn.takeoffistanbul.com/media/upload/userFormUpload/oSoVX581JRORcaTlEFUjqPsKiCOmgDZW.png"},
                                {name:'Sheikh Mansoor Bin Khalifa Al-Thani', info:'Chairman of MBK Holding', link:"https://cdn.takeoffistanbul.com/media/upload/userFormUpload/86VtkHC4QIRGWTrq9eklCW0wezjITrMh.png"},
                                {name:'Prof. Dr. Mirco Kovac', info:'Founder and Director, Laboratory of Sustainability Robotics - EMPA', link:"https://cdn.takeoffistanbul.com/media/upload/userFormUpload/mg2KJ4lDxTeo1QY2b0I5Wb9k8I2ilfvS.jpg"},
                                {name:'Jean-Yves Le Gall', info:'Former President, International Astronomical Federation', link:"https://cdn.takeoffistanbul.com/media/upload/userFormUpload/Rj8FfZCczbQPvfPgq4JBpyA2wb5DoFMl.jpg"},
                            ],
                sss: `
                    Sizinle nasıl iletişime geçebilirim?
                    Bize info@takeoffistanbul.com e-posta adresi üzerinden ulaşabilirsiniz.
                    Herhangi bir ülke kısıtlaması var mı?
                    Take Off Girişim Zirvesine herhangi bir ülkeden girişimciler başvurabilir.
                    Take Off yarışmasına hangi seviyedeki girişimler katılabilir?
                    Başvuru kılavuzunda tanımlanan Erken Aşama ve Büyüme Aşaması kategorilerine uyan girişimler başvuru yapabilir.
                    Take Off yarışmasında girişimlerin başvurabileceği dikey alanlar nelerdir?
                    Teknoloji odaklı girişimler başvuru yapabilir.
                    Girişimlerin yarışma içindeki sunum dili nedir?
                    Pre-Take Off da sunum dili Türkçedir. Take Off İstanbul’da Erken Aşama ve Büyüme Aşama girişim yarışma dili İngilizce’dir.
                    Ziyaretçilerin katılması için son kayıt tarihi nedir?
                    Ziyaretçi kayıtları duyurulacaktır.
                    Yarışmalarda girişimlere sağlanan imkanlar ve ödüller nelerdir?
                    ● Yerel ve Uluslararası Mentorlarla Ağ Oluşturma

                    ● Stant Alanında Ürün/Hizmet Sunma Fırsatı

                    ● Yatırımcılarla Buluşma

                    ● Kurumlarla İşbirliği Toplantıları

                    ● Ödül Kazanma Fırsatı
                    Girişimlerin fikri mülkiyetlerinde yarışma tarafından hak talep ediliyor mu?
                    Fikri Mülkiyet hakları talep edilmemektedir.
                    Yarışma ekipleri en az kaç kişi olabilir?
                    Ekipler en az iki kişiden oluşması gerekmektedir.
                    Aynı ekip olarak iki farklı proje ile yarışmaya başvurabilir miyim?
                    Bir ekip sadece bir girişim ile başvuru yapabilir.
                    İki farklı girişim ekibinde yer alarak yarışmaya başvuru yapabilir miyim?
                    Bir kişi sadece bir girişim üzerinden başvuru yapabilir.
                `
            }
        ]
    };

    const handleLinkPress = (link) => {
        if (link === "") {
            Linking.openURL("https://www.tusas.com/iletisim");
        } else {
            Linking.openURL(link);
        }
    };

    const handleMapPress = () => {
        setMapModalVisible(!mapModalVisible);
    };
    
    const renderTextWithLinks = (text, index) => {
        const parts = text.split(/(\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b)/g);
        return (
            <React.Fragment key={index}>
                {parts.map((part, idx) => {
                    if (part.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/)) {
                        return (
                            <TouchableOpacity key={idx} onPress={() => Linking.openURL('mailto:' + part)} style={{padding:20}}>
                                <View style={{backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', padding: 10, shadowOpacity:0.4 }}>
                                    <Text style={{color: 'white', textAlign: 'center'}}>
                                        {part}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    } else {
                        return <Text key={idx}>{part}</Text>;
                    }
                })}
            </React.Fragment>
        );
    };
    
    
    
    return (
        <ScrollView style={{ flex: 1}}>
            {dataForProgram.Program.map((item) => (
                <View style={{ alignItems: 'center' }}>
                    
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            style={{ width:'100%', resizeMode: 'cover', aspectRatio: 1 }}
                            source={{ uri: item.imageUri }}
                        />
                        <Text style={{shadowOpacity:1, textShadowColor:'black',textShadowRadius:10,  fontSize:50, color:'white', fontWeight:'bold', position: 'absolute', top: 200, bottom: 0}}>
                            {item.event_name}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Text style={{padding:20, marginTop: -50}}>
                            {item.event_content.split('\n').map((content, index) => {
                                content = content.trim();
                                if (content.trim().startsWith('//') && content.trim().endsWith('//')) {
                                    return (
                                        <Text key={index} style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 22}}>
                                            {content.replace(/\/\//g, '\n\n')}
                                        </Text>
                                    );
                                } else if (content.trim().startsWith('/') && content.trim().endsWith('/')) {
                                    return (
                                        <Text key={index} style={{ fontWeight: 'bold', fontSize: 18 }}>
                                            {content.replace(/\//g, '\n')}
                                        </Text>
                                    );
                                } else {
                                    return <Text key={index}>{'\n'}{renderTextWithLinks(content, index)}{'\n'}</Text>;
                                }
                            })}
                        </Text>
                    </View>
                    
                
                    {/* Konuşmacılar */}
                    <Text style={{height:2, backgroundColor:'black', width:'100%', marginBottom:30, marginTop:-70}}/>
                    
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 35, marginBottom: 10 }}>
                            Konuşmacılar
                        </Text>
                        {item.konusmacilar.map((konuşmacı, index) => (
                            <View key={index} style={{ alignItems: 'center', padding:20 }}>
                                <Image
                                    source={{ uri: konuşmacı.link }}
                                    style={{ width: 100, height: 100, borderRadius: 50 }}
                                />
                                <Text style={{ fontWeight: 'bold', marginTop: 10 }}>{konuşmacı.name}</Text>
                                <Text style={{textAlign:'center'}}>{konuşmacı.info}</Text>
                            </View>
                        ))}
                    </View>


                
                    {/* SSS */}
                    <Text style={{height:2, backgroundColor:'black', width:'100%', marginBottom:-20}}/>

                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Text style={{ padding: 20, marginTop: -50 }}>
                            {item.sss.split('\n').map((content, index) => {
                                console.log(index)
                                content = content.trim();
                                if (content.trim().endsWith('?')) {
                                    return (
                                        <Text key={index} style={{ fontWeight: 'bold', textAlign: 'left', fontSize: 22 }}>
                                            {'\n'}
                                            {'\n'}
                                            {content}
                                            {'\n'}
                                        </Text>
                                    );
                                } else {
                                    return <Text key={index}>{'\n'}{content}</Text>;
                                }
                            })}
                        </Text>
                    </View>

                    {/* Apply Program  */}
                    <View style={{ width: "100%", alignItems:'center'}}>
                        <Text style={{height:2, backgroundColor:'black', width:'100%', marginBottom:20}}/>
                        <Text style={{fontSize:25, fontWeight:'bold'}}>
                            Programa kayıt olabilmek icin!
                        </Text>
                        <TouchableOpacity>
                            <Text style={{fontSize:25, backgroundColor:'black', color: 'white', padding: 20, borderRadius: 10, marginTop: 20, marginBottom: 20, width: '80%', shadowOpacity:0.4 }}>
                                Kayıt Ol
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Harita */}
                    <Text style={{height:2, backgroundColor:'black', width:'100%', marginTop:30}}/>
                    <View style={{ width: "100%", height: 500 }}>
                        <Text style={{ fontSize: 30, textAlign: 'center', fontWeight: 'bold', marginTop: 30, marginBottom: 30 }}>
                            Etkinlik Alanına Gitmek İçin
                        </Text>
                        <MapView
                            style={{ width: "100%", height: "80%" }}
                            initialRegion={{
                                latitude: item.konum.latitude,
                                longitude: item.konum.longitude,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                            onPress={() => setMapModalVisible(!mapModalVisible)}
                        >
                            <Marker
                                title={item.event_name}
                                coordinate={{ latitude: item.konum.latitude, longitude: item.konum.longitude }}
                                calloutVisible={true}
                            />
                        </MapView>
                        <Modal visible={mapModalVisible}>
                            <View style={{ flex: 1 }}>
                                <MapView
                                    style={{ flex: 1 }}
                                    initialRegion={{
                                        latitude: item.konum.latitude,
                                        longitude: item.konum.longitude,
                                        latitudeDelta: 0.01,
                                        longitudeDelta: 0.01,
                                    }}
                                >
                                    <Marker
                                        title={item.event_name}
                                        coordinate={{ latitude: item.konum.latitude, longitude: item.konum.longitude }}
                                    />
                                </MapView>
                                <TouchableOpacity 
                                    onPress={() => setMapModalVisible(!mapModalVisible)} 
                                    style={{ 
                                        position: 'absolute', 
                                        top: Platform.OS === 'ios' ? 50 : 20, // Platforma göre stil belirleme
                                        left: Platform.OS === 'ios' ? 10 : 5,
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Ionicons name="chevron-back-sharp" color={Platform.OS === 'ios' ? 'white' : 'black'} style={{ fontSize: 40, shadowOpacity:1  }} />
                                        <Text style={{ color: Platform.OS === 'ios' ? 'white' : 'black', fontWeight: 'bold', fontSize: 25, shadowOpacity:1  }}>{"Back"}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>

                    


                </View>
            
            ))}
        </ScrollView>
    );
}
