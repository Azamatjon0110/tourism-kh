import { Routes, Route } from 'react-router-dom';
import AdminGuides from '../pages/admin-panel/guides';
import Admins from '../pages/admin-panel/users';
import About from '../pages/admin-panel/about';
import Allomalar from '../pages/admin-panel/scholar';
import Hotels from '../pages/admin-panel/hotel';
import Museum from '../pages/admin-panel/museum';
import Add from '../pages/admin-panel/add';
import Edit from '../pages/admin-panel/edit';
import News from '../pages/admin-panel/news';
import Language from '../pages/admin-panel/language';
import Media from '../pages/admin-panel/media';
import Menu from '../pages/admin-panel/menu';
import AddScholar from '../pages/admin-panel/add-scholar';
import Addnews from '../pages/admin-panel/add-news';
import EditNews from '../pages/admin-panel/edit-news';
import EditScholar from '../pages/admin-panel/edit-scholar';
function AdminRoutes() {
	return (
		<Routes>
			<Route path='guides' Component={AdminGuides} />
			<Route path='users' Component={Admins} />
			<Route path='about' Component={About} />
			<Route path='museum' Component={Museum} />
			<Route path='media' Component={Media} />
			<Route path='menu' Component={Menu} />
			<Route path='scholars' Component={Allomalar} />
			<Route path='news' Component={News} />
			<Route path='hotels' Component={Hotels} />
			<Route path='language' Component={Language} />
			<Route path='add/*' Component={Add} />
			<Route path='addScholar/*' Component={AddScholar} />
			<Route path='plus/*' Component={Addnews} />
			<Route path='editNews/*' Component={EditNews} />
			<Route path='editScholar/*' Component={EditScholar} />
			<Route path='edit/*' Component={Edit} />
		</Routes>
	);
}

export default AdminRoutes;
