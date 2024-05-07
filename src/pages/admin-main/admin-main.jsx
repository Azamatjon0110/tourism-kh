import { NavLink } from 'react-router-dom';
import './admin.css';
import AdminRoutes from '/src/router/mainRoutes';
import shape from '/src/assets/images/title-shape.png';

const MainAdmin = () => {
	return (
		<>
			<div className='admin-box'>
				<nav className='admin-nav'>
					<div className='d-flex align-items-center mb-4 justify-content-center'>
						<img className='admin-title-shape' src={shape} alt='' />
						<h3>Khokand</h3>
					</div>
					<ul className='sidebar__list'>
						<li className='sidebar__item '>
							<NavLink
								to='/admin/about'
								className={({ isActive }) =>
									isActive ? 'active sidebar__link' : ' sidebar__link'
								}
							>
								<i className='fa-solid navbar-icons fa-globe'></i>
								About
							</NavLink>
						</li>
						<li className='sidebar__item'>
							<NavLink
								to='/admin/users'
								className={({ isActive }) =>
									isActive ? 'active sidebar__link' : ' sidebar__link'
								}
							>
								<i className='fa-solid navbar-icons fa-users'></i>
								Users
							</NavLink>
						</li>
						<li className='sidebar__item'>
							<NavLink
								to='/admin/guides'
								className={({ isActive }) =>
									isActive ? 'active sidebar__link' : ' sidebar__link'
								}
							>
								<i className='fa-solid navbar-icons fa-people-group'></i>
								Guides
							</NavLink>
						</li>

						<li className='sidebar__item'>
							<NavLink
								to='/admin/museum'
								className={({ isActive }) =>
									isActive ? 'active sidebar__link' : ' sidebar__link'
								}
							>
								<i className='fa-solid navbar-icons fa-landmark'></i>
								Museum
							</NavLink>
						</li>
						<li className='sidebar__item'>
							<NavLink
								to='/admin/news'
								className={({ isActive }) =>
									isActive ? 'active sidebar__link' : ' sidebar__link'
								}
							>
								<i className='fa-regular navbar-icons fa-newspaper'></i>
								News
							</NavLink>
						</li>
						<li className='sidebar__item'>
							<NavLink
								to='/admin/hotels'
								className={({ isActive }) =>
									isActive ? 'active sidebar__link' : ' sidebar__link'
								}
							>
								<i className='fa-solid navbar-icons fa-hotel'></i>
								Hotels
							</NavLink>
						</li>
						<li className='sidebar__item'>
							<NavLink
								to='/admin/scholars'
								className={({ isActive }) =>
									isActive ? 'active sidebar__link' : ' sidebar__link'
								}
							>
								<i className='fa-solid navbar-icons fa-user-graduate'></i>
								Allomalar
							</NavLink>
						</li>
					</ul>
					<p className='sitebar__link sitebar__item rounded-5 border-c mb-0'>
						<i className='fa-solid fa-right-from-bracket me-2'></i>
						Chiqish
					</p>
				</nav>
				<AdminRoutes />
			</div>
		</>
	);
};

export default MainAdmin;
