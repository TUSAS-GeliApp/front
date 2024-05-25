--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin (
    admin_id integer NOT NULL,
    email character varying,
    password character varying,
    name character varying,
    surname character varying
);


ALTER TABLE public.admin OWNER TO postgres;

--
-- Name: admin_admin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.admin ALTER COLUMN admin_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.admin_admin_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: apply_event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.apply_event (
    event_id integer,
    user_id integer
);


ALTER TABLE public.apply_event OWNER TO postgres;

--
-- Name: apply_program; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.apply_program (
    program_id integer,
    user_id integer
);


ALTER TABLE public.apply_program OWNER TO postgres;

--
-- Name: calender_event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.calender_event (
    event_id integer,
    name character varying,
    date character varying
);


ALTER TABLE public.calender_event OWNER TO postgres;

--
-- Name: calender_program; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.calender_program (
    program_id integer,
    name character varying,
    date character varying
);


ALTER TABLE public.calender_program OWNER TO postgres;

--
-- Name: event_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_user (
    event_id integer,
    user_id integer
);


ALTER TABLE public.event_user OWNER TO postgres;

--
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    event_id integer NOT NULL,
    name character varying,
    content character varying,
    image_path character varying,
    event_date character varying,
    location character varying,
    event_link character varying
);


ALTER TABLE public.events OWNER TO postgres;

--
-- Name: events_event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.events ALTER COLUMN event_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.events_event_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: newsletters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.newsletters (
    newsletter_id integer NOT NULL,
    author_name character varying,
    content character varying,
    title character varying,
    thumbnail_path character varying
);


ALTER TABLE public.newsletters OWNER TO postgres;

--
-- Name: newsletter_newsletter_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.newsletters ALTER COLUMN newsletter_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.newsletter_newsletter_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: otpcode; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.otpcode (
    user_id integer NOT NULL,
    expiresat timestamp with time zone,
    otp character varying(255)
);


ALTER TABLE public.otpcode OWNER TO postgres;

--
-- Name: podcasts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.podcasts (
    podcast_id integer NOT NULL,
    author_name character varying,
    podcast_link character varying,
    title character varying,
    content character varying,
    cover_image_path character varying
);


ALTER TABLE public.podcasts OWNER TO postgres;

--
-- Name: podcast_podcast_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.podcasts ALTER COLUMN podcast_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.podcast_podcast_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: program; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.program (
    program_id integer NOT NULL,
    name character varying(255),
    content character varying,
    image_path character varying(255),
    program_date character varying,
    location character varying,
    program_link character varying,
    sss character varying
);


ALTER TABLE public.program OWNER TO postgres;

--
-- Name: program_program_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.program ALTER COLUMN program_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.program_program_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: program_speaker; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.program_speaker (
    program_id integer,
    user_id integer
);


ALTER TABLE public.program_speaker OWNER TO postgres;

--
-- Name: program_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.program_user (
    program_id integer,
    user_id integer
);


ALTER TABLE public.program_user OWNER TO postgres;

--
-- Name: refresh_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.refresh_tokens (
    id integer NOT NULL,
    token character varying,
    expires_at timestamp with time zone,
    admin boolean
);


ALTER TABLE public.refresh_tokens OWNER TO postgres;

--
-- Name: refresh_token_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.refresh_tokens ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.refresh_token_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    is_banned boolean,
    name character varying(255),
    surname character varying(255),
    email character varying(255),
    password character varying(255),
    job character varying(255),
    photo character varying(255),
    photo_type character varying,
    is_tusas boolean,
    phone character varying(255),
    location character varying,
    instagram character varying,
    twitter character varying,
    linkedin character varying,
    facebook character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: videos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.videos (
    videos_id integer NOT NULL,
    title character varying,
    videos_path character varying
);


ALTER TABLE public.videos OWNER TO postgres;

--
-- Name: videos_videos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.videos ALTER COLUMN videos_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.videos_videos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin (admin_id, email, password, name, surname) FROM stdin;
1	melihhmeral@gmail.com	Melih123	\N	\N
\.


--
-- Data for Name: apply_event; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.apply_event (event_id, user_id) FROM stdin;
\.


--
-- Data for Name: apply_program; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.apply_program (program_id, user_id) FROM stdin;
\.


--
-- Data for Name: calender_event; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.calender_event (event_id, name, date) FROM stdin;
1	İnavasyon Söyleşileri	15.05.2024
6	Sinema Daveti	16.05.2024
5	Demo Day	19.05.2024
\.


--
-- Data for Name: calender_program; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.calender_program (program_id, name, date) FROM stdin;
\.


--
-- Data for Name: event_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.event_user (event_id, user_id) FROM stdin;
1	2
1	21
1	22
1	23
1	24
1	25
1	26
1	27
1	28
1	29
1	30
1	31
1	41
1	45
4	32
4	33
4	34
4	35
4	36
4	37
4	38
4	39
4	40
4	41
4	42
5	43
5	44
5	45
5	46
5	47
5	48
5	49
5	50
5	51
5	52
5	53
5	54
6	57
6	58
6	59
6	60
6	61
6	62
6	41
6	33
6	57
6	26
6	28
6	34
5	73
6	73
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (event_id, name, content, image_path, event_date, location, event_link) FROM stdin;
5	Demo Day	HANGAR Kurum içi Girişimcilik Pilot Programımız kapsamında gerçekleşecek Demo Day etkinliği 6 Mart Çarşambagünü düzenlenecektir. 3 ay boyunca Hızlandırma Programı kapsamında iş fikirleri üzerinde çalışan kurum içi girişimcilerden oluşan 16 ekibimizin sunumlarının gerçekleşeceği Demo Doy etkinliğine hepiniz davetlisiniz. Girişimci çalışma arkadaşını desteklemek için seni de bekliyoruz!	../assets/etkinlikler/demodaydavet.jpg	19.05.2024/09.00	40.08245625122704/32.586099681975234	
4	Teknoloji ve inavasyon topluluğu Söyleşisi	Teknoloji ve İnovosyon Topluluğu tarafından çevrimiçi olarak düzenlenen Fütüristler Derneği Yüksek İstişare Kurulu üyesi Dr. Mustafa Aykut ile Gelecekler Günü söyleşisine davetlisiniz. Etkinliğe katılarak ilham olabilir ve alternatif gelecekleri keşfetme fırsatını yakalayabilirsiniz.\n	../assets/etkinlikler/soylesi.jpg	27.05.2024/16.30		
1	İnavasyon Söyleşileri	"Kurum içi girişimcilik" ve "inovasyon" konularında alanında uzman kişileri ağırlayarak bakış açımızı zenginleştirdiğimiz söyleşi serimiz devam ediyor! Ford Otosan Gölcük Ar-Ge Test Merkezi Lideri olarak öne çıkan Selçuk Çelikel, "Kurumsal Bir Firmada Girişimci Olmak" konulu söyleşisiyle nbizlerle birlikte olacak. 8 Şubat Perşembe günij saat 12.30'da gerçekleşecek olan "İnovasyon Söyleşileri"ne hepiniz davetlisiniz.	../assets/etkinlikler/soylesi2.jpg	15.05.2024/12.30	39.91130050705124/32.81831313407547	
6	Sinema Daveti	Teknoloji ve İnovosyon Topluluğu tarafından düzenlenen girişimcı ve inovosyon temalı film gösterimine davetlisiniz. Gerçek bir hayat hikayesinden uyarlanan  girişimciliğe dair düşündürecekleri ile arkadaş sohbetlerimizi canlandıracak heyecanlı bir filme hazır olun! Sürpriz ikramlarımızla birlikte eğlenceli vakit geçirmek isteyen herkesi bekleriz! Kontenjanımız sınırlıdır.  Kayıt ve Bilgi: Abdulsamet EKŞİ abdulsamet.eksi@tai.com.tr	../assets/etkinlikler/sinemadavet.jpg	16.05.2024/09.45	40.08245625122704/32.586099681975234	
\.


