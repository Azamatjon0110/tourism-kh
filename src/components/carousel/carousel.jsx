import x1 from '/src/assets/m-images/bg3.jpg';
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
		</>
	);
};

export default Carusel;
