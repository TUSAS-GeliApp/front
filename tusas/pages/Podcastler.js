import { useState } from "react";
import { Image, Linking , Modal, TouchableWithoutFeedback, ScrollView, Text, TextInput, View, TouchableOpacity, Switch, Alert } from "react-native";
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import { FlatList } from "react-native-gesture-handler";

export default function Podcastler({navigation}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchResults, setSearchResults] = useState([]);


    const dataForPodcast = {
        podcast: [
            { id: 1, artist_name: "John Doe", Image: {uri: "https://t4.ftcdn.net/jpg/04/15/31/79/240_F_415317980_or3t3loJGxdXQrSvybkF995wx6YIrHVV.jpg"}, title: "Geleceğe Yolculuk: Yapay Zeka ve İnsanlık", content: "Teknolojinin geleceği ve yapay zeka konusundaki gelişmeleri tartışıyoruz.", link:"https://pod.link/"},
            { id: 2, artist_name: "Jane Smith", Image: {uri: "https://images.unsplash.com/photo-1579762593217-46655e4e7efc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXJ0d29ya3xlbnwwfDB8MHx8fDI%3D"}, title: "Kültür ve Teknoloji: Sanatın Dijital Dönüşümü", content: "Sanatın teknolojiyle birleştiği ve yeni medya sanatının doğuşunu inceliyoruz.", link:"https://pod.link/"},
            { id: 3, artist_name: "Michael Johnson", Image: {uri: "https://images.unsplash.com/photo-1516061603506-fd4dc1932278?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXJ0d29ya3xlbnwwfDB8MHx8fDI%3D"}, title: "Gezegenimiz ve Gelecek: Sürdürülebilirlik ve Çevre", content: "Dünya'nın geleceği ve sürdürülebilirlik üzerine uzman görüşlerini dinliyoruz.", link:"https://pod.link/"},
            { id: 4, artist_name: "Emily Williams", Image: {uri: "https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFyc3xlbnwwfDB8MHx8fDI%3D"}, title: "Uzayın Sırları: Mars ve Uzay Keşifleri", content: "Uzay araştırmaları ve Mars'a insanlı misyonların geleceği hakkında konuşuyoruz.", link:"https://pod.link/"},
            { id: 5, artist_name: "David Brown", Image: {uri: "https://images.unsplash.com/photo-1565096940104-99125291fdd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFydHdvcmt8ZW58MHwwfDB8fHwy"}, title: "Yeni Nesil Eğitim: Teknolojinin Sınırlarını Zorlamak", content: "Eğitimde teknolojinin rolü ve gelecekteki eğitim modellerini ele alıyoruz.", link:"https://pod.link/"},
            { id: 6, artist_name: "Sophia Lee", Image: {uri: "https://images.unsplash.com/photo-1579009420909-b837eefa4274?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFydHdvcmt8ZW58MHwwfDB8fHwy"}, title: "Dijital Dönüşüm ve İş Dünyası: Geleceğin İş Modelleri", content: "Dijitalleşme ve iş dünyasında gelecekte nasıl değişiklikler olacağını inceliyoruz.", link:"https://pod.link/"},
            { id: 7, artist_name: "William Taylor", Image: {uri: "https://images.unsplash.com/photo-1581592717583-7e2efef84615?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFydHdvcmt8ZW58MHwwfDB8fHwy"}, title: "Sağlıkta Teknoloji: Biyoteknoloji ve Tıbbın Geleceği", content: "Sağlık sektöründe teknolojinin etkilerini ve biyoteknoloji alanındaki yenilikleri tartışıyoruz.", link:"https://pod.link/"},
            { id: 8, artist_name: "Olivia Anderson", Image: {uri: "https://images.unsplash.com/photo-1614519679749-3189ec5687d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFydHdvcmt8ZW58MHwwfDB8fHwy"}, title: "Geleceğin Trendleri: Teknolojinin Yükselen Yıldızları", content: "Teknoloji dünyasında geleceğin trendlerini ve yeni teknolojileri inceliyoruz.", link:"https://pod.link/"},        
            { id: 9, artist_name: "Ethan Johnson", Image: {uri: "https://t4.ftcdn.net/jpg/03/41/36/63/240_F_341366381_hxaCwOCwbzgNDWHOilxb31k1Or5GxFjU.jpg"}, title: "Dijital Dönüşüm: İşletmeler İçin Yol Haritası", content: "İşletmelerin dijital dönüşüm sürecini ele alıyoruz.", link:"https://pod.link/"},
            { id: 10, artist_name: "Emma Wilson", Image: {uri: "https://t4.ftcdn.net/jpg/03/81/14/37/240_F_381143721_OCzIVKR1FJp4CzdUbThsmFVm8PsT6UWK.jpg"}, title: "Yapay Zeka ve İş Dünyası: Geleceğin İş Modelleri", content: "Yapay zeka teknolojisinin iş dünyasında kullanımı üzerine tartışıyoruz.", link:"https://pod.link/"},
            { id: 11, artist_name: "Aiden Brown", Image: {uri: "https://t3.ftcdn.net/jpg/03/26/10/14/240_F_326101400_VAbucqJzm2jnOtsiofjwk3y5iy7t40MQ.jpg"}, title: "E-ticarette Gelecek: Yeni Trendler ve Fırsatlar", content: "E-ticaret dünyasının gelecekteki gelişmelerini inceliyoruz.", link:"https://pod.link/"},
            { id: 12, artist_name: "Olivia Smith", Image: {uri: "https://t3.ftcdn.net/jpg/03/61/43/82/240_F_361438229_kl64iVeH7pH5HaPT0BLsJbgaU60acB5C.jpg"}, title: "Veri Güvenliği ve Gizlilik: Dijital Varlıkları Koruma Stratejileri", content: "Veri güvenliği ve gizliliğinin önemi ve koruma stratejilerini ele alıyoruz.", link:"https://pod.link/"},
            { id: 13, artist_name: "Lucas Johnson", Image: {uri: "https://t3.ftcdn.net/jpg/03/61/71/38/240_F_361713848_YfwOhSTZsfeXwJcAzamhCUjuWeYCPyhn.jpg"}, title: "Geleceğin Ulaşım Sistemleri: Otonom Araçlar ve Hızlı Trenler", content: "Ulaşım sektöründe gelecekte beklenen gelişmeleri inceliyoruz.", link:"https://pod.link/"},
            { id: 14, artist_name: "Sophia Davis", Image: {uri: "https://t3.ftcdn.net/jpg/03/61/94/16/240_F_361941612_ukrRW26gem0NJhShvmubNBT2M9R31col.jpg"}, title: "Blockchain Teknolojisi ve Finans: Dijital Paranın Geleceği", content: "Blockchain teknolojisinin finans dünyasındaki etkilerini tartışıyoruz.", link:"https://pod.link/"},
            { id: 15, artist_name: "William Wilson", Image: {uri: "https://images.unsplash.com/photo-1590622974113-66a9160acf20?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXJ0d29ya3xlbnwwfDB8MHx8fDI%3D"}, title: "Yeni Nesil Mobil Uygulamalar: Geleceğin Mobil Teknolojileri", content: "Mobil uygulama geliştirme alanında gelecekteki trendleri inceliyoruz.", link:"https://pod.link/"},        
        ] 
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const results = dataForPodcast.podcast.filter(item => {
            return item.title.toLowerCase().includes(query.toLowerCase());
        });
        setSearchResults(results);
    };
    const handleLinkPress = (link) => {
        Linking.openURL(link);
    };
    return(

        <View style={{flex:1}}>            
            <View style={{backgroundColor: 'white',}}>
                <ScrollView style={{height:'100%'}}>
                    <Searchbar
                        placeholder="Search"
                        onChangeText={handleSearch}
                        value={searchQuery}
                        style={{margin:20, backgroundColor:'#rgb(246, 246, 246)', fontFamily:"Times New Roman"}}
                    />
                    {searchResults.length === 0 && searchQuery !== '' && (
                        <Text style={{ paddingVertical: 40, textAlign: 'center', fontSize: 20, fontWeight:'bold' }}>
                            No results found
                        </Text>
                    )}


                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}>
                        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10 , padding:5}}>
                                <TouchableWithoutFeedback>
                                    <View style={{width: '100%',
                                                    height: '80%', 
                                                    backgroundColor: 'white',
                                                    borderRadius: 20,
                                                    padding: 20,
                                                    alignItems: 'center',
                                                    shadowColor: '#000',
                                                    shadowOpacity: 100,
                                                    shadowRadius: 100}}>
                                        {selectedItem && (
                                            <ScrollView style={{ marginTop:50}}>
                                                <View onStartShouldSetResponder={() => true}>
                                                    <Image
                                                        style={{
                                                            width: '100%',
                                                            height: 200,
                                                            marginBottom: 10,
                                                        }}
                                                        source={selectedItem.Image}
                                                    />
                                                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>{selectedItem.title}</Text>
                                                    <Text style={{ fontStyle: 'italic', marginBottom: 30 }}>{selectedItem.artist_name}</Text>
                                                    <Text>{selectedItem.content}</Text>
                                                    <TouchableOpacity onPress={() => handleLinkPress(selectedItem.link)}>
                                                        <Text style={{marginTop:15, color: 'red', textDecorationLine: 'underline' }}>Dinlemek için</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </ScrollView>
                                        )}
                                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ position: 'absolute', top: 10, left: 10, padding: 10}}>
                                            <View style={{flexDirection:'row', alignContent:'center'}}>
                                                <Ionicons name="chevron-back-sharp" color="#rgb(237, 52, 53)" style={{ fontSize: 20 }} />
                                                <Text style={{ color: '#rgb(237, 52, 53)', fontWeight: 'bold', fontSize: 15 }}>{"Back"}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>


                    <FlatList
                        data={searchResults.length === 0 ? dataForPodcast.podcast : searchResults}
                        style={{ flex: 1, width: "100%", marginHorizontal: 20 }} // marginVertical ve height değerlerini kaldırdık
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <View style={{ marginVertical: 20 }}>                                                         
                                <TouchableOpacity onPress={() => {setModalVisible(true), setSelectedItem(item)}} >
                                    <Image
                                        style={{ width: '90%', height: 200 }} 
                                        source={item.Image}
                                    />
                                </TouchableOpacity>
                                <Text style={{width: '90%', marginVertical:10,fontWeight:'bold'}}>
                                    {item.title}
                                </Text>
                            </View>
                        )}
                        keyExtractor={item => item.id.toString()}
                        />

                    
                </ScrollView>
            </View>   
                     
        </View>

    )

}