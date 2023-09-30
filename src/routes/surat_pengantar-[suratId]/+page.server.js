// @ts-nocheck

import { config } from '$lib/js/fiero';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const data = {};

	const form = async () =>
		await fetch(config.api + `/mitra/getFormPenyediaJasaById?id_form=${params.kontrakId}`).then(
			(res) => res.json()
		);

	return {
		data: data,
		// data: (await form()).data,
		formulirId: params.suratId
	};
}
