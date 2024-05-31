// import logo from '/src/assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
// import language from '/src/assets/lang/language';
// import x6 from '/src/assets/images/x8.jpg';
import x7 from '/src/assets/margilan.jpg';
import './navbar.css';
import { useEffect, useState } from 'react';
import api from '../../server/api';
import baseurl from '../../server/baseurl';
import { useDispatch, useSelector } from 'react-redux';
import { setLang } from '../../redux/language/langAction';
// import { Hidden } from '@mui/material';
const Navbar = () => {
	const dispatch = useDispatch();
	const [logo, setLogo] = useState();
	const [offset, setOffset] = useState();
	const [languages, setLanguage] = useState();
	const [main, setMain] = useState({});
	const [hotel, setHotel] = useState({});
	const [media, setMedia] = useState({});
	const [history, setHistory] = useState({});
	const [historical, setHistorical] = useState({});
	const [plan, setPlan] = useState({});
	const [gid, setGid] = useState({});
	const lang = useSelector((state) => state.lang.lang);
	const navigate = useNavigate();
	const ToggleNavbar = () => {
		document.querySelector('.hamburger').classList.toggle('active');
		document.querySelector('.navbar').classList.toggle('active');
	};
	const ToggleNavbarDs = () => {
		document.body.classList.toggle('body-over');
		document.querySelector('.hamburger-ds').classList.toggle('active');
		document.querySelector('.desktop-offset').classList.toggle('active');
	};

	function changeLang(evt) {
		console.log(evt.target.value);
		dispatch(setLang(evt.target.value));
		getLanguage();
		localStorage.setItem('lang', evt.target.value);
		navigate(0);
	}

	const body = {
		language: lang,
		pages: 1,
		limit: 40,
		status: true,
	};

	const getLanguage = () => {
		api
			.get_lang(body)
			.then((res) => {
				const lg = res.data.data;
				lg.reverse();
				setLanguage(lg);
				getSettings();
			})
			.catch((err) => console.log(err));
	};

	const getLogo = () => {
		api
			.get_logo()
			.then((res) => {
				setLogo(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getSettings = () => {
		api
			.get_menu(body)
			.then((res) => {
				console.log(res.data);
				res.data.data.map((elem) => {
					if (elem.key == 'Asosiy') {
						setMain(elem);
					} else if (elem.key == 'hotel') {
						setHotel(elem);
					} else if (elem.key == 'gid') {
						setGid(elem);
					} else if (elem.key == 'offset') {
						setOffset(elem);
					} else if (elem.key == 'media') {
						setMedia(elem);
					} else if (elem.key == 'history') {
						setHistory(elem);
					} else if (elem.key == 'historical') {
						setHistorical(elem);
					} else if (elem.key == 'plan') {
						setPlan(elem);
					}
					getLogo();
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getLanguage();
	}, [lang]);

	return (
		<nav className='navbar'>
			<div className='container'>
				<div className='mobile-offset'>
					<Link to='/' className=''>
						<img
							className='logo-site'
							src={logo?.id > 0 ? baseurl + logo.image_url : ''}
							alt='Logo'
						/>
					</Link>

					<div className='navbar-box'>
						<div className='logo-box mt-2 d-flex align-items-center justify-content-between d-lg-none'>
							<Link to='/' className='logo'>
								<img
									className='logo-site'
									src={logo?.id > 0 ? baseurl + logo.image_url : ''}
									alt='Logo'
								/>
							</Link>
							<span className='close-navbar pe-2' onClick={ToggleNavbar}>
								<i className='fa-solid fa-xmark fa-xl'></i>
							</span>
						</div>
						<div className='custom-menu'>
							<ul className='lang-list d-block d-lg-none'>
								{languages?.length > 0
									? languages.map((elem) => (
											<li className='lang-item' key={elem.id}>
												<p className='lang-btn' onClick={changeLang}>
													{elem.key}
												</p>
											</li>
									  ))
									: ''}
							</ul>
							<select
								className='select-lang d-none d-lg-block'
								onChange={changeLang}
							>
								<option value='' selected hidden>
									{lang}
								</option>
								{languages?.length > 0
									? languages.map((elem) => (
											<option
												className='lang-item'
												key={elem.id}
												value={elem.key}
											>
												{elem.key}
											</option>
									  ))
									: ''}
							</select>
						</div>

						<div className='site-menu'>
							<ul className='lang-list'>
								<li className='lang-item'>
									<Link className='lang-btn' to='/'>
										{main?.texts?.length > 0 ? (
											<div
												dangerouslySetInnerHTML={{
													__html: main?.texts[0].text,
												}}
											></div>
										) : (
											''
										)}
									</Link>
								</li>
								<li className='lang-item'>
									<Link className='lang-btn' to='/about'>
										{history?.texts?.length > 0 ? (
											<div
												dangerouslySetInnerHTML={{
													__html: history?.texts[0].text,
												}}
											></div>
										) : (
											''
										)}
									</Link>
								</li>
								<li className='lang-item d-block d-lg-none'>
									<Link className='lang-btn' to='/historical_places'>
										{historical?.texts?.length > 0 ? (
											<div
												dangerouslySetInnerHTML={{
													__html: historical?.texts[0].text,
												}}
											></div>
										) : (
											''
										)}
									</Link>
								</li>

								<li className='lang-item d-block d-lg-none'>
									<Link className='lang-btn' to='/hotels'>
										{hotel?.texts?.length > 0 ? (
											<div
												dangerouslySetInnerHTML={{
													__html: hotel?.texts[0].text,
												}}
											></div>
										) : (
											''
										)}
									</Link>
								</li>
								<li className='lang-item d-block d-lg-none'>
									<Link className='lang-btn' to='/guides'>
										{gid?.texts?.length > 0 ? (
											<div
												dangerouslySetInnerHTML={{
													__html: gid?.texts[0].text,
												}}
											></div>
										) : (
											''
										)}
									</Link>
								</li>
								<li className='lang-item d-block d-lg-none'>
									<Link className='lang-btn' to='/media'>
										{media?.texts?.length > 0 ? (
											<div
												dangerouslySetInnerHTML={{
													__html: media?.texts[0].text,
												}}
											></div>
										) : (
											''
										)}
									</Link>
								</li>

								<li className='lang-item dropdown-box d-none d-lg-block'>
									<p className='planning'>
										{plan?.texts?.length > 0 ? (
											<div
												dangerouslySetInnerHTML={{
													__html: plan?.texts[0].text,
												}}
											></div>
										) : (
											''
										)}
									</p>
									<ul className='list-ustyled nav-dropdown'>
										<li className='dropdown-item'>
											<Link className='dropdown-link' to='/historical_places'>
												{historical?.texts?.length > 0 ? (
													<div
														dangerouslySetInnerHTML={{
															__html: historical?.texts[0].text,
														}}
													></div>
												) : (
													''
												)}
											</Link>
										</li>
										<li className='dropdown-item'>
											<Link className='dropdown-link' to='/hotels'>
												{hotel?.texts?.length > 0 ? (
													<div
														dangerouslySetInnerHTML={{
															__html: hotel?.texts[0].text,
														}}
													></div>
												) : (
													''
												)}
											</Link>
										</li>
										<li className='dropdown-item'>
											<Link className='dropdown-link' to='/guides'>
												{gid?.texts?.length > 0 ? (
													<div
														dangerouslySetInnerHTML={{
															__html: gid?.texts[0].text,
														}}
													></div>
												) : (
													''
												)}
											</Link>
										</li>
										<li className='dropdown-item'>
											<Link className='dropdown-link' to='/media'>
												{media?.texts?.length > 0 ? (
													<div
														dangerouslySetInnerHTML={{
															__html: media?.texts[0].text,
														}}
													></div>
												) : (
													''
												)}
											</Link>
										</li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className='desktop-offset'>
					<Link to='/' className='logo'>
						<img
							className='logo-site'
							src={logo?.id > 0 ? baseurl + logo.image_url : ''}
							alt='Logo'
						/>
					</Link>
					<img className='ds-img' src={x7} alt='' />
					{offset?.texts?.length > 0 ? (
						<div
							className='text-white'
							dangerouslySetInnerHTML={{
								__html: offset?.texts[0].text,
							}}
						></div>
					) : (
						''
					)}
				</div>
				<div className='d-flex flex-row-reverse align-items-center'>
					<div className='hamburger-menu mobile' onClick={ToggleNavbar}>
						<svg
							className='hamburger'
							width='30'
							height='30'
							viewBox='0 0 30 30'
						>
							<path className='line line-top' d='M0,9h30' />
							<path className='line line-center' d='M0,15h30' />
							<path className='line line-bottom' d='M0,21h30' />
						</svg>
					</div>
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
				<i
					className='fa-solid fa-right-to-bracket fa-xl ms-2 d-none d-lg-block'
					onClick={() => navigate('/login')}
				></i>
			</div>
		</nav>
	);
};

export default Navbar;
