import { useEffect, useState } from 'react';
import './admin.css';
import api from '../../server/api';
import Loading from '../../components/Animation/loading';
import util from '../../server/util';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

const Hotels = () => {
	const lang = useSelector((state) => state.lang.lang);
	const token = useSelector((state) => state.token.token);
	const [load, setLoad] = useState(false);
	const [hotels, setHotels] = useState([]);
	// const [info, setInfo] = useState([]);
	const [isOpen, setOpen] = useState(false);
	const [modal, setModal] = useState({
		status: 'hotel_add',
		elem: {},
	});
	const [id] = useState();
	let body = {
		language: lang,
		search: '',
		pages: 1,
		limit: 20,
		current_page: 1,
	};
	if (isOpen == true) {
		document.querySelector('.modal-box').classList.add('active-m');
	}
	const remove = () => {
		setLoad(true);
		axios
			.delete(`http://test.m14.uz/hotels/delete?id=${id}`, {
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
				console.log(res.data.data);
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
	const { handleSubmit, register, reset } = useForm({
		defaultValues: {
			title_uz: '',
			title_en: '',
			title_ru: '',
			address_uz: '',
			address_en: '',
			address_ru: '',
			texts: [
				{
					text: '',
					language: '',
				},
			],
			videos: [
				{
					text: '',
				},
			],
		},
	});
	const [textArr, setTextArr] = useState([]);
	const submit = (data) => {
		setLoad(true);
		if (modal.status == 'hotel_add') {
			api
				.create_gid(data)
				.then((res) => {
					reset();
					setLoad(false);
					util.toast('success', res.message);
					getHotels();
				})
				.catch((err) => {
					console.log(err);
					util.toast('warning', err.message);
					setLoad(false);
				});
		} else {
			setLoad(true);
			api
				.update_gid({
					id: modal.elem.id,
					name: data.name,
					phone: data.phone,
					address: data.address,
					languages: data.languages,
				})
				.then(() => {
					reset();
					getHotels();
					setLoad(false);
				})
				.catch((err) => {
					setLoad(false);
					console.log(err);
				});
		}
	};

	const pushInfo = () => {};

	useEffect(() => {
		getHotels();
	}, []);
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
						<i
							className='fa-solid fa-user-plus fa-xl pointer'
							onClick={() => {
								setModal({
									status: 'hotel_add',
									elem: {
										name: '',
										phone: '',
										address: '',
										languages: '',
									},
								});
								setOpen(true);
							}}
						></i>
					</div>
				</div>
				<div className='panel-bottom p-3'>
					{hotels.length > 0 ? (
						<div className='row'>
							{hotels.map((item, index) => {
								<div className='col-4' key={index}>
									<div className='card'>
										<h3 className='card-title'>{`${item.address}`}</h3>
									</div>
								</div>;
							})}
						</div>
					) : (
						<h4 className='text-center'>Ma`lumot topilmadi!</h4>
					)}
				</div>
			</div>
			<div className='modal-box'>
				<form className='' onSubmit={handleSubmit(submit)}>
					<div className='modal-c'>
						<div className='modal-bodyy modal-bodyy__c'>
							<div className='modal-header mb-2 border-bottom'>
								<h1 className='modal-title fs-5' id='staticBackdropLabel'>
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
									<label className='from-label d-block w-100 col-12'>
										Nomi:
									</label>
									<div className='col-4'>
										<label className='form-label d-block'>
											<input
												className='form-control'
												type='text'
												defaultValue={modal.elem.title_uz}
												placeholder='O`zb'
												{...register('name', { required: true })}
											/>
										</label>
									</div>
									<div className='col-4'>
										<label className='form-label d-block'>
											<input
												className='form-control'
												type='text'
												defaultValue={modal.elem.title_ru}
												placeholder='Rus'
												{...register('name', { required: true })}
											/>
										</label>
									</div>
									<div className='col-4'>
										<label className='form-label d-block'>
											<input
												className='form-control'
												type='text'
												defaultValue={modal.elem.title_en}
												placeholder='Ing'
												{...register('name', { required: true })}
											/>
										</label>
									</div>
								</div>
								<label className='from-label d-block w-100 col-12'>
									Manzil:
								</label>
								<label className='form-label d-block'>
									<input
										className='form-control'
										type='text'
										defaultValue={modal.elem.address_uz}
										{...register('address', { required: true })}
										placeholder='O`zbekcha'
									/>
								</label>
								<label className='form-label d-block'>
									<input
										className='form-control'
										type='text'
										defaultValue={modal.elem.address_ru}
										{...register('address', { required: true })}
										placeholder='Ruscha'
									/>
								</label>
								<label className='form-label d-block'>
									<input
										className='form-control'
										type='text'
										defaultValue={modal.elem.address_en}
										{...register('address', { required: true })}
										placeholder='Inglizcha'
									/>
								</label>
								<label className='form-label d-block'>
									Ma`lumot:
									{textArr.map((elem) => {
										<input
											className='form-control'
											key={elem}
											type='tel'
											placeholder='Ma`lumot...'
											// defaultValue={elem.text}
										/>;
									})}
									<div className='box'>
										<input
											className='form-control'
											type='tel'
											// defaultValue={}
											{...register('phone', { required: true })}
										/>
									</div>
								</label>
								<label className='form-label d-block d-flex'>
									<input
										className='form-control me-2'
										type='text'
										placeholder="O'zbek, rus, ingliz ..."
									/>
									<button
										className='btn btn-success'
										type='button'
										onClick={() => {
											pushInfo();
											setTextArr(textArr.push({ text: '', language: '' }));
										}}
									>
										<i className='fa-solid fa-plus'></i>
									</button>
								</label>
								<label className='form-label d-block'>
									Tillar:
									<input
										className='form-control'
										type='text'
										defaultValue={modal.elem.languages}
										placeholder="O'zbek, rus, ingliz ..."
										{...register('languages', { required: true })}
									/>
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
			</div>
			<div
				className='modal fade'
				id='exampleModal'
				tabIndex='-1'
				aria-labelledby='exampleModalLabel'
				aria-hidden='true'
			>
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
