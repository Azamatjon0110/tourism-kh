import { useEffect, useState } from 'react';
import './admin.css';
import api from '../../server/api';
// import ModalGid from '../../components/modal/gid';
import Loading from '../../components/Animation/loading';

const About = () => {
	const [load, setLoad] = useState(false);
	const [guides, setGuides] = useState([]);
	const [setModal] = useState({
		status: 'git_add',
		elem: {},
	});
	const [id] = useState();
	let body = {
		search: '',
		pages: 1,
		limit: 20,
		current_page: 1,
	};
	const remove = () => {
		setLoad(true);
		api
			.delete_gid(id)
			.then((res) => {
				setLoad(false);
				console.log(res);
			})
			.catch((err) => {
				setLoad(false);
				console.log(err);
			});
	};
	const getGuides = () => {
		setLoad(true);
		api
			.get_guides(body)
			.then((res) => {
				setGuides(res.data.data);
				body.pages = res.data.pages;
				body.limit = res.data.limit;
				body.current_page = res.data.current_page;
				setLoad(false);
			})
			.catch((err) => {
				console.log(err);
				setLoad(false);
			});
	};

	useEffect(() => {
		getGuides();
	}, [guides.length]);
	return (
		<>
			<div className='d-flex flex-column w-100'>
				<div className='panel-top py-3 px-4 border border-bottom'>
					<h3 className='m-0'>Biz haqimizda</h3>
					<div className='top-search'>
						<input
							className='form-control mr-3'
							type='search'
							placeholder='Qidirish...'
						/>
						<i
							className='fa-solid fa-user-plus fa-xl pointer'
							data-bs-toggle='modal'
							data-bs-target='#staticBackdrop'
							onClick={() => {
								setModal({
									status: 'gid_add',
									elem: {
										name: '',
										phone: '',
										address: '',
										languages: '',
									},
								});
							}}
						></i>
					</div>
				</div>
				<div className='panel-bottom p-3'>
					{/* {guides.length > 0 ? (
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
												onClick={() =>
													setModal({
														status: 'gid_edit',
														elem: elem,
													})
												}
												data-bs-toggle='modal'
												data-bs-target='#staticBackdrop'
											>
												<i className='fa-solid fa-pen fa-sm text-white'></i>
											</button>
											<button
												className='btn btn-danger btn-action'
												type='button'
												data-bs-toggle='modal'
												data-bs-target='#about'
												onClick={() => setId(elem.id)}
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
					)} */}
				</div>
			</div>
			{/* <ModalGid item={modal} f={getGuides} /> */}
			<div
				className='modal fade'
				id='exampleModal'
				tabIndex='-1'
				aria-labelledby='about'
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
							<button
								type='button'
								className='btn btn-success'
								onClick={() => remove()}
								data-bs-dismiss='modal'
							>
								Ha
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className={load === true ? 'd-block' : 'd-none'}>
				<Loading />
			</div>
		</>
	);
};

export default About;
