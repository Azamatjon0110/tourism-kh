import { useEffect, useState } from 'react';
import './admin.css';
import api from '../../server/api';
import Loading from '../../components/Animation/loading';
import util from '../../server/util';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import Logo from './logo';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const Menu = () => {
	const lang = useSelector((state) => state.lang.lang);
	const [load, setLoad] = useState(false);
	const [menu, setMenu] = useState([]);
	const [language, setLanguage] = useState([]);
	const [isOpen, setOpen] = useState(false);
	const [id, setId] = useState(false);
	const [modal, setModal] = useState({
		status: 'modal_add',
	});
	const modules = {
		toolbar: [
			[{ header: '1' }, { header: '2' }, { font: [] }],
			[{ size: [] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote'],

			['link'],
			['clean'],
		],
	};

	const formats = [
		'header',
		'font',
		'size',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
		'link',
		'image',
		'video',
	];
	// const [isOpenEdit, setOpenEdit] = useState(false);
	const { handleSubmit, register, reset, control } = useForm({
		defaultValues: {
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
		document.querySelector('.modal-menu').classList.add('active-m');
	}

	const getMenu = () => {
		setLoad(true);
		api
			.get_menu(body)
			.then((res) => {
				setMenu(res.data.data);
				getLang();
				setLoad(false);
			})
			.catch((err) => {
				console.log(err);
				setLoad(false);
			});
	};
	const getSingle = (id) => {
		setModal({ status: 'menu_edit' });
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
				setLoad(false);
			})
			.catch((err) => {
				console.log(err);
				setLoad(false);
			});
	};

	const submit = (data) => {
		data.texts.map((elem, i) => {
			elem.language = language[i].key;
		});
		setLoad(true);
		if (modal.status == 'menu_add') {
			api
				.create_menu(data)
				.then((res) => {
					console.log(res);
					setOpen(false);
					util.toast('success', res.message);
					document.querySelector('.modal-menu').classList.remove('active-m');
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
					document.querySelector('.modal-menu').classList.remove('active-m');
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
								getMenu();
								reset({ texts: [{ text: '', language: '' }], key: '' });
								setOpen(true);
								document.querySelector('.modal-menu').classList.add('active-m');
								setModal({ status: 'menu_add' });
							}}
						></i>
					</div>
				</div>
				<div className='panel-bottom p-3'>
					<Logo />
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
							<tbody className='gid-body menu-body'>
								{menu.map((elem, index) => (
									<tr key={elem.id}>
										<th scope='row'>{index + 1}</th>
										<td>{elem.key}</td>
										<td className=''>
											{elem.texts.map((item, i) => (
												<div className='d-flex' key={i}>
													<div
														className='d-block'
														dangerouslySetInnerHTML={{
															__html: item.language,
														}}
													></div>
													<span className='mx-1'>:</span>
													<div
														className='d-block'
														dangerouslySetInnerHTML={{
															__html: item.text,
														}}
													></div>
												</div>
											))}
										</td>
										<td>
											<button
												className='btn btn-warning me-2 btn-action open-modal'
												type='button'
												onClick={() => {
													setModal({ status: 'menu_edit' });
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
					<Stack spacing={2}>
						<Pagination
							count={body.pages}
							onChange={getMenu}
							page={body.current_page}
						/>
					</Stack>
				</div>
			</div>

			<div className='modal-box modal-menu'>
				<form className='' onSubmit={handleSubmit(submit)}>
					<div className='modal-c'>
						<div className='modal-bodyy'>
							<div className='modal-header'>
								<h1 className='modal-title fs-5' id='staticBackdropLabel'>
									{modal.status == 'menu_add'
										? 'Menu qo`shish'
										: 'Menuni o`zgartirish'}
								</h1>
								<button
									type='button'
									className='btn-close'
									onClick={() => {
										setOpen(false);
										document
											.querySelector('.modal-menu')
											.classList.remove('active-m');
									}}
								></button>
							</div>
							<div
								className='modal-body'
								style={{
									maxHeight: 500,
									overflowY: 'auto',
									padding: 12,
								}}
							>
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
									<div key={field.id}>
										{field.language}
										<Controller
											name={`texts[${index}].text`}
											control={control}
											defaultValue={field.text}
											render={({ field }) => (
												<ReactQuill
													modules={modules}
													formats={formats}
													defaultValue={field.value}
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
											.querySelector('.modal-menu')
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
