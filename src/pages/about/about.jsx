import Navbar from '../../components/navbar/navbar';
import language from '../../assets/lang/language.jsx';
import shape from '/src/assets/images/title-shape.png';
import x6 from '/src/assets/m-images/bg1.jpg';
import fes from '/src/assets/subnail.jpg';
import fes1 from '/src/assets/m-images/bg32.jpg';
// import fes2 from '/src/assets/m-images/img3.jfif';
import Footer from '../../components/footer/footer.jsx';
import './about.css';
import { Link } from 'react-router-dom';
import LocomotiveScroll from 'locomotive-scroll';
import { useEffect, useRef } from 'react';
const About = () => {
	const lang = localStorage.getItem('lang');
	const scrollRef = useRef();
	useEffect(() => {
		const scroll = new LocomotiveScroll({
			el: scrollRef.current,
			smooth: true,
			class: 'is-inview',
			getSpeed: true,
			getDirection: true,
			smartphone: {
				smooth: false,
			},
			tablet: {
				smooth: false,
			},
		});
		return () => scroll.destroy();
	}, []);
	return (
		<>
			<div className='wrapper' ref={scrollRef} data-scroll-container>
				<Navbar />
				<div className='bg-about'>
					<div className='container'>
						<div className='position-relative'>
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
									Bu sahifada Marg`ilonning tashkil topishi va u haqida umumiy
									ma`lumotlarga ega bo`lishingiz mumkin.
								</p>
							</div>
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
							<div className='col-12 mb-5 position-relative'>
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
										to='https://yandex.uz/maps/101425/margilan/?utm_medium=mapframe&utm_source=maps'
										style={{
											color: '#eee',
											fontSize: '12px',
											position: 'absolute',
											top: '14px',
										}}
									>
										Маргилан
									</Link>
									<Link
										to='https://yandex.uz/maps/geo/1677154947/?ll=71.739838%2C40.455804&utm_medium=mapframe&utm_source=maps&z=13.17'
										style={{
											color: '#eee',
											fontSize: '12px',
											position: 'absolute',
											top: '14px',
										}}
									>
										Маргилан — Яндекс Карты
									</Link>
									<iframe
										className='frame-loc w-100'
										src='https://yandex.uz/map-widget/v1/?ll=71.739838%2C40.455804&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgoxNjc3MTU0OTQ3EixPyrt6YmVraXN0b24sIEZhcmfKu29uYSB2aWxveWF0aSwgTWFyZ8q7aWxvbiIKDS92j0IVEuIhQg%2C%2C&z=13.17'
										allowFullScreen='true'
										height={400}
										// style={{ position: 'relative' }}
									></iframe>
								</div>
							</div>
							<div className='col-12 col-lg-6 mb-4 mb-lg-5'>
								<p className='about-wrapper__text'>
									Afsonalarga koʻra, Margʻilonga Iskandar Zulqarnayn tomonidan
									asos solingan. Aytishlaricha Zulqarnayn ovqatlangani
									toʻxtaganda, unga Murgʻ yaʼni tovuq va Non berilgan ekan va
									shundan Murgʻinon boʻlib shaharni nomi kelib chiqqan ekan.
									Lekin boshqa ishonchliroq maʼlumotlarga qaraganda Margʻilon
									Miloddan Keyingi IX asrda Buyuk Ipak yoʻli muhim shahrlardan
									boʻlgan. XV asrda yashab oʻtkan vatandoshimiz va Boburiylar
									imperiyasining asoschisi Bobur oʻzinig Boburnoma kitobida
									„koʻp yahshi narsalarga boy shahar. Uning Shaftolilari va
									Anorlari ham koʻb yahshidur“ deb yozgan. Va uning aytishicha
									„Samarqand ning va Toshkent ning eng koʻzga koʻringan bezori
									va urishqoqlari Margʻilonliklardir“. 1710—1876-yillarda Qoʻqon
									xonligi davrida shahar Margʻilon bekligi markazi, xonlikning
									muhim strategik ahamiyatga molik kenti boʻlgan. Margʻilon
									Fargʻona vodiysining qadimiy shaharlaridan biridir. 1994-2004
									yillarda Oʻzbekiston Arxeologiya instituti xodimlari shaharda
									ish olib borib, Margʻilon vohasida eramizdan avvalgi IV – III
									asrlardan boshlab sugʻorma dehqonchilik mavjudligini
									aniqladilar. Margʻilon Chor Rossiyasi hukmronligi davrida
									Turkiston guberniyasi takibidagi, Fargʻona viloyati, Margʻilon
									uezdi markazi boʻlgan. Shaharda hamma zamonlarda ham
									hunarmandchilik va savdogarlik yuksak darajada rivojlangani
									maʼlum. Shuningdek, Margʻilonni „Sunduqul orifiyn“ (Oriflar
									sandigʻi) deydilar. Bunga sabab esa bu shahardan juda koʻp
									olimu fuzalo, oriflarning chiqqanidir. Margʻilon savdogarlari
									Oʻrta Osiyo savdo-sotiq ishlarida muhim rol oʻynaganlar va
									Sovet ittifoqi davrida bu shaharni odamlarini qonun bilan
									chiqishmovchiliklari boʻlgan.
								</p>
							</div>
							<div className='col-12 mb-4 mb-lg-5'>
								<img
									className='about-wrapper__img mb-2 mb-lg-4'
									src={x6}
									alt=''
								/>
								<p className='about-wrapper-text'>
									Margʻilon toʻgʻrisidagi dastlabki yozma maʼlumotlar X asrga
									taalluqli. Oʻsha davrlarda shahar „Margʻinon“ deb atalgan va
									keyinchalik har ikki nomi ham ishlatilib kelingan. Margʻilon
									nomining kelib chiqishi haqida aniq bir maʼlumot yoʻq. Ayrim
									toponimistlar „margʻ“ – „maysazor“, „oʻtzor“dan deb taxmin
									qiladilar. Margʻilon „murgʻ“ va „yunon“ soʻzlaridan degan
									mahalliy toʻqima rivoyat ham bor. Ibratning „Tarixi Fargʻona“
									qoʻlyozma asarida yozilishicha, shaharga 883-yilda asos
									solingan. Arxeologik topilmalar Margʻilon oʻrnida mil.
									boshlaridan aholi yashab kelayotganligini, X asrda u katta
									qishloq boʻlganligini, XI – XII-asrlarda esa shaharga
									aylanganligi tasdiqlamoqda. V. V. Bartold „Moʻgʻullar istilosi
									davrida Turkiston“ asarida Qoraxoniylar davrida ham Margʻilon
									viloyatning bosh shahri hisoblanganligini qayd etgan.
									„Boburnoma“da Margʻilon Fargʻonadagi 8 ta shahardan biri
									ekanligi, shaharning obodligi, shirin mevalari haqida soʻz
									yuritilib, uning „donai kalon“ deb ataluvchi anori va
									„subhoniy“ navli oʻrigi maqtaladi. Shaharning qad. qismida
									oʻtkazilgan arxeologik qazilmalar natijasida Margʻilonga
									bundan 2 ming yil avval asos solinganligi aniqlandi. Mahalliy
									maʼlumotlar boʻyicha shaharning 12 darvozasi boʻlgan. Buyuk
									ipak yoʻlida joylashgan Margʻilon aholisi qadimdan atlas
									toʻqish bilan shugʻullanib kelgan va shu tariqa uni jahonga
									mashhur qilgan. Margʻilonning shoyi matolari Misr, Eron va
									Yunoniston, Qashgʻar savdogarlari tomonidan koʻplab xarid
									qilingan. Shuningdek, Margʻilonda doʻppidoʻzlik, misgarlik
									rivojlangan, shaharda vaqt-vaqti bilan tanga ham zarb
									qilingan. Shahar turli davrlarda Temuriylar, Shayboniylar
									davlatlari, keyingi davrda Qoʻqon xonligi tarkibida boʻlgan.
									1875-yilda rus qoʻshinlari tomonidan bosib olingan.
									Margʻilonda oq podsho maʼmurlari zulmiga qarshi qaratilgan,
									tarixda maʼlum boʻlgan „Poʻlatxon qoʻzgʻoloni“ (1873—76),
									mahalliy aholini Rossiyadagi front orti ishlariga zoʻrlab olib
									ketilishiga qarshi koʻtarilgan xalq qoʻzgʻoloni (1916) boʻlib
									oʻtgan. Margʻilon 1876—1926-yillarda Fargʻona viloyatining
									uyezd shahri boʻlgan, soʻngra Fargʻona okrugi miqyosidagi
									shaharga aylantirilgan. 1927-yilda Margʻilonda birinchi
									pillakashlik fabrikasini qurishga kirishildi. Bundan tashqari,
									ikkita elektr stansiyasi, bosmaxona, mexanika ustaxonasi, non
									va limonad zavodlari bor edi. Keyinroq mexanizatsiyalashgan
									koʻnchilik zavodi, taxta tilish tsexi, poyabzal f-kasi
									foydalanishga topshirildi. Shoyi toʻqish artellari
									yiriklashtirildi, bir qancha yangi hunarmandchilik korxonalari
									ishga tushirildi. 1963-yilda badiiy gazlamalar ishlab
									chiqaruvchi hunarmandchilik artellari negizida „Atlas“ firmasi
									vujudga keldi (1976-yildan „Atlas“ ishlab chiqarish
									birlashmasi). Shaharda 20 ga yaqin sanoat, 8 avtotransport
									korxonalari, 17 qurilish tashkiloti bor (2002). „Turonshoyi“,
									A. Navoiy nomli ipak gazlamalar va mexanika, „Fargʻonasut“,
									yogʻochsozlik korxonalari mavjud. „Doʻstlik— Margʻilon“
									qoʻshma korxonasi, 600 dan ortiq kichik va xususiy korxona,
									markaziy dehqon bozori, „Margʻilon“ mehmonxonasi, avtobuslar
									shohbekati, savdo, madaniy va maishiy xizmat koʻrsatish
									shoxobchalari ishlab turibdi. Margʻilonda hunarmandchilik
									(ayniqsa, doʻppidoʻzlik, tandirchilik, misgarlik) rivojlangan.
									34 umumiy taʼlim maktabi, „Istiqbol“ gimnaziyasi, milliy
									xunarmandchilik va aniq fanlar litseylari mavjud boʻlib,
									ularda 200 oʻquvchi taʼlim oladi. 2 musiqa, 2 kasb-hunar
									maktabi, qurilish, tijorat, hisob-kredit, tibbiyot va
									pedagogika kollejlari, maxsus maktab, mehribonlik uyi, „Shoyi“
									korxonasiining ipakchilik instituti faoliyat koʻrsatmoqda.
								</p>
							</div>
							<div className='col-12 col-lg-6 mb-lg-5 mb-4'>
								<p className='about-wrapper__text'>
									Margʻilon vodiydagi yirik shaharlar bilan avtomobil yoʻllari
									orqali bogʻlangan. „Margʻilon haqiqati“, „Turon shoyisi“
									gazetalari chiqarilmoqda. Shaharda 1037 oʻringa moʻljallangan
									kasalxonalar, 2 tibbiyot sanitariya qismi, Salomatlik markazi,
									tez tibbiy yordam markazi va boshqa tibbiy muassasalarda 422
									vrach, 1599 oʻrta tibbiy xodim xizmat qiladi. „Atlaschi“ va
									„Turon“ stadionlari, 33 sport zali, koʻplab voleybol,
									basketbol va futbol maydonlari, 3 bolalar va yoshlar sport
									maktabi bor. 56 ta jismoniy tarbiya jamoasida 43 ming nafardan
									ziyod yoshlar shugʻullanmoqda. Meʼmoriy yodgorliklardan Pir
									Siddiq majmui („Kaptarlik“, 18-asr oʻrtalari), Xoʻja Magʻiz
									maqbarasi (18-asrning birinchi yarmi), Chokar, Toronbozor
									masjidlari (20-asr boshlari), Saidahmad Xoja Eshon madrasasi
									(19-asr oxiri) va boshqa saqlanib qolgan. Margʻilonda buyuk
									alloma Burhoniddin Margʻinoniy yashab oʻtgan, shoira Uvaysiy
									(Jahon Otin) tugʻilgan va boshqa bir qancha mashhur kishilar
									ijod qilganlar. Margʻilon shahri ming yillardan beri oʻzining
									usta-hunarmandlari, olimu fuzalolari bilan dunyoga mashhurdir.
									ʻʻAl Hidoyʻʻ xotira majmuasi 2007-yil UNESCO qaroriga binoan
									shahrning 2000 yillik tantanalari oʻtkazildi. Qadimiy Xitoy
									yozma manbalarida Dovonda Lar gi shahri keltirilgan, Xitoy
									olimlari ilmiy ishlarida bu shahar Hozirgi Margʻilon shahriga
									togʻri keladi va bu shahar 2700-yil tarihga ega ekanligini
									isbotlaydi. Yana shaharda,Oʻzbekistondagi eng yirik shoyi
									ishlab chiqaradigan Yodgorlkik shoyi Korhonasi va Turon
									shoyisi Korhonalari joylashgan.Fargʻona vodiysi Shoyi toʻqish
									qachon kelganligi nomaʼlum, lekin eski zamonlardan maʼlumki
									Margʻilon bu sohada juda mashhur boʻlgan.
								</p>
							</div>
							<div className='col-12 col-lg-6 mb-4 mb-lg-5'>
								<img className='about-wrapper__img' src={fes1} alt='' />
							</div>
							{/* <div className='col-12 position-relative'>
								<Link
									to='https://youtu.be/hoWkDGLKhks?si=Px3FsnqTnQA7-oAd'
									target='blank'
									className='frame-img-box'
								>
									<img
										className='about-wrapper__img frame-img'
										src={fes}
										alt=''
									/>
								</Link>
							</div> */}
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
};
export default About;
