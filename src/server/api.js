import server from './server';
import query from './query';
import util from './util';
export const getFormData = (object) =>
	Object.entries(object).reduce((fd, [key, val]) => {
		if (Array.isArray(val)) {
			val.forEach((v) => fd.append(key, v));
		} else {
			fd.append(key, val);
		}
		return fd;
	}, new FormData());
export default {
	token(data) {
		return server(`auth/token`, 'post', util.formData(data));
	},
	language(p = query) {
		const search = p.search ? `search=${p.search}` : ``;
		return server(
			`language?${search}&page=${p.pages}&limit=${p.limit}&status=true&default=true`
		);
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
		return server(
			`gids?page=${p.pages}&limit=${p.limit}&${search}&status=${p.status}`
		);
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
	// hotels
	get_hotels(p = query) {
		const search = p.search ? `search=${p.search}` : ``;
		const id = p.id ? `id=${p.id} ` : ``;
		return server(
			`hotels?language=${p.language}&${search}&${id}&page=${p.pages}&limit=${p.limit}`
		);
	},

	create_hotel(data) {
		return server('hotels/add', 'post', data);
	},
	update_hotel(data) {
		return server('hotels/update', 'put', data);
	},
	// museums
	get_museums(p = query) {
		const search = p.search ? `search=${p.search}` : ``;
		const id = p.id ? `id=${p.id} ` : ``;
		return server(
			`museums?language=${p.language}&${search}&${id}&page=${p.pages}&limit=${p.limit}`
		);
	},

	create_museum(data) {
		return server('museums/add', 'post', data);
	},
	update_museum(data) {
		return server('museums/update', 'put', data);
	},
	museum_single(id) {
		return server(`museums/single?id=${id}`);
	},
	// Languages
	get_lang(p = query) {
		const search = p.search ? `search=${p.search}` : ``;
		const def = p.id ? `default=${p.default} ` : ``;
		return server(
			`language?page=${p.pages}&limit=${p.limit}&${search}&status=${p.status}&${def}`
		);
	},
	create_lang(data) {
		return server('language/add', 'post', data);
	},
	update_lang(data) {
		return server('language/update', 'put', data);
	},
	delete_lang(id) {
		return server(`language/delete?id=${id}`);
	},

	// picture
	create_img(data) {
		let form_data = new FormData();
		form_data.append('file', data.file);
		return server(
			`picture/add?source=${data.source}&source_id=${data.source_id}`,
			'post',
			form_data
		);
	},
	update_img(data) {
		let form_data = new FormData();
		form_data.append('file', data.file);
		return server(`picture/update?id=${data.id}`, 'put', form_data);
	},
	// hotels
	get_scholar(p = query) {
		const search = p.search ? `search=${p.search}` : ``;
		const id = p.id ? `id=${p.id} ` : ``;
		return server(
			`allomalar?language=${p.language}&${search}&${id}&page=${p.pages}&limit=${p.limit}`
		);
	},

	create_scholar(data) {
		return server('allomalar/add', 'post', data);
	},
	update_scholar(data) {
		return server('allomalar/update', 'put', data);
	},
	scholar_single(id) {
		return server(`allomalar/single?id=${id}`);
	},
	// hotels
	get_news(p = query) {
		const search = p.search ? `search=${p.search}` : ``;
		const id = p.id ? `id=${p.id} ` : ``;
		return server(
			`news?&language=${p.language}&${search}&${id}&page=${p.pages}&limit=${p.limit}`
		);
	},

	create_news(data) {
		return server('news/add', 'post', data);
	},
	update_news(data) {
		return server('news/update', 'put', data);
	},

	news_single(id) {
		return server(`news/single?id=${id}`);
	},
	// hotels
	get_about(p = query) {
		const search = p.search ? `search=${p.search}` : ``;
		const id = p.id ? `id=${p.id} ` : ``;
		return server(
			`about?&language=${p.language}&${search}&${id}&page=${p.pages}&limit=${p.limit}&status=true`
		);
	},

	create_about(data) {
		return server('about/add', 'post', data);
	},
	update_about(data) {
		return server('about/update', 'put', data);
	},
	about_single(id) {
		return server(`about/single?id=${id}`);
	},

	hotel_single(id) {
		return server(`hotels/single?id=${id}`);
	},
	// Languages
	get_media(p = query) {
		const search = p.search ? `search=${p.search}` : ``;
		return server(
			`media?page=${p.pages}&limit=${p.limit}&${search}&status=${p.status}`
		);
	},
	create_media(data) {
		let form_data = new FormData();
		form_data.append('file', data.file);
		return server(`media/add?source=${data.source}`, 'post', form_data);
	},
	update_media(data) {
		return server('media/update', 'put', data);
	},
	// hotels
	get_menu(p = query) {
		const search = p.search ? `search=${p.search}` : ``;
		const id = p.id ? `id=${p.id} ` : ``;
		return server(
			`site_settings?language=${p.language}&${search}&${id}&page=${p.pages}&limit=${p.limit}`
		);
	},

	menu_single(id) {
		return server(`site_settings/single?id=${id}`);
	},

	create_menu(data) {
		return server('site_settings/add', 'post', data);
	},
	update_menu(data) {
		return server('site_settings/update', 'put', data);
	},
	// Logo
	get_logo() {
		return server('logo');
	},
	create_logo(data) {
		let form_data = new FormData();
		form_data.append('file', data.file);
		return server(`logo/add?source=${data.source}`, 'post', form_data);
	},

	update_logo(data) {
		let form_data = new FormData();
		form_data.append('files', data.file);
		console.log(form_data);
		return server(`logo/update?source=LOGO&id=13`, 'put', form_data);
	},
};
