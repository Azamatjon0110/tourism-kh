import { useEffect, useState } from 'react';
import './admin.css';
import api from '../../server/api';
import util from '../../server/util';
import Loading from '../../components/Animation/loading';
import { useForm } from 'react-hook-form';

import pi from '/src/assets/m-images/pl.jpg';
import baseurl from '../../server/baseurl';
const Media = () => {
	const [media, setMedia] = useState([]);
	const [load, setLoad] = useState(false);
	const [file, setFile] = useState();
	const [image, setImg] = useState();
	const [modal, setModal] = useState({
		status: 'media_add',
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
	const { handleSubmit, register, reset } = useForm({
		defaultValues: {
			file: '',
		},
	});

	const loadFile = (event) => {
		setFile(event.target.files[0]);
		setImg(URL.createObjectURL(event.target.files[0]));
	};

	const getMedia = () => {
		setLoad(true);
		api
			.get_media(body)
			.then((res) => {
				setMedia(res.data);
				setLoad(false);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
				util.toast('warning', err.message);
				setLoad(false);
			});
	};
	const submit = (data) => {
		console.log(data.file[0]);
		setLoad(true);
		api
			.create_media({ source: 'MEDIA', file: data.file[0] })
			.then((res) => {
				setLoad(false);
				getMedia();
				setFile();
				setImg();
				util.toast('success', res.message);
			})
			.catch((err) => {
				console.log(err);
				setLoad(false);
			});
	};

	useEffect(() => {
		getMedia();
	}, []);

	return (
		<>
			<div className='d-flex flex-column w-100'>
				<div className='panel-top py-3 px-4 border border-bottom'>
					<h3 className='m-0'>Media</h3>
					<div className='top-search'>
						<i
							className='fa-solid fa-plus fa-xl pointer'
							onClick={() => {
								setModal({
									status: 'media_add',
									elem: {
										id: 0,
									},
								});
								setOpen(true);
							}}
						></i>
					</div>
				</div>
				<div className='panel-bottom p-3'>
					{media.length > 0 ? (
						<div className='row'>
							{media.map((elem) => (
								<div className='col-3' key={elem.id}>
									<div className='w-100 media-wrap'>
										<img
											className='media_img'
											src={baseurl + elem.image_url}
											alt=''
										/>
										<div className='btn-gr'>
											<button
												className='btn btn-warning text-white media-edit'
												onClick={() => {
													setOpen(false);
													setModal({ status: 'media_edit', elem: elem });
													setFile(elem.image_url);
													document
														.querySelector('.modal-box')
														.classList.add('active-m');
													setImg(baseurl + elem.image_url);
												}}
											>
												<i className='fa-solid fa-pen'></i>
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<h4 className='text-center'>Ma`lumot topilmadi!</h4>
					)}
				</div>
				<div className='modal-box'>
					<form className='' onSubmit={handleSubmit(submit)}>
						<div className='modal-c'>
							<div className='modal-bodyy'>
								<div className='modal-header'>
									<h1 className='modal-title fs-5' id='staticBackdropLabel'>
										{modal.status == 'media_add'
											? "Media qo'shish"
											: "Mediani o'zgartirish"}
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

export default Media;
