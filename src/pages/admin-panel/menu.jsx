import { useEffect, useState } from 'react';
import './admin.css';
import api from '../../server/api';
import Loading from '../../components/Animation/loading';
import util from '../../server/util';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import baseurl from '../../server/baseurl';
// import axios from 'axios';

const Menu = () => {
	const lang = useSelector((state) => state.lang.lang);
	const [load, setLoad] = useState(false);
	const [menu, setMenu] = useState([]);
	const [language, setLanguage] = useState([]);
	const [isOpen, setOpen] = useState(false);
	const [isOpenLogo, setOpenLogo] = useState(false);
	const [id, setId] = useState(false);
	const [img, setImg] = useState();
	const [file, setFile] = useState();
	const [logo, setLogo] = useState({});
	const [modal, setModal] = useState({
		status: 'modal_add',
	});
	// const [isOpenEdit, setOpenEdit] = useState(false);
	const { handleSubmit, register, reset, control } = useForm({
		defaultValues: {
			logo: '',
			key: '',
			texts: [{ text: '', language: '' }],
		},
	});
	const { fields, append } = useFieldArray({
		control,
		name: 'texts',
	});

	let body = {
		language: lang,
		search: '',
		pages: 1,
		limit: 20,
		current_page: 1,
		status: true,
	};

	let bodyLang = {
		search: '',
		pages: 1,
		limit: 20,
		current_page: 1,
		status: true,
	};
	if (isOpen == true) {
		document.querySelector('.modal-box').classList.add('active-m');
	}

	if (isOpenLogo == true) {
		document.querySelector('.modal-logo').classList.add('active-m');
	}

	const getMenu = () => {
		setLoad(true);
		api
			.get_menu(body)
			.then((res) => {
				setMenu(res.data.data);
				body.pages = res.data.pages;
				body.limit = res.data.limit;
				body.current_page = res.data.current_page;
				getLang();
				setLoad(false);
			})
			.catch((err) => {
				console.log(err);
				setLoad(false);
			});
	};
	const getSingle = (id) => {
		setModal({ status: 'modal_edit' });
		setLoad(true);
		setId(id);
		api
			.menu_single(id)
			.then((res) => {
				setOpen(true);
				reset({
					key: res.data.key,
					texts: res.data.texts,
				});
				setLoad(false);
			})
			.catch((err) => {
				console.log(err);
				setLoad(false);
			});
	};
	const getLang = () => {
		setLoad(true);
		api
			.get_lang(bodyLang)
			.then((res) => {
				setLanguage(res.data.data);
				bodyLang.pages = res.data.pages;
				bodyLang.limit = res.data.limit;
				bodyLang.current_page = res.data.current_page;
				getLogo();
				setLoad(false);
			})
			.catch((err) => {
				console.log(err);
				setLoad(false);
			});
	};

	const getLogo = () => {
		api
			.get_logo()
			.then((res) => {
				setLogo(res.data);
				setLoad(false);
			})
			.catch((err) => {
				setLoad(false);
				console.log(err);
			});
	};

	const submit = (data) => {
		data.texts.map((elem, i) => {
			data.texts[i].language = language[i].key;
		});
		setLoad(true);
		if (modal.status == 'modal_add') {
			api
				.create_menu(data)
				.then((res) => {
					reset();
					setOpen(false);
					document.querySelector('.modal-box').classList.remove('active-m');
					util.toast('success', res.message);
					reset();
					getMenu();
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
				.update_menu({
					id: id,
					key: data.key,
					texts: data.texts,
				})
				.then(() => {
					getMenu();
					reset();
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

	const changeLogo = (evt) => {
		setImg(URL.createObjectURL(evt.target.files[0]));
		setFile(evt.target.files[0]);
	};

	const updateLogo = (evt) => {
		evt.preventDefault();
		setLoad(true);
		console.log(file);
		// axios
		// 	.put(`logo/update?source=${logo.source}&id=${logo.id}`)
		// 	.update_logo({
		// 		id: logo.id,
		// 		source: logo.source,
		// 		file: file,
		// 	})
		// 	.then((res) => {
		// 		getLogo();
		// 		util.toast('success', res.message);
		// 		setLoad(false);
		// 		reset();
		// 	})
		// 	.catch((err) => {
		// 		setLoad(false);
		// 		console.log(err);
		// 	});
	};
	useEffect(() => {
		getMenu();
	}, [menu.length]);
	return (
		<>
			<div className='d-flex flex-column w-100'>
				<div className='panel-top py-3 px-4 border border-bottom'>
					<h3 className='m-0'>Menu</h3>
					<div className='top-search'>
						<input
							className='form-control mr-3'
							type='search'
							placeholder='Qidirish...'
						/>
						<i
							className='fa-solid fa-plus fa-xl pointer'
							onClick={() => {
								setOpen(true);
							}}
						></i>
					</div>
				</div>
				<div className='panel-bottom p-3'>
					{logo.id > 0 ? (
						<div className='logotip-box d-flex align-items-center border-bottom'>
							<img
								width={200}
								height={120}
								src={baseurl + logo.image_url}
								alt=''
							/>
							<button
								type='button'
								onClick={() => {
									setOpenLogo(true);
									document
										.querySelector('.modal-logo')
										.classList.add('active-m');
								}}
							>
								<i className='fa-solid fa-arrows-rotate me-1'></i>
								Alishtirish
							</button>
						</div>
					) : (
						''
					)}
					{menu.length > 0 ? (
						<table className='table'>
							<thead>
								<tr>
									<th scope='col'>#</th>
									<th scope='col'>Menu nomi</th>
									<th scope='col'>Text</th>
									<th scope='col'></th>
								</tr>
							</thead>
							<tbody className='gid-body'>
								{menu.map((elem, index) => (
									<tr key={elem.id}>
										<th scope='row'>{index + 1}</th>
										<td>{elem.key}</td>
										<td className='d-flex'>
											{elem.texts.map((item) => item.language)}:
											{elem.texts.map((item) => (
												<div
													key={item}
													dangerouslySetInnerHTML={{
														__html: item.text,
													}}
												></div>
											))}
										</td>
										<td>
											<button
												className='btn btn-warning me-2 btn-action open-modal'
												type='button'
												onClick={() => {
													getSingle(elem.id);
												}}
											>
												<i className='fa-solid fa-pen fa-sm text-white'></i>
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
									{modal.status == 'modal_add'
										? 'Menu qo`shish'
										: 'Menuni o`zgartirish'}
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
										placeholder='Nomi...'
										{...register('key', { required: true })}
									/>
								</label>

								{fields.map((field, index) => (
									<div className='menu-wrap' key={field.id}>
										{language.length > 0 ? language[index]?.name : ''}
										<Controller
											name={`texts.${index}.text`}
											control={control}
											defaultValue={field.text}
											render={({ field }) => (
												<ReactQuill
													value={field.value}
													onChange={field.onChange}
													theme='snow'
												/>
											)}
										/>
									</div>
								))}
								{fields.length == language.length ? (
									''
								) : (
									<button
										className='btn btn-primary'
										type='button'
										onClick={() => append({ text: '', language: '' })}
									>
										Text qo‘shish
									</button>
								)}
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
										reset();
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

			<div className='modal-box modal-logo'>
				<form className='' onSubmit={updateLogo}>
					<div className='modal-c'>
						<div className='modal-bodyy'>
							<div className='modal-header'>
								<h1 className='modal-title fs-5' id='staticBackdropLabel'>
									Logoni o`zgartirish
								</h1>
								<button
									type='button'
									className='btn-close'
									onClick={() => {
										setOpenLogo(false);
										document
											.querySelector('.modal-logo')
											.classList.remove('active-m');
									}}
								></button>
							</div>
							<div className='modal-body'>
								{logo.id > 0 ? (
									<div className='logotip-box d-flex align-items-center border-bottom'>
										<img
											width={200}
											height={120}
											src={img ? img : baseurl + logo.image_url}
											alt=''
										/>
										<label>
											<input
												type='file'
												{...register('logo')}
												onChange={changeLogo}
												className='visually-hidden'
												required
											/>
											<i className='fa-solid fa-arrows-rotate me-1'></i>
											Alishtirish
										</label>
									</div>
								) : (
									''
								)}
							</div>
							<div className='modal-footer'>
								<button
									type='button'
									className='btn btn-danger me-2'
									onClick={() => {
										setOpenLogo(false);
										document
											.querySelector('.modal-logo')
											.classList.remove('active-m');
										reset();
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

			<div className={load === true ? 'd-block' : 'd-none'}>
				<Loading />
			</div>
		</>
	);
};

export default Menu;