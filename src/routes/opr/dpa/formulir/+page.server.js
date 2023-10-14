// @ts-nocheck

import { config } from '$lib/js/fiero';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, parent }) {
	const { userId, userJabatan, userBidang } = await parent();

	const rincianData = async () =>
		await fetch(
			config.api +
				`/operator/getListRincianSubKegiatanFormulir?id_operator=${userId}&id_jabatan=${userJabatan}&id_bidang=${userBidang}`
		).then((res) => res.json());

	const listMitra = async () =>
		await fetch(config.api + `/operator/getAllUserMitra`).then((res) => res.json());

	return {
		rincianData: (await rincianData()).data,
		listMitra: (await listMitra()).data
	};
}
