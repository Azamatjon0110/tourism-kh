import { useEffect, useState } from 'react';
import './admin.css';
import api from '../../server/api';
import Loading from '../../components/Animation/loading';
import util from '../../server/util';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AdminGuides = () => {
	const token = useSelector((state) => state.token.token);
	const [load, setLoad] = useState(false);
	const [guides, setGuides] = useState([]);
	const [isOpen, setOpen] = useState(false);
	const [modal, setModal] = useState({
		status: 'git_add',
		elem: {},
	});
	const [id, setId] = useState();
	let body = {
		search: '',
		pages: 1,
		limit: 20,
		current_page: 1,
		status: true,
	};
	if (isOpen == true) {
		document.querySelector('.modal-box').classList.add('active-m');
	}
	const { handleSubmit, register, reset } = useForm({
		defaultValues: {
			name: modal.elem.name,
			phone: modal.elem.phone,
			address: modal.elem.address,
			languages: modal.elem.languages,
		},
	});
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

	const submit = (data) => {
		setLoad(true);
		if (modal.status == 'git_add') {
			api
				.create_gid(data)
				.then((res) => {
					reset();
					setOpen(false);
					util.toast('success', res.message);
					getGuides();
					setLoad(false);
				})
				.catch((err) => {
					console.log(err);
					setLoad(false);
					setOpen(false);
					util.toast('warning', err.message);
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
					setOpen(false);
					setLoad(false);
				})
				.catch((err) => {
					console.log(err);
					setOpen(false);
					setLoad(false);
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
					<h3 className='m-0'>Gidlar</h3>
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
								setOpen(true);
								setModal({
									status: 'git_add',
									elem: {
										name: '',
										phone: '',
										address: '',
										languages: '',
									},
								});
							}}
						></i>
					</div>
				</div>
				<div className='panel-bottom p-3'>
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
										<td>
											<button
												className='btn btn-warning me-2 btn-action open-modal'
												type='button'
												onClick={() => {
													setModal({
														status: 'gid_edit',
														elem: elem,
													});
													setOpen(true);
												}}
											>
												<i className='fa-solid fa-pen fa-sm text-white'></i>
											</button>
											<button
												className='btn btn-danger btn-action'
												type='button'
												data-bs-toggle='modal'
												data-bs-target='#exampleModal'
												onClick={() => setId(elem.id)}
											>
												<i className='fa-solid fa-trash fa-sm'></i>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<h4 className='text-center'>Ma`lumot topilmadi!</h4>
					)}
				</div>
			</div>
			<div className='modal-box'>
				<form className='' onSubmit={handleSubmit(submit)}>
					<div className='modal-c'>
						<div className='modal-bodyy'>
							<div className='modal-header'>
								<h1 className='modal-title fs-5' id='staticBackdropLabel'>
									{modal.status == 'gid_add'
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
								<button
									type='submit'
									className='btn btn-success sc'
									onClick={() => {
										setOpen(false);
										document
											.querySelector('.modal-box')
											.classList.remove('active-m');
									}}
								>
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

export default AdminGuides;
