import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer.jsx';
import './news.css';
import { useEffect, useRef, useState } from 'react';
import api from '../../server/api.js';
import handleError from '../../server/handle.js';
import Loading from '../../components/Animation/loadingHome.jsx';
import LocomotiveScroll from 'locomotive-scroll';
import baseurl from '../../server/baseurl.js';
const News = () => {
	const scrollRef = useRef();
	const lang = localStorage.getItem('lang');
	const [news, setNews] = useState([]);
	const [newsTitle, setNewsTitle] = useState({});
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
				console.log(res.data);
				setNews(res.data.data);
				setLoad(false);
			})
			.catch((err) => {
				console.log(err);
				handleError(err);
			});
	};
	const getSettings = () => {
		api
			.get_menu(body)
			.then((res) => {
				res.data.data.map((elem) => {
					if (elem.key == 'news') {
						setNewsTitle(elem);
					}

					getNews();
				});
			})
			.catch((err) => {
				console.log(err);
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
	}, [news.length]);
	return (
		<>
			<div className='' ref={scrollRef} data-scroll-container>
				<div className='wrapper' data-scroll-section>
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
								<div className='news_box gid-title'>
									{newsTitle?.texts?.length > 0 ? (
										<div
											dangerouslySetInnerHTML={{
												__html: newsTitle?.texts[0].text,
											}}
										></div>
									) : (
										''
									)}
								</div>
							</div>
						</div>
					</div>
					<div className='about-wrap bg-light'>
						<div className='container'>
							{news.length > 0
								? news.map((elem) => (
										<div className='news-wrapper' key={elem.id}>
											<img
												className='news-wrapper__img me-0 me-lg-3 w-100'
												src={
													elem.pictures.length > 0
														? baseurl + elem.pictures[0].image_url
														: ''
												}
												alt=''
											/>
											<div
												dangerouslySetInnerHTML={{
													__html: elem?.texts[0].text,
												}}
											></div>
										</div>
								  ))
								: ''}
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
export default News;
