import Navbar from '/src/components/navbar/navbar';
import Footer from '../../components/footer/footer';
import language from '../../assets/lang/language';
import './scholar.css';
const Scholar = () => {
	const lang = localStorage.getItem('lang');
	return (
		<>
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
						<h1 className='about-us__title mt-4'>
							{language[lang].scholar.main_title}
						</h1>
						<p className='about-us__text'>{language[lang].scholar.main_text}</p>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Scholar;
