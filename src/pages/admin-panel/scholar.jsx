import { useEffect, useState } from 'react';
import './admin.css';
import api from '../../server/api';
import Loading from '../../components/Animation/loading';
import util from '../../server/util';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

const Allomalar = () => {
	const token = useSelector((state) => state.token.token);
	const [load, setLoad] = useState(false);
	// const [guides, setGuides] = useState([]);
	const [isOpen, setOpen] = useState(false);
	const [modal, setModal] = useState({
		status: 'git_add',
		elem: {},
	});
	const [id] = useState();
	let body = {
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
			.delete(`http://test.m14.uz/gids/delete?id=${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				setLoad(false);
				util.toast('success', res.message);
				getGuides();
			})
			.catch((err) => {
				setLoad(false);
				console.log(err);
				util.toast('warning', err.message);
			});
	};
	const getGuides = () => {
		setLoad(true);
		api
			.get_guides(body)
			.then((res) => {
				// setGuides(res.data.data);
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
			name: modal.elem.name,
			phone: modal.elem.phone,
			address: modal.elem.address,
			languages: modal.elem.languages,
		},
	});
	const submit = (data) => {
		setLoad(true);
		if (modal.status == 'git_add') {
			api
				.create_gid(data)
				.then((res) => {
					console.log(res);
					reset();
					setLoad(false);
					util.toast('success', res.message);
					getGuides();
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
					getGuides();
					setLoad(false);
				})
				.catch((err) => {
					setLoad(false);
					console.log(err);
				});
		}
	};

	useEffect(() => {
		getGuides();
	}, []);
	return (
		<>
			<div className='d-flex flex-column w-100'>
				<div className='panel-top py-3 px-4 border border-bottom'>
					<h3 className='m-0'>Allomalar</h3>
					<div className='top-search'>
						<input
							className='form-control mr-3'
							type='search'
							placeholder='Qidirish...'
						/>
						<i
							className='fa-solid fa-user-plus fa-xl pointer'
							onClick={() => {
								// ref.current.getGuides();
								setModal({
									status: 'scholar_add',
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
				<div className='panel-bottom p-3'></div>
			</div>
			<div className='modal-box'>
				<form className='' onSubmit={handleSubmit(submit)}>
					<div className='modal-c'>
						<div className='modal-bodyy'>
							<div className='modal-header'>
								<h1 className='modal-title fs-5' id='staticBackdropLabel'>
									{modal.status == 'scholar_add'
										? "Gid qo'shish"
										: "Gidni o'zgartirish"}
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
							<div className='modal-body'>
								<label className='form-label d-block'>
									Ism-familiya:
									<input
										className='form-control'
										type='text'
										defaultValue={modal.elem.name}
										placeholder='Ism familiya'
										{...register('name', { required: true })}
									/>
								</label>
								<label className='form-label d-block'>
									Manzil:
									<input
										className='form-control'
										type='text'
										defaultValue={modal.elem.address}
										{...register('address', { required: true })}
										placeholder='Manzil'
									/>
								</label>
								<label className='form-label d-block'>
									Telefon:
									<div className='input-group'>
										<span className='border d-flex align-items-center px-2 phone-span'>
											+998
										</span>
										<input
											className='form-control'
											type='tel'
											defaultValue={modal.elem.phone}
											maxLength={9}
											{...register('phone', { required: true })}
										/>
									</div>
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

export default Allomalar;
