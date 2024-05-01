import Navbar from '../../components/navbar/navbar';
import language from '../../assets/lang/language.jsx';
import shape from '/src/assets/images/title-shape.png';
import x6 from '/src/assets/images/x8.jpg';
import fes from '/src/assets/images/fes.jpg';
import fes1 from '/src/assets/images/fes1.jpg';
import fes2 from '/src/assets/images/hunar.jpg';
import Footer from '../../components/footer/footer.jsx';
import './about.css';
import { Link } from 'react-router-dom';
const about = () => {
	const lang = localStorage.getItem('lang');
	return (
		<>
			<Navbar />
			<div className='bg-about'>
				<div className='container'>
					<svg width='580' height='400' className='svg-morph'>
						<path
							id='svg_morph'
							d='m261,30.4375c0,0 114,6 151,75c37,69 37,174 6,206.5625c-31,32.5625 -138,11.4375 -196,-19.5625c-58,-31 -86,-62 -90,-134.4375c12,-136.5625 92,-126.5625 129,-127.5625z'
						></path>
					</svg>
					<div className='about-us'>
						<h1 className='about-us__title'>
							{language[lang].about.about_title}
						</h1>
						<p className='about-us__text'>
							Bu sahifada siz Qo`qon shahrining tashkil topishi va u haqida
							umumiy ma`lumotlarga ega bo`lishingiz mumkin.
						</p>
					</div>
				</div>
			</div>
			<div className='about-wrap '>
				<div className='container'>
					<img className='shape mb-2' src={shape} alt='' />
					<h3 className='about-wrap__title'>
						{language[lang].about.about_wrap_title}
					</h3>
					<div className='about-wrapper row'>
						<div className='col-12 mb-4 position-relative'>
							<Link
								className='frame-img-box'
								to='https://www.youtube.com/embed/FaHVunR7YTM?si=74zGmncCoH_Kfb1m'
								target='blank'
							>
								<img
									className=' about-wrapper__img frame-img'
									src={fes}
									alt=''
								/>
							</Link>
						</div>
						<div className='col-12 col-lg-6 mb-4 mb-lg-5'>
							<div style={{ position: 'relative', overflow: 'hidden' }}>
								<Link
									to='https://yandex.uz/maps/10332/kokand/?utm_medium=mapframe&utm_source=maps'
									style={{
										color: '#eee',
										fontSize: '12px',
										position: 'absolute',
										top: '0px',
									}}
								>
									Коканд
								</Link>
								<Link
									to='https://yandex.uz/maps/geo/771298515/?ll=70.947110%2C40.520388&utm_medium=mapframe&utm_source=maps&z=12.42'
									style={{
										color: '#eee',
										fontSize: '12px',
										position: 'absolute',
										top: '14px',
									}}
								>
									Коканд — Яндекс Карты
								</Link>
								<iframe
									src='https://yandex.uz/map-widget/v1/?ll=70.947110%2C40.520388&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgk3NzEyOTg1MTUSKU_Ku3piZWtpc3RvbiwgRmFyZ8q7b25hIHZpbG95YXRpLCBRb8q7cW9uIgoNf-GNQhUXKCJC&z=12.42'
									className='frame-loc w-100'
									height={300}
									allowFullScreen={true}
									style={{ position: 'relative' }}
								></iframe>
							</div>
						</div>
						<div className='col-12 col-lg-6 mb-4 mb-lg-5'>
							<p className='about-wrapper__text'>
								Mahalliy tarixchi va arxeologlar orasida shaharning yoshi 2 ming
								yildan ziyod degan taxmin mavjud. Qoʻqonga oid dastlabki
								maʼlumotlar 10-asr yozma manbalarida uchraydi. Etimologiyasi
								haqida turli taxminlar bor [masalan, Istaxriy va Ibn Havqal
								asarlarida „Havokand“ (Hoʻkand) shaklida, yaʼni „goʻzal“,
								„yoqimli“ yoki „shamol shahri“ maʼnosida uchraydi]. Keyingi
								asrlarda „Hoʻqandi latif“ degan atama ham ishlatilgan. Undan
								tashqari „balandlikdagi shahar“, „hular shahri“ [yaʼni, „hu (ku)
								qabilasi — elati shahri“] versiyalari ham bor. Qadimiy Xitoy
								qoʻlyozmalarida Qoʻqon nomi „Guyshan“, „Xoʻxan“ tarzida
								ifodalangan
							</p>
						</div>
						<div className='col-12 mb-4 mb-lg-5'>
							<img
								className='about-wrapper__img mb-2 mb-lg-4'
								src={x6}
								alt=''
							/>
							<p className='about-wrapper-text'>
								Qoʻqonning 18-asrgacha boʻlgan siyosiy tarixi haqida maʼlumotlar
								juda oz. Qoʻqon podsho Rossiyasi qoʻshinlari tomonidan zabt
								etilganda Qoʻqon xonligi arxivining koʻp qismi olib ketilgan.
								Qoʻqon qadimda Hindiston va Xitoyga boriladigan karvon yoʻlida
								joylashgan. XIII asrda moʻgʻullar tomonidan butunlay vayron
								qilingan. Shundan keyin 18-asrgacha Qoʻqon kichik aholi turar
								joyi sifatida mavjud boʻlgan. 1709-yili Qoʻqon xonligi tashkil
								topgach, 1711-yili Eskiqoʻrgʻon qalʼasi oʻrnida hozirgi Qoʻqon
								shahriga asos solindi, istehkom va qalʼa barpo etildi. 1732-yili
								Abdurahimbiy bu ishni nihoyasiga yetkazdi va shaharni xonlik
								poytaxtiga aylantirdi. Shu davrdan boshlab shahar Qoʻqon deb
								atala boshladi. Shaharning mustahkam devori, 12 darvozasi
								(Xoʻjand, Gʻoziyogʻliq, Quduqliq, Sarmozor, Namangan, Chimyon,
								Soʻx, Margʻilon, Rishton, Moʻyimuborak, Qatagʻon, Isfara)
								boʻlgan. Qoʻqon hududi 12 maʼmuriy boʻlak (daha) ga taqsim
								qilingan. Shaharda 3 mingga yaqin xonadonda 31 ming kishi
								yashagan. Norboʻtabiy davrida (1766—98) ravnaq topdi, Sharqning
								savdo-sotiq va hunarmandchilik markazlaridan biriga aylandi.
								Olimxon hukmronligi davrida (1801—1810) esa Qoʻqonning siyosiy
								mavqei kuchaydi. Umarxon (1810—22) va uning oʻgʻli Muhammad
								Alixon (1822—1842) hukmronligi davrida Qoʻqonda fan, madaniyat,
								adabiyot va sanʼat markaziga aylandi. 1842-yilda Buxoro amirligi
								hukmdori Nasrulloxon tomonidan bosib olindi. Qoʻqon xonligi rus
								qoʻshinlari tomonidan ishgʻol etilib, Turkiston
								general-guber-natorligiga qoʻshib olingach (1876), Qoʻqon yangi
								tashkil etilgan Turkiston general-gubernatorligining Fargʻona
								viloyati maʼmuriy markazi boʻladi. Viloyat markazi Yangi
								Margʻilonga koʻchirilgandan keyin (1877-yil 27-aprel), Fargʻona
								viloyati uyezd shahri, soʻng vodiyning eng yirik shaharlaridan
								biri boʻlib qoldi.
							</p>
						</div>
						<div className='col-12 col-lg-6 mb-lg-5 mb-4'>
							<p className='about-wrapper__text'>
								Shaharda bir qator madrasalarni uchratish mumkin. Qoʻqonda islom
								dini rivojiga hissa qoʻshgan olimlar Abdulhafiz Al-Qoʻqoniy,
								Yorqinjon Qori Al-Qoʻqoniy kabi bir qancha ko‘zga ko‘ringan
								hanafiy olimlar yashagan. 2019-yil sentyabr oyida Qo‘qon
								shahrida birinchi Xalqaro hunarmandchilik festivali bo‘lib
								o‘tdi. Unga O‘zbekiston „Hunarmandchilik“ uyushmasi mezbonlik
								qildi va faxriy mehmon Butunjahon hunarmandchilik kengashi
								prezidenti Rosy Greenlees bo‘ldi. Ushbu festivalda 70
								mamlakatdan 600 dan ortiq ijodkor ishtirok etdi. Festival
								dunyoning turli burchaklaridan kelgan hunarmandlarga o‘z
								mahsulotlarini namoyish etish va sotish, shuningdek, o‘zaro
								aloqa o‘rnatish va o‘z mahoratini yanada rivojlantirish
								maqsadida tashkil etilgan. Festival doirasida qo‘l
								hunarmandchiligini rivojlantirishga bag‘ishlangan anjumanlar
								bo‘lib o‘tdi. Ko‘rgazmadan cholg‘u asboblari, naqqoshlik,
								kulolchilik, to‘qimachilik, metallga ishlov berish, yog‘ochdan
								yasalgan buyumlar o‘rin olgan. Festival ikki yilda bir marta
								o‘tkazilishi rejalashtirilgan.
							</p>
						</div>
						<div className='col-12 col-lg-6 mb-4 mb-lg-5'>
							<img className='about-wrapper__img' src={fes2} alt='' />
						</div>
						<div className='col-12 position-relative'>
							<Link
								to='https://youtu.be/hoWkDGLKhks?si=Px3FsnqTnQA7-oAd'
								target='blank'
								className='frame-img-box'
							>
								<img
									className='about-wrapper__img frame-img'
									src={fes1}
									alt=''
								/>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};
export default about;
