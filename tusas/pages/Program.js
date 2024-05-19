import React, { useState } from "react";
import { Image, Linking, Modal, ScrollView, Text, TouchableOpacity, View, Platform, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { Searchbar } from 'react-native-paper';

export default function Program({ navigation }) {
    const [mapModalVisible, setMapModalVisible] = useState(false);
    const [katilimciModalVisible, setKatilimciModalVisible] = useState(false);

    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isContactDetailsVisible, setIsContactDetailsVisible] = useState({});
  


    const dataForProgram = {
        Program: [
            {   
                id: 1,
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
                konusmacilar: [{id: 1, name:'Selçuk Bayraktar', info:'TEKNOFEST Yönetim Kurulu Başkanı & T3 Vakfı Mütevelli Heyeti Başkanı', link:"https://cdn.takeoffistanbul.com/media/upload/userFormUpload/q4ovXBdrKmevSvv7kNmsf2CLjTYT6pny.jpg"},
                                {id: 2, name:'Mehmet Fatih Kacır', info:'T.C. Sanayi ve Teknoloji Bakanı & TEKNOFEST İcra Kurulu Başkanı', link:"https://cdn.takeoffistanbul.com/media/upload/userFormUpload/7XHGeNcSzyqHoLI1q97vf94nPE4Jlnyh.jpg"},
                                {id: 3, name:'Prof. Dr. Hakan Karakaş', info:'Vice President, Republic of Türkiye of Presidency of Defence Industries', link:"https://cdn.takeoffistanbul.com/media/upload/userFormUpload/oSoVX581JRORcaTlEFUjqPsKiCOmgDZW.png"},
                                {id: 4, name:'Sheikh Mansoor Bin Khalifa Al-Thani', info:'Chairman of MBK Holding', link:"https://cdn.takeoffistanbul.com/media/upload/userFormUpload/86VtkHC4QIRGWTrq9eklCW0wezjITrMh.png"},
                                {id: 5, name:'Prof. Dr. Mirco Kovac', info:'Founder and Director, Laboratory of Sustainability Robotics - EMPA', link:"https://cdn.takeoffistanbul.com/media/upload/userFormUpload/mg2KJ4lDxTeo1QY2b0I5Wb9k8I2ilfvS.jpg"},
                                {id: 6, name:'Jean-Yves Le Gall', info:'Former President, International Astronomical Federation', link:"https://cdn.takeoffistanbul.com/media/upload/userFormUpload/Rj8FfZCczbQPvfPgq4JBpyA2wb5DoFMl.jpg"},
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
                `,
                katilimcilar:  [{ id: 1, name: 'Selçuk Bayraktar', info: 'TEKNOFEST Yönetim Kurulu Başkanı & T3 Vakfı Mütevelli Heyeti Başkanı', pp_link: "https://cdn.takeoffistanbul.com/media/upload/userFormUpload/q4ovXBdrKmevSvv7kNmsf2CLjTYT6pny.jpg" },
                                { id: 2, name: 'Mehmet Fatih Kacır', info: 'T.C. Sanayi ve Teknoloji Bakanı & TEKNOFEST İcra Kurulu Başkanı', pp_link: "https://cdn.takeoffistanbul.com/media/upload/userFormUpload/7XHGeNcSzyqHoLI1q97vf94nPE4Jlnyh.jpg" },
                                { id: 3, name: 'Hakan Karakaş', info: 'Vice President, Republic of Türkiye of Presidency of Defence Industries', pp_link: "https://cdn.takeoffistanbul.com/media/upload/userFormUpload/oSoVX581JRORcaTlEFUjqPsKiCOmgDZW.png" },
                                { id: 4, name: 'Sheikh Mansoor Bin Khalifa Al-Thani', info: 'Chairman of MBK Holding', pp_link: "https://cdn.takeoffistanbul.com/media/upload/userFormUpload/86VtkHC4QIRGWTrq9eklCW0wezjITrMh.png" },
                                { id: 5, name: 'Mirco Kovac', info: 'Founder and Director, Laboratory of Sustainability Robotics - EMPA', pp_link: "https://cdn.takeoffistanbul.com/media/upload/userFormUpload/mg2KJ4lDxTeo1QY2b0I5Wb9k8I2ilfvS.jpg" },
                                { id: 6, name: 'Jean-Yves Le Gall', info: 'Former President, International Astronomical Federation', pp_link: "https://cdn.takeoffistanbul.com/media/upload/userFormUpload/Rj8FfZCczbQPvfPgq4JBpyA2wb5DoFMl.jpg" },
                                { id: 7, name: 'John Doe', info: 'CEO of Tech Innovators', pp_link: "" },
                                { id: 8, name: 'Jane Smith', info: 'CTO of Future Solutions', pp_link: "" },
                                { id: 9, name: 'Albert Johnson', info: 'Lead Engineer at AI Labs', pp_link: "" },
                                { id: 10, name: 'Emily Davis', info: 'Head of Marketing at Creative Ventures', pp_link: "" },
                                { id: 11, name: 'Michael Brown', info: 'Senior Data Scientist at Big Data Inc.', pp_link: "" },
                                { id: 12, name: 'Sarah Wilson', info: 'Product Manager at Tech Solutions', pp_link: "" },
                                { id: 13, name: 'David Clark', info: 'Founder & CEO of Startup Hub', pp_link: "" },
                                { id: 14, name: 'Laura Martinez', info: 'Research Scientist at BioTech Labs', pp_link: "" },
                                { id: 15, name: 'James Anderson', info: 'Chief Financial Officer at FinTech Corp', pp_link: "" },
                                { id: 16, name: 'Alice Thompson', info: 'Lead Designer at Creative Studios', pp_link: "" },
                                { id: 17, name: 'Robert Lee', info: 'AI Specialist at Tech Minds', pp_link: "" },
                                { id: 18, name: 'Olivia Garcia', info: 'Director of Engineering at Innovative Solutions', pp_link: "" },
                                { id: 19, name: 'William Martinez', info: 'Head of R&D at Bio Innovations', pp_link: "" },
                                { id: 20, name: 'Sophia Robinson', info: 'Marketing Director at Global Ventures', pp_link: "" },
                                { id: 21, name: 'Liam Clark', info: 'Founder of Startup Incubator', pp_link: "" },
                                { id: 22, name: 'Emma Lewis', info: 'Senior Developer at Code Masters', pp_link: "" },
                                { id: 23, name: 'Noah Walker', info: 'Product Designer at Creative Labs', pp_link: "" },
                                { id: 24, name: 'Ava Hall', info: 'CTO at Innovative Tech', pp_link: "" },
                                { id: 25, name: 'Mason Allen', info: 'CEO at Tech Pioneers', pp_link: "" },
                                { id: 26, name: 'Isabella Young', info: 'Lead Scientist at Bio Research', pp_link: "" },
                                { id: 27, name: 'Lucas King', info: 'Head of Development at NextGen Solutions', pp_link: "" },
                                { id: 28, name: 'Mia Wright', info: 'Project Manager at Future Innovators', pp_link: "" },
                                { id: 29, name: 'Ethan Scott', info: 'Data Analyst at Analytics Pro', pp_link: "" },
                                { id: 30, name: 'Amelia Harris', info: 'UX Designer at DesignWorks', pp_link: "" },
                                { id: 31, name: 'Henry Adams', info: 'Cybersecurity Expert at SecureTech', pp_link: "" },
                                { id: 32, name: 'Charlotte Nelson', info: 'Innovation Manager at TechFront', pp_link: "" },
                                { id: 33, name: 'Alexander Carter', info: 'Chief Scientist at Quantum Research', pp_link: "" },
                                { id: 34, name: 'Grace Mitchell', info: 'AI Researcher at Smart Innovations', pp_link: "" },
                                { id: 35, name: 'James Baker', info: 'CEO at Future Tech Labs', pp_link: "" }
                            
                            ],
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
    const handleSearch = (query) => {
        setSearchQuery(query);
        const results = dataForProgram.Program[0].katilimcilar.filter(katilimci =>
            katilimci.name.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(results);
    };

    const Listofkatilimcilar = searchQuery ? searchResults : dataForProgram.Program[0].katilimcilar;

    const getInitials = (name) => {
        const initials = name.split(' ').map(word => word[0]).join('').slice(0, 2);
        return initials;
    };

    const [isButtonGreenMap, setIsButtonGreenMap] = useState({});

    const handleAddContact = (itemId) => {
        setIsButtonGreenMap(prevMap => ({
            ...prevMap,
            [itemId]: !prevMap[itemId]
        }));
        // Add contact logic here
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
                                        <Text key={index} style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 22, textShadowRadius:2, textShadowColor:'#rgb(237, 52, 53)'}}>
                                            {content.replace(/\/\//g, '\n\n')}
                                        </Text>
                                    );
                                } else if (content.trim().startsWith('/') && content.trim().endsWith('/')) {
                                    return (
                                        <Text key={index} style={{ fontWeight: 'bold', fontSize: 18 , textShadowRadius:1, textShadowColor:'#rgb(237, 52, 53)'}}>
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
                        <Text style={{ fontWeight: 'bold', fontSize: 35, marginBottom: 10, textShadowRadius:2, textShadowColor:'rgb(41, 64, 153)' }}>
                            Konuşmacılar
                        </Text>
                        {item.konusmacilar.map((konuşmacı, index) => (
                            <View key={index} style={{ alignItems: 'center', padding:20 }}>
                                <Image
                                    source={{ uri: konuşmacı.link }}
                                    style={{ width: 100, height: 100, borderRadius: 50 }}
                                />
                                <Text style={{ fontWeight: 'bold', marginTop: 10, textShadowRadius:1, textShadowColor:'rgb(41, 64, 153)',fontSize:20 }}>{konuşmacı.name}</Text>
                                <Text style={{textAlign:'center'}}>{konuşmacı.info}</Text>
                            </View>
                        ))}
                    </View>


                
                    {/* SSS */}
                    <Text style={{height:2, backgroundColor:'black', width:'100%', marginBottom:-20}}/>

                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Text style={{ padding: 20, marginTop: -50 }}>
                            {item.sss.split('\n').map((content, index) => {
                                content = content.trim();
                                if (content.trim().endsWith('?')) {
                                    return (
                                        <Text key={index} style={{ fontWeight: 'bold', textAlign: 'left', fontSize: 22, textShadowRadius:2, textShadowColor:'#rgb(237, 52, 53)' }}>

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
                        <Text style={{fontSize:25, fontWeight:'bold', textShadowRadius:2, textShadowColor:'rgb(41, 64, 153)'}}>
                            Programa kayıt olabilmek için!
                        </Text>
                        <TouchableOpacity>
                            <Text style={{fontSize:25, backgroundColor:'black', color: 'white', padding: 20, borderRadius: 10, marginTop: 20, marginBottom: 20, width: '80%', shadowOpacity:0.4, textShadowRadius:2, textShadowColor:'#rgb(237, 52, 53)' }}>
                                Kayıt Ol
                            </Text>
                        </TouchableOpacity>
                    </View>

                    
                    {/* Harita */}
                    <Text style={{height:2, backgroundColor:'black', width:'100%', marginTop:30}}/>
                    <View style={{ width: "100%", height: 500 }}>
                        <Text style={{ fontSize: 30, textAlign: 'center', fontWeight: 'bold', marginTop: 30, marginBottom: 30 , textShadowRadius:2, textShadowColor:'#rgb(237, 52, 53)'}}>
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
                                    <View style={{ flexDirection: 'row', alignItems: 'center', shadowRadius:1, shadowColor:'black' }}>
                                        <Ionicons name="chevron-back-sharp" color={Platform.OS === 'ios' ? 'white' : 'black'} style={{ fontSize: 40, shadowOpacity:1  }} />
                                        <Text style={{ color: Platform.OS === 'ios' ? 'white' : 'black', fontWeight: 'bold', fontSize: 25, shadowOpacity:1  }}>{"Back"}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
                    
                    {/* Kayıt olanları gor  */}
                    <View style={{ width: "100%", alignItems:'center'}}>
                        <Text style={{height:2, backgroundColor:'black', width:'100%', marginBottom:20}}/>
                        <TouchableOpacity onPress ={() => setKatilimciModalVisible(!katilimciModalVisible)} >

                            <Text style={{fontSize:25, backgroundColor:'black', color: 'white', padding: 20, borderRadius: 10, marginTop: 20, marginBottom: 20, width: '80%', shadowOpacity:0.4, textShadowRadius:2, textShadowColor:'#rgb(237, 52, 53)' }}>
                                Katılımcılar
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Modal visible={katilimciModalVisible}>
                        
                            <View style={{ flex: 1, backgroundColor:'black' }}>
                                
                                
                                    <View style={{ flexDirection: 'row', alignItems: 'center', width:'100%',height: 50 }}>
                                        <TouchableOpacity 
                                        onPress={() => setKatilimciModalVisible(!katilimciModalVisible)} >
                                            <View style={{top: Platform.OS === 'ios' ? 50 : 20, flexDirection:'row', justifyContent:'flex-start', padding:10}}>
                                                <Ionicons name="chevron-back-sharp" color={Platform.OS === 'ios' ? 'white' : 'black'} style={{ fontSize: 30, marginLeft:10  }} />
                                                <Text style={{ color:'white', fontWeight:'bold', fontSize:20}}>Back</Text>
                                            </View>
                                            
                                        </TouchableOpacity>
                                    </View>
                                <Text style={{textAlign:'center',marginTop: 15, color:'white', fontWeight:'bold', fontSize:20}}>Katilimcilar</Text>
                                <Searchbar
                                        placeholder="Search"
                                        onChangeText={handleSearch}
                                        value={searchQuery}
                                        style={{ margin: 20, backgroundColor: 'grey', fontFamily: "Times New Roman" }}
                                    />
                                    
                                <View style={{alignItems:'center', paddingVertical:60, borderBottomColor:'white', borderWidth:0.3}}>
                                    <Text style={{color:'white', fontSize:25}}>{item.katilimcilar.length} kisi katildi</Text>
                                </View>
                                
                                
                                <ScrollView style={{ height: '100%' }}>
                                    {searchResults.length === 0 && searchQuery !== '' && (
                                        <Text style={{ paddingVertical: 40, textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                                        No results found
                                        </Text>
                                    )}
                                    {(searchQuery === '' ? item.katilimcilar : searchResults).map((katilimci, index) => (
                                        <View key={index}>
                                        {/* Katilimci görüntüsü */}
                                        <TouchableOpacity
                                            onPress={() => {
                                            setIsContactDetailsVisible({ ...isContactDetailsVisible, [katilimci.id]: !isContactDetailsVisible[katilimci.id] });
                                            }}
                                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, borderRadius: 10, margin: 10}}
                                        >
                                            {katilimci.pp_link ? (
                                            <Image
                                                source={{ uri: katilimci.pp_link }}
                                                style={{ width: 50, height: 50, borderRadius: 50 }}
                                            />
                                            ) : (
                                            <View style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                                                {getInitials(katilimci.name)}
                                                </Text>
                                            </View>
                                            )}
                                            <View style={{ marginLeft: 10, width: '70%' }}>
                                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{katilimci.name}</Text>
                                                <Text style={{ fontSize: 10, color: 'white' }}>{katilimci.info}</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => handleAddContact(katilimci.id)} >
                                                <Ionicons name="add-circle" size={30} color={isButtonGreenMap[katilimci.id] ? 'green' : 'red'} style={{ textShadowRadius: 5, textShadowColor: 'white' }} />
                                            </TouchableOpacity>
                                        </TouchableOpacity>
                                        {/* Detaylar */}
                                        {isContactDetailsVisible[katilimci.id] && (
                                            <View style={{ backgroundColor: 'lightgrey', padding: 10, margin: 10, borderRadius: 10 }}>
                                            <Text>{katilimci.name}</Text>
                                            <Text>{katilimci.name}</Text>
                                            <Text>{katilimci.name}</Text>
                                            </View>
                                        )}
                                        </View>
                                    ))}
                                    </ScrollView>


                               





                            </View>
                            
                    </Modal>
                </View>
            ))}
        </ScrollView>
    );
}
