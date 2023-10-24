// @ts-nocheck

import { config } from '$lib/js/fiero';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const form = async () =>
		await fetch(
			config.api + `/operator/getSerahTerimaBerkasById?id_serah_terima=${params.stbId}`
		).then((res) => res.json());

	return {
		// data: data,
		data: (await form()).data,
		formulirId: params.stbId
	};
}
