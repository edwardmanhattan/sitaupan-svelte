// @ts-nocheck

import { config } from '$lib/js/fiero';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const data = async () =>
		await fetch(config.api + `/operator/getListSpm`).then((res) => res.json());

	const operator = async () =>
		await fetch(config.api + `/operator/getAllUserOperator`).then((res) => res.json());
	return {
		_data: (await data()).data,
		// _data: [{ id: 0 }, { id: 1 }],
		modifier: {
			id_form: { show: false },
			bidang: { alias: 'Kode Bidang' },
			kode_rincian_sub_kegiatan: { show: true },
			tahap: { show: true },
			nilai: { type: 'currency' },
			nomor_spm: { show: false },
			id_kontrak_fisik: { show: false },
			id_surat_bukti: { show: false },
			id_surat_pengantar: { show: false },
			edit_spm: { show: false }
		},
		operator: (await operator()).data
	};
}
