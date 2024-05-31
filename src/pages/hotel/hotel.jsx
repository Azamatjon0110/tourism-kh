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
import Loading from '../../components/Animation/loadingHome';
import baseurl from '../../server/baseurl';
const Hotel = () => {
	let scroll;
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
		api
			.get_hotels(body)
			.then((res) => {
				setHotel(res.data);
			})
			.catch((err) => {
				console.log(err);
				handleError(err);
			});
	};
	const scrollRef = useRef();
	useEffect(() => {
		setLoad(true);
		getHotels();
		if (hotel?.texts?.length > 0) {
			setLoad(false);
		}
		scroll = new LocomotiveScroll({
			el: scrollRef.current,
			smooth: true,
			getSpeed: true,
			getDirection: true,
			smartphone: {
				smooth: false,
			},
			tablet: {
				smooth: false,
			},
		});

		scroll.update();
		return () => {
			if (scroll) scroll.destroy();
		};
	}, [hotel.texts.length]);
	return (
		<>
			<div className='' ref={scrollRef} data-scroll-container>
				<div className='wrapper'>
					<Navbar />
					<div className='hotel'>
						<div className='hotel-wrapper'>
							<div className='container'>
								<p className='back' onClick={() => navigate(-1)}>
									<i className='fa-regular fa-hand-point-left'></i> orqaga
								</p>
								<div className='album__box'>
									<img
										className='album__img'
										src={
											hotel.pictures.length > 0
												? baseurl + hotel?.pictures[0].image_url
												: ''
										}
										alt=''
									/>
									<div className='album__text'>
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
						</div>
					</div>
					<Footer />
				</div>
			</div>
			<div className={load === true ? 'd-block' : 'd-none'}>
				<Loading />
			</div>
		</>
	);
};

export default Hotel;
