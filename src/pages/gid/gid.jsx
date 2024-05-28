import Navbar from '/src/components/navbar/navbar';
import Footer from '../../components/footer/footer';
import language from '../../assets/lang/language';
import './gid.css';
import { useEffect, useRef, useState } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { useSelector } from 'react-redux';
import Loading from '../../components/Animation/loading';
import api from '../../server/api';
const Guides = () => {
	// const token = useSelector((state) => state.token.token);
	const lang = useSelector((state) => state.lang.lang);
	const [guides, setGuides] = useState([]);
	const [load, setLoad] = useState(false);
	const scrollRef = useRef();
	let body = {
		search: '',
		pages: 1,
		limit: 20,
		current_page: 1,
		status: true,
	};
	const getGuides = () => {
		setLoad(true);
		api
			.get_guides(body)
			.then((res) => {
				console.log(res);
				setGuides(res.data.data);
				body.pages = res.data.pages;
				body.limit = res.data.limit;
				body.current_page = res.data.current_page;
				setLoad(false);
			})
			.catch((err) => {
				console.log(err);
				setLoad(false);
			});
	};
	useEffect(() => {
		getGuides();
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
						<div className='position-relative'>
							<svg width='580' height='400' className='svg-morph'>
								<path
									id='svg_morph'
									d='m261,30.4375c0,0 114,6 151,75c37,69 37,174 6,206.5625c-31,32.5625 -138,11.4375 -196,-19.5625c-58,-31 -86,-62 -90,-134.4375c12,-136.5625 92,-126.5625 129,-127.5625z'
								></path>
							</svg>
							<div className='about-us'>
								<h1 className='about-us__title mt-5'>
									{language[lang].gid.main_title}
								</h1>
							</div>
						</div>
					</div>
				</div>
				<div className='container'>
					{guides.length > 0 ? (
						<table className='table'>
							<thead>
								<tr>
									<th scope='col'>#</th>
									<th scope='col'>Ism-familiya</th>
									<th scope='col'>Manzil</th>
									<th scope='col'>Telefon</th>
									<th scope='col'>Tillar</th>
									<th scope='col'></th>
								</tr>
							</thead>
							<tbody className='gid-body'>
								{guides.map((elem, index) => (
									<tr key={elem.id}>
										<th scope='row'>{index + 1}</th>
										<td>{elem.name}</td>
										<td>{elem.address}</td>
										<td>{elem.phone}</td>
										<td>{elem.languages}</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<h4 className='text-center'>Ma`lumot topilmadi!</h4>
					)}
				</div>
				<Footer />
			</div>
			<div className={load === true ? 'd-block' : 'd-none'}>
				<Loading />
			</div>
		</>
	);
};

export default Guides;
