import Navbar from '/src/components/navbar/navbar';
import Footer from '../../components/footer/footer';
// import Scholar from '../scholar/scholar';
import './historical.css';
// import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import api from '../../server/api';
import Loading from '../../components/Animation/loadingHome';
import handleError from '../../server/handle';
import { useNavigate } from 'react-router';
import baseurl from '../../server/baseurl';
const Historical = () => {
	const navigate = useNavigate();
	const lang = localStorage.getItem('lang');
	const [museum, setMuseum] = useState([]);
	const [mtitle, setMtitle] = useState({});
	const [more, setMore] = useState({});
	const [load, setLoad] = useState(false);
	const scrollRef = useRef();
	const body = {
		language: lang,
		search: '',
		pages: 1,
		limit: 20,
		current_page: 1,
	};

	const getSettings = () => {
		api
			.get_menu(body)
			.then((res) => {
				setLoad(false);
				res.data.data.map((elem) => {
					if (elem.key == 'his_title') {
						setMtitle(elem);
					} else if (elem.key == 'more') {
						setMore(elem);
					}
					// else if (elem.key == 'hotel') {
					// 	setHotel(elem);
					// } else if (elem.key == 'gid') {
					// 	setGid(elem);
					// } else if (elem.key == 'offset') {
					// 	setOffset(elem);
					// } else if (elem.key == 'media') {
					// 	setMedia(elem);
					// } else if (elem.key == 'history') {
					// 	setHistory(elem);
					// } else if (elem.key == 'historical') {
					// 	setHistorical(elem);
					// } else if (elem.key == 'plan') {
					// 	setPlan(elem);
					// }
					getMuseums();
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const getMuseums = () => {
		api
			.get_museums(body)
			.then((res) => {
				if (res.status == 200) {
					setLoad(false);
				}
				setLoad(false);
				setMuseum(res.data.data);
			})
			.catch((err) => {
				console.log(err);
				handleError(err);
			});
	};
	useEffect(() => {
		setLoad(true);
		getSettings();
		getMuseums();
		if (museum.length > 0) {
			setLoad(false);
		}
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
		scroll.update();
		return () => scroll.destroy();
	}, [museum.length]);
	return (
		<>
			<div className='wrapper' ref={scrollRef} data-scroll-container>
				<Navbar />
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
								{mtitle?.texts?.length > 0 ? (
									<div
										dangerouslySetInnerHTML={{
											__html: mtitle?.texts[0].text,
										}}
									></div>
								) : (
									''
								)}
							</div>
						</div>
					</div>
				</div>
				<div className='hs-box'>
					<div className='container'>
						<div className='row'>
							{museum.length > 0
								? museum.map((elem, i) => (
										<div
											className='col-12 col-md-6 col-lg-4 col-xl-3 mb-2 mb-md-3 mb-lg-4 '
											key={i}
										>
											<div className='hs-card w-100' key={i}>
												<img
													className='hs-card__img'
													src={baseurl + elem.pictures[0].image_url}
													alt=''
												/>
												<h3 className='hs-card__title'>{elem.title}</h3>
												<div className='d-flex justify-content-center'>
													<button
														className='hs-card__link px-2 py-1 rounded-2 '
														type='button'
														onClick={() => {
															navigate({
																pathname: '/album',
																search: `id=${elem.id}`,
															});
														}}
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
								  ))
								: ''}
						</div>
					</div>
				</div>
				<div className={load === true ? 'd-block' : 'd-none'}>
					<Loading />
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Historical;
