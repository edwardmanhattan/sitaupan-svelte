import { redirect } from '@sveltejs/kit';

// @ts-nocheck
export async function load({ locals, route }) {
	if (route.id !== '/login') {
		if (Object.keys(locals).length === 0) throw redirect(303, '/login');
	} else {
		if (Object.keys(locals).length !== 0) throw redirect(303, '/opr');
	}

	return locals;
}
