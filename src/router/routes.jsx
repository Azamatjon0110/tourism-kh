import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/home';
import about from '../pages/about/about';
import News from '../pages/news/news';
import Historical from '../pages/historical-pl/historical';
import Hotel from '../pages/hotels/hotel';
import Media from '../pages/media/media';
import Guides from '../pages/gid/gid';
function MainRoutes() {
	return (
		<Routes>
			<Route path='/' Component={Home} />
			<Route path='/about' Component={about} />
			<Route path='/historical' Component={Historical} />
			<Route path='/hotels' Component={Hotel} />
			<Route path='/media' Component={Media} />
			<Route path='/guides' Component={Guides} />
			<Route path='/news' Component={News} />
		</Routes>
	);
}

export default MainRoutes;
