import Navbar from '/src/components/navbar/navbar';
import Footer from '../../components/footer/footer';
// import Scholar from '../scholar/scholar';
import language from '../../assets/lang/language';
import './historical.css';
// import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import api from '../../server/api';
import Loading from '../../components/Animation/loading';
import handleError from '../../server/handle';
import { useNavigate } from 'react-router';
import baseurl from '../../server/baseurl';
const Historical = () => {
	const navigate = useNavigate();
	const lang = localStorage.getItem('lang');
	const [museum, setMuseum] = useState([]);
	const [load, setLoad] = useState(false);
	const scrollRef = useRef();
	const body = {
		language: lang,
		search: '',
		pages: 1,
		limit: 20,
		current_page: 1,
	};
	const getMuseums = () => {
		setLoad(true);
		api
			.get_museums(body)
			.then((res) => {
				if (res.status == 200) {
					setLoad(false);
				}
				console.log(res);
				setMuseum(res.data.data);
			})
			.catch((err) => {
				console.log(err);
				handleError(err);
			});
	};
	useEffect(() => {
		getMuseums();
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
	}, [museum.length]);
	return (
		<>
			<div className='wrapper' ref={scrollRef} data-scroll-section>
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
								<h1 className='about-us__title'>
									{language[lang].home.navbar.his_pl}
								</h1>
								<p className='about-us__text'>
									{language[lang].historical.main_text}
								</p>
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
														{language[lang].home.news_btn}
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
		</>
	);
};

export default Historical;
