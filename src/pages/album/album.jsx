import Navbar from '/src/components/navbar/navbar';
import Footer from '../../components/footer/footer';
// import x3 from '/src/assets/m-images/bg32.jpg';
// import x2 from '/src/assets/m-images/bg3.jpg';
import './album.css';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import api from '../../server/api';
import { useLocation, useNavigate } from 'react-router';
import Loading from '../../components/Animation/loading';
import handleError from '../../server/handle';
import LocomotiveScroll from 'locomotive-scroll';
import baseurl from '../../server/baseurl';
const Album = () => {
	const lang = useSelector((state) => state.lang.lang);
	const [load, setLoad] = useState(false);
	const navigate = useNavigate();
	const [museum, setMuseum] = useState({
		texts: [],
		pictures: [],
	});
	const location = useLocation();
	const scrollRef = useRef();
	const id = location.search.slice(4);
	const body = {
		id: id,
		language: lang,
		search: '',
		pages: 1,
		limit: 20,
		current_page: 1,
	};
	const getMuseum = () => {
		setLoad(true);
		api
			.get_museums(body)
			.then((res) => {
				console.log(res);
				setMuseum(res.data);
				setLoad(false);
			})
			.catch((err) => {
				setLoad(false);
				console.log(err);
				handleError(err);
			});
	};
	useEffect(() => {
		getMuseum();
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
			<div className='wrapper' ref={scrollRef} data-scroll-container>
				<Navbar />
				<div className='album_wrap py-5'>
					<div className='container'>
						<p className='back' onClick={() => navigate(-1)}>
							<i className='fa-regular fa-hand-point-left'></i> orqaga
						</p>
						<div className=''>
							<img
								className=' album__img'
								src={
									museum.pictures.length > 0
										? baseurl + museum?.pictures[0].image_url
										: ''
								}
								alt=''
							/>
							<div className='album__text'>
								<h3>{museum?.title}</h3>
								{museum.texts.length > 0 ? (
									<div
										dangerouslySetInnerHTML={{
											__html: museum.texts[0].text,
										}}
									></div>
								) : (
									''
								)}
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

export default Album;
