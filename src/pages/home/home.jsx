// import Carusel from '../../components/carousel/carousel.jsx';
import 'react-multi-carousel/lib/styles.css';
import Footer from '../../components/footer/footer.jsx';
// import Carousel from 'react-multi-carousel';
import language from '../../assets/lang/language.jsx';

import s from '../../assets/m-images/bg4.jpg';
import fes1 from '../../assets/m-images/fes1.jpg';
import fes2 from '../../assets/m-images/fes2.jpg';
import fes3 from '../../assets/m-images/fes3.jpg';
import img1 from '../../assets/m-images/img1.jfif';
import img2 from '../../assets/m-images/img2.jfif';
import img3 from '../../assets/m-images/img3.jfif';
import img4 from '../../assets/m-images/img4.jfif';
import img5 from '../../assets/m-images/img5.jfif';
import img6 from '../../assets/m-images/img6.jfif';
// import festival from '/src/assets/images/festival.jpg';
// import x4 from '/src/assets/images/x4.jpg';
import Globus from '/src/assets/m-images/globe-solid.svg';
import shape from '../../assets/images/title-shape.png';
// import hamza from '/src/assets/images/niyoziy.jpeg';
import './home.css';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import LocomotiveScroll from 'locomotive-scroll';
import Carusel from '../../components/carousel/carousel.jsx';
import Slider from 'react-slick';
const Home = () => {
	const lang = useSelector((state) => state.lang.lang);
	const [arr, setArr] = useState([]);
	const [arrMedia, setArrMedia] = useState([]);
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
	};
	function a() {
		setArr([1, 2, 3]);
		setArrMedia([img1, img2, img3, img4, img5, img6]);
	}
	useEffect(() => {
		a();
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
		});
		return () => scroll.destroy();
	}, [arr.length]);
	return (
		<>
			<div ref={scrollRef} data-scroll-section>
				<div className='wrapper'>
					<Carusel />
					<div className='about'>
						<div className='container'>
							<img className='shape mx-auto' src={shape} alt='' />
							<h3 className='about-title text-center'>
								{language[lang].home.about_title}
							</h3>
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
								<img className='shape' src={shape} alt='' />
								<h4 className='galary-title'>
									{language[lang].home.navbar.his_pl}
								</h4>
								<div className='row'>
									<div
										className='col-12 col-md-6 col-lg-4'
										data-scroll
										data-scroll-speed='1'
									>
										<div className='historical-places__card'>
											<img className='historical-places__img' src={s} alt='' />
											<div className='historical-places__body'>
												<h4 className='historical-places__title'>
													Pir Siddiq majmuasi
												</h4>
												<p className='historical-places__text'>
													Pir Siddiq majmuasi 18-asr oʻrtalarida qurilgan. Vaqt
													oʻtishi bilan uning yonida masjid, minora, qabri
													boʻlgan hovli, darvozaxona va kaptarxona kabi meʼmoriy
													majmua vujudga kelgan va shu sababli majmua
													“Kaptarlik” – “Kaptar” nomi bilan mashhur...
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
					{/* <div className='alloma'>
					<div className='container'>
						<div className='alloma__box'>
							<img className='shape mx-auto' src={shape} alt='' />
							<h4 className='about-title text-center'>
								{language[lang].scholar.main_title}
							</h4>
							<ul className='alloma__list list-unstyled row'>
								<li
									className='alloma__item col-12 col-md-6 col-lg-4 mb-3 mb-lg-4'
									data-scroll
									data-scroll-speed='1.5'
								>
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
				</div> */}
					<div className='news'>
						<div className='container'>
							<img className='shape' src={shape} alt='' />
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
					<div className='galary'>
						<div className='container'>
							<img className='shape' src={shape} alt='' />
							<h4 className='galary-title'>
								{language[lang].home.galary_title}
							</h4>
						</div>
						<Slider {...settings}>
							{arrMedia.map((elem) => (
								<img className='galary-img' src={elem} key={elem} alt='' />
							))}
						</Slider>
						<button
							className='news-btn mt-3 mt-lg-5'
							onClick={() => navigate('/media')}
						>
							{language[lang].home.news_btn}
						</button>
					</div>
					<Footer />
				</div>
			</div>
		</>
	);
};

export default Home;
