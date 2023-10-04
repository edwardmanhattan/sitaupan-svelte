// @ts-nocheck
import { fiero } from '$lib/js/fiero.js';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	const authToken = cookies.get('authToken');
	if (!authToken) return { clearUser: true };
}

export const actions = {
	login: async ({ cookies, request, locals }) => {
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
			const { status, data } = await fiero(`/login`, 'POST', { username, password, tipe });
			if (status !== 200) {
				loginResponse.message = data;
				loginResponse.error = true;
			} else {
				cookies.set('AuthUser', `${data.key}.${data.user.id}.${data.privilege}.${data.tipe}`, {
					httpOnly: true,
					maxAge: 60 * 60 * 24,
					sameSite: 'strict'
				});

				if (tipe === 'operator') throw redirect(302, '/opr');
				else throw redirect(302, '/user');
			}
		} finally {
		}
		return loginResponse;
	}
};
