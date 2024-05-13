// // import { useState } from 'react';

// import { useForm } from 'react-hook-form';
// import './gid.css';

// import handleError from '../../server/handle';
// import api from '../../server/api';
// import util from '../../server/util';
// // import { useState } from 'react';
// const ModalUser = (item) => {
// 	// const { name, address, phone, languages } = item.item.elem;

// 	const { handleSubmit, register, reset } = useForm({
// 		defaultValues: {
// 			name: item.item.elem.name,
// 			username: item.item.elem.username,
// 			roll: item.item.elem.roll,
// 			password: item.item.elem.password,
// 		},
// 	});
// 	const submit = (data) => {
// 		setLoad(true);
// 		if (item.item.status == 'user_add') {
// 			api
// 				.create_user(data)
// 				.then((res) => {
// 					setLoad(false);
// 					util.toast('success', res.message);
// 					reset();
// 					item.getUsers();
// 				})
// 				.catch((err) => {
// 					handleError(err);
// 					setLoad(false);
// 					reset();
// 				});
// 		} else {
// 			api
// 				.update_user({
// 					id: item.item.elem.id,
// 					name: data.name,
// 					username: data.username,
// 					password: data.password != '' ? data.password : '',
// 					roll: data.roll,
// 				})
// 				.then((res) => {
// 					util.toast('success', res.message);
// 					setLoad(false);
// 					reset();
// 				})
// 				.catch((err) => {
// 					setLoad(false);
// 					reset();
// 					util.toast('warning', err.message);
// 				});
// 		}
// 		document.querySelector('.myModal').hide();
// 	};
// 	return <></>;
// };

// export default ModalUser;
