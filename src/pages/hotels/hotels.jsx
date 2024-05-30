import Navbar from '/src/components/navbar/navbar';
import Footer from '../../components/footer/footer';
import './hotels.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import api from '../../server/api';
import handleError from '../../server/handle';
import Loading from '../../components/Animation/loading';
import { useSelector } from 'react-redux';
import baseurl from '../../server/baseurl';
const Hotels = () => {
	const lang = useSelector((state) => state.lang.lang);
	const navigate = useNavigate();
	const scrollRef = useRef();
	const [hotels, setHotels] = useState([]);
	const [load, setLoad] = useState(false);
	const [hotel, setHotel] = useState({});
	const [more, setMore] = useState({});
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
				console.log(res.data);
				res.data.data.map((elem) => {
					if (elem.key == 'hotel_title') {
						setHotel(elem);
					} else if (elem.key == 'more') {
						setMore(elem);
					}

					getHotels();
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const getHotels = () => {
		setLoad(true);
		api
			.get_hotels(body)
			.then((res) => {
				setHotels(res.data.data);
				setLoad(false);
			})
			.catch((err) => {
				console.log(err);
				handleError(err);
			});
	};
	useEffect(() => {
		getSettings();
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
	}, [hotels.length]);
	return (
		<>
			<div ref={scrollRef} data-scroll-container>
				<div className='wrapper' data-scroll-section>
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
									{hotel?.texts?.length > 0 ? (
										<div
											dangerouslySetInnerHTML={{
												__html: hotel?.texts[0].text,
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
							<div className='row '>
								{hotels.length > 0
									? hotels.map((elem, i) => (
											<div
												className='col-12 col-md-6 col-lg-4 col-xl-3 mb-2 mb-md-3 mb-lg-4 '
												key={i}
											>
												<div className='hs-card w-100'>
													<img
														className='hs-card__img'
														src={baseurl + elem.pictures[0].image_url}
														alt=''
													/>
													<h3 className='hs-card__title'>{elem.title}</h3>
													<div className='d-flex justify-content-center mb-3'>
														<button
															className='hs-card__link px-2 py-1 rounded-2 '
															type='button'
															onClick={() => {
																navigate({
																	pathname: '/hotel',
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
					<Footer />
					<div className={load === true ? 'd-block' : 'd-none'}>
						<Loading />
					</div>
				</div>
			</div>
		</>
	);
};

export default Hotels;