--
-- Data for Name: newsletters; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.newsletters (newsletter_id, author_name, content, title, thumbnail_path) FROM stdin;
14	Sophia Davis	Dijital teknolojilerin iş dünyasındaki yükselişi, iş süreçlerini ve iş modellerini değiştiriyor. Yeni dijital araçlar ve platformlar, şirketlerin verimliliğini artırırken, rekabet ortamını da değiştiriyor. İşletmeler, bu dijital dönüşüm sürecine ayak uydurmak ve rekabet avantajı sağlamak için çaba harcıyorlar.	Uzay Araştırmalarında Yeni Keşifler	https://t4.ftcdn.net/jpg/03/27/93/75/240_F_327937592_fHBjp3oX9FVm4tbWqY15ua5Fxc5x5wHb.jpg
23	Sophia Taylor	Büyük veri ve veri bilimi, işletmelerin ve kurumların veri tabanlı kararlar almasına olanak tanıyan önemli bir alan haline geldi. Veri analitiği ve makine öğrenimi algoritmaları, büyük veri kümelerinden anlamlı bilgiler çıkarmak için kullanılıyor. Büyük veri teknolojileri, pazarlama, finans, sağlık ve diğer birçok sektörde kullanılarak rekabet avantajı sağlıyor.	Dijital Dönüşüm ve İş Dünyası	https://t4.ftcdn.net/jpg/03/27/93/75/240_F_327937592_fHBjp3oX9FVm4tbWqY15ua5Fxc5x5wHb.jpg
20	Emma White	Blockchain teknolojisi, finans sektöründe büyük bir etki yaratıyor. Bu dağıtılmış defter teknolojisi, güvenilir ve şeffaf finansal işlemlerin gerçekleştirilmesine olanak tanıyor. Bankalar, ödeme hizmetleri ve diğer finansal kurumlar, blockchain'in potansiyelinden yararlanarak hizmetlerini iyileştiriyor ve maliyetleri azaltıyor.	Büyük Veri ve Veri Bilimi	https://t3.ftcdn.net/jpg/03/46/48/54/240_F_346485421_QFxRd85HFIn0KrMEYKh36d5eu7lW9cxQ.jpg
24	Emily Brown	Teknoloji şirketleri, yeni ürünlerin ve hizmetlerin lansmanını duyuruyor. Yenilikçi akıllı telefonlar, giyilebilir teknolojiler, akıllı ev cihazları ve diğer birçok ürün, tüketicilere yeni deneyimler sunmak için tasarlanmıştır. Lansman etkinlikleri, kullanıcıların yeni teknolojileri deneyimlemelerini ve şirketlerin ürünlerini tanıtmalarını sağlar. Ut incididunt ea dolore nisi qui. Eu sunt laboris consectetur adipisicing reprehenderit incididunt anim.\\n Sit dolore nostrud ad aliqua voluptate. Duis ipsum in voluptate veniam ex ea excepteur nulla excepteur occaecat.Pariatur laborum pariatur mollit pariatur ut proident. Sit est aute excepteur aliqua nulla dolor cillum. Laborum Lorem mollit pariatur in minim velit consequat labore.\\n Tempor qui aute excepteur commodo dolore amet culpa ex eu sint officia nulla fugiat Lorem. Lorem sint elit labore non occaecat anim amet eiusmod duis velit cupidatat. Duis id minim ex dolor proident excepteur ipsum est laboris nisi consectetur id consequat tempor.Enim non consequat ad qui dolore Lorem amet aliquip cillum. Ut nulla tempor deserunt cillum eiusmod in excepteur. Laboris pariatur consectetur ad sit minim pariatur ea est sit pariatur mollit commodo. Velit ea velit voluptate sint quis occaecat fugiat.\\n Cupidatat id do Lorem sunt.Sit ea eiusmod dolor ipsum id aliqua. Est id tempor laboris laboris consequat culpa sint ad cillum occaecat commodo Lorem. Nulla sunt amet elit labore nostrud velit reprehenderit non duis. Ea cupidatat non nulla nulla sint anim.Et est fugiat eiusmod in sit quis magna. Cupidatat tempor officia consectetur laboris non nostrud amet elit est mollit adipisicing. Mollit aliqua anim enim id velit aute enim in officia. Consectetur proident quis anim qui eiusmod reprehenderit minim qui fugiat ut est deserunt. Voluptate est officia minim eiusmod aliqua pariatur ut nisi incididunt Lorem fugiat pariatur. Deserunt minim do fugiat ad dolor do eiusmod.Ex qui laboris pariatur do. Eiusmod minim ex tempor commodo ad non culpa magna cillum velit sint. Adipisicing ex sint minim nisi id officia laboris nostrud dolor consectetur. Consequat sunt incididunt laborum do consectetur occaecat sint deserunt sint incididunt sunt ullamco. Qui aute dolore et in incididunt amet nulla elit excepteur Lorem eu fugiat. Cupidatat esse adipisicing id Lorem adipisicing adipisicing incididunt. Sunt deserunt irure officia quis ex reprehenderit.	Yeni Yüzyılda Sanat ve Kültür	https://t4.ftcdn.net/jpg/03/13/41/01/240_F_313410188_cQMW20Ym01TycW15GXJCNuV4qyY5uIVM.jpg
21	Jack Smith	Yapay zeka ve otomasyon teknolojileri, endüstriyel ve iş süreçlerinde büyük bir dönüşüm yaratıyor. Otomasyon sistemleri, tekrarlayan görevleri otomatikleştirerek iş verimliliğini artırıyor ve insan kaynaklarını daha stratejik görevlere yönlendiriyor. Yapay zeka, veri analizi, tahminleme ve karar alma süreçlerinde insanların yeteneklerini artırıyor.	Yeni Uygulama Lansmanı	https://t4.ftcdn.net/jpg/03/27/93/75/240_F_327937592_fHBjp3oX9FVm4tbWqY15ua5Fxc5x5wHb.jpg
11	David Smith	Yapay zeka teknolojisinin gelişimi, insanlık için yeni fırsatlar ve zorluklar ortaya çıkarıyor. Yapay zeka uzmanları, bu teknolojinin etik ve güvenlik konularını ele alarak, insanlığın geleceğini şekillendirecek kararlar almak üzerine çalışıyorlar.\n	İklim Değişikliği ve Acil Eylem Çağrısı	https://t3.ftcdn.net/jpg/03/43/83/98/240_F_343839884_WWjgB3mCAcyMGOrMhOaFDExb23JRYzKu.jpg
22	Oliver Johnson	Uzay araştırmaları, evrenin sınırlarını keşfetmeye devam ediyor. Yeni uzay teleskopları ve keşif araçları, uzayda yeni yıldızlar, galaksiler ve gezegenlerin keşfedilmesine olanak sağlıyor. Uzay keşifleri, insanlığın evrende daha derinlemesine bir anlayış kazanmasına yardımcı oluyor.	Yeni Teknoloji Trendleri	https://t4.ftcdn.net/jpg/03/13/41/01/240_F_313410188_cQMW20Ym01TycW15GXJCNuV4qyY5uIVM.jpg
16	Ella Martinez	Eğitim sektörü, dijital teknolojilerin kullanımıyla büyük bir dönüşüm yaşıyor. Eğitim materyallerinin dijitalleştirilmesi, uzaktan eğitim platformlarının geliştirilmesi ve interaktif öğrenme araçlarının kullanılması, öğrencilere daha etkili ve kişiselleştirilmiş bir öğrenme deneyimi sunmayı amaçlıyor. Bu dijital dönüşüm, geleceğin eğitimini şekillendiriyor.	Blockchain Teknolojisi ve Finans	https://t3.ftcdn.net/jpg/03/43/83/98/240_F_343839884_WWjgB3mCAcyMGOrMhOaFDExb23JRYzKu.jpg
12	Emma Wilson	Teknoloji dünyasında sürekli olarak yeni trendler ortaya çıkıyor. Yapay zeka	Sağlıkta Teknoloji İnovasyonları	https://t3.ftcdn.net/jpg/03/46/48/54/240_F_346485421_QFxRd85HFIn0KrMEYKh36d5eu7lW9cxQ.jpg
15	James Wilson	Sağlık sektörü, teknoloji inovasyonları sayesinde büyük dönüşümler yaşıyor. Yapay zeka destekli teşhis sistemleri, telemedicine uygulamaları ve dijital sağlık kayıtları gibi yeni teknolojiler, hasta bakımını ve sağlık hizmetlerini iyileştirmek için kullanılıyor. Bu teknolojik yenilikler, sağlık endüstrisinin geleceğini şekillendiriyor.	Yapay Zeka ve Otomasyon	https://t4.ftcdn.net/jpg/03/13/41/01/240_F_313410188_cQMW20Ym01TycW15GXJCNuV4qyY5uIVM.jpg
18	Daniel Brown	Bir grup girişimci, yeni bir mobil uygulamanın lansmanını duyurdu. Bu uygulama, kullanıcıların günlük yaşamlarını kolaylaştırmak ve eğlenceli bir deneyim sunmak için tasarlanmıştır. Uygulamanın beta sürümü, kullanıcıların geri bildirimlerini almak ve iyileştirmeler yapmak amacıyla yayınlandı.	Eğitimde Dijital Dönüşüm	https://t3.ftcdn.net/jpg/03/43/83/98/240_F_343839884_WWjgB3mCAcyMGOrMhOaFDExb23JRYzKu.jpg
13	Oliver Brown	İklim bilimciler, dünya genelindeki hızlı iklim değişikliğiyle başa çıkmak için acil eylem çağrısında bulunuyorlar. Artan sıcaklık, deniz seviyesinde yükselme ve ekstrem hava olayları gibi etkiler, iklim değişikliğinin ciddiyetini vurguluyor.	Yeni Teknoloji Ürünlerinin Lansmanı	https://t3.ftcdn.net/jpg/03/43/83/98/240_F_343839884_WWjgB3mCAcyMGOrMhOaFDExb23JRYzKu.jpg
17	Olivia Anderson	Sanat ve kültür, dijital çağın getirdiği yeniliklerle yeni bir dönüşüm yaşıyor. Sanatçılar ve kültür kurumları, dijital medyanın ve teknolojinin gücünü kullanarak eserlerini daha geniş bir kitleye ulaştırmayı hedefliyorlar. Sanat ve kültürün dijitalleşmesi, yeni yüzyılda sanatın ve kültürün nasıl algılandığını ve deneyimlendiğini değiştiriyor.	Yenilenebilir Enerji Projeleri	https://t3.ftcdn.net/jpg/03/46/48/54/240_F_346485421_QFxRd85HFIn0KrMEYKh36d5eu7lW9cxQ.jpg
19	Sophie Clark	Yenilenebilir enerji projeleri, dünya genelinde giderek artan bir ilgi görüyor. Rüzgar enerjisi, güneş enerjisi ve hidroelektrik gibi yenilenebilir kaynaklar, fosil yakıtlara olan bağımlılığı azaltmak ve iklim değişikliğiyle mücadele etmek için potansiyel bir çözüm olarak görülüyor. Yenilenebilir enerji teknolojileri, enerji sektöründe önemli değişikliklere yol açıyor.	Yapay Zeka ve İnsanlık	https://t3.ftcdn.net/jpg/03/46/48/54/240_F_346485421_QFxRd85HFIn0KrMEYKh36d5eu7lW9cxQ.jpg
9	Alice Johnson	Bilim adamları, yeni bir gezegen keşfettiklerini açıkladı. Keşfedilen gezegen, Dünya'ya oldukça benzer özelliklere sahip ve yaşamın var olabileceği koşullara sahip olabilir. Araştırmacılar, bu keşfin uzay keşifleri için önemli bir adım olduğunu belirtiyor.	Yeni Uzay Keşfi	https://t4.ftcdn.net/jpg/03/27/93/75/240_F_327937592_fHBjp3oX9FVm4tbWqY15ua5Fxc5x5wHb.jpg
\.


