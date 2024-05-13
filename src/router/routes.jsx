import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/home';
import About from '../pages/about/about';
import News from '../pages/news/news';
import Historical from '../pages/historical-pl/historical';
import Hotels from '../pages/hotels/hotels';
import Media from '../pages/media/media';
import Guides from '../pages/gid/gid';
import Album from '../pages/album/album';
import Scholar from '../pages/scholar/scholar';
import Hotel from '../pages/hotel/hotel';
import Login from '../pages/login/login';
import MainAdmin from '../pages/admin-main/admin-main';
function MainRoutes() {
	return (
		<Routes>
			<Route path='/' Component={Home} />
			<Route path='/about' Component={About} />
			<Route path='/historical_places' Component={Historical} />
			<Route path='/hotels' Component={Hotels} />
			<Route path='/hotel' Component={Hotel} />
			<Route path='/media' Component={Media} />
			<Route path='/guides' Component={Guides} />
			<Route path='/news' Component={News} />
			<Route path='/album' Component={Album} />
			<Route path='/scholar' Component={Scholar} />
			<Route path='/login' Component={Login} />
			<Route path='/admin/*' Component={MainAdmin} />
		</Routes>
	);
}

export default MainRoutes;
