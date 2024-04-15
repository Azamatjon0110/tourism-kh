import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/home';
import about from '../pages/about/about';
import News from '../pages/news/news';

function MainRoutes() {
	return (
		<Routes>
			<Route path='/' Component={Home} />
			<Route path='/about' Component={about} />
			<Route path='/News' Component={News} />
		</Routes>
	);
}

export default MainRoutes;