--
-- Data for Name: otpcode; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.otpcode (user_id, expiresat, otp) FROM stdin;
\.


--
-- Data for Name: podcasts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.podcasts (podcast_id, author_name, podcast_link, title, content, cover_image_path) FROM stdin;
12	Emma Wilson	https://pod.link/	Yapay Zeka ve İş Dünyası: Geleceğin İş Modelleri	Yapay zeka teknolojisinin iş dünyasında kullanımı üzerine tartışıyoruz.	https://t4.ftcdn.net/jpg/03/81/14/37/240_F_381143721_OCzIVKR1FJp4CzdUbThsmFVm8PsT6UWK.jpg
4	Jane Smith	https://pod.link/	Kültür ve Teknoloji: Sanatın Dijital Dönüşümü	Sanatın teknolojiyle birleştiği ve yeni medya sanatının doğuşunu inceliyoruz.	https://images.unsplash.com/photo-1579762593217-46655e4e7efc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXJ0d29ya3xlbnwwfDB8MHx8fDI%3D
9	William Taylor	https://pod.link/	Sağlıkta Teknoloji: Biyoteknoloji ve Tıbbın Geleceği	Sağlık sektöründe teknolojinin etkilerini ve biyoteknoloji alanındaki yenilikleri tartışıyoruz.	https://images.unsplash.com/photo-1581592717583-7e2efef84615?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFydHdvcmt8ZW58MHwwfDB8fHwy
6	Emily Williams	https://pod.link/	Uzayın Sırları: Mars ve Uzay Keşifleri	Uzay araştırmaları ve Mars'a insanlı misyonların geleceği hakkında konuşuyoruz.	https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFyc3xlbnwwfDB8MHx8fDI%3D
10	Olivia Anderson	https://pod.link/	Geleceğin Trendleri: Teknolojinin Yükselen Yıldızları	Teknoloji dünyasında geleceğin trendlerini ve yeni teknolojileri inceliyoruz.	https://images.unsplash.com/photo-1614519679749-3189ec5687d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFydHdvcmt8ZW58MHwwfDB8fHwy
5	Michael Johnson	https://pod.link/	Gezegenimiz ve Gelecek: Sürdürülebilirlik ve Çevre	Dünya'nın geleceği ve sürdürülebilirlik üzerine uzman görüşlerini dinliyoruz.	https://images.unsplash.com/photo-1516061603506-fd4dc1932278?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXJ0d29ya3xlbnwwfDB8MHx8fDI%3D
15	Lucas Johnson	https://pod.link/	Geleceğin Ulaşım Sistemleri: Otonom Araçlar ve Hızlı Trenler	Ulaşım sektöründe gelecekte beklenen gelişmeleri inceliyoruz.	https://t3.ftcdn.net/jpg/03/61/71/38/240_F_361713848_YfwOhSTZsfeXwJcAzamhCUjuWeYCPyhn.jpg
1	John Doe	https://pod.link/	Geleceğe Yolculuk: Yapay Zeka ve İnsanlık	Bu bir postmman update isteğidir	https://t4.ftcdn.net/jpg/04/15/31/79/240_F_415317980_or3t3loJGxdXQrSvybkF995wx6YIrHVV.jpg
11	Ethan Johnson	https://pod.link/	Dijital Dönüşüm: İşletmeler İçin Yol Haritası	İşletmelerin dijital dönüşüm sürecini ele alıyoruz.	https://t4.ftcdn.net/jpg/03/41/36/63/240_F_341366381_hxaCwOCwbzgNDWHOilxb31k1Or5GxFjU.jpg
7	David Brown	https://pod.link/	Yeni Nesil Eğitim: Teknolojinin Sınırlarını Zorlamak	Eğitimde teknolojinin rolü ve gelecekteki eğitim modellerini ele alıyoruz.	https://images.unsplash.com/photo-1565096940104-99125291fdd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFydHdvcmt8ZW58MHwwfDB8fHwy
16	Sophia Davis	https://pod.link/	Blockchain Teknolojisi ve Finans: Dijital Paranın Geleceği	Blockchain teknolojisinin finans dünyasındaki etkilerini tartışıyoruz.	https://t3.ftcdn.net/jpg/03/61/94/16/240_F_361941612_ukrRW26gem0NJhShvmubNBT2M9R31col.jpg
14	Olivia Smith	https://pod.link/	Veri Güvenliği ve Gizlilik: Dijital Varlıkları Koruma Stratejileri	Veri güvenliği ve gizliliğinin önemi ve koruma stratejilerini ele alıyoruz.	https://t3.ftcdn.net/jpg/03/61/43/82/240_F_361438229_kl64iVeH7pH5HaPT0BLsJbgaU60acB5C.jpg
8	Sophia Lee	https://pod.link/	Dijital Dönüşüm ve İş Dünyası: Geleceğin İş Modelleri	Dijitalleşme ve iş dünyasında gelecekte nasıl değişiklikler olacağını inceliyoruz.	https://images.unsplash.com/photo-1579009420909-b837eefa4274?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFydHdvcmt8ZW58MHwwfDB8fHwy
17	William Wilson	https://pod.link/	Yeni Nesil Mobil Uygulamalar: Geleceğin Mobil Teknolojileri"	Mobil uygulama geliştirme alanında gelecekteki trendleri inceliyoruz.	https://images.unsplash.com/photo-1590622974113-66a9160acf20?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXJ0d29ya3xlbnwwfDB8MHx8fDI%3D
13	Aiden Brown	https://pod.link/	E-ticarette Gelecek: Yeni Trendler ve Fırsatlar	E-ticaret dünyasının gelecekteki gelişmelerini inceliyoruz.	https://t3.ftcdn.net/jpg/03/26/10/14/240_F_326101400_VAbucqJzm2jnOtsiofjwk3y5iy7t40MQ.jpg
\.


