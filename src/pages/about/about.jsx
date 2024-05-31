import Navbar from '../../components/navbar/navbar';
import fes from '/src/assets/subnail.jpg';
import Footer from '../../components/footer/footer.jsx';
import './about.css';
import { Link } from 'react-router-dom';
import LocomotiveScroll from 'locomotive-scroll';
import { useEffect, useRef, useState } from 'react';
import api from '../../server/api.js';
import baseurl from '../../server/baseurl.js';
import Loading from '../../components/Animation/loadingHome.jsx';
const About = () => {
	let scroll;
	const lang = localStorage.getItem('lang');
	const [load, setLoad] = useState(false);
	// const [data, setData] = useState([]);
	const [about, setAbout] = useState({});
	const [historical, setHistorical] = useState({});
	const [aboutText, setAboutText] = useState([]);
	const [scholars, setScholar] = useState([]);
	const [alloma, setAlloma] = useState({});
	const body = {
		language: lang,
		pages: 1,
		limit: 40,
		status: true,
	};

	const getAbout = () => {
		api
			.get_about(body)
			.then((res) => {
				console.log(res.data.data);
				setAboutText(res.data.data);
				getScholar();
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const getScholar = () => {
		api
			.get_scholar(body)
			.then((res) => {
				setScholar(res.data.data);
				console.log(scholars);
			})
			.catch((err) => {
				console.log(err);
				setLoad(false);
			});
	};
	const getSettings = () => {
		api
			.get_menu(body)
			.then((res) => {
				res.data.data.map((elem) => {
					if (elem.key == 'about_title') {
						setAbout(elem);
					} else if (elem.key == 'history') {
						setHistorical(elem);
					} else if (elem.key == 'alloma') {
						setAlloma(elem);
					}
				});
				getAbout();
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const scrollRef = useRef();
	useEffect(() => {
		setLoad(true);
		getSettings();
		if (scholars.length > 0) {
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
	}, [scholars.length]);
	return (
		<>
			<div className='wrapper' ref={scrollRef} data-scroll-section>
				<Navbar />
				<div>
					<div className='bg-history'>
						<div className='container'>
							<div className='position-relative'>
								<svg width='580' height='400' className='svg-morph'>
									<path
										id='svg_morph'
										d='m261,30.4375c0,0 114,6 151,75c37,69 37,174 6,206.5625c-31,32.5625 -138,11.4375 -196,-19.5625c-58,-31 -86,-62 -90,-134.4375c12,-136.5625 92,-126.5625 129,-127.5625z'
									></path>
								</svg>
								<div className='about-us'>
									{about?.texts?.length > 0 ? (
										<div
											dangerouslySetInnerHTML={{
												__html: about?.texts[0].text,
											}}
										></div>
									) : (
										''
									)}
								</div>
							</div>
						</div>
					</div>
					<div className='about-wrap '>
						<div className='container'>
							<h3 className='about-wrap__title'>
								{historical?.texts?.length > 0 ? (
									<div
										dangerouslySetInnerHTML={{
											__html: historical?.texts[0].text,
										}}
									></div>
								) : (
									''
								)}
							</h3>
							<div className='about-wrapper row'>
								<div className='col-12 col-lg-6 mb-5 position-relative'>
									<Link
										className='frame-img-box'
										to='https://www.youtube.com/embed/FaHVunR7YTM?si=74zGmncCoH_Kfb1m'
									>
										<img
											className=' about-wrapper__img frame-img'
											src={fes}
											alt=''
										/>
									</Link>
								</div>
								<div className='col-12 col-lg-6 mb-5 position-relative'>
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
											to='https://yandex.uz/maps/geo/771314595/?ll=71.741096%2C40.466611&utm_medium=mapframe&utm_source=maps&z=13.79'
											style={{
												color: '#eee',
												fontSize: '12px',
												position: 'absolute',
												top: '14px',
											}}
										>
											Яндекс Карты
										</Link>
										<iframe
											src='https://yandex.uz/map-widget/v1/?ll=71.741096%2C40.466611&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgk3NzEzMTQ1OTUSLE_Ku3piZWtpc3RvbiwgRmFyZ8q7b25hIHZpbG95YXRpLCBNYXJnyrtpbG9uIgoNCXGPQhVS4CFC&z=13.79'
											width='560'
											height='400'
											allowFullScreen='true'
											style={{ position: 'relative' }}
										></iframe>
									</div>
								</div>
								{aboutText?.length > 0
									? aboutText.map((elem) => (
											<div
												className='col-12 mb-4 mb-lg-5 album__box'
												key={elem.id}
											>
												{elem?.pictures?.length > 0 ? (
													<img
														className=' album__img'
														src={baseurl + elem.pictures[0].image_url}
														alt=''
													/>
												) : (
													''
												)}
												{elem?.texts?.length > 0 ? (
													<p
														dangerouslySetInnerHTML={{
															__html: elem?.texts[0].text,
														}}
													></p>
												) : (
													''
												)}
											</div>
									  ))
									: ''}
								<div className='col-12 mb-4 mb-lg-5 album__box'>
									{aboutText?.pictures?.length > 0 ? (
										<img
											className=' album__img'
											src={baseurl + aboutText.pictures[0].image_url}
											alt=''
										/>
									) : (
										''
									)}
									{aboutText?.texts?.length > 0 ? (
										<p
											dangerouslySetInnerHTML={{
												__html: aboutText?.texts[0].text,
											}}
										></p>
									) : (
										''
									)}
								</div>
								{scholars.length > 0 ? (
									<div className=''>
										{alloma?.texts?.length > 0 ? (
											<div
												dangerouslySetInnerHTML={{
													__html: alloma?.texts[0].text,
												}}
											></div>
										) : (
											''
										)}
										{scholars.map((elem) => (
											<div className='' key={elem.id}>
												<div className='d-flex flex-column album__img'>
													<img
														className='w-100  mb-2'
														src={baseurl + elem.pictures[0].image_url}
														alt=''
													/>
													<span>{elem.age}</span>
												</div>
												<p
													dangerouslySetInnerHTML={{
														__html: elem?.texts[0].text,
													}}
												></p>
											</div>
										))}
									</div>
								) : (
									''
								)}
							</div>
						</div>
					</div>
					<Footer />
				</div>
				<div className={load === true ? 'd-block' : 'd-none'}>
					<Loading />
				</div>
			</div>
		</>
	);
};
export default About;
