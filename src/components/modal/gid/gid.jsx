// import { useState } from 'react';

import { useForm } from 'react-hook-form';
import './gid.css';

import handleError from '../../../server/handle';
import api from '../../../server/api';
const ModalGid = ({ ...item }) => {
	const body = item;
	const { handleSubmit, register } = useForm({
		defaultValues: {
			// name: body.item.elem.name,
			// phone: body.item.elem.phone,
			// address: body.item.elem.address,
			// languages: body.item.elem.languages,
		},
	});
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
									{body.item.status == 'gid_add'
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
										placeholder='Ism familiya'
										{...register('name', { required: true })}
									/>
								</label>
								<label className='form-label d-block'>
									Manzil:
									<input
										className='form-control'
										type='text'
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
											{...register('phone', { required: true })}
										/>
									</div>
								</label>
								<label className='form-label d-block'>
									Tillar:
									<input
										className='form-control'
										type='text'
										placeholder='Ism'
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

export default ModalGid;
