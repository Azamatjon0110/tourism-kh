import { useEffect, useState } from 'react';
import './guides.css';
import api from '../../server/api';
import ModalGid from '../../components/modal/gid/gid';
import ModalGidEdit from '../../components/modal/gid/gidEdit';

const AdminGuides = () => {
	const [guides, setGuides] = useState([]);
	const [guide, setGuide] = useState({});
	const [modal, setModal] = useState({});
	// console.log(guide);
	let body = {
		search: '',
		page: 1,
		limit: 20,
		current_page: 1,
	};
	const getGuides = () => {
		api
			.get_guides(body)
			.then((res) => {
				setGuides(res.data.data);
				body.page = res.data.pages;
				body.limit = res.data.limit;
				body.current_page = res.data.current_page;

				setModal({
					status: 'gid_add',
					elem: {
						name: '',
						phone: '',
						address: '',
						languages: '',
					},
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const openModal = (item) => setGuide(item);
	useEffect(() => {
		getGuides();
	}, [guides.length]);
	return (
		<>
			<div className='d-flex flex-column w-100'>
				<div className='panel-top py-3 px-4 border border-bottom'>
					<h3 className='m-0'>Gidlar</h3>
					<div className='top-search'>
						<input
							className='form-control mr-3'
							type='search'
							placeholder='Qirirish...'
						/>
						<i
							className='fa-solid fa-user-plus fa-xl pointer'
							data-bs-toggle='modal'
							data-bs-target='#staticBackdrop'
							onClick={() => {
								(modal.status = 'gid_add'), (modal.elem = {});
							}}
						></i>
					</div>
				</div>
				<div className='panel-bottom p-3'>
					{guides.length > 0 ? (
						<table className='table'>
							<thead>
								<tr>
									<th scope='col'>#</th>
									<th scope='col'>Ism-familiya</th>
									<th scope='col'>Manzil</th>
									<th scope='col'>Telefon</th>
									<th scope='col'>Tillar</th>
									<th scope='col'></th>
								</tr>
							</thead>
							<tbody className='gid-body'>
								{guides.map((elem, index) => (
									<tr key={elem.id}>
										<th scope='row'>{index + 1}</th>
										<td>{elem.name}</td>
										<td>{elem.address}</td>
										<td>{elem.phone}</td>
										<td>{elem.languages}</td>
										<td>
											<button
												className='btn btn-warning me-2 btn-action open-modal'
												type='button'
												onClick={() => openModal(elem)}
												data-bs-toggle='modal'
												data-bs-target='#staticBackdrop1'
											>
												<i className='fa-solid fa-pen fa-sm text-white'></i>
											</button>
											<button
												className='btn btn-danger btn-action'
												type='button'
												data-bs-toggle='modal'
												data-bs-target='#exampleModal'
											>
												<i className='fa-solid fa-trash fa-sm'></i>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<h4 className='text-center'>Ma`lumot topilmadi!</h4>
					)}
				</div>
			</div>
			<ModalGid item={modal} />
			<ModalGidEdit item={{ ...guide }} />
			<div
				className='modal fade'
				id='exampleModal'
				tabIndex='-1'
				aria-labelledby='exampleModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog modal-dialog-centered'>
					<div className='modal-content'>
						<div className='modal-body'>
							<h1 className='m-title'>O`chirmoqchimisiz</h1>
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-danger'
								data-bs-dismiss='modal'
							>
								Yo`q
							</button>
							<button type='button' className='btn btn-success'>
								Ha
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminGuides;
