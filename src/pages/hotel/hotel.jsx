import Navbar from '/src/components/navbar/navbar';
import Footer from '../../components/footer/footer';
// import language from '../../assets/lang/language';
import './hotel.css';
import { useLocation, useNavigate } from 'react-router';
// import m1 from '/src/assets/m-images/m1.jpg';
import { useEffect, useRef, useState } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { useSelector } from 'react-redux';
import api from '../../server/api';
import handleError from '../../server/handle';
import Loading from '../../components/Animation/loading';
import baseurl from '../../server/baseurl';
const Hotel = () => {
	const lang = useSelector((state) => state.lang.lang);
	const navigate = useNavigate();
	const [load, setLoad] = useState(false);
	const [hotel, setHotel] = useState({
		texts: [],
		pictures: [],
	});
	const location = useLocation();
	const id = location.search.slice(4);
	const body = {
		id: id,
		language: lang,
		search: '',
		pages: 1,
		limit: 20,
		current_page: 1,
	};
	const getHotels = () => {
		setLoad(true);
		api
			.get_hotels(body)
			.then((res) => {
				console.log(res.data);
				setHotel(res.data);
				setLoad(false);
			})
			.catch((err) => {
				console.log(err);
				handleError(err);
			});
	};
	const scrollRef = useRef();
	useEffect(() => {
		getHotels();
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
	// const lang = localStorage.getItem('lang');
	return (
		<>
			<div className='wrapper' ref={scrollRef} data-scroll-section>
				<Navbar />
				<div className='bg-history'>
					<div className='container'>
						<p className='back' onClick={() => navigate(-1)}>
							<i className='fa-regular fa-hand-point-left'></i> orqaga
						</p>
						<div className='hotel'>
							<img
								className='news-wrapper__img'
								src={
									hotel.pictures.length > 0
										? baseurl + hotel?.pictures[0].image_url
										: ''
								}
								alt=''
							/>

							<h3>{hotel?.title}</h3>
							{hotel.texts.length > 0 ? (
								<div
									dangerouslySetInnerHTML={{
										__html: hotel?.texts[0].text,
									}}
								></div>
							) : (
								''
							)}
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

export default Hotel;
