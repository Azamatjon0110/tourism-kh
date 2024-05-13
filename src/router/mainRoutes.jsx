import { Routes, Route } from 'react-router-dom';
import AdminGuides from '../pages/admin-panel/guides';
import Admins from '../pages/admin-panel/users';
import About from '../pages/admin-panel/about';
import Allomalar from '../pages/admin-panel/scholar';
import Hotels from '../pages/admin-panel/hotel';
function AdminRoutes() {
	return (
		<Routes>
			<Route path='guides' Component={AdminGuides} />
			<Route path='users' Component={Admins} />
			<Route path='about' Component={About} />
			<Route path='scholars' Component={Allomalar} />
			<Route path='hotels' Component={Hotels} />
		</Routes>
	);
}

export default AdminRoutes;
