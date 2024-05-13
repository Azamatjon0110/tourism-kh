import Navbar from '/src/components/navbar/navbar';
import Footer from '../../components/footer/footer';
import language from '../../assets/lang/language';
import './media.css';
import { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import f1 from '/src/assets/m-images/f1.jfif';
import bg3 from '/src/assets/m-images/bg3.jpg';
import bg2 from '/src/assets/m-images/bg1.jpg';
import f2 from '/src/assets/m-images/f2.jfif';
import f3 from '/src/assets/m-images/f3.jfif';
import f4 from '/src/assets/m-images/f4.jfif';
const Media = () => {
	const lang = localStorage.getItem('lang');
	// const [media, setMedia] = useState([]);
	const scrollRef = useRef();
	useEffect(() => {
		// setMedia([f1, f2, f3, f4]);
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
							<h1 className='about-us__title hotel-title mt-5'>
								{language[lang].media.main_title}
							</h1>
						</div>
					</div>
				</div>
				<div className='container'>
					<div className='grid row'>
						{/* {media.map((item, index) => (
						<img
							className={'grid-item grid-' + `${index}`}
							src={item}
							key={item}
							alt=''
						/>
					))} */}
						<div className='col-12 col-md-6 col-lg-7'>
							<img className='media-img' src={bg3} alt='' />
						</div>
						<div className='col-12 col-md-6 col-lg-5'>
							<img className='media-img' src={bg2} alt='' />
						</div>

						<div className='col-12 col-md-6 col-lg-5'>
							<img className='media-img' src={f3} alt='' />
						</div>
						<div className='col-12 col-md-6 col-lg-7'>
							<img className='media-img' src={f4} alt='' />
						</div>
						<div className='col-12 col-md-6 col-lg-7'>
							<img className='media-img' src={f1} alt='' />
						</div>
						<div className='col-12 col-md-6 col-lg-5'>
							<img className='media-img' src={f2} alt='' />
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Media;