--
-- Data for Name: program; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.program (program_id, name, content, image_path, program_date, location, program_link, sss) FROM stdin;
5	Take off 2024	//Aşamalar//\n    /Erken Aşama/\n    MVP/POC süreçlerini tamamlamış, şirketleşmiş, yatırım almış ve/veya satış yapmış girişimlerdir.\n    /Büyüme Aşaması/\n    MVP/POC süreçlerini tamamlamış, şirketleşmiş, yatırım almış (1M - 25 M$), satış yapmış ve uluslararası operasyona(satışa) başlamış girişimlerdir.\n    //Girişimciler//\n    İş fikirlerini, ürün veya hizmetlerini alanlarında uzman mentorlar ile görüşme; yatırımcılarla buluşarak ticari faaliyete geçmekte hız kazanma; kurumlarla işbirliği yapma ve girişimler arasında yarışıp büyük yatırım ödülünü ve daha fazlasını kazanma şansı elde ederler.\n    //Kurumlar//\n    Girişim ekosistemindeki faaliyetlerini tanıtmak ve destekledikleri girişimler ile birlikte etkinlikte yer alma imkanı bulurlar. Zirvede yer alan girişimler ile tanışarak girişimlerin ürün veya hizmetlerini tanımak ve olası işbirlikleri yapma fırsatına sahip olurlar.\n    //Yatırımcılar//\n    Girişimcilere finansal destek sağlayarak, geleceğin şirketlerinin ortaya çıkmasına olanak sağlama ve zirvedeki etkinliklerle network geliştirme fırsatına sahip olurlar. Teknoloji odaklı yatırım yapan fonlar, yatırımcılar ve LP'ler ile tanışma ve birlikte yatırım yapma imkanı bulurlar.\n    //Partnerimiz Olun//\n    2024'te Partnerlikleri için Başvurun Küresel girişim ekosistemini İstanbul, Türkiye’de buluşturan Take Off’ta size uygun partnerlik seçeneği ile yer alarak prestijli partnerler arasında yerinizi ayırtın!\n    /BAŞVUR/\n    info@takeoffistanbul.com\n    	https://cdn.takeoffistanbul.com/media/upload/userFormUpload/MX8gyea7KQpyZt6X18B7SFf5WAdFMRtO.jpg	Aralık 2024	40.99744292183745/29.062630435582076	https://takeoffistanbul.com/tr/	`\n                    Sizinle nasıl iletişime geçebilirim?\n                    Bize info@takeoffistanbul.com e-posta adresi üzerinden ulaşabilirsiniz.\n                    Herhangi bir ülke kısıtlaması var mı?\n                    Take Off Girişim Zirvesine herhangi bir ülkeden girişimciler başvurabilir.\n                    Take Off yarışmasına hangi seviyedeki girişimler katılabilir?\n                    Başvuru kılavuzunda tanımlanan Erken Aşama ve Büyüme Aşaması kategorilerine uyan girişimler başvuru yapabilir.\n                    Take Off yarışmasında girişimlerin başvurabileceği dikey alanlar nelerdir?\n                    Teknoloji odaklı girişimler başvuru yapabilir.\n                    Girişimlerin yarışma içindeki sunum dili nedir?\n                    Pre-Take Off da sunum dili Türkçedir. Take Off İstanbul’da Erken Aşama ve Büyüme Aşama girişim yarışma dili İngilizce’dir.\n                    Ziyaretçilerin katılması için son kayıt tarihi nedir?\n                    Ziyaretçi kayıtları duyurulacaktır.\n                    Yarışmalarda girişimlere sağlanan imkanlar ve ödüller nelerdir?\n                    ● Yerel ve Uluslararası Mentorlarla Ağ Oluşturma\n\n                    ● Stant Alanında Ürün/Hizmet Sunma Fırsatı\n\n                    ● Yatırımcılarla Buluşma\n\n                    ● Kurumlarla İşbirliği Toplantıları\n\n                    ● Ödül Kazanma Fırsatı\n                    Girişimlerin fikri mülkiyetlerinde yarışma tarafından hak talep ediliyor mu?\n                    Fikri Mülkiyet hakları talep edilmemektedir.\n                    Yarışma ekipleri en az kaç kişi olabilir?\n                    Ekipler en az iki kişiden oluşması gerekmektedir.\n                    Aynı ekip olarak iki farklı proje ile yarışmaya başvurabilir miyim?\n                    Bir ekip sadece bir girişim ile başvuru yapabilir.\n                    İki farklı girişim ekibinde yer alarak yarışmaya başvuru yapabilir miyim?\n                    Bir kişi sadece bir girişim üzerinden başvuru yapabilir.\n                `
\.


