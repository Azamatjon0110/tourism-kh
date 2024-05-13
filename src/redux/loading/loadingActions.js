import { GET_LOADING, REMOVE_LOADING } from './loadingTypes';

export const getLoading = (loading) => {
	return {
		type: GET_LOADING,
		paylod: loading,
	};
};

export const removeLoading = () => {
	return {
		type: REMOVE_LOADING,
		paylod: '',
	};
};
