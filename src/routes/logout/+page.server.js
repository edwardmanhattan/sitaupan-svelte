// @ts-nocheck
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ cookies }) {
	cookies.set('auth', undefined, { maxAge: 0 });
	throw new redirect(307, '/login');
}
