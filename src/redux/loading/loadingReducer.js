import { GET_LOADING, REMOVE_LOADING } from './loadingTypes';

const initialState = {
	loading: false,
};
// console.log(initialState.token);
export const LoadingReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_LOADING:
			return {
				...state,
				loading: action.loading,
			};

		case REMOVE_LOADING:
			return {
				...state,
				loading: action.loading,
			};

		default:
			return state;
	}
};
