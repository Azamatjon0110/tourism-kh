import Navbar from '/src/components/navbar/navbar';
import Footer from '../../components/footer/footer';
import language from '../../assets/lang/language';
import x from '/src/assets/m-images/bg3.jpg';
import './historical.css';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
const Historical = () => {
	const lang = localStorage.getItem('lang');
	const scrollRef = useRef();
	useEffect(() => {
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
			<div className='wrapper' ref={scrollRef} data-scroll-section>
				<Navbar />
				<div className='bg-history'>
					<div className='container'>
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
				<div className='hs-box'>
					<div className='container'>
						<div className='row'>
							<div className='col-12 col-md-6 col-lg-4 col-xl-3 mb-2 mb-md-3 mb-lg-4 '>
								<div className='hs-card'>
									<img className='hs-card__img' src={x} alt='' />
									<h3 className='hs-card__title'>Pir Siddiq majmuasi</h3>
									<div className='d-flex justify-content-center mb-3'>
										<Link
											className='hs-card__link px-2 py-1 rounded-2 '
											to={`/album`}
										>
											{language[lang].home.news_btn}
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Historical;
