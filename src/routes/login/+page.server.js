// @ts-nocheck
import { config } from '$lib/js/fiero.js';
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
			let res = await fetch(
				config.api + `/login?username=${username}&password=${password}&tipe=${tipe}`,
				{
					method: 'POST'
				}
			).then((res) => res.json());

			if (!res.status || res.status !== 200) {
				loginResponse.message = data;
				loginResponse.error = true;
			} else {
				cookies.set(
					'AuthUser',
					`${res.data.key}.${res.data.user.id}.${res.data.privilege}.${res.data.tipe}.${
						res.data.user.jabatan
					}.${res.data.user.bidang}.${res.data.user.nama}.${
						res.data.user.nama_jabatan
					}.${JSON.stringify(res.data.user)}`,
					{
						maxAge: 60 * 60 * 24,
						sameSite: 'strict',
						path: '/',
						secure: false,
						httpOnly: false
					}
				);

				cookies.set('UserTipe', res.data.tipe, {
					maxAge: 60 * 60 * 24
				});

				cookies.set('UserPrivilege', res.data.privilege, {
					maxAge: 60 * 60 * 24
				});

				cookies.set('UserJabatan', res.data.user.jabatan, {
					maxAge: 60 * 60 * 24
				});

				cookies.set('UserBidang', res.data.user.bidang, {
					maxAge: 60 * 60 * 24
				});

				if (tipe === 'operator') {
					throw redirect(302, '/opr');
				} else {
					throw redirect(302, '/user');
				}
			}
		} finally {
		}
		return loginResponse;
	}
};
