import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import api from '../../server/api';
import Loading from '../../components/Animation/loading';
import { useSelector } from 'react-redux';
import util from '../../server/util';
import baseurl from '../../server/baseurl';
const EditNews = () => {
	const lang = useSelector((state) => state.lang.lang);
	const location = useLocation();
	const navigate = useNavigate();
	const [load, setLoad] = useState(false);
	const [file, setFile] = useState(null);
	const [image, setImg] = useState(null);
	const [languages, setLanguages] = useState([]);

	const queryBox = location.search.split('&');
	const query = queryBox[0].slice(3);
	const id = queryBox[1].slice(3);

	const modules = {
		toolbar: [
			[{ header: '1' }, { header: '2' }, { font: [] }],
			[{ size: [] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote'],
			[
				{ list: 'ordered' },
				{ list: 'bullet' },
				{ indent: '-1' },
				{ indent: '+1' },
			],
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
	const type = {
		news: {
			title: 'Yangilikni',
			api: 'alloma',
		},
		about: {
			title: '',
			api: 'alloma',
		},
	};

	const { handleSubmit, register, reset, control } = useForm({
		defaultValues: {
			texts: [{ text: '', language: '' }],
			file: '',
			link: '',
		},
	});

	const { fields, append } = useFieldArray({
		control,
		name: 'texts',
	});

	let body = {
		status: true,
		language: lang,
		search: '',
		pages: 1,
		limit: 20,
		current_page: 1,
	};

	const loadFile = (event) => {
		const file = event.target.files[0];
		if (file) {
			setFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImg(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const getFunctions = () => {
		setLoad(true);
		if (query == 'news') {
			api
				.news_single(id)
				.then((res) => {
					console.log(res);
					reset({
						file: res.data.pictures[0]?.image_url,
						texts: res.data.texts,
						link: res.data.videos[0].video_url,
					});
					setImg(res.data.pictures[0]?.image_url);
					setLoad(false);
				})
				.catch((err) => {
					console.log(err);
				});
		} else if (query == 'about') {
			api
				.about_single(id)
				.then((res) => {
					reset({
						file: res.data.pictures[0].image_url,
						texts: res.data.texts,
					});
					setImg(res.data.pictures[0].image_url);
					setLoad(false);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const getLanguage = () => {
		api
			.get_lang(body)
			.then((res) => {
				setLanguages(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const submit = (data) => {
		data.texts.map((elem, i) => {
			data.texts[i].language = languages[i].key;
		});
		console.log(data);
		if (query == 'news') {
			api
				.update_news({
					id: id,
					texts: data.texts,
					videos: [],
				})
				.then((res) => {
					if (res.status == 200) {
						console.log(res);
						const body = {
							source: res.data.source,
							source_id: res.data.source_id,
							file: file,
						};
						api
							.update_img(body)
							.then((res1) => {
								if (res1.status == 200) {
									util.toast('success', res1.data.data);
									reset();
									// setImg({});
									navigate(-1);
									setFile(null);
									setLoad(false);
								}
							})
							.catch((err) => {
								util.toastError('warning', err.message);
								setLoad(false);
							});
					}
				})
				.catch((err) => {
					console.log(err);
					setLoad(false);
				});
		}
	};

	useEffect(() => {
		getLanguage();
		getFunctions();
	}, []);
	return (
		<>
			<div className='p-2 edit-box'>
				<button className='btn border mb-3' onClick={() => navigate(-1)}>
					<i className='fa-regular fa-circle-left fa-lg me-2'></i>
					back
				</button>
				<div className='p-2 border rounded-1'>
					<h2 className=''> {type[query].title} o‘zgartirish</h2>
					<form className='row' onSubmit={handleSubmit(submit)}>
						<div className='col-4'>
							<div className='img-load'>
								{file != null ? (
									<img className='h-image' src={image} alt='' />
								) : (
									<img className='h-image' src={baseurl + image} alt='' />
								)}
							</div>
							<label className='d-flex  justify-content-center  pointer'>
								<input
									className='visually-hidden'
									type='file'
									{...register('file')}
									onChange={loadFile}
								/>
								Rasmni alishtirish
							</label>
						</div>
						<div className='col-8'>
							{/* <label className='w-100 mb-3'>
								Video linki
								<input
									type='text'
									{...register('link')}
									className='form-control w-100'
								/>
							</label> */}
							{fields.map((field, index) => (
								<div key={field.id}>
									{languages.length > 0 ? languages[index].name : ''}
									<Controller
										name={`texts.${index}.text`}
										control={control}
										defaultValue={field.text}
										render={({ field }) => (
											<ReactQuill
												modules={modules}
												formats={formats}
												value={field.value}
												onChange={field.onChange}
												theme='snow'
											/>
										)}
									/>
								</div>
							))}
							{fields.length == languages.length ? (
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
							{fields.length == languages.length ? (
								<button className='btn btn-success d-inline' type='submit'>
									Saqlash
								</button>
							) : (
								''
							)}
						</div>
					</form>
				</div>
			</div>
			<div className={load === true ? 'd-block' : 'd-none'}>
				<Loading />
			</div>
		</>
	);
};

export default EditNews;
