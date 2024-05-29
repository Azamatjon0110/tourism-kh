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
import { useSelector } from 'react-redux';
import util from '../../server/util';
import handleError from '../../server/handle';
import pi from '/src/assets/m-images/pl.jpg';
const AddScholar = () => {
	const lang = useSelector((state) => state.lang.lang);
	const location = useLocation();
	const navigate = useNavigate();
	const [load, setLoad] = useState(false);
	const [file, setFile] = useState(null);
	const [image, setImg] = useState(null);
	const [languages, setLanguages] = useState([]);

	const query = location.search.slice(3);

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
		scholars: {
			title: 'Allomalar',
			api: 'alloma',
		},
	};

	const { handleSubmit, register, reset, control } = useForm({
		defaultValues: {
			texts: [{ text: '', language: '' }],
			fullname: '',
			age: '',
			file: '',
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
		setLoad(true);
		data.texts.map((elem, i) => {
			data.texts[i].language = languages[i].key;
		});
		if (query == 'scholars') {
			api
				.create_scholar({
					fullname: data.fullname,
					age: data.age,
					texts: data.texts,
					videos: [],
				})
				.then((res) => {
					console.log(file);
					if (res.status == 200) {
						const body = {
							source: res.data.source,
							source_id: res.data.source_id,
							file: file,
						};
						console.log(body);
						api
							.create_img(body)
							.then((res1) => {
								if (res1.status == 200) {
									util.toast('success', res1.data.data);
									reset();
									setFile(null);
									setLoad(false);
								}
							})
							.catch((err) => {
								handleError(err);
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
	}, []);
	return (
		<>
			<div className='p-2 edit-box'>
				<button className='btn border mb-3' onClick={() => navigate(-1)}>
					<i className='fa-regular fa-circle-left fa-lg me-2'></i>
					back
				</button>
				<div className='p-2 border rounded-1'>
					<h2 className=''> {type[query].title} qo‘shish</h2>
					<form className='row' onSubmit={handleSubmit(submit)}>
						<div className='col-4'>
							<div className='img-load'>
								{file ? (
									<img className='h-image' src={image} alt='' />
								) : (
									<img className='h-image' src={pi} alt='' />
								)}
							</div>
							<label className='d-flex  justify-content-center  pointer'>
								<input
									className='visually-hidden'
									type='file'
									{...register('file', { required: true })}
									onChange={loadFile}
									required
								/>
								{file ? 'Rasmni alishtirish ' : 'Rasm qo‘shish'}
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

export default AddScholar;
