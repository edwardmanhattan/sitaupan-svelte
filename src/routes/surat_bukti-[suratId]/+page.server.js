// @ts-nocheck

import { config } from '$lib/js/fiero';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const data = {
		id: 'f45fc0de-1102-11ee-8ff3-9e781e9b0f07',
		kode_rekening_sub_kegiatan: 'Rincian Sub Kegiatan 1',
		program: 'program 1 / 4.0.0.1.1',
		kegiatan: 'kegiatan1 / 5.0.1.1',
		sub_kegiatan: 'Sub Kegiatan 1 / 5.0.1.1.1',
		sudah_terima: '-',
		bidang: 'Pembangunan Jalan dan Jembatan',
		pembayaran: '-',
		catatan: '-',
		tempat: '-',
		nilai: 0,
		id_mitra: 1,
		nama_mitra: '-',
		jabatan_mitra: '-',
		id_penjabat_1: 2,
		nama_penjabat_1: 'Leon',
		nip_penjabat_1: '11111111222222333',
		id_penjabat_2: 2,
		nama_penjabat_2: 'Leon',
		nip_penjabat_2: '11111111222222333',
		id_penjabat_3: 2,
		nama_penjabat_3: 'Leon',
		nip_penjabat_3: '11111111222222333',
		id_penjabat_4: 2,
		nama_penjabat_4: 'Leon',
		nip_penjabat_4: '11111111222222333',
		tipe_surat: 4,
		tanggal_ttd: '2023-04-11',
		ttd_mitra: '',
		keterangan: ''
	};

	const form = async () =>
		await fetch(config.api + `/operator/getSuratBuktiById?id=${params.suratId}`).then((res) =>
			res.json()
		);

	return {
		// data: data,
		data: (await form()).data,
		formulirId: params.suratId
	};
}
