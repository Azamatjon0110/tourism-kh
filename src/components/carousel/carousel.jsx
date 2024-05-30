import frame from '/src/assets/frame.mp4';
import x2 from '/src/assets/s2.jpg';
import x3 from '/src/assets/s1.jpg';
import './carusel.css';
import { useState } from 'react';
// import language from '../../assets/lang/language';
import 'react-multi-carousel/lib/styles.css';
// import Carousel from 'react-multi-carousel';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
// import { useEffect } from 'react';
// import Navbar from '../navbar/navbar';
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
	const [crs] = useState([x2, x3, x2, x3, x2, x3, x2, x3]);
	// useEffect(() => {
	// 	const btns = document.querySelectorAll('.slick-arrow');
	// 	btns.forEach((item, index) => {
	// 		if (index % 2 == 0) {
	// 			item.textContent = '';
	// 			// item.style.backgroundImage = url(arrow);
	// 			// const elem = document.createElement('i');
	// 			// elem.classList.add('fa-solid');
	// 			// elem.classList.add('fa-angle-up');
	// 			// item.appendChild();
	// 		} else {
	// 			item.textContent = '';
	// 			// const elem = document.createElement('i');
	// 			// elem.classList.add('fa-solid');
	// 			// elem.classList.add('fa-angle-down');
	// 			// item.appendChild(elem);
	// 		}
	// 	});
	// }, []);
	return (
		<>
			<div className=''>
				<div className='container'>
					<div className='crs-box position-relative'>
						<svg width='580' height='400' className='svg-morph'>
							<path
								id='svg_morph'
								d='m261,30.4375c0,0 114,6 151,75c37,69 37,174 6,206.5625c-31,32.5625 -138,11.4375 -196,-19.5625c-58,-31 -86,-62 -90,-134.4375c12,-136.5625 92,-126.5625 129,-127.5625z'
							></path>
						</svg>
						<h1 className='crs-title'>Marg`ilon</h1>
					</div>
				</div>
			</div>
			<div className='img-box '>
				<div
					className='play-now'
					data-bs-toggle='modal'
					data-bs-target='#staticBackdrop12'
				>
					<p className='play-btn'></p>
					<svg
						version='1.1'
						xmlns='http://www.w3.org/2000/svg'
						x='0px'
						y='0px'
						width='300px'
						height='300px'
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
						<g>
							<use xlinkHref='#circlePath' fill='none' />
							<text>
								<textPath xlinkHref='#circlePath'>
									PLAY NOW - PLAY NOW - PLAY NOW -
								</textPath>
							</text>
						</g>
					</svg>
				</div>
				<div className='slider-container'>
					<Slider {...settingsV}>
						{crs.map((item) => (
							<div className='wrap-position' key={item}>
								<img className='crs-img' src={item} alt='' />
							</div>
						))}
					</Slider>
				</div>
			</div>
			<div
				className='modal fade'
				id='staticBackdrop12'
				data-bs-backdrop='static'
				data-bs-keyboard='false'
				tabIndex='-1'
				aria-labelledby='staticBackdropLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h1 className='modal-title fs-5' id='staticBackdropLabel'>
								Modal title
							</h1>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>...</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-secondary'
								data-bs-dismiss='modal'
							>
								Close
							</button>
							<button type='button' className='btn btn-primary'>
								Understood
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Carusel;
