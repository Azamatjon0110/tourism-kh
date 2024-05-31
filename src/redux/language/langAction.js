import { GET_LANGUAGE, REMOVE_LANGUAGE } from './langTypes';

export const setLang = (lang) => {
	return {
		type: GET_LANGUAGE,
		payload: lang,
	};
};

export const removeLang = () => {
	return {
		type: REMOVE_LANGUAGE,
		payload: '',
	};
};
