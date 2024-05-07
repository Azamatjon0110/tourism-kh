// import { useState } from 'react';

import { useForm } from 'react-hook-form';
import './gid.css';

import handleError from '../../../server/handle';
import api from '../../../server/api';
const ModalGidEdit = (item) => {
	// console.log(item);
	// const { name, address, phone, languages } = item.item.elem;
	// console.log(name, address, phone, languages);
	const { handleSubmit, register } = useForm({
		defaultValues: {
			// name: item.item.elem.name,
			// phone: item.item.elem.phone,
			// address: item.item.elem.address,
			// languages: item.item.elem.languages,
		},
	});
	console.log(item);
	const submit = (data) => {
		api
			.create_gid(data)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				handleError(err);
			});
	};
	return (
		<>
			<div
				className='modal fade'
				id='staticBackdrop1'
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
									Gidni o`zgartirish
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
										placeholder='Ism familiya'
										{...register('name', { required: true })}
									/>
								</label>
								<label className='form-label d-block'>
									Manzil:
									<input
										className='form-control'
										type='text'
										// value={body.item.elem.address}
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
											maxLength={9}
											defaultValue={name}
											{...register('phone', { required: true })}
										/>
									</div>
								</label>
								<label className='form-label d-block'>
									Tillar:
									<input
										className='form-control'
										type='text'
										placeholder='Tillar'
										{...register('languages', { required: true })}
									/>
								</label>
							</div>
							<div className='modal-footer'>
								<button
									type='button'
									className='btn btn-danger'
									data-bs-dismiss='modal'
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
		</>
	);
};

export default ModalGidEdit;
