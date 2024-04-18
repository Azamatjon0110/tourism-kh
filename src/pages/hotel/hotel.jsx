import Navbar from '/src/components/navbar/navbar';
import Footer from '../../components/footer/footer';
// import language from '../../assets/lang/language';
import './hotel.css';
import { useNavigate } from 'react-router';
// import { Link } from 'react-router-dom';
const Hotel = () => {
	// const lang = localStorage.getItem('lang');
	const navigate = useNavigate();
	return (
		<>
			<Navbar />
			<div className='bg-history'>
				<div className='container'>
					<p className='back' onClick={() => navigate(-1)}>
						back
					</p>
					<div className='hotel row'>
						<div className='col-12 col-md-6 col-lg-5'>
							<img
								className='hotel__img'
								src='/src/assets/images/asr.jpg'
								alt=''
							/>
						</div>
						<div className='col-12 col-md-6 col-lg-7'>
							<p className='hotel__text'>
								O‘zbekiston. Qo‘qon. Sizning e`tiboringizga loyiq mehmonxonalar.
								Biz allaqachon sizga eng yaxshi, eng foydali takliflarni taqdim
								etdik. “Asr Qokand” mehmonxonasi yashash uchun ajoyib sharoitga
								ega va shahar markaziga yaqin joylashgan. Qulay joylashuv,
								yuqori darajadagi xizmat ko‘rsatish, sanoat tartibi va
								xonalarning mavjudligi, shuningdek, arzon narxlar – bularning
								barchasi “Asr Kokand” mehmonxonasini Qo‘qondagi eng yaxshi
								mehmonxonaga aylantiradi. Shaharga o‘z transportisiz kelgan
								mehmonlar uchun bepul mashinalar joylari mavjud. “As rKokand”
								mehmonxonasi “Standart”, “Deluxe” va “Lyuks” toifalarida taqdim
								etilgan bir, ikki va uch xonali turar joy uchun qulay xonalarni
								taklif etadi.
							</p>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default Hotel;
