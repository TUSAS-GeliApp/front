import { useState } from "react";
import { Image, ScrollView, Text, TextInput, View, TouchableOpacity, Alert, StatusBar } from "react-native";

import { FlatList } from "react-native-gesture-handler";

export default function Homepage({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);

    const dataForHome = {
        etkinlik: [
            { id: 1, Image: {uri:"https://t3.ftcdn.net/jpg/04/84/85/84/240_F_484858443_wpFksYdNsxWAwrC6BPwpWWykLSXAzqXd.jpg"}, title: "Title 1", link: "Link" },
            { id: 2, Image: {uri:"https://t3.ftcdn.net/jpg/00/82/74/62/240_F_82746282_flEBX6S1vhBkIHyejyyNbff9EY0KH1jn.jpg"}, title: "Title 2", link: "Link" },
            { id: 3, Image: {uri:"https://t4.ftcdn.net/jpg/03/26/97/57/240_F_326975708_6JUL0M5Wnt3ZTZNYQll2xNnxhE1tXmiU.jpg"}, title: "Title 3", link: "Link" },
            { id: 4, Image: {uri:"https://t4.ftcdn.net/jpg/02/55/21/99/240_F_255219981_ScLDMy1zREcezpEsFNEgqsyATXRaOxsh.jpg"}, title: "Title 4", link: "Link" },
            { id: 5, Image: {uri:"https://t3.ftcdn.net/jpg/03/27/06/78/240_F_327067821_LQKCB8HgD7wpo1a6eiKqN5b9aLtCi81u.jpg"}, title: "Title 5", link: "Link" },
        ],
        bulten: [
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
        ],
        podcastler: [
            { id: 1, artist_name: "John Doe", Image: {uri: "https://t4.ftcdn.net/jpg/04/15/31/79/240_F_415317980_or3t3loJGxdXQrSvybkF995wx6YIrHVV.jpg"}, title: "Geleceğe Yolculuk: Yapay Zeka ve İnsanlık", content: "Teknolojinin geleceği ve yapay zeka konusundaki gelişmeleri tartışıyoruz."},
            { id: 2, artist_name: "Jane Smith", Image: {uri: "https://images.unsplash.com/photo-1579762593217-46655e4e7efc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXJ0d29ya3xlbnwwfDB8MHx8fDI%3D"}, title: "Kültür ve Teknoloji: Sanatın Dijital Dönüşümü", content: "Sanatın teknolojiyle birleştiği ve yeni medya sanatının doğuşunu inceliyoruz."},
            { id: 3, artist_name: "Michael Johnson", Image: {uri: "https://images.unsplash.com/photo-1516061603506-fd4dc1932278?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXJ0d29ya3xlbnwwfDB8MHx8fDI%3D"}, title: "Gezegenimiz ve Gelecek: Sürdürülebilirlik ve Çevre", content: "Dünya'nın geleceği ve sürdürülebilirlik üzerine uzman görüşlerini dinliyoruz."},
            { id: 4, artist_name: "Emily Williams", Image: {uri: "https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFyc3xlbnwwfDB8MHx8fDI%3D"}, title: "Uzayın Sırları: Mars ve Uzay Keşifleri", content: "Uzay araştırmaları ve Mars'a insanlı misyonların geleceği hakkında konuşuyoruz."},
            { id: 5, artist_name: "David Brown", Image: {uri: "https://images.unsplash.com/photo-1565096940104-99125291fdd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFydHdvcmt8ZW58MHwwfDB8fHwy"}, title: "Yeni Nesil Eğitim: Teknolojinin Sınırlarını Zorlamak", content: "Eğitimde teknolojinin rolü ve gelecekteki eğitim modellerini ele alıyoruz."},
            { id: 6, artist_name: "Sophia Lee", Image: {uri: "https://images.unsplash.com/photo-1579009420909-b837eefa4274?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFydHdvcmt8ZW58MHwwfDB8fHwy"}, title: "Dijital Dönüşüm ve İş Dünyası: Geleceğin İş Modelleri", content: "Dijitalleşme ve iş dünyasında gelecekte nasıl değişiklikler olacağını inceliyoruz."},
            { id: 7, artist_name: "William Taylor", Image: {uri: "https://images.unsplash.com/photo-1581592717583-7e2efef84615?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFydHdvcmt8ZW58MHwwfDB8fHwy"}, title: "Sağlıkta Teknoloji: Biyoteknoloji ve Tıbbın Geleceği", content: "Sağlık sektöründe teknolojinin etkilerini ve biyoteknoloji alanındaki yenilikleri tartışıyoruz."},
            { id: 8, artist_name: "Olivia Anderson", Image: {uri: "https://images.unsplash.com/photo-1614519679749-3189ec5687d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFydHdvcmt8ZW58MHwwfDB8fHwy"}, title: "Geleceğin Trendleri: Teknolojinin Yükselen Yıldızları", content: "Teknoloji dünyasında geleceğin trendlerini ve yeni teknolojileri inceliyoruz."},        
            { id: 9, artist_name: "Ethan Johnson", Image: {uri: "https://t4.ftcdn.net/jpg/03/41/36/63/240_F_341366381_hxaCwOCwbzgNDWHOilxb31k1Or5GxFjU.jpg"}, title: "Dijital Dönüşüm: İşletmeler İçin Yol Haritası", content: "İşletmelerin dijital dönüşüm sürecini ele alıyoruz."},
            { id: 10, artist_name: "Emma Wilson", Image: {uri: "https://t4.ftcdn.net/jpg/03/81/14/37/240_F_381143721_OCzIVKR1FJp4CzdUbThsmFVm8PsT6UWK.jpg"}, title: "Yapay Zeka ve İş Dünyası: Geleceğin İş Modelleri", content: "Yapay zeka teknolojisinin iş dünyasında kullanımı üzerine tartışıyoruz."},
            { id: 11, artist_name: "Aiden Brown", Image: {uri: "https://t3.ftcdn.net/jpg/03/26/10/14/240_F_326101400_VAbucqJzm2jnOtsiofjwk3y5iy7t40MQ.jpg"}, title: "E-ticarette Gelecek: Yeni Trendler ve Fırsatlar", content: "E-ticaret dünyasının gelecekteki gelişmelerini inceliyoruz."},
            { id: 12, artist_name: "Olivia Smith", Image: {uri: "https://t3.ftcdn.net/jpg/03/61/43/82/240_F_361438229_kl64iVeH7pH5HaPT0BLsJbgaU60acB5C.jpg"}, title: "Veri Güvenliği ve Gizlilik: Dijital Varlıkları Koruma Stratejileri", content: "Veri güvenliği ve gizliliğinin önemi ve koruma stratejilerini ele alıyoruz."},
            { id: 13, artist_name: "Lucas Johnson", Image: {uri: "https://t3.ftcdn.net/jpg/03/61/71/38/240_F_361713848_YfwOhSTZsfeXwJcAzamhCUjuWeYCPyhn.jpg"}, title: "Geleceğin Ulaşım Sistemleri: Otonom Araçlar ve Hızlı Trenler", content: "Ulaşım sektöründe gelecekte beklenen gelişmeleri inceliyoruz."},
            { id: 14, artist_name: "Sophia Davis", Image: {uri: "https://t3.ftcdn.net/jpg/03/61/94/16/240_F_361941612_ukrRW26gem0NJhShvmubNBT2M9R31col.jpg"}, title: "Blockchain Teknolojisi ve Finans: Dijital Paranın Geleceği", content: "Blockchain teknolojisinin finans dünyasındaki etkilerini tartışıyoruz."},
            { id: 15, artist_name: "William Wilson", Image: {uri: "https://images.unsplash.com/photo-1590622974113-66a9160acf20?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXJ0d29ya3xlbnwwfDB8MHx8fDI%3D"}, title: "Yeni Nesil Mobil Uygulamalar: Geleceğin Mobil Teknolojileri", content: "Mobil uygulama geliştirme alanında gelecekteki trendleri inceliyoruz."},        
        ],
        videolar: [
            { id: 1, videoLink: "https://www.youtube.com/watch?v=HYdkSVDT-Vs",  title:"#GökVatan KAAN’ın kanatları altında! ✈️" },
            { id: 2, videoLink: "https://www.youtube.com/watch?v=t39EztQspyo",  title:"HÜRJET MANEVRA TESTLERİNE DEVAM EDİYOR!"  },
            { id: 3, videoLink: "https://www.youtube.com/watch?v=np4Wdk5G_fk",  title:"Hayallerimizle gökyüzünü boyuyoruz! 🎨🖐🏻✈️ #23Nisan"  },
            ] 
    };
    const extractVideoId = (videoLink) => {
        const matches = videoLink.match(/[?&]v=([^&]+)/);
        return matches ? matches[1] : null;
      };
    return(

        <View style={{flex:1}}>
            <StatusBar barStyle="auto"/>
            <View style={{backgroundColor: 'white',}}>
                <ScrollView style={{height:'100%'}}>
                    <View style={{backgroundColor:'white', padding:10}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between', marginVertical:20, marginHorizontal:10, alignItems:'center'}}>
                            <Text style={{fontSize:25, fontWeight:'700'}}>
                                Etkinlikler
                            </Text>
                            <TouchableOpacity style={{ }} onPress={() => navigation.navigate('Etkinlikler')} >
                                <Text style={{fontSize:13, color:'blue'}}>Daha fazla</Text>
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
                                    marginEnd: 25,
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
                        <View style={{flexDirection:'row',justifyContent:'space-between', marginVertical:20, marginHorizontal:10, alignItems:'center'}}>
                            <Text style={{fontSize:25, fontWeight:'700'}}>
                                Podcastler
                            </Text>
                            <TouchableOpacity style={{ }} onPress={() =>navigation.navigate('Podcastler')} >
                                <Text style={{fontSize:13, color:'blue'}}>Daha fazla</Text>
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
                                        marginBottom: 35,
                                        marginEnd: 25,
                                        justifyContent: 'center',
                                        alignItems: 'center'}}>
                                        <Image
                                            style={{ width: '100%',
                                                    height: '100%'}}
                                            source={item.Image }
                                        />
                                        <Text style={{marginTop:5}}>
                                            {item.title}
                                        </Text>
                                    </View>
                                )}
                                keyExtractor={item => item.id.toString()}
                            />
                        
                    </View>
                    <View style={{backgroundColor:'white',padding:10}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between', marginVertical:20, marginHorizontal:10, alignItems:'center', alignItems:'center'}}>
                            <Text style={{fontSize:25, fontWeight:'700'}}>
                                Bulten
                            </Text>
                            <TouchableOpacity style={{ }} onPress={() =>Alert.alert("daha fazla podast")} >
                                <Text style={{fontSize:13, color:'blue'}}>Daha fazla</Text>
                            </TouchableOpacity>
                        </View>
                        
                            <FlatList
                                horizontal
                                style={{padding:10}}
                                data={dataForHome.bulten}
                                renderItem={({ item }) => (
                                    <View style={{marginBottom: 15,
                                                    justifyContent: 'center',
                                                    alignItems: 'center'}}>
                                        <TouchableOpacity onPress={() => { }}>
                                            <View style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10,marginEnd:20 }}>
                                                <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                                                <Text>{item.author_name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                keyExtractor={item => item.id.toString()}
                            />
                    </View>
                    <View style={{backgroundColor:'white',padding:10}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between', marginVertical:20, marginHorizontal:10, alignItems:'center'}}>
                            <Text style={{fontSize:25, fontWeight:'700'}}>
                                Videolar
                            </Text>
                            <TouchableOpacity style={{ }} onPress={() =>Alert.alert("daha fazla podast")} >
                                <Text style={{fontSize:13, color:'blue'}}>Daha fazla</Text>
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
                                            <Image source={{ uri: `https://img.youtube.com/vi/${extractVideoId(item.videoLink)}/maxresdefault.jpg` }} style={{ width: "100%", height:"60%" }} /> 
                                       
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