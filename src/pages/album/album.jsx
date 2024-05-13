import Navbar from '/src/components/navbar/navbar';
import Footer from '../../components/footer/footer';
import x3 from '/src/assets/m-images/bg32.jpg';
import x2 from '/src/assets/m-images/bg3.jpg';
import './album.css';
const Album = () => {
	return (
		<>
			<Navbar />
			<div className='album'>
				<div className='container'>
					<div className='album__box'>
						<h2 className='album__title'>Pir Siddiq majmuasi</h2>
						<div className='row'>
							<div className='col-lg-5 mb-3'>
								<img className='album__img' src={x2} alt='' />
							</div>
							<div className='col-12 col-lg-7 mb-3'>
								<p className='album__text'>
									Pir Siddiq majmuasi 18-asr oʻrtalarida qurilgan. Vaqt oʻtishi
									bilan uning yonida masjid, minora, qabri boʻlgan hovli,
									darvozaxona va kaptarxona kabi meʼmoriy majmua vujudga kelgan
									va shu sababli majmua “Kaptarlik” – “Kaptar” nomi bilan
									mashhur. Portal-gumbali darvozaxona orqasida, tepasida toʻrt
									qavatli kaptarxona boʻlgan ayvon qurilgan. Majmuaning sharqiy
									qismida ko‘chaga ochiq ayvon masjidi va minorasi qad
									rostlagan. Hovlining orqa tomonida shimolga qaratilgan maqbara
									bo‘lib, unda go‘yoki “muqaddas” Pir Siddiq dafn etilgan. Uning
									nomi bilan bogʻliq afsona bor, bu mahalliy aholi orasida keng
									tarqalgan. Marg‘ilonlik oqsoqollar bir paytlar Pir Siddiq
									kofirlardan yashirinib, g‘orga yashiringani, kaptarlar uya
									qilib, ular bilan birga kirish eshigini devor bilan o‘rab
									olgani haqida gapirib berishdi. Gʻorga yetib borgan
									taʻqibchilar uyalarida jimgina oʻtirgan kaptarlarni koʻrib,
									odam bu erda yashirina olmaydi, aks holda qushlar
									tashvishlanar edi, deb qaror qilib, oʻtib ketishdi. Shu tarzda
									kaptarlar avliyoni qutqardi va shuning uchun ham kaptarlarni
									mahalliy aholi hurmat qilishadi.
								</p>
							</div>

							<div className='col-12 col-lg-7 mb-3'>
								<p className='album__text'>
									{' '}
									Majmuaning o‘zagi Pir Siddiq maqbarasi bir kamerali portal
									maqbaradir. Rejada toʻrtburchak (11,8 X 11 m); chiqib turuvchi
									portal lansetli qabr toshlari joylashgan kvadrat kamera bilan
									birlashtirilgan - sagana. Palataning tekis shiftini toʻrtta
									yogʻoch ustunlar qoʻllab-quvvatlaydi, ulardan birining poyasi,
									poydevori va bosh qismi oʻyilgan naqshlar bilan bezatilgan.
									Farg‘ona vodiysining boshqa bir kamerali maqbaralarida
									bo‘lgani kabi gumbaz qabrning dastlabki qoplamasi bo‘lib
									xizmat qilgan bo‘lishi mumkin. Maqbaraning meʼmoriy
									kompozitsiyasining oʻziga xos xususiyati Fargʻona portali
									boʻlib, u XVIII-XIX asrlarda yodgorlik binolarida keng
									tarqalgan. vodiy boʻylab. Bu ekranga oʻxshaydi - rivojlangan,
									bezakli dasht. Vizual barqarorlik unga portaldan ancha katta,
									engil gumbazli chiroqlar bilan toʻldirilgan nozik burchak
									ustunlari bilan beriladi. Poydevordagi ustunlar dumaloq koʻza
									shakliga ega - kuzagi. Ularning tanasi ganchga oʻyilgan
									geometrik naqsh bilan bezatilgan. Portalning markazida sayoz
									naqshli toʻrtburchaklar bilan hoshiyalangan kirish joyi
									boʻlgan uchli tokcha joylashgan. Ramkaning gorizontal qismida
									ikki qavatli boʻshliqlar qurilgan boʻlib, ularning ustki
									qismida turli naqshli dekorativ shlyapa panjaralari (pand jar)
									boʻlgan galereya (revak) qurilgan. Portal ganchdan yasalgan
									figurali parapet (qoʻngʻir) bilan qoplangan. Kirish tepasida
									toʻrtburchak shakldagi chuqurcha joylashgan boʻlib, qurilgan
									sanasi hijriy 1155 (1742) boʻlgan.
								</p>
							</div>
							<div className='col-lg-5 mb-3'>
								<img className='album__img' src={x3} alt='' />
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Album;