--
-- Data for Name: program_speaker; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.program_speaker (program_id, user_id) FROM stdin;
5	2
5	65
5	63
5	64
5	66
5	67
5	68
\.


--
-- Data for Name: program_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.program_user (program_id, user_id) FROM stdin;
5	29
5	30
5	31
5	32
5	33
5	34
5	35
5	36
5	23
5	38
5	39
5	40
5	41
5	42
5	43
5	44
5	45
5	46
5	24
5	25
5	26
5	27
5	28
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.refresh_tokens (id, token, expires_at, admin) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, is_banned, name, surname, email, password, job, photo, photo_type, is_tusas, phone, location, instagram, twitter, linkedin, facebook) FROM stdin;
53	f	Leyla	Mutlu	leyla.mutlu@example.com	$2b$10$lEO/mB1xaOWdALtQ0QIZuuLhnG4/GM7we4nIKNuidGzkEavf6XZCy	Cinematographer	https://media.tenor.com/Gr5B8WlvBT4AAAAj/anime.gif	jpg	t	555-6791	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Leyla
34	f	Onur	Kaplan	onur.kaplan@example.com	$2b$10$RiG7owd2VHYEj8e4Hc.eZuRvNtzIXRyuH1lZntIx7PAvz9zmpo2c.	Security Engineer	https://media.tenor.com/qoZjXskOWzcAAAAj/anime.gif	jpg	t	555-2347	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Onur
54	f	Cem	Gündüz	cem.gunduz@example.com	$2b$10$uo9VlEuYTRtco3e77ZSWJen3i6TOldySG.Ckv2i3gmr/hVXFn5Iee	Director	https://media.tenor.com/B1tV14bHvNMAAAAj/anime.gif	jpg	f	555-2357	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Cem
49	f	Burak	Şen	burak.sen@example.com	$2b$10$NF.UD/le.VXCx.uq0CCE8eSgvUF9JN5dNF7MXnHF/hRW.Uy/iZh56	Sales Manager	https://media.tenor.com/Ji3BRY0D_x0AAAAj/kaguya-anime.gif	jpg	t	555-6789	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Burak
25	f	Emre	Yılmaz	emre.yilmaz@example.com	$2b$10$8JR1tVzQYjZjEB9KCokAdeJytZN9d7QxN5QIxDZIOsGHbACb417QK	DevOps Engineer	https://media.tenor.com/7lirhLLRJWAAAAAj/ai-hoshino-ai-dance.gif	jpg	t	555-7890	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Emre
68	f	Jean-Yves Le 	Gall	gulay.koc@example.com	$2b$10$oJZiy2KTIr9puJmcBnZLFOGW4ezrzCmNjzPWT6QpvUNhjl900Z8f6	Former President, International Astronomical Federation	https://cdn.takeoffistanbul.com/media/upload/userFormUpload/Rj8FfZCczbQPvfPgq4JBpyA2wb5DoFMl.jpg	jpg	f	555-2361	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Jean-Yves Le 
65	f	Prof. Dr. Hakan 	Al-Thani	gulay.koc@example.com	$2b$10$oJZiy2KTIr9puJmcBnZLFOGW4ezrzCmNjzPWT6QpvUNhjl900Z8f6	Vice President, Republic of Türkiye of Presidency of Defence Industries	https://cdn.takeoffistanbul.com/media/upload/userFormUpload/oSoVX581JRORcaTlEFUjqPsKiCOmgDZW.png	jpg	f	555-2361	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Prof. Dr. Hakan 
26	f	Hakan	Kaya	hakan.kaya@example.com	$2b$10$Z7pSiVVWppXZloRMwufF4e.Vr7HuVcFeibPNyEtSXyKvem9sHKvpC	Product Owner	https://media.tenor.com/FnM5KK8s_boAAAAj/anime-anime-boy.gif	jpg	t	555-1235	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Hakan
62	f	Gulay	Koç	gulay.koc@example.com	$2b$10$oJZiy2KTIr9puJmcBnZLFOGW4ezrzCmNjzPWT6QpvUNhjl900Z8f6	Production Manager	https://media.tenor.com/OHMxfMcU4eQAAAAj/anime-girl.gif	jpg	f	555-2361	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Gülay
47	f	Serkan	Eren	serkan.eren@example.com	$2b$10$HLPfwdt/GFcGGe3uHAtM6.qZcn/YF3EiCNpbONWIvHvUZ3QzyuxCi	Innovation Consultant	https://media.tenor.com/WCXHO9M14MkAAAAj/clap-bocchi.gif	jpg	t	555-6788	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Serkan
60	f	Uğur	Tekin	ugur.tekin@example.com	$2b$10$WyFcoeVtgQGDpRBXFYPgGOvhblC0Pd6s.78oO6mAbpvyHI8xqVzNO	Sound Designer	https://media.tenor.com/l4B5yctugJoAAAAj/furro-neko.gif	jpg	f	555-2360	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Uğur
63	f	Selçuk	Bayraktar	gulay.koc@example.com	$2b$10$oJZiy2KTIr9puJmcBnZLFOGW4ezrzCmNjzPWT6QpvUNhjl900Z8f6	TEKNOFEST Yönetim Kurulu Başkanı & T3 Vakfı Mütevelli Heyeti Başkanı	https://cdn.takeoffistanbul.com/media/upload/userFormUpload/q4ovXBdrKmevSvv7kNmsf2CLjTYT6pny.jpg	jpg	f	555-2361	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Selçuk
73	f	Fevzi	KILAS	f.klas2000@gmail.com	$2b$10$KPyswXRK16cwOXTF6ZFj..OQCmz9pWscb6Czw32WB3FvH6/PnlSSO	Former President, International Astronomical Federation	https://media1.tenor.com/m/91_caqoNKDoAAAAd/hxh-killua.gif	gif	f	05433473514	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	FEVZIKILAS
61	f	Elif	Ersoy	elif.ersoy@example.com	$2b$10$DMGWlrHpDupHFhsGDy5UnekHFgI5fZkb7dLCe6Ob/so.FD6lvGQoW	Makeup Artist	https://media.tenor.com/whawtIdRw7kAAAAj/coco.gif	jpg	f	555-6795	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Elif
59	f	Nazan	Çetin	nazan.cetin@example.com	$2b$10$a/8UbFd63wVZEFqLDu6HW.c/3n8saAawpy4CvfcGgOOXUgsoDvFja	Film Editor	https://media.tenor.com/d-tcKp-QRwIAAAAj/kotqncee.gif	jpg	f	555-6794	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Nazan
58	f	Funda	Şimşek	funda.simsek@example.com	$2b$10$F8TdLryMQ3GhV2TZ/Pk.tOOIjmMF/X7eRL61hDYZ/pn6WQQCk.2HG	Casting Director	https://media.tenor.com/Q9JSmN7xiFwAAAAj/mai-sakurajima-png.gif	jpg	f	555-2359	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Funda
75	\N	Fevzi	Kılas	f.klas2001@gmail.com	$2b$10$LMEhjFawxsQ0MrDyQVBKQuWsQEnrmXajUQJ0WwHXccmqEFkMVXTy6	Hacettepede öğrenciyim 4.sınıfım Bilgisayar mühendisliği okuyorum.	https://media1.tenor.com/m/XAabbheOS24AAAAC/goma-happy.gif	\N	\N	05433473514	\N	\N	\N	\N	\N
28	f	Kaan	Demir	kaan.demir@example.com	$2b$10$Y/6Qj8fZ6Dvb.tm2CaL/o.Ht6IhhtERz9GYwMxXImGeCYQhbp1n9e	Backend Developer	https://media.tenor.com/FKCneeBlNRwAAAAj/yandere-heart.gif	jpg	t	555-3457	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Kaan
42	f	Duygu	Sarı	duygu.sari@example.com	$2b$10$PCqjstoRI0bqoTN9adhVZOVRYgD257tUNEo.xrG3joCE.grYipG9q	Innovator	https://media.tenor.com/pnJmxEh_eFoAAAAj/shikimoris-not-just-a-cutie-shikimori.gif	jpg	t	555-2351	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Duygu
35	f	Pelin	Şahin	pelin.sahin@example.com	$2b$10$mmgOx745nZY4RQrT5/KSCeCYCpt6ea2csRvJsIs1bz6dSsQI23zRW	Quality Assurance	https://media.tenor.com/usAx4sFHmRwAAAAj/chibi-yhad.gif	jpg	t	555-6782	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Pelin
43	f	Eren	Özdemir	eren.ozdemir@example.com	$2b$10$DiK2GQG1L5P/gAfzBkBY7..IKnmsQBlU8VOk.TuYy0wzw3/y9ypq.	Startup Founder	https://media.tenor.com/R67vwlRz6bcAAAAj/chika-bonk.gif	jpg	t	555-6786	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Eren
36	f	Kemal	Arslan	kemal.arslan@example.com	$2b$10$8KIEDfZVFkAG/xuC5RujTugVrrugolm.Dp4b63xFpGEpP9v7r/fvq	Systems Analyst	https://media.tenor.com/9hNvv2MWODMAAAAj/yokasiri-pouts.gif	jpg	t	555-2348	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Kemal
33	f	Ebru	Aydın	ebru.aydin@example.com	$2b$10$mylicdwMfWJVOxFeqGpGaOeH5VJxSOV4f7M/H59oyT5ESR0YUSH6e	Scrum Master	https://media.tenor.com/5gEPVyy1UmIAAAAj/disgusting-anime.gif	jpg	t	555-6781	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Ebru
66	f	Sheikh Mansoor Bin  	Khalifa	gulay.koc@example.com	$2b$10$oJZiy2KTIr9puJmcBnZLFOGW4ezrzCmNjzPWT6QpvUNhjl900Z8f6	Chairman of MBK Holding	https://cdn.takeoffistanbul.com/media/upload/userFormUpload/86VtkHC4QIRGWTrq9eklCW0wezjITrMh.png	jpg	f	555-2361	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Sheikh Mansoor Bin  
55	f	Ece	Yalçın	ece.yalcin@example.com	$2b$10$orfA6dKvBXubNp6QLWg4KuT7Nlvi6Q7RJj8YoHO3sZELETNf/Z/oq	Screenwriter	https://media.tenor.com/leSUlbvyGQsAAAAj/puppy-girl.gif	jpg	f	555-6792	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Ece
40	f	Tolga	Koç	tolga.koc@example.com	$2b$10$qW66vi9529oISJf2CgKZB.PSEXiy2YbOcVSmOOrCT/ka3Ulo3Rxhu	Network Engineer	https://media.tenor.com/Ff7mEcLQ8XkAAAAj/pouting-frieren.gif	jpg	t	555-2350	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Tolga
44	f	Büşra	Kuru	busra.kuru@example.com	$2b$10$c6jX3z6qZTugG6nGzziLUuUYrte4Nu1yU2c7nJ1K4QlTe5LNFzN4.	Venture Capitalist	https://media.tenor.com/exvrK7UaGYoAAAAj/nagatoro-anime.gif	jpg	t	555-2352	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Büşra
56	f	Tuncay	Özkan	tuncay.ozkan@example.com	$2b$10$c4lV/IALjnzMtQMujEPdpOVB2zRJtbUOEGwfYOiK/bRgc4FptWokq	Producer	https://media.tenor.com/qlW2EbmNA_gAAAAj/anime.gif	jpg	f	555-2358	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Tuncay
51	f	Tuba	Erkan	tuba.erkan@example.com	$2b$10$ow.GPm4FUuzlodpuLUnPeueRHwrxTzymdNT3Sx5qECJtNv5zkDMgG	Film Enthusiast	https://media.tenor.com/FdHX-FVojKkAAAAj/anime-cute.gif	jpg	t	555-6790	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Tuba
67	f	Prof. Dr. Mirco 	Kovac	gulay.koc@example.com	$2b$10$oJZiy2KTIr9puJmcBnZLFOGW4ezrzCmNjzPWT6QpvUNhjl900Z8f6	Founder and Director, Laboratory of Sustainability Robotics - EMPA	https://cdn.takeoffistanbul.com/media/upload/userFormUpload/mg2KJ4lDxTeo1QY2b0I5Wb9k8I2ilfvS.jpg	jpg	f	555-2361	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Prof. Dr. Mirco 
52	f	Berkay	Can	berkay.can@example.com	$2b$10$D/E48mdm9AYXqeMc/b/cBeGWUJyjnnPmsSAdT9jHU4mqqHaiGeilC	Movie Critic	https://media.tenor.com/HWEPegbQFekAAAAj/more-anime.gif	jpg	t	555-2356	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Berkay
45	f	Gökhan	Güven	gokhan.guven@example.com	$2b$10$vxM/P/OFyTIywRcix3lnyOrtpVet3F2fyMyW8DbJMjXEyMaAymSBy	Tech Evangelist	https://media.tenor.com/dfIJdBwYCXEAAAAj/vtuber-anime-girl.gif	jpg	t	555-6787	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Gökhan
50	f	Hande	Keskin	hande.keskin@example.com	$2b$10$wXc7/HsSdm1wGMytlFPOVOg24caILnOtZMSwyQcrFcS9FnO0ujUpu	Operations Manager	https://media.tenor.com/Cy_zbvXCEH0AAAAj/rika-takanashi.gif	jpg	t	555-2355	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Hande
57	f	Bora	Doğan	bora.dogan@example.com	$2b$10$Zo7BGhbofxyaY8nRRfSpeuwz6JbuYq0KQf3b63UcDo9CWomC/otiG	Actor	https://media.tenor.com/6mfPuPjPKhkAAAAj/anime-anime-illegal.gif	jpg	f	555-6793	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Bora
21	f	Ali	Veli	ali.veli@example.com	$2b$10$aVdn6GZYa28xDuhZKz7RFexCKD7pPVpeYrjF.NKcACFnhhWn0MFBO	Software Engineer	https://media1.tenor.com/m/doFri5AQbQ0AAAAC/agara-gun.gif	jpg	f	555-1234	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Ali
48	f	Aslı	Tan	asli.tan@example.com	$2b$10$zb/riHXlsp7IMJQKbslS/.UyWebQwLDjLNBIBgoFKjO9E5YJok6zq	Growth Hacker	https://media.tenor.com/po4myHlFD-EAAAAj/miku.gif	jpg	t	555-2354	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Aslı
32	f	Deniz	Çelik	deniz.celik@example.com	$2b$10$SHQdgN0ZqOQ2uaFebhoWiO/dA07Xww5.LTYvub6FedEusBKNh49py	Marketing Specialist	https://media.tenor.com/lhrBub_hnywAAAAj/astolfo-fate.gif	jpg	t	555-2346	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Deniz
64	f	Mehmet Fatih	Kacır	gulay.koc@example.com	$2b$10$oJZiy2KTIr9puJmcBnZLFOGW4ezrzCmNjzPWT6QpvUNhjl900Z8f6	T.C. Sanayi ve Teknoloji Bakanı & TEKNOFEST İcra Kurulu Başkanı	https://cdn.takeoffistanbul.com/media/upload/userFormUpload/7XHGeNcSzyqHoLI1q97vf94nPE4Jlnyh.jpg	jpg	f	555-2361	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Mehmet Fatih
2	f	Fevzi	KILAS	melihhmeralla@gmail.com	$2b$10$CQHTbEKjtpxL.q9lAOhC9.8AwJmxmr2lmFYMY6O7Nqtuerh8zyqZO	TEKNOFEST Yönetim Kurulu Başkanı & T3 Vakfı Mütevelli Heyeti Başkanı	https://media1.tenor.com/m/91_caqoNKDoAAAAd/hxh-killua.gif	jpg	t	05355108923	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	fevzikılas
23	f	Mehmet	Can	mehmet.can@example.com	$2b$10$9T67urlurYwXGU3sUzTbqebJGH2GbP54omgiJif7fEHJAk/jIdQLy	Project Manager	https://media.tenor.com/UwuMTewKYD8AAAAj/im-sad.gif	jpg	t	555-9012	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Mehmet
27	f	Selin	Öztürk	selin.ozturk@example.com	$2b$10$.glKuIZK9mNonlJudCn93O8B0l8dQ9aTtNYl7UEWqDcf6Qm3nxaXS	Frontend Developer	https://media.tenor.com/sblOS-zgWoAAAAAj/bocchi-thumbs-up.gif	jpg	t	555-6789	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Selin
24	f	Zeynep	Duru	zeynep.duru@example.com	$2b$10$jLK9JYYAWYlPrDfaeG1BrufSyG2wD2VHrgU38AGBi08tY858CJvmS	UX Designer	https://media.tenor.com/4YBMj31jupgAAAAj/huh-angry.gif	jpg	t	555-3456	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Zeynep
30	f	Ahmet	Öz	ahmet.oz@example.com	$2b$10$lJJ8Knp5QZDvnB5bQ4sd..4/LbI2IrIK8dhFuTo9lUNT2wMGBO8Te	Cloud Architect	https://media.tenor.com/ATVh7Uvv8xoAAAAj/what-the-nagatoro.gif	jpg	t	555-2345	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Ahmet
37	f	Seda	Demir	seda.demir@example.com	$2b$10$4SsG7UWuVfpJQu3WFO6RjeOF3pABqFNOdRFPdTZGZll7dkcgcvGtO	Data Analyst	https://media.tenor.com/0rlAawxpalIAAAAj/anya-anya-forger.gif	jpg	t	555-6783	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Seda
38	f	Barış	Akın	baris.akin@example.com	$2b$10$VGha.VREgQKEgPmbP.CEIeETDIfSkOajn43sSet31GvAstrCV8K7.	Full Stack Developer	https://media.tenor.com/pFHB6UkXAjgAAAAj/ascendance-of-a-bookworm-honzuki-no-gekokujou.gif	jpg	t	555-2349	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Barış
31	f	Mert	Yıldırım	mert.yildirim@example.com	$2b$10$6ncaLXGCZFsT/AHXkky6ye1IgaveqWyCeQKQne8Ldk4Lae.LBab4.	Business Analyst	https://media.tenor.com/30hF1KIz4EgAAAAj/kirana-kirana-yonome.gif	jpg	t	555-6780	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Mert
22	f	Ayşe	Fatma	ayse.fatma@example.com	$2b$10$Fs/Bhtt2EWbAdznwfqvnJel3eECZLqFkFBnkKjwvrwS2v0UA2oQte	Data Scientist	https://media1.tenor.com/m/u-nSwXcUi5EAAAAC/spawn.gif	jpg	f	555-5678	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Ayşe
29	f	Ece	Kılıç	ece.kilic@example.com	$2b$10$o7DKjtTU0LCeCwkIO3oQEexVw52V6q6MTVodksZlzqVRJDI.5lNtm	Mobile Developer	https://media.tenor.com/MyPnF_oV1YAAAAAj/chika-thumbs-up.gif	jpg	t	555-8901	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Ece
39	f	Gizem	Polat	gizem.polat@example.com	$2b$10$sE2vM13aBUwptCIPENHzYOoXHoH66zzO4weYO6O43Ku2EYUvubuuW	Technical Writer	https://media.tenor.com/ZepCvC5lhpQAAAAj/anime-pick-me.gif	jpg	t	555-6784	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Gizem
41	f	Okan	Yılmaz	okan.yilmaz@example.com	$2b$10$hwYFXRNnRLSrwrQJtYtnzuUHdjIYaNICs0LCugeH18kZdHaqmsgoa	Entrepreneur	https://media.tenor.com/hxGEMfjwvIcAAAAj/honoka-kousaka-arms-up.gif	jpg	t	555-6785	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Okan
46	f	Sinem	Bulut	sinem.bulut@example.com	$2b$10$r00jDAQHo2QgxMKoMmr7Y.QtczlpAYB2OJazkTJYWZt8b85QJ9H4a	Business Developer	https://media.tenor.com/vZZEPrwfe6AAAAAj/happy-amine.gif	jpg	t	555-2353	Çankaya/Ankara	niexche	iksapp	fevzi-kılas-6b857b19a/	Sinem
\.


