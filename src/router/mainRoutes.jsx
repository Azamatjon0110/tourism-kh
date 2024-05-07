import { Routes, Route } from 'react-router-dom';
import AdminGuides from '../pages/admin-guides/guides';
function AdminRoutes() {
	return (
		<Routes>
			<Route path='guides' Component={AdminGuides} />
		</Routes>
	);
}

export default AdminRoutes;
