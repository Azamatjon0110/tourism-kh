import { useEffect, useState } from 'react';
import './admin.css';
import api from '../../server/api';
// import ModalUser from '../../components/modal/user';
import Loading from '../../components/Animation/loading';
import util from '../../server/util';
import axios from 'axios';
import { useSelector } from 'react-redux';
// import Modal from '../../components/modal/modal';
import { useForm } from 'react-hook-form';

const Admins = () => {
	const token = useSelector((state) => state.token.token);
	const [load, setLoad] = useState(false);
	const [id, setId] = useState();
	const [isOpen, setOpen] = useState(false);
	const [users, setUsers] = useState([]);
	const [modal, setModal] = useState({
		status: 'user_add',
		elem: {},
	});
	const { handleSubmit, register, reset } = useForm({
		defaultValues: {
			name: modal.elem.name,
			username: modal.elem.username,
			roll: modal.elem.roll,
			password: modal.elem.password,
		},
	});
	// const [isOpen, setOpen] = useState(false);
	if (isOpen == true) {
		document.querySelector('.modal-box').classList.add('active-m');
	}
	let body = {
		search: '',
		pages: 1,
		limit: 20,
		current_page: 1,
	};

	const getUsers = () => {
		setLoad(true);
		api
			.get_users(body)
			.then((res) => {
				setUsers(res.data.data);
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
	const remove = () => {
		setLoad(true);
		axios
			.delete(`http://test.m14.uz/user/delete?id=${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				setLoad(false);
				util.toast('success', res.message);
				getUsers();
			})
			.catch((err) => {
				setLoad(false);
				util.toast('warning', err.message);
			});
	};
	const submit = (data) => {
		setLoad(true);
		if (modal.status == 'user_add') {
			api
				.create_user(data)
				.then((res) => {
					setLoad(false);
					util.toast('success', res.message);
					reset();
					getUsers();
				})
				.catch((err) => {
					util.toast('warning', err.message);
					setLoad(false);
					reset();
				});
		} else {
			api
				.update_user({
					id: modal.elem.id,
					name: data.name,
					username: data.username,
					password: data.password != '' ? data.password : '',
					roll: data.roll,
				})
				.then((res) => {
					util.toast('success', res.message);
					setLoad(false);
					reset();
				})
				.catch((err) => {
					setLoad(false);
					reset();
					util.toast('warning', err.message);
				});
		}
	};
	useEffect(() => {
		getUsers();
	}, [users.length]);
	return (
		<>
			<div className='d-flex flex-column w-100'>
				<div className='panel-top py-3 px-4 border border-bottom'>
					<h3 className='m-0'>Adminlar</h3>
					<div className='top-search'>
						<input
							className='form-control mr-3'
							type='search'
							placeholder='Qidirish...'
						/>
						<i
							className='fa-solid fa-user-plus fa-xl pointer'
							data-bs-toggle='modal'
							data-bs-target='#user'
							onClick={() => {
								setModal({
									status: 'user_add',
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
					{users.length > 0 ? (
						<table className='table'>
							<thead>
								<tr>
									<th scope='col'>#</th>
									<th scope='col'>Ism-familiya</th>
									<th scope='col'>Username</th>
									<th scope='col'>Rol</th>
									<th scope='col'></th>
								</tr>
							</thead>
							<tbody className='gid-body'>
								{users.map((elem, index) => (
									<tr key={elem.id}>
										<th scope='row'>{index + 1}</th>
										<td>{elem.name}</td>
										<td>{elem.username}</td>
										<td>{elem.roll}</td>
										<td>
											<button
												className='btn btn-warning me-2 btn-action open-modal'
												type='button'
												onClick={() => {
													setModal({
														status: 'user_edit',
														elem: elem,
													});
													setOpen(true);
												}}
												// data-bs-toggle='modal'
												// data-bs-target='#user'
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
			{/* <ModalUser item={modal} getUsers={getUsers} /> */}
			<div className='modal-box'>
				<form className='' onSubmit={handleSubmit(submit)}>
					<div className='modal-c'>
						<div className='modal-bodyy'>
							<div className='modal-header'>
								<h1 className='modal-title fs-5' id='staticBackdropLabel'>
									{modal.status == 'user_add'
										? "Admin qo'shish"
										: "Adminni o'zgartirish"}
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
									aria-label='Close'
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
									Username
									<input
										className='form-control'
										type='text'
										defaultValue={modal.elem.username}
										{...register('username', { required: true })}
										placeholder='Username'
									/>
								</label>
								<label className='form-label d-block'>
									Password
									<input
										className='form-control'
										type='password'
										placeholder='Password'
										{...register('password')}
									/>
								</label>
								<label className='form-label d-block'>
									Rol:
									<input
										className='form-control'
										type='text'
										placeholder='Rol'
										defaultValue={modal.elem.roll}
										{...register('roll', { required: true })}
									/>
								</label>
							</div>
							<div className='modal-footer'>
								<button
									type='button'
									className='btn btn-danger me-2'
									onClick={() => {
										setOpen(false);
										document
											.querySelector('.modal-box')
											.classList.remove('active-m');
									}}
								>
									Rad etish
								</button>
								<button type='submit' className='btn btn-success'>
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

export default Admins;
