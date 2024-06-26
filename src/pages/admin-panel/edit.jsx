import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
// import List from '@editorjs/editorjs';
// import Paragraph from '@editorjs/editorjs';
// import Quill from 'quill';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
// import axios from 'axios';
import api from '../../server/api';
import Loading from '../../components/Animation/loading';
// import { useSelector } from 'react-redux';
import baseurl from '../../server/baseurl';
import util from '../../server/util';
import handleError from '../../server/handle';

const Edit = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [imgId, setImgId] = useState();
	const lang = 'UZB';
	const [languages, setLanguage] = useState([]);
	const [load, setLoad] = useState(false);
	const [fileImage, setFile] = useState();
	const [img, setImg] = useState();
	const queryBox = location.search.split('&');
	const query = queryBox[0].slice(3);
	const id = queryBox[1].slice(3);
	const [pi, setPi] = useState();
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
		hotels: {
			title: 'Mehmonxona',
			api: 'hotels',
		},
		museums: {
			title: 'Muzey',
			api: 'museum',
		},
		news: {
			title: 'Mehmonxona',
			api: 'hotels',
		},
		scholar: {
			title: 'Muzeylar',
			api: 'museum',
		},
	};

	let body = {
		status: true,
		language: lang,
		search: '',
		pages: 1,
		limit: 20,
		current_page: 1,
	};

	const loadFile = (event) => {
		setFile(event.target.files[0]);
		setImg(URL.createObjectURL(event.target.files[0]));
	};

	const submit = (data) => {
		console.log(data);
		setLoad(true);
		data.texts.map((elem, i) => {
			data.texts[i].language = languages[i].key;
		});
		if (query == 'hotels') {
			api
				.update_hotel({
					id: id,
					title: data.title,
					address: data.address,
					texts: data.texts,
					videos: [],
				})
				.then((res) => {
					console.log(res);
					if (res.status == 200) {
						const body = {
							id: imgId,
							file: fileImage,
						};
						api
							.update_img(body)
							.then((res1) => {
								if (res1.status == 200) {
									util.toast('success', res1.data.data);
									reset();
									// setImg({});
									setFile('');
									setLoad(false);
								}
							})
							.catch((err) => {
								handleError(err);
								// setLoad(false);
							});
					}
					setLoad(false);
				})
				.catch((err) => {
					console.log(err);
					setLoad(false);
				});
		} else if (query == 'museums') {
			console.log(query);
			api
				.update_museum({
					id: id,
					title: data.title,
					address: data.address,
					texts: data.texts,
					videos: [],
				})
				.then((res) => {
					console.log(res);
					if (res.status == 200) {
						const body = {
							id: imgId,
							file: fileImage,
						};
						api
							.update_img(body)
							.then((res1) => {
								if (res1.status == 200) {
									util.toast('success', res1.data.data);
									reset();
									// setImg({});
									setFile('');
									setLoad(false);
								}
							})
							.catch((err) => {
								handleError(err);
								// setLoad(false);
							});
					}
					setLoad(false);
				})
				.catch((err) => {
					console.log(err);
					setLoad(false);
				});
		}
		// axios.post('https://test.m14.uz/hotels/add', {});
	};
	const getLanguage = () => {
		api
			.get_lang(body)
			.then((res) => {
				setLanguage(res.data.data);
				getFunctions();
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const getFunctions = () => {
		if (query == 'hotels') {
			api
				.hotel_single(id)
				.then((res) => {
					setImgId(res.data.pictures[0].id);
					setPi(res.data.pictures[0].image_url);
					reset({
						texts: res.data.texts,
						title: res.data.title,
						address: res.data.address,
					});
				})
				.catch((err) => {
					console.log(err);
				});
		} else if (query == 'museums') {
			api
				.museum_single(id)
				.then((res) => {
					setImgId(res.data.pictures[0].id);
					setPi(res.data.pictures[0].image_url);
					reset({
						texts: res.data.texts,
						title: res.data.title,
						address: res.data.address,
					});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	const { handleSubmit, register, control, reset } = useForm({
		defaultValues: {
			texts: [{ text: '', language: '' }],
			title: '',
			address: '',
			file: '',
		},
	});
	const { fields } = useFieldArray({
		control,
		name: 'texts',
	});

	useEffect(() => {
		getLanguage();
	}, []);
	return (
		<>
			<div className='p-2 edit-box'>
				<button className='btn border mb-3' onClick={() => navigate(-1)}>
					<i className='fa-regular fa-circle-left fa-lg me-2'></i>
					back
				</button>
				<div className='p-2 border rounded-1'>
					<h2 className=''> {type[query].title}ni o‘zgartirish</h2>
					<form className='row' onSubmit={handleSubmit(submit)}>
						<div className='col-4'>
							<div className='img-load'>
								{fileImage ? (
									<img className='h-image' src={img} alt='' />
								) : (
									<img className='h-image' src={baseurl + pi} alt='' />
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
							<label className='w-100 mb-3'>
								Nomi:
								<input
									className='form-control w-100 '
									type='text'
									// defaultValue={element.title}
									{...register('title', { required: true })}
									placeholder='Nomi...'
								/>
							</label>
							<label className='w-100 mb-3'>
								Manzil:
								<input
									className='form-control w-100 '
									type='text'
									// defaultValue={element.address}
									placeholder='Manzil...'
									{...register('address', { required: true })}
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

							<div>
								{/* <div id='editorjs'></div> */}
								{/* <button onClick={saveContent}>Save Content</button> */}
							</div>
							<button className='btn btn-success d-inline' type='submit'>
								Saqlash
							</button>
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

export default Edit;
