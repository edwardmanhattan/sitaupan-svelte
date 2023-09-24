// @ts-nocheck

import { config } from '$lib/js/fiero';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const listMitra = async () =>
		await fetch(config.api + `/operator/getAllUserMitra`).then((res) => res.json());

	return {
		listMitra: (await listMitra()).data
	};
}
