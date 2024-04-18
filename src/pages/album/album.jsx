import Navbar from '/src/components/navbar/navbar';
import Footer from '../../components/footer/footer';
import x3 from '/src/assets/images/x9.jpg';
import x2 from '/src/assets/images/x4.jpg';
import './album.css';
const Album = () => {
	return (
		<>
			<Navbar />
			<div className='album'>
				<div className='container'>
					<div className='album__box'>
						<h2 className='album__title'>Xudoyorxon o`rdasi</h2>
						<div className='row'>
							<div className='col-lg-5 mb-3'>
								<img className='album__img' src={x3} alt='' />
							</div>
							<div className='col-12 col-lg-7 mb-3'>
								<p className='album__text'>
									Qoʻqon turli nomlar bilan 10-asrdan maʼlum boʻlgan, ammo uning
									gullagan davri XVIII asrga, yaʼni shahar Qoʻqon xonligining
									poytaxtiga aylanganiga toʻgʻri keladi. Qo`qon qadimiy
									tuzilishni saqlab qolgan, u yangi va eski qismlardan iborat.
									Yangi shahar 19-asrda to`yingan edi. savdo korxonalari,
									maʼmuriy binolar, banklar, sanoatchilarning qasrlari,
									shaharning eski qismida xon saroyi – Oʻrda, xalq turar-joy
									meʼmorchiligi yodgorliklari, masjidlar, madrasalar va
									yodgorlik binolari 19—20-asr boshlarigacha saqlanib qolgan. .
									Shaharning asosiy diqqatga sazovor joylaridan biri – Urda –
									XIX asrning ikkinchi yarmida qurilgan Xudoyorxon saroyi.
									Qurilish sun`iy tepalikda olib borildi. Taxminan 4 gektar
									to`rtburchaklar maydonini egallagan saroy ko`p hovlili
									kompozitsiyadir. Keng rampa sharqqa qaragan portal bilan
									ta`kidlangan asosiy kirish eshigiga olib boradi. Portalning
									kirish joyi (darvozaxona) tepasida arabcha harflar bilan
									“Arkchi oliy Said Muhammad Xudoyorxon” (Said Muhammad
									Xudoyorxonning yuqori xonalari) degan katta yozuv bor.
									1876-yilda kapitan N. N. Voronets, keyinroq topograf A. I.
									Borisovskiy tomonidan tuzilgan Qo‘qon O‘rdasining bosh
									rejalarida ko‘rinib turibdiki, saroy oldida asosiy o‘qda
									mustahkamlangan darvozalari bo‘lgan yopiq maydon bo‘lgan, u
									bog‘ va bog‘lar bilan o‘ralgan edi. devor bilan o`ralgan edi.
									Yuzdan ortiq xonalarni o`z ichiga olgan saroyning murakkab
									rejasi to`rtburchakka (65 X 138 m) mos keladi. Old va yashash
									joylari funktsional jihatdan ajralib turardi. Saroyning
									birinchi yarmida atrofi ayvonli old hovli, qabulxona (kurinish
									xona), xazina (zarrinxona) va alohida hovlili masjid boʻlgan.
									Markaziy qismida qabulxona (salomxona) uchun kichik zal, xon
									uchun bir guruh turar joy (shohnishin) va omborlar bilan
									jihozlangan xoʻjalik hovlisi qurilgan.
								</p>
							</div>

							<div className='col-12 col-lg-7 mb-3'>
								<p className='album__text'>
									Saroyning ikkinchi yarmini bir-biriga bog`langan uchta hovlili
									haram egallagan, bu erda xonning 3-4 qonuniy xotini va
									xizmatkorlari bilan 40 ta kanizak yashagan. 1878-yilda
									Qo‘qonga tashrif buyurgan Mari Burdonning “Parijdan
									Samarqandgacha” kitobidagi rasmlarga qaraganda, haram binolari
									ikki qavatli bo‘lib, yozgi ayvonlar, ayvonlar va yuqori
									qavatdagi o‘tish joylaridan iborat bo‘lgan. Дворец Худояр-хана
									Saroy me’mor Usto Mir Ubaydulla rahbarligida mahalliy
									hunarmandlar mulla Suyarqul, Usto Solixo‘ja va buxorolik Usto
									Fozixo‘jalar tomonidan barpo etilgan. Kuygan g`isht asosiy
									qurilish materiali bo`lib xizmat qilgan. Bino fasadlari va
									interyerining me’moriy dizayni Xudoyorxonning ehtiyotkorligi
									va ziqnaligini o‘zida aks ettirgan. Bosh fasad, darvozaxona va
									asosiy zallarni mo‘l-ko‘l bezatib, qolgan binolarni pardozlash
									bilan shug‘ullanmadi. Sharqiy jabhaning markazida portal
									o`rnatildi, uning yon tomonida dekorativ chiroqli minoralar
									joylashgan bo`lib, u asosiy kirish eshigini ta`kidlaydi.
								</p>
							</div>
							<div className='col-lg-5 mb-3'>
								<img className='album__img' src={x2} alt='' />
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
