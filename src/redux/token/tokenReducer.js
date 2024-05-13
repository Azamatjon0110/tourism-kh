import { GET_TOKEN, REMOVE_TOKEN } from './tokenTypes';

const initialState = {
	token: localStorage.getItem('token') || '',
};
// console.log(initialState.token);

export const TokenReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_TOKEN:
			return {
				...state,
				token: action.token,
			};

		case REMOVE_TOKEN:
			return {
				...state,
				token: action.token,
			};

		default:
			return state;
	}
};
