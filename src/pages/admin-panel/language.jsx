import { useEffect, useState } from 'react';
import './admin.css';
import api from '../../server/api';
import util from '../../server/util';
// import axios from 'axios';
import Loading from '../../components/Animation/loading';
// import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import handleError from '../../server/handle';

const Language = () => {
	// const token = useSelector((state) => state.token.token);
	const [language, setLanguage] = useState([]);
	// const [id, setId] = useState();
	const [load, setLoad] = useState(false);
	const [modal, setModal] = useState({
		status: 'lang_add',
		elem: {},
	});
	const [isOpen, setOpen] = useState(false);
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
	// const [radioValue, setRadioValue] = useState(null);
	// const [checkboxValue, setCheckboxValue] = useState(false);

	// const handleCheckboxChange = (event) => {
	// 	setCheckboxValue(event.target.checked);
	// };
	const { handleSubmit, register, reset } = useForm({
		defaultValues: {
			id: modal.elem.id,
			name: modal.elem.name,
			key: modal.elem.key,
			default: modal.elem.default,
		},
	});
	// const remove = () => {
	// 	setLoad(true);
	// 	axios
	// 		.delete(`http://test.m14.uz/language/delete?id=${id}`, {
	// 			headers: { Authorization: `Bearer ${token}` },
	// 		})
	// 		.then((res) => {
	// 			setLoad(false);
	// 			util.toast('success', res.message);
	// 			getLanguage();
	// 		})
	// 		.catch((err) => {
	// 			setLoad(false);
	// 			console.log(err);
	// 			util.toast('warning', err.message);
	// 		});
	// };
	const handleRadioChange = (id) => {
		language.map((elem) => {
			if (elem.id != id) {
				if (elem.default == true) {
					elem.default = false;
					api
						.update_lang(elem)
						.then((res) => {
							util.toast('success', res.data.message);
							getLanguage();
						})
						.catch((err) => handleError(err));
				}
			}
			if (elem.id === id) {
				elem.default = true;
				api
					.update_lang(elem)
					.then((res) => {
						util.toast('success', res.data.message);
						getLanguage();
					})
					.catch((err) => handleError(err));
			}
		});
	};
	const getLanguage = () => {
		setLoad(true);
		api
			.get_lang(body)
			.then((res) => {
				setLanguage(res.data.data);
				console.log(res.data);
				body.pages = res.data.pages;
				body.limit = res.data.limit;
				body.current_page = res.data.current_page;
				setLoad(false);
			})
			.catch((err) => {
				console.log(err);
				util.toast('warning', err.message);
				setLoad(false);
			});
	};
	const submit = (data) => {
		api
			.create_lang({
				key: data.key,
				default: false,
				name: data.name,
			})
			.then((res) => {
				util.toast('success', res.message);
				console.log(res.data);
				getLanguage();
			})
			.catch((err) => {
				util.toastError('warning', err.message);
			});
	};

	useEffect(() => {
		getLanguage();
	}, []);

	return (
		<>
			<div className='d-flex flex-column w-100'>
				<div className='panel-top py-3 px-4 border border-bottom'>
					<h3 className='m-0'>Tillar</h3>
					<div className='top-search'>
						<input
							className='form-control mr-3'
							type='search'
							placeholder='Qidirish...'
						/>
						{/* <i
							className='fa-solid fa-plus fa-xl pointer'
							onClick={() => {
								setModal({
									status: 'lang_add',
									elem: {
										id: 0,
										name: '',
										key: '',
										default: false,
									},
								});
								setOpen(true);
							}}
						></i> */}
					</div>
				</div>
				<div className='panel-bottom p-3'>
					{language.length > 0 ? (
						<table className='table'>
							<thead>
								<tr>
									<th scope='col'>#</th>
									<th scope='col'>Til</th>
									<th scope='col'>Query</th>
									<th scope='col'>Dastlab</th>
									<th scope='col'></th>
								</tr>
							</thead>
							<tbody className='gid-body'>
								{language.map((elem, index) => (
									<tr key={elem.id}>
										<th scope='row'>{index + 1}</th>
										<td>{elem.name}</td>
										<td>{elem.key}</td>
										<td>
											<div id='fullpage'></div>
											<label>
												<select onChange={() => handleRadioChange(elem.id)}>
													{elem.default ? (
														<option value='true' default hidden>
															Ha
														</option>
													) : (
														<option value='false' default hidden>
															Yo`q
														</option>
													)}
													<option value='true'>Ha</option>
													<option value='false'>Yo`q</option>
												</select>
											</label>
										</td>
										<td>
											<button
												className='btn btn-warning me-2 btn-action open-modal'
												type='button'
												onClick={() => {
													setModal({
														status: 'lang_edit',
														elem: elem,
													});
													setOpen(true);
												}}
											>
												<i className='fa-solid fa-pen fa-sm text-white'></i>
											</button>
											{/* <button
												className='btn btn-danger btn-action'
												type='button'
												data-bs-toggle='modal'
												data-bs-target='#exampleModal'
												onClick={() => setId(elem.id)}
											>
												<i className='fa-solid fa-trash fa-sm'></i>
											</button> */}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<h4 className='text-center'>Ma`lumot topilmadi!</h4>
					)}
				</div>
				{/* <div
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
				</div> */}
				<div className='modal-box'>
					<form className='' onSubmit={handleSubmit(submit)}>
						<div className='modal-c'>
							<div className='modal-bodyy'>
								<div className='modal-header'>
									<h1 className='modal-title fs-5' id='staticBackdropLabel'>
										{modal.status == 'lang_add'
											? "Til qo'shish"
											: "Tilni o'zgartirish"}
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
										Nomi:
										<input
											className='form-control'
											type='text'
											defaultValue={modal.elem.name}
											placeholder='Nomi'
											{...register('name', { required: true })}
										/>
									</label>
									<label className='form-label d-block'>
										Query:
										<input
											className='form-control'
											type='text'
											defaultValue={modal.elem.key}
											{...register('key', { required: true })}
											placeholder='M:UZB'
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
				<div className={load === true ? 'd-block' : 'd-none'}>
					<Loading />
				</div>
			</div>
		</>
	);
};

export default Language;
