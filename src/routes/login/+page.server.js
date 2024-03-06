import { config } from '$lib/js/fiero';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const loginSchema = z.object({
	username: z.string(),
	password: z.string(),
	tipe: z.string().min(1)
});

export async function load() {
	const defaults = { tipe: 'operator', username: '', password: '' };
	const form = await superValidate(defaults, zod(loginSchema));
	return { form };
}
/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(loginSchema));
		if (!form.valid) return fail(400, { form });

		const { username, password, tipe } = form.data;
		let res = await fetch(
			config.api + `/login?username=${username}&password=${password}&tipe=${tipe}`,
			{ method: 'POST' }
		).then((res) => res.json());

		if (!res.status || res.status !== 200) {
			return message(form, res.message, { status: res.status });
		}

		cookies.set('auth', JSON.stringify(res.data), {
			maxAge: 60 * 60 * 24,
			sameSite: 'strict',
			path: '/',
			secure: false,
			httpOnly: false
		});

		if (tipe === 'operator') throw redirect(302, '/opr');
		else if (tipe === 'mitra') throw redirect(302, '/user');
	}
};
