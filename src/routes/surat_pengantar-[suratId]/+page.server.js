// @ts-nocheck

import { config } from '$lib/js/fiero';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const data = {
		id_surat_pengantar: 'f45fc0de-1102-11ee-8ff3-9e781e9b0f07',
		timestamp: '2023-09-30T15:50:44Z',
		nomor_surat_pengantar: '1',
		tahap: 'MC 56.00%',
		uraian_pekerjaan:
			'Lanjutan Pembangunan Jalan Kampung Teluk Semanting-Kampung Kasai Kecamatan Pulau Derawan (APBD) (Anak 1)',
		penyedia_jasa: 'PT. Magadarian Multi Perkasa',
		nomor_spm: '205'
	};

	const form = async () =>
		await fetch(config.api + `/mitra/getSuratPengantar?id_surat=${params.suratId}`).then((res) =>
			res.json()
		);

	return {
		data: data,
		// data: (await form()).data,
		formulirId: params.suratId
	};
}
