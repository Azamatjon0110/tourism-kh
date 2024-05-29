import { useEffect, useState } from 'react';
import './admin.css';
import api from '../../server/api';
import Loading from '../../components/Animation/loading';
import util from '../../server/util';
import axios from 'axios';
import { useSelector } from 'react-redux';
// import { useForm } from 'react-hook-form';
import pi from '/src/assets/m-images/pl.jpg';
import { useNavigate } from 'react-router';
import baseurl from '../../server/baseurl';

const Hotels = () => {
	const lang = useSelector((state) => state.lang.lang);
	const token = useSelector((state) => state.token.token);
	const location = useNavigate();
	const [load, setLoad] = useState(false);
	const [hotels, setHotels] = useState([]);
	const [id, setId] = useState();
	let body = {
		language: lang,
		search: '',
		pages: 1,
		limit: 20,
		current_page: 1,
	};
	const remove = () => {
		setLoad(true);
		axios
			.delete(`${baseurl}hotels/delete?id=${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				setLoad(false);
				util.toast('success', res.message);
				getHotels();
			})
			.catch((err) => {
				setLoad(false);
				console.log(err);
				util.toast('warning', err.message);
			});
	};
	const getHotels = () => {
		setLoad(true);
		api
			.get_hotels(body)
			.then((res) => {
				setHotels(res.data.data);
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
		getHotels();
	}, [hotels.length]);
	return (
		<>
			<div className='d-flex flex-column w-100'>
				<div className='panel-top py-3 px-4 border border-bottom'>
					<h3 className='m-0'>Mehmonxonalar</h3>
					<div className='top-search'>
						<input
							className='form-control mr-3'
							type='search'
							placeholder='Qidirish...'
						/>
						<button
							type='button'
							className='btn btn-light d-flex align-items-center'
							onClick={() => {
								location({
									pathname: '/admin/add',
									search: 'q=hotels',
								});
							}}
						>
							Qo`shish <i className='fa-solid ms-1 fa-plus fa-xl pointer'></i>
						</button>
					</div>
				</div>
				<div className='panel-bottom p-3'>
					{hotels.length > 0 ? (
						<div className='row'>
							{hotels.map((item, index) => (
								<div className='col-3 mb-3' key={index}>
									<div className='card'>
										<div className='card-body'>
											<img
												className='card-img'
												width={400}
												height={200}
												src={
													item.pictures.length > 0
														? baseurl + item.pictures[0].image_url
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
														search: `q=hotels&id=${item.id}`,
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
			{/* <div className='modal-box'>
				<form className='' onSubmit={handleSubmit(submit)}>
					<div className='modal-c'>
						<div className='modal-bodyy modal-bodyy__c'>
							<div className='modal-header mb-2 border-bottom'>
								<h1 className='modal-title fs-5'>
									{modal.status == 'hotel_add'
										? "Mehmonxona qo'shish"
										: "Mehmonxonani o'zgartirish"}
								</h1>
								<button
									type='button'
									className='btn-close'
									onClick={() => {
										setOpen(false);
										document
											.querySelector('.modal-box')
											.classList.remove('active-m');
									}}
								></button>
							</div>
							<div className='modal-body w-100'>
								<div className='row'>
									<div className='col-12'>
										<label className='form-label d-block'>
											Nomi:
											<input
												className='form-control'
												type='text'
												defaultValue={modal.elem.title}
												placeholder='O`zb'
												{...register('name', { required: true })}
											/>
										</label>
									</div>
								</div>
								<label className='from-label d-block w-100 col-12'>
									Manzil:
									<input
										className='form-control'
										type='text'
										defaultValue={modal.elem.address}
										{...register('address', { required: true })}
										placeholder='Manzil...'
									/>
								</label>
								<label className='form-label d-block'>
									Ma`lumot:
									{textArr.map((elem, index) => (
										<label className='form-label d-block d-flex' key={index}>
											<input
												className='form-control mb-1 me-2 '
												type='text'
												onChange={(e) => setInfo(e.target.value)}
												placeholder='Ma`lumot...'
												defaultValue={elem.text}
											/>
											<button
												className='btn btn-danger '
												type='button'
												onClick={() => removeText(index)}
											>
												<i className='fa-solid fa-trash fa-sm'></i>
											</button>
										</label>
									))}
								</label>
								<label className='form-label d-block d-flex'>
									<input
										className='form-control me-2 info-text'
										type='text'
										onChange={(e) => {
											setInfo(e.target.value);
										}}
										placeholder="O'zbek, rus, ingliz ..."
									/>
									<button
										className='btn btn-success'
										type='button'
										onClick={() => pushInfo()}
									>
										<i className='fa-solid fa-plus'></i>
									</button>
								</label>
							</div>
							<div className='modal-footer'>
								<button
									type='button'
									className='btn btn-danger me-2'
									onClick={() => {
										reset();
										setOpen(false);
										document
											.querySelector('.modal-box')
											.classList.remove('active-m');
									}}
								>
									Rad etish
								</button>
								<button type='submit' className='btn btn-success sc'>
									Saqlash
								</button>
							</div>
						</div>
					</div>
				</form>
			</div> */}
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

export default Hotels;
