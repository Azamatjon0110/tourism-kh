import { useEffect, useState } from 'react';
import './admin.css';
import api from '../../server/api';
import Loading from '../../components/Animation/loading';
import util from '../../server/util';
import axios from 'axios';
import { useSelector } from 'react-redux';
import pi from '/src/assets/m-images/pl.jpg';
import { useNavigate } from 'react-router';

const Museums = () => {
	const baseUrl = 'http://test.m14.uz/';
	const lang = useSelector((state) => state.lang.lang);
	const token = useSelector((state) => state.token.token);
	const location = useNavigate();
	const [load, setLoad] = useState(false);
	const [museums, setMuseums] = useState([]);
	const [id, setId] = useState();
	let body = {
		language: lang,
		search: '',
		pages: 1,
		limit: 20,
	};
	const remove = () => {
		setLoad(true);
		axios
			.delete(`http://test.m14.uz/museums/delete?id=${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				setLoad(false);
				util.toast('success', res.message);
				getMuseums();
			})
			.catch((err) => {
				setLoad(false);
				console.log(err);
				util.toast('warning', err.message);
			});
	};
	const getMuseums = () => {
		setLoad(true);
		api
			.get_museums(body)
			.then((res) => {
				console.log(res.data.data);
				setMuseums(res.data.data);
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
		getMuseums();
	}, [museums.length]);
	return (
		<>
			<div className='d-flex flex-column w-100'>
				<div className='panel-top py-3 px-4 border border-bottom'>
					<h3 className='m-0'>Muzeylar va tarixiy joylar</h3>
					<div className='top-search'>
						<input
							className='form-control mr-3'
							type='search'
							placeholder='Qidirish...'
						/>
						<i
							className='fa-solid fa-plus fa-xl pointer'
							onClick={() => {
								location({
									pathname: '/admin/add',
									search: 'q=museums',
								});
							}}
						></i>
					</div>
				</div>
				<div className='panel-bottom p-3'>
					{museums.length > 0 ? (
						<div className='row'>
							{museums.map((item, index) => (
								<div className='col-3 mb-3' key={index}>
									<div className='card'>
										<div className='card-body'>
											<img
												className='card-img'
												width={400}
												height={200}
												src={
													item.pictures.length > 0
														? baseUrl + item.pictures[0].image_url
														: `${pi}`
												}
												alt=''
											/>
											<h3 className='card-title text-center'>{item.title}</h3>
											<p className='card-text'>{item.address}</p>
										</div>
										<div className='card-footer d-flex justify-content-end'>
											<button
												className='btn btn-danger me-2 '
												data-bs-toggle='modal'
												data-bs-target='#delete'
												onClick={() => setId(item.id)}
											>
												<i className='fa-solid fa-trash fa-sm'></i>
											</button>
											<button
												className='btn btn-warning '
												onClick={() => {
													location({
														pathname: '/admin/edit',
														search: `q=museums&id=${item.id}`,
													});
												}}
											>
												<i className='fa-solid fa-pen fa-sm text-white'></i>
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<h4 className='text-center'>Ma`lumot topilmadi!</h4>
					)}
				</div>
			</div>

			<div className='modal fade' id='delete' tabIndex='-1' aria-hidden='true'>
				<div className='modal-dialog modal-dialog-centered'>
					<div className='modal-content'>
						<div className='modal-body'>
							<h1 className='m-title'>O`chirmoqchimisiz</h1>
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-danger'
								data-bs-dismiss='modal'
							>
								Yo`q
							</button>
							<button
								type='button'
								className='btn btn-success'
								onClick={() => remove()}
								data-bs-dismiss='modal'
							>
								Ha
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className={load === true ? 'd-block' : 'd-none'}>
				<Loading />
			</div>
		</>
	);
};

export default Museums;
