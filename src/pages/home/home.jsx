// import Carusel from '../../components/carousel/carousel.jsx';
import 'react-multi-carousel/lib/styles.css';
import Footer from '../../components/footer/footer.jsx';
import language from '../../assets/lang/language.jsx';

import s from '../../assets/m-images/bg4.jpg';
import fes1 from '../../assets/m-images/fes1.jpg';
import fes2 from '../../assets/m-images/fes2.jpg';
import fes3 from '../../assets/m-images/fes3.jpg';
import Globus from '/src/assets/m-images/globe-solid.svg';
import './home.css';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import LocomotiveScroll from 'locomotive-scroll';
import Carusel from '../../components/carousel/carousel.jsx';
import Slider from 'react-slick';
import api from '../../server/api.js';
import baseurl from '../../server/baseurl.js';
import frame from '/src/assets/frame.mp4';
import Navbar from '../../components/navbar/navbar.jsx';
const Home = () => {
	const lang = useSelector((state) => state.lang.lang);
	let body = {
		language: lang,
		search: '',
		pages: 1,
		limit: 20,
		current_page: 1,
		status: true,
	};
	// const [arr, setArr] = useState([]);
	const [arrMedia, setArrMedia] = useState([]);
	const [hotels, setHotels] = useState([]);
	const [news, setNews] = useState([]);
	const [textArr] = useState([
		{
			id: 1,
			title: 'Atlas Festivali',
			text: 'Margʼilonda oʼtkazilayotgan atlas bayrami doirasida «Zamonaviy dunyoda anʼanaviy toʼqimachilikning oʼrni» mavzusida xalqaro ilmiy amaliy anjuman boʼlib oʼtdi',
			img: fes1,
		},
		{
			id: 2,
			title: 'Atlas Festivali',
			text: `Marg‘ilonda “Atlas bayrami” festival doirasida “Zamonaviy dunyoda an’anaviy to‘qimachilikning o‘rni” mavzuida xalqaro ilmiy-amaliy konferensiya boshlandi. Tadbirda dunyoning 20 dan ortiq davlatidan ma’ruzachilar va dizaynerlar ishtirok etmoqda.
			“Atlas bayram” xalqaro an’anaviy to‘qimachilik festivali 22-oktabrga qadar davom etadi.`,
			img: fes2,
		},
		{
			id: 3,
			title: 'Atlas Festivali',
			text: 'Margʼilonda oʼtkazilayotgan atlas bayrami doirasida «Zamonaviy dunyoda anʼanaviy toʼqimachilikning oʼrni» mavzusida xalqaro ilmiy amaliy anjuman boʼlib oʼtdi',
			img: fes3,
		},
	]);
	let navigate = useNavigate();
	const scrollRef = useRef(null);
	const settings = {
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		speed: 3000,
		autoplaySpeed: 1000,
		cssEase: 'linear',
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	const getMedia = () => {
		api
			.get_media(body)
			.then((res) => {
				setArrMedia(res.data);
				getHotels();
			})
			.catch((err) => console.log(err));
	};
	const getHotels = () => {
		api
			.get_museums(body)
			.then((res) => {
				setHotels(res.data.data);
				getNews();
			})
			.catch((err) => console.log(err));
	};
	const getNews = () => {
		api
			.get_news(body)
			.then((res) => {
				setNews(res.data.data);
				console.log(news);
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		// setArr([1, 2, 3]);
		// document.querySelector('.ytp-large-play-button').onClick();
		getMedia();
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
				<div data-scroll-section>
					<Navbar />
					<Carusel />
					<div className='about position-relative'>
						<div className='container'>
							<div className=''>
								<h3 className='about-title text-center'>
									{language[lang].home.about_title}
								</h3>
							</div>
							<div className='row mb-4'>
								<div
									className='col-lg-7  col-12 mb-3 mb-lg-0'
									data-scroll
									data-scroll-speed='1'
								>
									<img src={s} className='about-img' alt='' />
								</div>
								<div
									className='col-lg-5 col-12'
									data-scroll
									data-scroll-speed='2'
								>
									<div className='about-info'>
										<div className='d-flex'>
											<img className='about-info__img' src={Globus} alt='' />
											<p className='about-text'>
												Margʻilon (boshqa nomlari Margilan, Margelan) –
												Oʻzbekiston shaharlaridan biri. Fargʻona viloyatida
												joylashgan. Aholisi 246,7 ming kishi.[2] Shaharda 30 dan
												artiq millat va elatlar istiqomat qiladi. Jumladan, 91,9
												% oʻzbeklar, 3,1 % ruslar, 1,4 % tatarlar. Shahar iqlimi
												– kontinental, qish yumshoq, yoz esa juda issiq keladi.
											</p>
										</div>
										<button
											className='news-btn'
											onClick={() => navigate('/about')}
										>
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
								<h4 className='galary-title'>
									{language[lang].home.navbar.his_pl}
								</h4>
								<div className='row'>
									{hotels.length > 0
										? hotels.map((item) => (
												<div
													className='col-12 col-md-6 col-lg-4'
													key={item.id}
													data-scroll
													data-scroll-speed='1'
												>
													<div className='historical-places__card'>
														<img
															className='historical-places__img'
															src={s}
															alt=''
														/>
														<div className='historical-places__body'>
															<h4 className='historical-places__title'>
																{item.title}
															</h4>
														</div>
													</div>
												</div>
										  ))
										: ''}
									<div className='d-flex mt-3'>
										<button
											className='news-btn'
											onClick={() => navigate('/historical')}
										>
											{language[lang].home.news_btn}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='frame-box'>
						<div></div>
						<video className='frame' loop autoPlay muted>
							<source src={frame} type='video/mp4' />
						</video>
					</div>
					<div className='news'>
						<div className='container'>
							<h3 className='about-title'>{language[lang].home.news_title}</h3>
							<div className='row'>
								{textArr.map((item, index) => (
									<div
										className='col-12 col-md-6 col-lg-4 news-box'
										key={item.id}
										data-scroll
										data-scroll-speed={index + 1}
									>
										<div className='card-news'>
											<img
												className='news-img text-center'
												src={item.img}
												alt=''
											/>
											<h3 className='news-title align-start'>{item.title}</h3>
											<p className='news-text'>{item.text}</p>
										</div>
									</div>
								))}
							</div>
							<button className='news-btn' onClick={() => navigate('/news')}>
								{language[lang].home.news_btn}
							</button>
						</div>
					</div>
					<div className='galary' data-scroll-section>
						<div className='container'>
							<h4 className='galary-title'>
								{language[lang].home.galary_title}
							</h4>
						</div>
						<Slider {...settings}>
							{arrMedia.map((elem) => (
								<img
									className='galary-img'
									src={baseurl + elem.image_url}
									key={elem}
									alt=''
								/>
							))}
						</Slider>
						<button
							className='news-btn mt-3 mt-lg-5'
							onClick={() => navigate('/media')}
						>
							{language[lang].home.news_btn}
						</button>
					</div>
					<Footer data-scroll />
					<div className='wrapper'></div>
				</div>
			</div>
		</>
	);
};

export default Home;
