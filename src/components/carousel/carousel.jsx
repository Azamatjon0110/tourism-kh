import frame from '/src/assets/frame.mp4';
import x2 from '/src/assets/s2.jpg';
import x3 from '/src/assets/s1.jpg';
import './carusel.css';
import { useState } from 'react';
import 'react-multi-carousel/lib/styles.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect } from 'react';
import api from '../../server/api';
import { useSelector } from 'react-redux';
const settingsV = {
	dots: true,
	infinite: true,
	autoplay: true,
	speed: 500,
	autoplaySpeed: 7000,
	slidesToShow: 1,
	slidesToScroll: 1,
	vertical: true,
	verticalSwiping: true,
};
// const responsive = {
// 	superLargeDesktop: {
// 		// the naming can be any, depends on you.
// 		breakpoint: { max: 4000, min: 3000 },
// 		items: 1,
// 	},
// 	desktop: {
// 		breakpoint: { max: 3000, min: 1024 },
// 		items: 1,
// 	},
// 	tablet: {
// 		breakpoint: { max: 1024, min: 464 },
// 		items: 1,
// 	},
// 	mobile: {
// 		breakpoint: { max: 464, min: 0 },
// 		items: 1,
// 	},
// };
const Carusel = () => {
	const lang = useSelector((state) => state.lang.lang);
	const [open, setOpen] = useState(false);

	const [home, setHome] = useState({});
	const [crs] = useState([x2, x3, x2, x3, x2, x3, x2, x3]);
	let body = {
		language: lang,
		search: '',
		pages: 1,
		limit: 20,
		current_page: 1,
		status: true,
	};
	const getSettings = () => {
		api
			.get_menu(body)
			.then((res) => {
				setHome();
				res.data.data.map((elem) => {
					if (elem.key == 'home-text') {
						setHome(elem);
					}
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	if (open == true) {
		document.querySelector('.modal-menu').classList.add('active-m');
		document.querySelector('.wrapper').classList.add('md-scroll');
		document.querySelector('.atlas-video').play();
	}
	useEffect(() => {
		getSettings();
	}, []);
	return (
		<>
			<div className=''>
				<div className='container'>
					<div className='crs-box '>
						<div className='position-relative'>
							<svg width='580' height='400' className='svg-morph'>
								<path
									id='svg_morph'
									d='m261,30.4375c0,0 114,6 151,75c37,69 37,174 6,206.5625c-31,32.5625 -138,11.4375 -196,-19.5625c-58,-31 -86,-62 -90,-134.4375c12,-136.5625 92,-126.5625 129,-127.5625z'
								></path>
							</svg>
							{home?.texts?.length > 0 ? (
								<div
									className=''
									style={{ zIndex: 5 }}
									dangerouslySetInnerHTML={{
										__html: home?.texts[0].text,
									}}
								></div>
							) : (
								''
							)}
						</div>
					</div>
				</div>
			</div>
			<div className='img-box '>
				<div className='slider-container'>
					<Slider {...settingsV}>
						{crs.map((item) => (
							<div className='wrap-position' key={item}>
								<img className='crs-img' src={item} alt='' />
							</div>
						))}
					</Slider>
				</div>
				<div
					className='play-now'
					onClick={() => {
						setOpen(false);
						document.querySelector('.modal-video').classList.add('active-m');
					}}
				>
					<p className='play-btn'></p>
					<svg
						version='1.1'
						xmlns='http://www.w3.org/2000/svg'
						x='0px'
						y='0px'
						className='video-svg'
						viewBox='0 0 300 300'
						enableBackground='new 0 0 300 300'
						xmlSpace='preserve'
					>
						<defs>
							<path
								id='circlePath'
								d='M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 '
							/>
						</defs>
						<circle cx='150' cy='100' r='75' fill='none' />
						<g className='video-play'>
							<use xlinkHref='#circlePath' fill='none' />
							<text>
								<textPath xlinkHref='#circlePath'>
									PLAY NOW - PLAY NOW - PLAY NOW -
								</textPath>
							</text>
						</g>
					</svg>
				</div>
			</div>
			<div className='modal-video'>
				<div className='con-modal'>
					<div className='video-body'>
						<div className='modal-header'>
							<h1 className='mb-0 fs-5 ' id='staticBackdropLabel'>
								Atlas festivali
							</h1>
							<button
								type='button'
								className='btn-close me-0'
								onClick={() => {
									document
										.querySelector('.modal-video')
										.classList.remove('active-m');
								}}
							></button>
						</div>
						<div className='modal-body'>
							<video
								className='w-100 atlas-video'
								src={frame}
								loop
								autoPlay
								muted
								controls
							></video>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Carusel;
