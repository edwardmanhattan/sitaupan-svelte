// @ts-nocheck

import { config } from '$lib/js/fiero';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	params.year ??= '';
	params.kode ??= 'a';

	const kib = async () =>
		await fetch(
			config.api + `/operator/getKIB?tanggal=${params.year}&kode_kib=${params.kode}`
		).then((res) => res.json());

	return {
		kib: (await kib()).data ?? [],
		kode: params.kode,
		modifier: {
			id: { show: false }
		},
		buttons: []
	};
}
