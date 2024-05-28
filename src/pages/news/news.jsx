import Navbar from '../../components/navbar/navbar';
import language from '../../assets/lang/language';
import shape from '/src/assets/images/title-shape.png';
import festival from '/src/assets/images/festival.jpg';
import Footer from '../../components/footer/footer.jsx';
import './news.css';
import { useEffect, useRef, useState } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import api from '../../server/api.js';
import handleError from '../../server/handle.js';
import Loading from '../../components/Animation/loading.jsx';
const News = () => {
	const lang = localStorage.getItem('lang');
	const scrollRef = useRef();
	const [news, setNews] = useState([]);
	const [load, setLoad] = useState(false);
	const body = {
		language: lang,
		search: '',
		pages: 1,
		limit: 20,
		current_page: 1,
	};
	const getNews = () => {
		setLoad(true);
		api
			.get_news(body)
			.then((res) => {
				console.log(res);
				setNews(res.data.data);
				setLoad(false);
			})
			.catch((err) => {
				console.log(err);
				handleError(err);
			});
	};
	useEffect(() => {
		getNews();
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
	}, [news.length]);
	return (
		<>
			<div className='wrapper' ref={scrollRef} data-scroll-section>
				<Navbar />
				<div className='news-bg'>
					<div className='container'>
						<div className='position-relative'>
							<svg width='580' height='400' className='svg-morph'>
								<path
									id='svg_morph'
									d='m261,30.4375c0,0 114,6 151,75c37,69 37,174 6,206.5625c-31,32.5625 -138,11.4375 -196,-19.5625c-58,-31 -86,-62 -90,-134.4375c12,-136.5625 92,-126.5625 129,-127.5625z'
								></path>
							</svg>
							<div className='news_box'>
								<h1 className='news-box__title'>
									{language[lang].news.news_title}
								</h1>
							</div>
						</div>
					</div>
				</div>
				<div className='about-wrap bg-light'>
					<div className='container'>
						<img className='shape mb-2' src={shape} alt='' />

						<h3 className='about-wrap__title news-title mb-4'>
							{language[lang].news.news_box_title}
						</h3>
						<div className='news-wrapper'>
							<img
								className='news-wrapper__img me-0 me-lg-3'
								src={festival}
								alt=''
							/>
							<div className='news-wrapper__text'>
								21-23 sentyabr kunlari Qo‘qon shahrida bo‘lib o‘tgan ikkinchi
								Xalqaro hunarmandchilik festivali katta bayram shodiyonasi bilan
								yakunlandi. 70 dan ziyod mamlakatdan 260 nafardan ortiq mohir
								hunarmandlar ishtirokida tashkil etilgan festivalning yopilish
								tadbirida festival g‘oliblari va sovrindorlari taqdirlandilar.
								Farg‘ona viloyati hokimi Xayrullo Bozorov, Jahon hunarmandlar
								kengashi prezidenti Saad al-Qaddumiy, Respublika “Hunarmand”
								uyushmasi raisi Ulug‘bek Abdullayev va Qo‘qon shahar hokimi
								Marufjon Usmonov festival g‘oliblariga diplom va sovg‘alarni
								tantanali topshirdilar. Gʻoliblarni tanishtiramiz qadimiy sulola
								davomchisi” nominatsiyasi bo‘yicha: 1-o‘rin: Baxshillo Jumayev
								(O‘zbekiston).
							</div>
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
export default News;
