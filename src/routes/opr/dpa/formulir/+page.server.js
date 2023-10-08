// @ts-nocheck

import { config } from '$lib/js/fiero';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const rincianData = async () =>
		await fetch(config.api + `/operator/getListRincianSubKegiatanFormulir`).then((res) =>
			res.json()
		);

	const listMitra = async () =>
		await fetch(config.api + `/operator/getAllUserMitra`).then((res) => res.json());

	return {
		rincianData: (await rincianData()).data,
		listMitra: (await listMitra()).data
	};
}
