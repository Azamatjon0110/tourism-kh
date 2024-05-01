import logo from '/src/assets/logo.svg';
import { Link } from 'react-router-dom';
import language from '/src/assets/lang/language';
// import x6 from '/src/assets/images/x8.jpg';
import x7 from '/src/assets/images/x10.jpg';
import './navbar.css';
const Navbar = () => {
	const lang = localStorage.getItem('lang');
	const ToggleNavbar = () => {
		document.querySelector('.hamburger').classList.toggle('active');
		document.querySelector('.navbar').classList.toggle('active');
	};
	const ToggleNavbarDs = () => {
		document.querySelector('.hamburger-ds').classList.toggle('active');
		document.querySelector('.desktop-offset').classList.toggle('active');
	};

	function changeLang() {
		// localStorage.setItem('lang', )
		// console.log(evt.target);
	}

	return (
		<nav className='navbar'>
			<div className='mobile-offset'>
				<Link to='/' className='logo'>
					<img className='logo-site' src={logo} alt='Logo' />
				</Link>

				<div className='navbar-box'>
					<div className='logo-box'>
						<Link to='/' className='logo'>
							<img className='logo-site' src={logo} alt='Logo' />
						</Link>
					</div>
					<div className='custom-menu'>
						<ul className='lang-list'>
							<li className='lang-item'>
								<p className='lang-btn' onClick={changeLang(EventTarget)}>
									{language[lang].home.sel_lang.uz}
								</p>
							</li>
							<li className='lang-item'>
								<p className='lang-btn' onClick={changeLang(EventTarget)}>
									{language[lang].home.sel_lang.ru}
								</p>
							</li>
							<li className='lang-item'>
								<p className='lang-btn' onClick={changeLang(EventTarget)}>
									{language[lang].home.sel_lang.en}
								</p>
							</li>
						</ul>
					</div>

					<div className='site-menu'>
						<ul className='lang-list'>
							<li className='lang-item'>
								<Link className='lang-btn' to='/' data-scroll-to>
									{language[lang].home.navbar.home}
								</Link>
							</li>
							<li className='lang-item d-block d-lg-none'>
								<Link className='lang-btn' to='/about' data-scroll-to>
									{language[lang].about.about_wrap_title}
								</Link>
							</li>
							<li className='lang-item d-block d-lg-none'>
								<Link className='lang-btn' to='/scholar' data-scroll-to>
									{language[lang].home.navbar.scholar}
								</Link>
							</li>
							<li className='lang-item d-block d-lg-none'>
								<Link
									className='lang-btn'
									to='/historical_places'
									data-scroll-to
								>
									{language[lang].home.navbar.his_pl}
								</Link>
							</li>
							<li className='lang-item d-block d-lg-none'>
								<Link className='lang-btn' to='/hotels' data-scroll-to>
									{language[lang].home.navbar.hotel}
								</Link>
							</li>
							<li className='lang-item d-block d-lg-none'>
								<Link className='lang-btn' to='/guides' data-scroll-to>
									{language[lang].home.navbar.gid}
								</Link>
							</li>
							<li className='lang-item d-block d-lg-none'>
								<Link className='lang-btn' to='/media' data-scroll-to>
									{language[lang].home.navbar.media}
								</Link>
							</li>
							<li className='lang-item dropdown-box d-none d-lg-block'>
								<p className='dropdown-c'>{language[lang].home.navbar.about}</p>
								<ul className='list-ustyled nav-dropdown'>
									<li className='dropdown-item'>
										<Link className='dropdown-link' to='/about' data-scroll-to>
											{language[lang].about.about_wrap_title}
										</Link>
									</li>
									<li className='dropdown-item'>
										<Link
											className='dropdown-link'
											to='/scholar'
											data-scroll-to
										>
											{language[lang].home.navbar.scholar}
										</Link>
									</li>
								</ul>
								{/* <Link className='lang-btn' to='/about' data-scroll-to>
									{language[lang].home.navbar.about}
								</Link> */}
							</li>
							<li className='lang-item dropdown-box d-none d-lg-block'>
								<p className='planning'>{language[lang].home.navbar.plan}</p>
								<ul className='list-ustyled nav-dropdown'>
									<li className='dropdown-item'>
										<Link
											className='dropdown-link'
											to='/historical_places'
											data-scroll-to
										>
											{language[lang].home.navbar.his_pl}
										</Link>
									</li>
									<li className='dropdown-item'>
										<Link className='dropdown-link' to='/hotels' data-scroll-to>
											{language[lang].home.navbar.hotel}
										</Link>
									</li>
									<li className='dropdown-item'>
										<Link className='dropdown-link' to='/guides' data-scroll-to>
											{language[lang].home.navbar.gid}
										</Link>
									</li>
									<li className='dropdown-item'>
										<Link className='dropdown-link' to='/media' data-scroll-to>
											{language[lang].home.navbar.media}
										</Link>
									</li>
								</ul>
							</li>

							{/* <li className='lang-item'>
								<Link className='lang-btn' to='/contact' data-scroll-to>
									{language[lang].home.navbar.contact}
								</Link>
							</li> */}
						</ul>
					</div>
				</div>
			</div>
			<div className='desktop-offset'>
				<Link to='/' className='logo'>
					<img className='logo-site' src={logo} alt='Logo' />
				</Link>
				<img className='ds-img' src={x7} alt='' />
				<p className='ds-description'>
					Xudoyorxon o`rdasi - XIX asrga tegishli tarixiy yodgorlik sanalib
					hozirgi kunda madaniy meros obyektlari qatoriga kiradi
				</p>
				<h3 className='ds-time-title'>{language[lang].home.home_off.open}</h3>
				<div className='week-days'>
					<p className='week-item'>{language[lang].home.home_off.week_days}:</p>
					<p className='week-item'> 09:00 - 18:00</p>
				</div>
				<div className='week-days'>
					<p className='week-item'>
						{language[lang].home.home_off.weekDay_rest}:
					</p>
					<p className='week-item'>10:00 - 18:00</p>
				</div>
			</div>
			<div className='hamburger-menu mobile' onClick={ToggleNavbar}>
				<svg className='hamburger' width='30' height='30' viewBox='0 0 30 30'>
					<path className='line line-top' d='M0,9h30' />
					<path className='line line-center' d='M0,15h30' />
					<path className='line line-bottom' d='M0,21h30' />
				</svg>
			</div>
			<div className='hamburger-menu desktop' onClick={ToggleNavbarDs}>
				<svg
					className='hamburger-ds'
					width='30'
					height='30'
					viewBox='0 0 30 30'
				>
					<path className='line line-top' d='M0,9h30' />
					<path className='line line-center' d='M0,15h30' />
					<path className='line line-bottom' d='M0,21h30' />
				</svg>
			</div>
		</nav>
	);
};

export default Navbar;
