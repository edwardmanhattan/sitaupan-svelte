// @ts-nocheck

import { config } from '$lib/js/fiero';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const data = {
		id: 'fdc1524a-8aee-4481-8f82-0198403fa793',
		nomor_dpa: 'DPA/A.1/1.03.0.00.0.00.01.0000/001/2023',
		tanggal_dpa: '2022-12-29',
		kode_program_keg_sub: '7.9.1.1',
		kode_rekening_rincian: '7.9.1.1.1',
		nomor_spk: '-',
		tanggal_spk: '0001-01-01',
		nilai_spk: 0,
		nilai_hps: 0,
		nama_perusahaan: '-',
		nama_mitra: '-',
		jabatan: '-',
		alamat_perusahaan: '-',
		pekerjaan: '-',
		cara_pembayaran: '-',
		fisik_persentase_pekerjaan: '-',
		jumlah_diminta: 0,
		nama_bank: '-',
		nomor_rekening: '-',
		jangka_waktu_pelaksanaan: 0,
		tanggal_penyelesaian: '0001-01-01',
		jangka_waktu_pemeliharaan: 0,
		nomor_addendum: '-',
		tanggal_addendum: '0001-01-01',
		nilai_addendum: 0,
		jangka_pelaksanaan_addendum: 0,
		tanggal_penyelesaian_addendum: '0001-01-01',
		jangka_pemeliharaan_addendum: 0,
		no_ba_pemeriksaan: '-',
		tgl_ba_pemeriksaan: '0001-01-01',
		no_ba_terima1: '-',
		tgl_ba_terima1: '0001-01-01',
		no_ba_terima2: '',
		tgl_ba_terima2: '0001-01-01',
		no_ba_konsul: '',
		tgl_ba_konsul: '0001-01-01',
		no_ba_pembayaran: '',
		tgl_ba_pembayaran: '0001-01-01',
		tempat_pembuatan: '',
		tanggal_pembuatan: '0001-01-01',
		nama_penjabat: 'Leon',
		nip_penjabat: '11111111222222333',
		ttd_penjabat: '',
		stat: 'on-progress',
		stat_1: 0,
		stat_2: 0,
		stat_3: 0,
		stat_4: 0,
		id_mitra_utama: 1,
		id_mitra_pengawas: 3,
		id_mitra_fisik_1: 0,
		id_mitra_fisik_2: 0,
		id_penjabat: 2,
		id_pembuat: 0
	};

	const form = async () =>
		await fetch(config.api + `/operator/getKontrakFisikById?id_form=${params.kontrakId}`).then(
			(res) => res.json()
		);

	return {
		// data: data,
		data: (await form()).data,
		formulirId: params.formulirId
	};
}
