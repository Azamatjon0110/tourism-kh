import { useEffect, useState } from 'react';
import api from '../../server/api';

import util from '../../server/util';
import baseurl from '../../server/baseurl';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { useForm } from 'react-hook-form';
const Logo = () => {
	// const token = useSelector((state) => state.token.token);
	// const {  reset, register } = useForm({
	// 	logo: '',
	// });
	// const token = useSelector((state) => state.token.token);
	const [img, setImg] = useState();
	const [file, setFile] = useState(null);
	const [logo, setLogo] = useState(null);

	const [isOpenLogo, setOpenLogo] = useState(false);

	if (isOpenLogo == true) {
		document.querySelector('.modal-logo').classList.add('active-m');
	}

	const getLogo = () => {
		api
			.get_logo()
			.then((res) => {
				setLogo(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const changeLogo = (event) => {
		const fileImage = event.target.files[0];
		if (fileImage) {
			setFile(fileImage);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImg(reader.result);
			};
			reader.readAsDataURL(fileImage);
		}
	};

	const updateLogo = (evt) => {
		evt.preventDefault();
		console.log(file);
		const formData = new FormData();
		formData.append('files', file);
		// axios
		// 	.put(
		// 		`${baseurl}logo/update?source=${logo.source}&id=${logo.id}`,
		// 		{ files: [formData] },
		// 		{
		// 			headers: { Authorization: `Bearer ${token}` },
		// 		}
		// 	)
		api
			.update_logo({ source: logo.source, id: logo.id, files: file })
			.then((res) => {
				setImg();
				console.log(res);
				getLogo();
				util.toast('success', res.message);
				document.querySelector('.modal-logo').classList.remove('active-m');
				setOpenLogo(false);
				// reset();
			})
			.catch((err) => {
				setOpenLogo(false);
				console.log(err);
			});
	};
	useEffect(() => {
		getLogo();
	}, []);
	return (
		<>
			{logo ? (
				<div className='logotip-box d-flex align-items-center border-bottom mb-2 pb-2'>
					<img
						className='me-2'
						width={200}
						height={120}
						src={baseurl + logo.image_url}
						alt=''
					/>
					<button
						type='button'
						className='btn'
						onClick={() => {
							setOpenLogo(true);
							document.querySelector('.modal-logo').classList.add('active-m');
						}}
					>
						<i className='fa-solid fa-arrows-rotate me-1'></i>
						Alishtirish
					</button>
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
													className='me-2'
													width={200}
													height={120}
													src={img ? img : baseurl + logo.image_url}
													alt=''
												/>
												<label>
													<input
														type='file'
														// {...register('logo', { required: true })}
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
												// reset();
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
				</div>
			) : (
				''
			)}
		</>
	);
};

export default Logo;
