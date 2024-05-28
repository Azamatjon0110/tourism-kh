import { useEffect, useState } from 'react';
import api from '../../server/api';
import { useSelector } from 'react-redux';

import baseurl from '../../server/baseurl';
import axios from 'axios';
import Loading from '../../components/Animation/loading';
import util from '../../server/util';
import { useForm } from 'react-hook-form';
const Logo = () => {
	const { handleSubmit, reset, register } = useForm({
		logo: '',
	});
	const [load, setLoad] = useState(false);
	const token = useSelector((state) => state.token.token);
	const [img, setImg] = useState();
	const [file, setFile] = useState();
	const [logo, setLogo] = useState({});

	const [isOpenLogo, setOpenLogo] = useState(false);

	if (isOpenLogo == true) {
		document.querySelector('.modal-logo').classList.add('active-m');
	}

	const getLogo = () => {
		api
			.get_logo()
			.then((res) => {
				setLogo(res.data);
				console.log(logo);
				setLoad(false);
			})
			.catch((err) => {
				setLoad(false);
				console.log(err);
			});
	};
	const changeLogo = (evt) => {
		setFile(evt.target.files[0]);
		setImg(URL.createObjectURL(evt.target.files[0]));
		console.log(file);
	};

	const updateLogo = () => {
		const form_data = new FormData();
		form_data.append('file', file);
		axios
			.put(
				`${baseurl}logo/update?source=${logo.source}&id=${logo.id}`,
				{ files: [form_data] },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)
			.then((res) => {
				getLogo();
				util.toast('success', res.message);
				setLoad(false);
				document.querySelector('.modal-logo').classList.remove('active-m');
				setOpenLogo(false);
				setImg();
				reset();
			})
			.catch((err) => {
				setOpenLogo(false);
				setLoad(false);
				console.log(err);
			});
	};
	useEffect(() => {
		getLogo();
	}, []);
	return (
		<>
			{logo.id > 0 ? (
				<div className='logotip-box d-flex align-items-center border-bottom'>
					<img width={200} height={120} src={baseurl + logo.image_url} alt='' />
					<button
						type='button'
						onClick={() => {
							setOpenLogo(true);
							document.querySelector('.modal-logo').classList.add('active-m');
						}}
					>
						<i className='fa-solid fa-arrows-rotate me-1'></i>
						Alishtirish
					</button>
					<div className='modal-box modal-logo'>
						<form className='' onSubmit={handleSubmit(updateLogo)}>
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
										<button type='submit' className='btn btn-success'>
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
			) : (
				''
			)}
		</>
	);
};

export default Logo;
