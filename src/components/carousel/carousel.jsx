import x1 from '/src/assets/images/x6.jpg';
import x2 from '/src/assets/images/x5.jfif';
import x3 from '/src/assets/images/x4.jpg';
import Navbar from '../navbar/navbar';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import './carusel.css';
import { useState } from 'react';
import language from '../../assets/lang/language';
const responsive = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: { max: 4000, min: 3000 },
		items: 1,
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 1,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 1,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
	},
};
const Carusel = () => {
	const lang = localStorage.getItem('lang');
	const [crs] = useState([x1, x2, x3, x1, x2, x3]);
	return (
		<>
			<div className='header-top'>
				<Navbar />
				<Carousel
					responsive={responsive}
					pauseOnHover={false}
					autoPlay={8000}
					infinite
					className='crs-list'
					itemClass='crs-item'
					renderArrowsWhenDisabled={false}
					renderButtonGroupOutside={false}
					renderDotsOutside={false}
				>
					{crs.map((item) => (
						<div className='crs-box' key={item}>
							<div className='bg-gradient'></div>
							<h1 className='crs-title'>{language[lang].home.hero_title}</h1>
							<img className='crs-img' src={item} alt='' />
						</div>
					))}
				</Carousel>
			</div>
		</>
	);
};

export default Carusel;
