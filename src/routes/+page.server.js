// @ts-nocheck

import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load() {
	throw new redirect(302, '/login');
}
