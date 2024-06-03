import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
// import List from '@editorjs/editorjs';
// import Paragraph from '@editorjs/editorjs';
// import Quill from 'quill';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
// import axios from 'axios';
import api from '../../server/api';
import Loading from '../../components/Animation/loading';
// import { useSelector } from 'react-redux';
import util from '../../server/util';
import handleError from '../../server/handle';
import baseurl from '../../server/baseurl';
// import baseurl from '../../server/baseurl';
const EditScholar = () => {
	const lang = 'UZB';
	const location = useLocation();
	const [imgId, setImgId] = useState();
	const navigate = useNavigate();
	const [load, setLoad] = useState(false);
	const [fileImage, setFile] = useState();
	const [image, setImg] = useState({});
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

	const { handleSubmit, register, reset, control } = useForm({
		defaultValues: {
			texts: [{ text: '', language: '' }],
			fullname: '',
			age: '',
			file: '',
		},
	});

	const { fields } = useFieldArray({
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

	const loadFile = (evt) => {
		const file = evt.target.files[0];
		if (file) {
			setFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImg(reader.result);
			};
			reader.readAsDataURL(file);
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
	const getScholar = () => {
		api
			.scholar_single(id)
			.then((res) => {
				setImgId(res.data?.pictures[0]?.id);
				reset({
					texts: res.data.texts,
					fullname: res.data.fullname,
					age: res.data.age,
				});
				setImg(res.data.pictures[0].image_url);
				getLanguage();
			})
			.catch((err) => {
				util.toastError('warning', err.message);
			});
	};
	const submit = (data) => {
		// setLoad(true);
		data.texts.map((elem, i) => {
			data.texts[i].language = languages[i].key;
		});
		if (query == 'scholar') {
			api
				.update_scholar({
					id: id,
					fullname: data.fullname,
					age: data.age,
					texts: data.texts,
					videos: [
						{
							text: '',
						},
					],
				})
				.then((res) => {
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
									getScholar();
								}
							})
							.catch((err) => {
								handleError(err);
								// setLoad(false);
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
		getScholar();
	}, [id]);
	return (
		<>
			<div className='p-2 edit-box'>
				<button className='btn border mb-3' onClick={() => navigate(-1)}>
					<i className='fa-regular fa-circle-left fa-lg me-2'></i>
					back
				</button>
				<div className='p-2 border rounded-1'>
					<h2 className=''> Allomani o‘zgartirish</h2>
					<form className='row' onSubmit={handleSubmit(submit)}>
						<div className='col-4'>
							<div className='img-load'>
								{fileImage != null ? (
									<img className='h-image' src={image} alt='' />
								) : (
									<img className='h-image' src={baseurl + image} alt='' />
								)}
							</div>
							<label className='d-flex  justify-content-center  pointer'>
								<input
									className='visually-hidden'
									type='file'
									onChange={loadFile}
									required
								/>
								Rasmni alishtirish
							</label>
						</div>
						<div className='col-8'>
							<label className='w-100 mb-3'>
								Ismi:
								<input
									className='form-control w-100 '
									type='text'
									{...register('fullname', { required: true })}
									placeholder='...'
								/>
							</label>

							<label className='w-100 mb-3'>
								Yashagan yillari:
								<input
									className='form-control w-100 '
									type='text'
									placeholder='...'
									{...register('age', { required: true })}
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
							{/* {fields.length == languages.length ? (
								''
							) : (
								<button
									className='btn btn-primary'
									type='button'
									onClick={() => append({ text: '', language: '' })}
								>
									Text qo‘shish
								</button>
							)} */}
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

export default EditScholar;
