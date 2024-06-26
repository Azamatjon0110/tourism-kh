import { useEffect, useState } from 'react';
import language from '../../assets/lang/language';
import './footer.css';
import api from '../../server/api';
const Footer = () => {
	const lang = localStorage.getItem('lang');
	const [text, setText] = useState({});
	const [contact, setContact] = useState({});
	const body = {
		language: lang,
		pages: 1,
		limit: 40,
		status: true,
	};
	const getSettings = () => {
		api
			.get_menu(body)
			.then((res) => {
				console.log(res.data);
				res.data.data.map((elem) => {
					if (elem.key == 'ft-text') {
						setText(elem);
					} else if (elem.key == 'contact') {
						setContact(elem);
					}
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		getSettings();
	}, []);
	return (
		<>
			<div className='footer'>
				<div className='container'>
					<div className='footer-box'>
						<div className='ft-wrap'>
							<p className='ft-text'>
								{text?.texts?.length > 0 ? (
									<div
										dangerouslySetInnerHTML={{
											__html: text?.texts[0].text,
										}}
									></div>
								) : (
									''
								)}
							</p>
						</div>
						<div className='ft-contact'>
							<h3 className='ft-title'>
								{contact?.texts?.length > 0 ? (
									<div
										dangerouslySetInnerHTML={{
											__html: contact?.texts[0].text,
										}}
									></div>
								) : (
									''
								)}
							</h3>
							<ul className='list-unstyled'>
								<li className='ct-item'>
									<a
										className='ct-tel pb-1'
										href='https://www.google.com/maps/place/%D0%9A%D0%BE%D0%BA%D0%B0%D0%BD%D0%B4,+%D0%A4%D0%B5%D1%80%D0%B3%D0%B0%D0%BD%D1%81%D0%BA%D0%B0%D1%8F+%D0%9E%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+%D0%A3%D0%B7%D0%B1%D0%B5%D0%BA%D0%B8%D1%81%D1%82%D0%B0%D0%BD/@40.5352693,70.8985354,12.91z/data=!4m6!3m5!1s0x38baeeeb2e1c3e7f:0x816d723cc5842908!8m2!3d40.5341079!4d70.9309024!16zL20vMDNsc3I5?entry=ttu'
										target='blank'
									>
										<i className='fa-solid fa-location-dot me-2'></i>
										Marg`ilon
									</a>
								</li>
								<li className='ct-item'>
									<div className=''>
										<a
											className='ct-tel pb-1'
											href='tel:+998996012404'
											target='blank'
										>
											<i className='fa-solid fa-phone me-2'></i>
											+998 (99) 601-24-04
										</a>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
				{/* <div className='footer-bt'>
					<div className='container'>
						<p className='footer-bt__text'>{language[lang].home.ft_link}</p>
					</div>
				</div> */}
			</div>
		</>
	);
};

export default Footer;
