// @ts-nocheck
import { browser } from '$app/environment';
import { config, fiero } from '$lib/js/fiero.js';
import { snack } from '$lib/js/vanilla.js';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	// throw redirect(307, '/oprs');
	const authToken = cookies.get('authToken');
	if (!authToken) return { clearUser: true };
}

export const actions = {
	login: async ({ cookies, request, fetch }) => {
		const loginFormData = await request.formData();

		const username = loginFormData.get('username');
		const password = loginFormData.get('password');
		const tipe = loginFormData.get('tipe');

		let loginResponse = {
			username,
			message: '',
			error: false
		};

		try {
			let { status, data } = await fetch(
				config.api + `/login?username=${username}&password=${password}&tipe=${tipe}`,
				{
					method: 'POST'
				}
			).then((res) => res.json());

			console.log(status, data);

			if (!status || status !== 200) {
				loginResponse.message = data;
				loginResponse.error = true;
			} else {
				cookies.set(
					'AuthUser',
					`${data.key}.${data.user.id}.${data.privilege}.${data.tipe}.${data.user.jabatan}.${data.user.bidang}`,
					{
						maxAge: 60 * 60 * 24,
						sameSite: 'strict',
						path: '/',
						secure: false,
						httpOnly: false
					}
				);

				cookies.set('UserTipe', data.tipe, {
					maxAge: 60 * 60 * 24
				});

				cookies.set('UserPrivilege', data.privilege, {
					maxAge: 60 * 60 * 24
				});

				cookies.set('UserJabatan', data.user.jabatan, {
					maxAge: 60 * 60 * 24
				});

				cookies.set('UserBidang', data.user.bidang, {
					maxAge: 60 * 60 * 24
				});

				if (tipe === 'operator') {
					throw redirect(307, '/opr');
				} else {
					throw redirect(307, '/user');
				}
			}
		} finally {
		}
		return loginResponse;
	}
};
