import { GET_USER, REMOVE_USER } from "./userType";

export const getUser = (user) => {
	return {
		type: GET_USER,
		payload: user,
	};
};

export const removeUser = () => {
	return {
		type: REMOVE_USER,
		payload: "",
	};
};
