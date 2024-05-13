import server from './server';
import query from './query';
import util from './util';

export default {
	token(data) {
		return server(`auth/token`, 'post', util.formData(data));
	},
	// user
	get_users(p = query) {
		const search = p.search ? `search=${p.search}` : ``;
		return server(
			`user?${search}&page=${p.pages}&limit=${p.limit}&status=true`
		);
	},
	this_user(p = query) {
		return server(`this_user?user_id=${p.user_id}`);
	},
	create_user(data) {
		return server(`user/add`, 'post', data);
	},
	update_user(data) {
		return server(`user/update`, 'put', data);
	},
	delete_user(id) {
		return server(`user/delete?id=${id}`);
	},
	// guides
	get_guides(p = query) {
		const search = p.search ? `search=${p.search}` : ``;
		return server(`gids?${search}&page=${p.pages}&limit=${p.limit}`);
	},
	create_gid(data) {
		return server('gids/add', 'post', data);
	},
	update_gid(data) {
		return server('gids/update', 'put', data);
	},
	delete_gid(id) {
		return server(`gids/delete?id=${id}`);
	},
	// guides
	get_hotels(p = query) {
		if (p.language == 'uz') {
			p.language = `language=UZB`;
		} else if (p.language == 'ru') {
			p.language = `language=RUS`;
		} else if (p.language == 'en') {
			p.language = 'language=Eng';
		}
		const search = p.search ? `search=${p.search}` : ``;
		const id = p.id ? `id=${p.id} ` : ``;
		return server(
			`hotels?&${p.language}&${search}&${id}&page=${p.pages}&limit=${p.limit}`
		);
	},

	create_hotel(data) {
		return server('hotels/add', 'post', data);
	},
	update_hotel(data) {
		return server('hotels/update', 'put', data);
	},
};
