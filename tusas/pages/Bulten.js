import { useState } from "react";
import { Image, Button, Modal, TouchableWithoutFeedback, ScrollView, Text, TextInput, View, TouchableOpacity, Switch, Alert } from "react-native";
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import { FlatList } from "react-native-gesture-handler";

export default function Bulten({navigation}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    const dataForBulten = {
        Bulten: [
            { id: 1, author_name: "Alice Johnson", title: "Yeni Uzay Keşfi", content: "Bilim adamları, yeni bir gezegen keşfettiklerini açıkladı. Keşfedilen gezegen, Dünya'ya oldukça benzer özelliklere sahip ve yaşamın var olabileceği koşullara sahip olabilir. Araştırmacılar, bu keşfin uzay keşifleri için önemli bir adım olduğunu belirtiyor." },
            { id: 2, author_name: "David Smith", title: "Yapay Zeka ve İnsanlık", content: "Yapay zeka teknolojisinin gelişimi, insanlık için yeni fırsatlar ve zorluklar ortaya çıkarıyor. Yapay zeka uzmanları, bu teknolojinin etik ve güvenlik konularını ele alarak, insanlığın geleceğini şekillendirecek kararlar almak üzerine çalışıyorlar." },
            { id: 3, author_name: "Emma Wilson", title: "İklim Değişikliği ve Acil Eylem Çağrısı", content: "İklim bilimciler, dünya genelindeki hızlı iklim değişikliğiyle başa çıkmak için acil eylem çağrısında bulunuyorlar. Artan sıcaklık, deniz seviyesinde yükselme ve ekstrem hava olayları gibi etkiler, iklim değişikliğinin ciddiyetini vurguluyor." },
            { id: 4, author_name: "Oliver Brown", title: "Yeni Teknoloji Trendleri", content: "Teknoloji dünyasında sürekli olarak yeni trendler ortaya çıkıyor. Yapay zeka, blockchain, nesnelerin interneti ve diğer birçok alan, gelecekteki teknoloji gelişmelerinin odak noktaları haline geliyor. Bu yeni teknoloji trendleri, iş dünyası ve tüketici yaşamı üzerinde önemli etkilere sahip olabilir." },
            { id: 5, author_name: "Sophia Davis", title: "Dijital Dönüşüm ve İş Dünyası", content: "Dijital teknolojilerin iş dünyasındaki yükselişi, iş süreçlerini ve iş modellerini değiştiriyor. Yeni dijital araçlar ve platformlar, şirketlerin verimliliğini artırırken, rekabet ortamını da değiştiriyor. İşletmeler, bu dijital dönüşüm sürecine ayak uydurmak ve rekabet avantajı sağlamak için çaba harcıyorlar." },
            { id: 6, author_name: "James Wilson", title: "Sağlıkta Teknoloji İnovasyonları", content: "Sağlık sektörü, teknoloji inovasyonları sayesinde büyük dönüşümler yaşıyor. Yapay zeka destekli teşhis sistemleri, telemedicine uygulamaları ve dijital sağlık kayıtları gibi yeni teknolojiler, hasta bakımını ve sağlık hizmetlerini iyileştirmek için kullanılıyor. Bu teknolojik yenilikler, sağlık endüstrisinin geleceğini şekillendiriyor." },
            { id: 7, author_name: "Ella Martinez", title: "Eğitimde Dijital Dönüşüm", content: "Eğitim sektörü, dijital teknolojilerin kullanımıyla büyük bir dönüşüm yaşıyor. Eğitim materyallerinin dijitalleştirilmesi, uzaktan eğitim platformlarının geliştirilmesi ve interaktif öğrenme araçlarının kullanılması, öğrencilere daha etkili ve kişiselleştirilmiş bir öğrenme deneyimi sunmayı amaçlıyor. Bu dijital dönüşüm, geleceğin eğitimini şekillendiriyor." },
            { id: 8, author_name: "Olivia Anderson", title: "Yeni Yüzyılda Sanat ve Kültür", content: "Sanat ve kültür, dijital çağın getirdiği yeniliklerle yeni bir dönüşüm yaşıyor. Sanatçılar ve kültür kurumları, dijital medyanın ve teknolojinin gücünü kullanarak eserlerini daha geniş bir kitleye ulaştırmayı hedefliyorlar. Sanat ve kültürün dijitalleşmesi, yeni yüzyılda sanatın ve kültürün nasıl algılandığını ve deneyimlendiğini değiştiriyor." },
            { id: 9, author_name: "Daniel Brown", title: "Yeni Uygulama Lansmanı", content: "Bir grup girişimci, yeni bir mobil uygulamanın lansmanını duyurdu. Bu uygulama, kullanıcıların günlük yaşamlarını kolaylaştırmak ve eğlenceli bir deneyim sunmak için tasarlanmıştır. Uygulamanın beta sürümü, kullanıcıların geri bildirimlerini almak ve iyileştirmeler yapmak amacıyla yayınlandı." },
            { id: 10, author_name: "Sophie Clark", title: "Yenilenebilir Enerji Projeleri", content: "Yenilenebilir enerji projeleri, dünya genelinde giderek artan bir ilgi görüyor. Rüzgar enerjisi, güneş enerjisi ve hidroelektrik gibi yenilenebilir kaynaklar, fosil yakıtlara olan bağımlılığı azaltmak ve iklim değişikliğiyle mücadele etmek için potansiyel bir çözüm olarak görülüyor. Yenilenebilir enerji teknolojileri, enerji sektöründe önemli değişikliklere yol açıyor." },
            { id: 11, author_name: "Emma White", title: "Blockchain Teknolojisi ve Finans", content: "Blockchain teknolojisi, finans sektöründe büyük bir etki yaratıyor. Bu dağıtılmış defter teknolojisi, güvenilir ve şeffaf finansal işlemlerin gerçekleştirilmesine olanak tanıyor. Bankalar, ödeme hizmetleri ve diğer finansal kurumlar, blockchain'in potansiyelinden yararlanarak hizmetlerini iyileştiriyor ve maliyetleri azaltıyor." },
            { id: 12, author_name: "Jack Smith", title: "Yapay Zeka ve Otomasyon", content: "Yapay zeka ve otomasyon teknolojileri, endüstriyel ve iş süreçlerinde büyük bir dönüşüm yaratıyor. Otomasyon sistemleri, tekrarlayan görevleri otomatikleştirerek iş verimliliğini artırıyor ve insan kaynaklarını daha stratejik görevlere yönlendiriyor. Yapay zeka, veri analizi, tahminleme ve karar alma süreçlerinde insanların yeteneklerini artırıyor." },
            { id: 13, author_name: "Oliver Johnson", title: "Uzay Araştırmalarında Yeni Keşifler", content: "Uzay araştırmaları, evrenin sınırlarını keşfetmeye devam ediyor. Yeni uzay teleskopları ve keşif araçları, uzayda yeni yıldızlar, galaksiler ve gezegenlerin keşfedilmesine olanak sağlıyor. Uzay keşifleri, insanlığın evrende daha derinlemesine bir anlayış kazanmasına yardımcı oluyor." },
            { id: 14, author_name: "Sophia Taylor", title: "Büyük Veri ve Veri Bilimi", content: "Büyük veri ve veri bilimi, işletmelerin ve kurumların veri tabanlı kararlar almasına olanak tanıyan önemli bir alan haline geldi. Veri analitiği ve makine öğrenimi algoritmaları, büyük veri kümelerinden anlamlı bilgiler çıkarmak için kullanılıyor. Büyük veri teknolojileri, pazarlama, finans, sağlık ve diğer birçok sektörde kullanılarak rekabet avantajı sağlıyor." },
            { id: 15, author_name: "Emily Brown", title: "Yeni Teknoloji Ürünlerinin Lansmanı", content: "Teknoloji şirketleri, yeni ürünlerin ve hizmetlerin lansmanını duyuruyor. Yenilikçi akıllı telefonlar, giyilebilir teknolojiler, akıllı ev cihazları ve diğer birçok ürün, tüketicilere yeni deneyimler sunmak için tasarlanmıştır. Lansman etkinlikleri, kullanıcıların yeni teknolojileri deneyimlemelerini ve şirketlerin ürünlerini tanıtmalarını sağlar. Ut incididunt ea dolore nisi qui. Eu sunt laboris consectetur adipisicing reprehenderit incididunt anim.\n Sit dolore nostrud ad aliqua voluptate. Duis ipsum in voluptate veniam ex ea excepteur nulla excepteur occaecat.Pariatur laborum pariatur mollit pariatur ut proident. Sit est aute excepteur aliqua nulla dolor cillum. Laborum Lorem mollit pariatur in minim velit consequat labore.\n Tempor qui aute excepteur commodo dolore amet culpa ex eu sint officia nulla fugiat Lorem. Lorem sint elit labore non occaecat anim amet eiusmod duis velit cupidatat. Duis id minim ex dolor proident excepteur ipsum est laboris nisi consectetur id consequat tempor.Enim non consequat ad qui dolore Lorem amet aliquip cillum. Ut nulla tempor deserunt cillum eiusmod in excepteur. Laboris pariatur consectetur ad sit minim pariatur ea est sit pariatur mollit commodo. Velit ea velit voluptate sint quis occaecat fugiat.\n Cupidatat id do Lorem sunt.Sit ea eiusmod dolor ipsum id aliqua. Est id tempor laboris laboris consequat culpa sint ad cillum occaecat commodo Lorem. Nulla sunt amet elit labore nostrud velit reprehenderit non duis. Ea cupidatat non nulla nulla sint anim.Et est fugiat eiusmod in sit quis magna. Cupidatat tempor officia consectetur laboris non nostrud amet elit est mollit adipisicing. Mollit aliqua anim enim id velit aute enim in officia. Consectetur proident quis anim qui eiusmod reprehenderit minim qui fugiat ut est deserunt. Voluptate est officia minim eiusmod aliqua pariatur ut nisi incididunt Lorem fugiat pariatur. Deserunt minim do fugiat ad dolor do eiusmod.Ex qui laboris pariatur do. Eiusmod minim ex tempor commodo ad non culpa magna cillum velit sint. Adipisicing ex sint minim nisi id officia laboris nostrud dolor consectetur. Consequat sunt incididunt laborum do consectetur occaecat sint deserunt sint incididunt sunt ullamco. Qui aute dolore et in incididunt amet nulla elit excepteur Lorem eu fugiat. Cupidatat esse adipisicing id Lorem adipisicing adipisicing incididunt. Sunt deserunt irure officia quis ex reprehenderit." },
        ]
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const results = dataForBulten.Bulten.filter(item => {
            return item.title.toLowerCase().includes(query.toLowerCase());
        });
        setSearchResults(results);
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
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10, padding:5}}>
                                <TouchableWithoutFeedback>
                                
                                    <View style={{ width: '100%',
                                                    height: '80%', 
                                                    backgroundColor: 'white',
                                                    borderRadius: 20,
                                                    padding: 20,
                                                    alignItems: 'center',
                                                    shadowColor: '#000',
                                                    shadowOpacity: 100,
                                                    shadowRadius: 100}}>
                                        {selectedItem && (
                                            
                                                <ScrollView style={{marginTop:50}}>
                                                    <View onStartShouldSetResponder={() => true}>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>{selectedItem.title}</Text>
                                                        <Text style={{ fontStyle: 'italic', marginBottom: 30 }}>{selectedItem.author_name}</Text>
                                                        <Text style={{}}>{selectedItem.content}</Text>
                                                    </View>
                                                </ScrollView>
                                            
                                        )}
                                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ position: 'absolute', top: 10, left: 10, padding: 10}}>
                                            <Text style={{ color: 'blue' }}>Close</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableWithoutFeedback>

                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>

                    <FlatList
                        data={searchResults.length === 0 ? dataForBulten.Bulten : searchResults}
                        style={{ marginHorizontal: 20 }}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => { setSelectedItem(item); setModalVisible(true); }}>
                                <View style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}>
                                    <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                                    <Text>{item.author_name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                    
                </ScrollView>
            </View>   
                     
        </View>

    )
}