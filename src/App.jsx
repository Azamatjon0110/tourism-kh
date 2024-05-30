import MainRoutes from './router/routes';
import './App.css';
import api from './server/api';
import { useEffect } from 'react';
// import LocomotiveScroll from 'locomotive-scroll';
// localStorage.setItem('lang', 'uz');

function App() {
	const body = {
		pages: 1,
		limit: 20,
		status: true,
		default: true,
	};
	const getLanguage = () => {
		api
			.language(body)
			.then((res) => {
				if (res.status == 200) {
					res.data.data.map((elem) => {
						if (elem.default == true) {
							localStorage.setItem('lang', elem.key);
						}
					});
				}
				body.data = res.data.data;
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		getLanguage();
	}, []);
	return (
		<>
			<section data-scroll-container>
				<MainRoutes />
			</section>
		</>
	);
}

export default App;
