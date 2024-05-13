import Navbar from '/src/components/navbar/navbar';
import Footer from '../../components/footer/footer';
// import language from '../../assets/lang/language';
import './hotel.css';
import { useNavigate } from 'react-router';
import m1 from '/src/assets/m-images/m1.jpg';
import { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
const Hotel = () => {
	const scrollRef = useRef();
	useEffect(() => {
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
	const navigate = useNavigate();
	return (
		<>
			<div className='wrapper' ref={scrollRef} data-scroll-section>
				<Navbar />
				<div className='bg-history'>
					<div className='container'>
						<p className='back' onClick={() => navigate(-1)}>
							back
						</p>
						<div className='hotel row'>
							<div className='col-12 col-md-6 col-lg-5'>
								<img className='hotel__img' src={m1} alt='' />
							</div>
							<div className='col-12 col-md-6 col-lg-7'>
								<p className='hotel__text'>
									Mehmonxona restorani 24/7 ishlaydi va 50 o‘ringa
									mo‘ljallangan. Nonushta turar joy xizmatiga kiritilgan. Bundan
									tashqari, bizning pazandachilik mutaxassislarimiz sizga har
									qanday mehmonlarni hayratda qoldiradigan Yevropa va milliy
									taomlarning nafis taomlarini taklif qilishadi, barda esa har
									qanday lazzat uchun kokteyllarni tatib korishingiz mumkin.
								</p>
							</div>
						</div>
					</div>
				</div>

				<Footer />
			</div>
		</>
	);
};

export default Hotel;
