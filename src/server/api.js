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
			`get_users?${search}&page=${p.page}&limit=${p.limit}&status=true`
		);
	},
	this_user(p = query) {
		return server(`this_user?user_id=${p.user_id}`);
	},
	create_user(data) {
		return server(`create_user`, 'post', data);
	},
	update_user(data) {
		return server(`update_user`, 'put', data);
	},
	// guides
	get_guides(p = query) {
		const search = p.search ? `search=${p.search}` : ``;
		return server(
			`gids?branch_id=${search}&page=${p.page}&limit=${p.limit}`
		);
	},
	create_gid(data) {
		return server('gids/add', 'post', data);
	},
};
