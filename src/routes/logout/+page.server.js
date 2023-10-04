// @ts-nocheck
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ cookies }) {
	cookies.set('AuthUser', {}, { maxAge: 0 });
	throw new redirect(302, '/login');
}
