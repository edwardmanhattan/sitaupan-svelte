// @ts-nocheck

import { config } from '$lib/js/fiero';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	const tim = async () =>
		await fetch(config.api + `/operator/getTimKegiatanById?id=${params.timId}`).then((res) =>
			res.json()
		);

	return {
		tim: (await tim()).data
	};
}
