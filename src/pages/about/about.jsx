import Navbar from '../../components/navbar/navbar';
import x6 from '/src/assets/m-images/bg1.jpg';
import fes from '/src/assets/subnail.jpg';
import fes1 from '/src/assets/m-images/bg32.jpg';
// import fes2 from '/src/assets/m-images/img3.jfif';
import Footer from '../../components/footer/footer.jsx';
import './about.css';
import { Link } from 'react-router-dom';
import LocomotiveScroll from 'locomotive-scroll';
import { useEffect, useRef, useState } from 'react';
import api from '../../server/api.js';
import baseurl from '../../server/baseurl.js';
import Loading from '../../components/Animation/loadingHome.jsx';
const About = () => {
	let scroll;
	const [load, setLoad] = useState(false);
	const lang = localStorage.getItem('lang');
	const [about, setAbout] = useState({});
	const [aboutText, setAboutText] = useState({});
	const [aboutText2, setAboutText2] = useState({});
	const [historical, setHistorical] = useState({});
	const body = {
		language: lang,
		pages: 1,
		limit: 40,
		status: true,
	};
	const getSettings = () => {
		api
			.get_menu(body)
			.then((res) => {
				res.data.data.map((elem) => {
					if (elem.key == 'about_title') {
						setAbout(elem);
					} else if (elem.key == 'history') {
						setHistorical(elem);
					}
				});
				getAbout();
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const getAbout = () => {
		api
			.get_about(body)
			.then((res) => {
				setAboutText(res.data.data[0]);
				setAboutText2(res.data.data[1]);
				console.log(aboutText2);
				setLoad(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const scrollRef = useRef();
	useEffect(() => {
		getSettings();
		setLoad(true);
		if (aboutText.length > 0) {
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
	}, []);
	return (
		<>
			<div className='wrapper' ref={scrollRef} data-scroll-container>
				<Navbar />
				<div>
					<div className='bg-history' data-scroll>
						<div className='container'>
							<div className='position-relative'>
								<svg width='580' height='400' className='svg-morph'>
									<path
										id='svg_morph'
										d='m261,30.4375c0,0 114,6 151,75c37,69 37,174 6,206.5625c-31,32.5625 -138,11.4375 -196,-19.5625c-58,-31 -86,-62 -90,-134.4375c12,-136.5625 92,-126.5625 129,-127.5625z'
									></path>
								</svg>
								<div className='about-us'>
									{about?.texts?.length > 0 ? (
										<div
											dangerouslySetInnerHTML={{
												__html: about?.texts[0].text,
											}}
										></div>
									) : (
										''
									)}
								</div>
							</div>
						</div>
					</div>
					<div className='about-wrap ' data-scroll>
						<div className='container'>
							<h3 className='about-wrap__title'>
								{historical?.texts?.length > 0 ? (
									<div
										dangerouslySetInnerHTML={{
											__html: historical?.texts[0].text,
										}}
									></div>
								) : (
									''
								)}
							</h3>
							<div className='about-wrapper row'>
								<div className='col-12 col-lg-6 mb-5 position-relative'>
									<Link
										className='frame-img-box'
										to='https://www.youtube.com/embed/FaHVunR7YTM?si=74zGmncCoH_Kfb1m'
									>
										<img
											className=' about-wrapper__img frame-img'
											src={fes}
											alt=''
										/>
									</Link>
								</div>
								<div className='col-12 col-lg-6 mb-5 position-relative'>
									<div style={{ position: 'relative', overflow: 'hidden' }}>
										<Link
											to='https://yandex.uz/maps/101425/margilan/?utm_medium=mapframe&utm_source=maps'
											style={{
												color: '#eee',
												fontSize: '12px',
												position: 'absolute',
												top: '14px',
											}}
										>
											Маргилан
										</Link>
										<Link
											to='https://yandex.uz/maps/geo/771314595/?ll=71.741096%2C40.466611&utm_medium=mapframe&utm_source=maps&z=13.79'
											style={{
												color: '#eee',
												fontSize: '12px',
												position: 'absolute',
												top: '14px',
											}}
										>
											Яндекс Карты
										</Link>
										<iframe
											src='https://yandex.uz/map-widget/v1/?ll=71.741096%2C40.466611&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgk3NzEzMTQ1OTUSLE_Ku3piZWtpc3RvbiwgRmFyZ8q7b25hIHZpbG95YXRpLCBNYXJnyrtpbG9uIgoNCXGPQhVS4CFC&z=13.79'
											width='560'
											height='400'
											allowFullScreen='true'
											style={{ position: 'relative' }}
										></iframe>
									</div>
								</div>
								<div className='col-12 mb-4 mb-lg-5 album__box'>
									{aboutText?.pictures?.length > 0 ? (
										<img
											className=' album__img'
											src={baseurl + aboutText.pictures[0].image_url}
											alt=''
										/>
									) : (
										''
									)}
									{aboutText?.texts?.length > 0 ? (
										<p
											dangerouslySetInnerHTML={{
												__html: aboutText?.texts[0].text,
											}}
										></p>
									) : (
										''
									)}
								</div>
								<div className='col-12 mb-4 mb-lg-5 album__box'>
									{aboutText2?.pictures?.length > 0 ? (
										<img
											className=' album__img'
											src={baseurl + aboutText2.pictures[0].image_url}
											alt=''
										/>
									) : (
										''
									)}
									{aboutText2?.texts?.length > 0 ? (
										<p
											dangerouslySetInnerHTML={{
												__html: aboutText2?.texts[0].text,
											}}
										></p>
									) : (
										''
									)}
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
export default About;
