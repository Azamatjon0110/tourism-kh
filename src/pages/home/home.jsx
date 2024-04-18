import Carusel from '../../components/carousel/carousel.jsx';
import Footer from '../../components/footer/footer.jsx';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import language from '../../assets/lang/language.jsx';
import s from '../../assets/images/s.jpg';
import festival from '/src/assets/images/festival.jpg';
import x4 from '/src/assets/images/x4.jpg';
import shape from '../../assets/images/title-shape.png';
import './home.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Home = () => {
	const lang = localStorage.getItem('lang');
	const [arr, setArr] = useState([]);
	let navigate = useNavigate();
	// const newsText = () => {
	// 	const news = document.querySelectorAll('.card-news');
	// 	news.forEach(() => {
	// 		// if (item.textContent.length > 100) {
	// 		// 	item.classNameList.add('dot');
	// 		// 	item.textContent.slice(0, 100);
	// 		// }
	// 		// console.log(item);
	// 	});
	// };

	function a() {
		setArr([1, 2, 3]);

		// newsText();
	}
	useEffect(() => {
		a();
	}, [arr.length]);
	return (
		<>
			<Carusel />
			<div className='about'>
				<div className='container'>
					<img className='shape mx-auto' src={shape} alt='' />
					<h3 className='about-title text-center'>
						{language[lang].home.about_title}
					</h3>
					<div className='row mb-4'>
						<div
							className='col-lg-7  col-12'
							data-aos='fade-up'
							data-aos-duration='800'
						>
							<img src={s} className='about-img' alt='' />
						</div>
						<div
							className='col-lg-5 col-12'
							data-aos='fade-up'
							data-aos-duration='1600'
						>
							<div className='about-info'>
								<p className='about-text'>
									Qoʻqon — Oʻzbekiston Respublikasi shahar. Soʻx daryosining
									(tarmogʻi) quyi oqimida joylashgan. Aholisi — 310716 nafar
									(2020-yil). Qoʻqon xonligining poytaxti boʻlgan. Bu shahar
									Fargʻona viloyatining yirik shaharlaridan biridir.
								</p>
								<button className='news-btn' onClick={() => navigate('/about')}>
									{language[lang].home.news_btn}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='news'>
				<div className='container'>
					<img className='shape' src={shape} alt='' />
					<h3 className='about-title'>{language[lang].home.news_title}</h3>
					<div className='row'>
						{arr.map((item) => (
							<div className='col-12 col-md-6 col-lg-4 news-box' key={item}>
								<div className='card-news' data-aos='flip-up'>
									<img className='news-img text-center' src={festival} alt='' />
									<h3 className='news-title '>Yangilliklar</h3>
									<p className='news-text'>
										21-23 sentyabr kunlari Qo‘qon shahrida bo‘lib o‘tgan
										ikkinchi Xalqaro hunarmandchilik festivali katta bayram
										shodiyonasi bilan yakunlandi.
									</p>
									<button
										className='news-btn'
										onClick={() => navigate('/news')}
									>
										{language[lang].home.news_btn}
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className='galary'>
				<div className='container'>
					<img className='shape' src={shape} alt='' />
					<h4 className='galary-title'>{language[lang].home.galary_title}</h4>
				</div>
				<Carousel
					responsive={{
						superLargeDesktop: {
							// the naming can be any, depends on you.
							breakpoint: { max: 4000, min: 3000 },
							items: 4,
						},
						desktop: {
							breakpoint: { max: 3000, min: 1024 },
							items: 3,
						},
						tablet: {
							breakpoint: { max: 1024, min: 768 },
							items: 2,
						},
						mobile: {
							breakpoint: { max: 768, min: 0 },
							items: 1,
						},
					}}
					additionalTransfrom={0}
					arrows
					autoPlay
					autoPlaySpeed={8000}
					centerMode={false}
					customTransition='all 10s linear'
					draggable
					focusOnSelect={false}
					infinite
					itemClass='galary-item'
					minimumTouchDrag={80}
					renderArrowsWhenDisabled={false}
					renderButtonGroupOutside={false}
					renderDotsOutside={false}
				>
					<img className='galary-img' src={x4} alt='' />
					<img className='galary-img' src={x4} alt='' />
					<img className='galary-img' src={x4} alt='' />
					<img className='galary-img' src={x4} alt='' />
					<img className='galary-img' src={x4} alt='' />
				</Carousel>
			</div>
			<Footer />
		</>
	);
};

export default Home;
