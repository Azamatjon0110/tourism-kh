import Carusel from '../../components/carousel/carousel.jsx';
import Footer from '../../components/footer/footer.jsx';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import language from '../../assets/lang/language.jsx';
import s from '../../assets/images/x8.jpg';
import festival from '/src/assets/images/festival.jpg';
import x4 from '/src/assets/images/x4.jpg';
import shape from '../../assets/images/title-shape.png';
import hamza from '/src/assets/images/niyoziy.jpeg';
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
			<div className='historical-places'>
				<div className='container'>
					<div className='historical-places__box'>
						<img className='shape' src={shape} alt='' />
						<h4 className='galary-title'>
							{language[lang].home.navbar.his_pl}
						</h4>
						<div className='row'>
							<div className='col-12 col-md-2 col-lg-4'>
								<div className='historical-places__card'>
									<img className='historical-places__img' src={s} alt='' />
									<div className='historical-places__body'>
										<h4 className='historical-places__title'>
											Xudoyorxon o`rdasi
										</h4>
										<p className='historical-places__text'>
											Qoʻqon turli nomlar bilan 10-asrdan maʼlum boʻlgan, ammo
											uning gullagan davri XVIII asrga, yaʼni shahar Qoʻqon
											xonligining poytaxtiga aylanganiga toʻgʻri keladi.
										</p>
										<button
											className='news-btn'
											onClick={() => navigate('/album')}
										>
											{language[lang].home.news_btn}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='alloma'>
				<div className='container'>
					<div className='alloma__box'>
						<img className='shape mx-auto' src={shape} alt='' />
						<h4 className='about-title text-center'>
							{language[lang].scholar.main_title}
						</h4>
						<ul className='alloma__list list-unstyled row'>
							<li className='alloma__item col-12 col-md-6 col-lg-4 mb-3 mb-lg-4'>
								<div className='alloma__info card-news'>
									<img className='w-100' src={hamza} alt='' />
									<h4 className='news-title'>Hamza Hakimzoda Niyoziy</h4>
								</div>
							</li>
						</ul>
						<button className='news-btn' onClick={() => navigate('/scholar')}>
							{language[lang].home.news_btn}
						</button>
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
									<h3 className='news-title align-start'>
										{language[lang].news.news_title}
									</h3>
									<p className='news-text'>
										21-23 sentyabr kunlari Qo‘qon shahrida bo‘lib o‘tgan
										ikkinchi Xalqaro hunarmandchilik festivali katta bayram
										shodiyonasi bilan yakunlandi.
									</p>
								</div>
							</div>
						))}
					</div>
					<button className='news-btn' onClick={() => navigate('/news')}>
						{language[lang].home.news_btn}
					</button>
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
				<button
					className='news-btn mt-3 mt-lg-5'
					onClick={() => navigate('/media')}
				>
					{language[lang].home.news_btn}
				</button>
			</div>
			<Footer />
		</>
	);
};

export default Home;
