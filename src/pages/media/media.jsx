import Navbar from '/src/components/navbar/navbar';
import Footer from '../../components/footer/footer';
import './media.css';
import { useEffect, useRef, useState } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import util from '../../server/util';
import api from '../../server/api';
import baseurl from '../../server/baseurl';
import Loading from '../../components/Animation/loadingHome';
const Media = () => {
	let scroll;
	const lang = localStorage.getItem('lang');
	let body = {
		search: '',
		language: lang,
		pages: 1,
		limit: 20,
		current_page: 1,
		status: true,
	};
	const [load, setLoad] = useState(false);
	const [media, setMedia] = useState([]);
	const [mtitle, setMtitle] = useState([]);
	const getSettings = () => {
		api
			.get_menu(body)
			.then((res) => {
				res.data.data.map((elem) => {
					if (elem.key == 'media') {
						setMtitle(elem);
					}
					getMedia();
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const getMedia = () => {
		setLoad(true);
		api
			.get_media(body)
			.then((res) => {
				setMedia(res.data);
				setLoad(false);
			})
			.catch((err) => {
				console.log(err);
				util.toast('warning', err.message);
				setLoad(false);
			});
	};
	const scrollRef = useRef();
	useEffect(() => {
		getSettings();
		if (media.length > 0) {
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
	}, [media.length]);
	return (
		<>
			<div className='wrapper' ref={scrollRef} data-scroll-container>
				<Navbar />
				<div className='bg-history mb-3 mb-lg-5'>
					<div className='container'>
						<div className='position-relative'>
							<svg width='580' height='400' className='svg-morph'>
								<path
									id='svg_morph'
									d='m261,30.4375c0,0 114,6 151,75c37,69 37,174 6,206.5625c-31,32.5625 -138,11.4375 -196,-19.5625c-58,-31 -86,-62 -90,-134.4375c12,-136.5625 92,-126.5625 129,-127.5625z'
								></path>
							</svg>
							<div className='about-us gid-title'>
								<h1 className='about-us__title hotel-title mt-5'>
									{mtitle?.texts?.length > 0 ? (
										<div
											dangerouslySetInnerHTML={{
												__html: mtitle?.texts[0].text,
											}}
										></div>
									) : (
										''
									)}
								</h1>
							</div>
						</div>
					</div>
				</div>
				<div className='container'>
					<div className='panel-bottom p-3'>
						<div className='row'>
							{media.length > 0 ? (
								media.map((elem) => (
									<div className='col-12 col-md-6 col-lg-4  mb-3' key={elem.id}>
										<div className='w-100 media-wrap'>
											<img
												className='media_img'
												src={baseurl + elem.image_url}
												alt=''
											/>
										</div>
									</div>
								))
							) : (
								<h4 className='text-center'>Ma`lumot topilmadi!</h4>
							)}
						</div>
					</div>
				</div>
				<div className={load === true ? 'd-block' : 'd-none'}>
					<Loading />
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Media;
