import { NavLink, useNavigate } from 'react-router-dom';
import './admin.css';
import AdminRoutes from '/src/router/mainRoutes';
import shape from '/src/assets/images/title-shape.png';

const MainAdmin = () => {
	const navigate = useNavigate();
	const removeToken = () => {
		localStorage.removeItem('token');
		navigate('/login');
	};
	return (
		<>
			<div className='admin-box'>
				<nav className='admin-nav'>
					<div className='d-flex align-items-center mb-4 justify-content-center'>
						<img className='admin-title-shape' src={shape} alt='' />
						<h3>Khokand</h3>
					</div>
					<ul className='sidebar__list'>
						<li className='sidebar__item'>
							<NavLink
								to='/admin/users'
								className={({ isActive }) =>
									isActive ? 'active-a sidebar__link' : ' sidebar__link'
								}
							>
								<i className='fa-solid navbar-icons fa-users'></i>
								Adminlar
							</NavLink>
						</li>
						<li className='sidebar__item'>
							<NavLink
								to='/admin/guides'
								className={({ isActive }) =>
									isActive ? 'active-a sidebar__link' : ' sidebar__link'
								}
							>
								<i className='fa-solid navbar-icons fa-people-group'></i>
								Gidlar
							</NavLink>
						</li>
						<li className='sidebar__item '>
							<NavLink
								to='/admin/about'
								className={({ isActive }) =>
									isActive ? 'active-a sidebar__link' : ' sidebar__link'
								}
							>
								<i className='fa-solid navbar-icons fa-globe'></i>
								Biz haqimizda
							</NavLink>
						</li>
						<li className='sidebar__item'>
							<NavLink
								to='/admin/museum'
								className={({ isActive }) =>
									isActive ? 'active-a sidebar__link' : ' sidebar__link'
								}
							>
								<i className='fa-solid navbar-icons fa-landmark'></i>
								Tarixiy joylar
							</NavLink>
						</li>
						<li className='sidebar__item'>
							<NavLink
								to='/admin/scholars'
								className={({ isActive }) =>
									isActive ? 'active-a sidebar__link' : ' sidebar__link'
								}
							>
								<i className='fa-solid navbar-icons fa-user-graduate'></i>
								Allomalar
							</NavLink>
						</li>
						<li className='sidebar__item'>
							<NavLink
								to='/admin/news'
								className={({ isActive }) =>
									isActive ? 'active-a sidebar__link' : ' sidebar__link'
								}
							>
								<i className='fa-regular navbar-icons fa-newspaper'></i>
								Yangiliklar
							</NavLink>
						</li>
						<li className='sidebar__item'>
							<NavLink
								to='/admin/hotels'
								className={({ isActive }) =>
									isActive ? 'active-a sidebar__link' : ' sidebar__link'
								}
							>
								<i className='fa-solid navbar-icons fa-hotel'></i>
								Mehmonxonalar
							</NavLink>
						</li>
					</ul>
					<p
						className='sitebar__link sitebar__item rounded-5 border-c mb-0'
						onClick={removeToken}
					>
						<i className='fa-solid fa-right-from-bracket me-2'></i>
						Chiqish
					</p>
				</nav>
				<div className='admin-main'>
					<AdminRoutes />
				</div>
			</div>
		</>
	);
};

export default MainAdmin;
