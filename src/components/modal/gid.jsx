// import { useState } from 'react';

import { useForm } from 'react-hook-form';
import Loading from '/src/components/Animation/loading';
import './gid.css';

import api from '../../server/api';
import { useState } from 'react';
import util from '../../server/util';
const ModalGid = (item) => {
	// console.log(f);
	// const ref = useRef();
	// const token = localStorage.getItem('token');
	const [load, setLoad] = useState(false);
	// useCallback(() => {
	// 	// getGuides
	// }, [second]);

	const { handleSubmit, register, reset } = useForm({
		defaultValues: {
			name: item.item.elem.name,
			phone: item.item.elem.phone,
			address: item.item.elem.address,
			languages: item.item.elem.languages,
		},
	});
	const submit = (data) => {
		setLoad(true);
		// console.log(getGuide);
		if (item.item.status == 'git_add') {
			api
				.create_gid(data)
				.then((res) => {
					console.log(res);
					reset();
					setLoad(false);
					util.toast('success', res.message);
					item.getGuides();
				})
				.catch((err) => {
					console.log(err);

					util.toast('warning', err.message);
					setLoad(false);
				});
		} else {
			setLoad(true);
			api
				.update_gid({
					id: item.item.elem.id,
					name: data.name,
					phone: data.phone,
					address: data.address,
					languages: data.languages,
				})
				.then(() => {
					reset();
					item.getGuides();
					setLoad(false);
				})
				.catch((err) => {
					setLoad(false);
					console.log(err);
				});
		}
	};
	return (
		<>
			<div
				className='modal fade'
				id='staticBackdrop'
				data-bs-backdrop='static'
				data-bs-keyboard='false'
				tabIndex='-1'
				aria-labelledby='staticBackdropLabel'
				aria-hidden='true'
			>
				<form className='' onSubmit={handleSubmit(submit)}>
					<div className='modal-dialog'>
						<div className='modal-content'>
							<div className='modal-header'>
								<h1 className='modal-title fs-5' id='staticBackdropLabel'>
									{item.item.status == 'gid_add'
										? "Gid qo'shish"
										: "Gidni o'zgartirish"}
								</h1>
								<button
									type='button'
									className='btn-close'
									data-bs-dismiss='modal'
									aria-label='Close'
								></button>
							</div>
							<div className='modal-body'>
								<label className='form-label d-block'>
									Ism-familiya:
									<input
										className='form-control'
										type='text'
										defaultValue={item.item.elem.name}
										placeholder='Ism familiya'
										{...register('name', { required: true })}
									/>
								</label>
								<label className='form-label d-block'>
									Manzil:
									<input
										className='form-control'
										type='text'
										defaultValue={item.item.elem.address}
										{...register('address', { required: true })}
										placeholder='Manzil'
									/>
								</label>
								<label className='form-label d-block'>
									Telefon:
									<div className='input-group'>
										<span className='border d-flex align-items-center px-2 phone-span'>
											+998
										</span>
										<input
											className='form-control'
											type='tel'
											defaultValue={item.item.elem.phone}
											maxLength={9}
											{...register('phone', { required: true })}
										/>
									</div>
								</label>
								<label className='form-label d-block'>
									Tillar:
									<input
										className='form-control'
										type='text'
										defaultValue={item.item.elem.languages}
										placeholder="O'zbek, rus, ingliz ..."
										{...register('languages', { required: true })}
									/>
								</label>
							</div>
							<div className='modal-footer'>
								<button
									type='button'
									className='btn btn-danger'
									data-bs-dismiss='modal'
									onClick={() => reset()}
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

export default ModalGid;
