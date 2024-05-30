import 'react-multi-carousel/lib/styles.css';
import Footer from '../../components/footer/footer.jsx';
import s from '../../assets/m-images/bg4.jpg';
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
import Loading from '../../components/Animation/loadingHome.jsx';
let scroll;
const Home = () => {
	const [load, setLoad] = useState(false);
	const lang = useSelector((state) => state.lang.lang);
	let body = {
		language: lang,
		search: '',
		pages: 1,
		limit: 20,
		current_page: 1,
		status: true,
	};
	const [news, setNews] = useState([]);
	const [newsTitleBox, setNewsTitleBox] = useState([]);
	const [arrMedia, setArrMedia] = useState([]);
	const [museums, setMuseums] = useState([]);
	const [newsTitle, setNewsTitle] = useState([]);
	const [more, setMore] = useState([]);
	const [media, setMedia] = useState({});
	const [history, setHistory] = useState({});
	const [about, setAbout] = useState({});
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
				getNews();
			})
			.catch((err) => console.log(err));
	};
	const getMuseums = () => {
		api
			.get_museums(body)
			.then((res) => {
				setMuseums(res.data.data.slice(0, 3));
			})
			.catch((err) => console.log(err));
	};

	const getSettings = () => {
		api
			.get_menu(body)
			.then((res) => {
				res.data.data.map((elem) => {
					if (elem.key == 'about') {
						setAbout(elem);
					} else if (elem.key == 'media') {
						setMedia(elem);
					} else if (elem.key == 'historical') {
						setHistory(elem);
					} else if (elem.key == 'news') {
						setNewsTitle(elem);
					} else if (elem.key == 'more') {
						setMore(elem);
					}
				});
				getMedia();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getNews = () => {
		api
			.get_news(body)
			.then((res) => {
				setNews(res.data.data.slice(0, 3));
				res.data.data.map((elem) => {
					const regex = /<h2[^>]*>(.*?)<\/h2>/;
					const match = elem.texts[0].text.match(regex);
					if (match && match[1]) {
						setNewsTitleBox([...newsTitleBox, match[1]]);
					} else {
						setNewsTitleBox([]);
					}
				});
				getMuseums();
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		setLoad(true);

		getSettings();
		if (museums.length > 0) {
			setLoad(false);
		}
		scroll = new LocomotiveScroll({
			el: scrollRef.current,
			smooth: true,
			getSpeed: true,
			getDirection: true,
			smartphone: {
				smooth: false,
			},
			tablet: {
				smooth: false,
			},
		});
		scroll.update();
		return () => {
			if (scroll) scroll.destroy();
		};
	}, [museums.length]);
	return (
		<>
			<div className='wrapper' ref={scrollRef} data-scroll-container>
				<div className='' data-scroll-section>
					<Navbar />
					<Carusel />
					<div className='about position-relative'>
						<div className='container'>
							<div className=''>
								<h3 className='about-title text-center'>
									{about?.texts?.length > 0 ? (
										<div
											style={{}}
											dangerouslySetInnerHTML={{
												__html: about?.texts[0].text,
											}}
										></div>
									) : (
										''
									)}
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
											{more?.texts?.length > 0 ? (
												<div
													dangerouslySetInnerHTML={{
														__html: more?.texts[0].text,
													}}
												></div>
											) : (
												''
											)}
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
									{history?.texts?.length > 0 ? (
										<div
											dangerouslySetInnerHTML={{
												__html: history?.texts[0].text,
											}}
										></div>
									) : (
										''
									)}
								</h4>
								<div className='row'>
									{museums.length > 0
										? museums.map((item) => (
												<div
													className='col-12 col-md-6 col-lg-4'
													key={item.id}
													data-scroll
													data-scroll-speed='1'
												>
													<div className='historical-places__card'>
														<img
															className='historical-places__img'
															src={
																item?.pictures.length > 0
																	? baseurl + item.pictures[0].image_url
																	: ''
															}
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
											onClick={() => navigate('/historical_places')}
										>
											{more?.texts?.length > 0 ? (
												<div
													dangerouslySetInnerHTML={{
														__html: more?.texts[0].text,
													}}
												></div>
											) : (
												''
											)}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='news'>
						<div className='container'>
							{newsTitle?.texts?.length > 0 ? (
								<h3 className='galary-title'>
									<div
										dangerouslySetInnerHTML={{
											__html: newsTitle?.texts[0].text,
										}}
									></div>
								</h3>
							) : (
								''
							)}
							<div className='row' data-scroll>
								{news.length > 0
									? news.map((elem, ind) => (
											<div className='col-12 col-md-6 col-lg-4' key={elem.id}>
												<div className='card-news'>
													<img
														className='news-img w-100 me-0'
														src={
															elem.pictures.length > 0
																? baseurl + elem.pictures[0].image_url
																: ''
														}
														alt=''
													/>
													<h2
														className='news-title'
														dangerouslySetInnerHTML={{
															__html: newsTitleBox[ind],
														}}
													></h2>
												</div>
											</div>
									  ))
									: ''}
							</div>
							<button className='news-btn' onClick={() => navigate('/news')}>
								{more?.texts?.length > 0 ? (
									<div
										dangerouslySetInnerHTML={{
											__html: more?.texts[0].text,
										}}
									></div>
								) : (
									''
								)}
							</button>
						</div>
					</div>
					<div className='frame-box'>
						<div></div>
						<video className='frame' loop autoPlay muted>
							<source src={frame} type='video/mp4' />
						</video>
					</div>

					<div className='galary'>
						<div className='container'>
							<h4 className='galary-title'>
								{media?.texts?.length > 0 ? (
									<div
										dangerouslySetInnerHTML={{
											__html: media?.texts[0].text,
										}}
									></div>
								) : (
									''
								)}
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
							{' '}
							{more?.texts?.length > 0 ? (
								<div
									dangerouslySetInnerHTML={{
										__html: more?.texts[0].text,
									}}
								></div>
							) : (
								''
							)}
						</button>
					</div>
					<Footer />
				</div>
			</div>
			<div className={load === true ? 'd-block' : 'd-none'}>
				<Loading />
			</div>
		</>
	);
};

export default Home;
