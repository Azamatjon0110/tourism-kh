import axios from 'axios';
import baseurl from './baseurl';
// import { useSelector } from 'react-redux';
import handleError from './handle';
// import useDispatch from 'react-redux';
// import { getLoading } from '../redux/loading/loadingActions';
// import { createSelector } from 'reselect';
// const selectValues = createSelector((state) => state.token.token);

const Server = async (endpoint = '', method = 'get', data = null) => {
	const token = localStorage.getItem('token');
	// const dispatch = useDispatch();
	// let { token } = useSelector(selectValues);
	let result, error;

	await axios
		.request({
			baseURL: baseurl + endpoint,
			headers: { Authorization: `Bearer ${token}` },
			method: method,
			data: data,
		})
		.then((res) => {
			result = res;
		})
		.catch((err) => {
			error = err;
			handleError(err);
		})
		.finally(() => {
			// dispatch(getLoading(false));
		});

	return new Promise((resolve, reject) => {
		if (result) resolve(result);
		else reject(error);
	});
};

export default Server;
