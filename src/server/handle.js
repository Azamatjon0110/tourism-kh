import util from './util';
// import { useNavigate } from 'react-router';
// import router from "../router/index";
// import store from '../store';

const handleError = (error) => {
	// const navigate = useNavigate();
	const status = error.response?.status;
	const detail = error.response?.data?.detail;
	if (error.code == 'ERR_NETWORK') {
		util.toast('warning', "Internet bilan aloqa yo'q!");
	} else if (status)
		if (status == 400) {
			if (detail == 'Inactive user') {
				// store.dispatch('setUser', null);
				// router.push("/sign-in");
			} else util.toast('warning', detail);
		} else if (status == 401) {
			// store.dispatch('setUser', null);
			// navigate('/login');
		}
};

export default handleError;
