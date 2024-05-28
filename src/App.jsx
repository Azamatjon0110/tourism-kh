import MainRoutes from './router/routes';
import './App.css';
import api from './server/api';
import { useEffect } from 'react';
// localStorage.setItem('lang', 'uz');

function App() {
	const body = {
		search: '',
		pages: 1,
		limit: 20,
		status: true,
		default: true,
		data: [],
	};
	const getLanguage = () => {
		api
			.language(body)
			.then((res) => {
				body.data = res.data.data;
				localStorage.setItem('lang', res.data.data[0].key);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	// const scrollRef = useRef(null);
	useEffect(() => {
		getLanguage();
		// 	const scroll = new LocomotiveScroll({
		// 		el: scrollRef.current,
		// 		smooth: true,
		// 	});
		// 	return () => scroll.destroy();
	}, []);
	return (
		<>
			<MainRoutes />
		</>
	);
}

export default App;
