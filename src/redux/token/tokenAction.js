import { GET_TOKEN, REMOVE_TOKEN } from "./tokenTypes";

export const getToken = (token) => {
	return {
		type: GET_TOKEN,
		paylod: token,
	};
};

export const removeToken = () => {
	return {
		type: REMOVE_TOKEN,
		paylod: "",
	};
};