--
-- Data for Name: videos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.videos (videos_id, title, videos_path) FROM stdin;
4	HÜRJET MANEVRA TESTLERİNE DEVAM EDİYOR!	https://www.youtube.com/watch?v=t39EztQspyo
1	GökVatan KAAN’ın kanatları altında! ✈️	https://www.youtube.com/watch?v=HYdkSVDT-Vs
5	Hayallerimizle gökyüzünü boyuyoruz!	https://www.youtube.com/watch?v=np4Wdk5G_fk
6	Genç yeteneklerimiz sordu, Genel Müdür’ümüz cevapladı.	https://www.youtube.com/watch?v=y6IhfWQ2ygw
\.


--
-- Name: admin_admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_admin_id_seq', 1, true);


--
-- Name: events_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_event_id_seq', 6, true);


--
-- Name: newsletter_newsletter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.newsletter_newsletter_id_seq', 24, true);


--
-- Name: podcast_podcast_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.podcast_podcast_id_seq', 18, true);


--
-- Name: program_program_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.program_program_id_seq', 5, true);


--
-- Name: refresh_token_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.refresh_token_id_seq', 138, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 75, true);


--
-- Name: videos_videos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.videos_videos_id_seq', 6, true);


--
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (admin_id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (event_id);


--
-- Name: newsletters newsletter_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletters
    ADD CONSTRAINT newsletter_pkey PRIMARY KEY (newsletter_id);


--
-- Name: otpcode otpcode_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.otpcode
    ADD CONSTRAINT otpcode_pkey PRIMARY KEY (user_id);


--
-- Name: podcasts podcast_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.podcasts
    ADD CONSTRAINT podcast_pkey PRIMARY KEY (podcast_id);


--
-- Name: program program_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program
    ADD CONSTRAINT program_pkey PRIMARY KEY (program_id);


--
-- Name: refresh_tokens refresh_token_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_token_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: videos videos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_pkey PRIMARY KEY (videos_id);


--
-- Name: apply_event event_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.apply_event
    ADD CONSTRAINT event_id FOREIGN KEY (event_id) REFERENCES public.events(event_id) NOT VALID;


--
-- Name: event_user event_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_user
    ADD CONSTRAINT event_id FOREIGN KEY (event_id) REFERENCES public.events(event_id);


--
-- Name: calender_event event_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calender_event
    ADD CONSTRAINT event_id FOREIGN KEY (event_id) REFERENCES public.events(event_id);


--
-- Name: apply_program program_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.apply_program
    ADD CONSTRAINT program_id FOREIGN KEY (program_id) REFERENCES public.program(program_id);


--
-- Name: program_user program_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_user
    ADD CONSTRAINT program_id FOREIGN KEY (program_id) REFERENCES public.program(program_id);


--
-- Name: program_speaker program_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_speaker
    ADD CONSTRAINT program_id FOREIGN KEY (program_id) REFERENCES public.program(program_id);


--
-- Name: calender_program program_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calender_program
    ADD CONSTRAINT program_id FOREIGN KEY (program_id) REFERENCES public.program(program_id);


--
-- Name: apply_event user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.apply_event
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(user_id) NOT VALID;


--
-- Name: event_user user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_user
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: apply_program user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.apply_program
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: program_user user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_user
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: program_speaker user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_speaker
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

