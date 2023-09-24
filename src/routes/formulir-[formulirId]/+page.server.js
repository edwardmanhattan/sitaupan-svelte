// @ts-nocheck

import { config } from '$lib/js/fiero';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const data = {
		id_form: '12345',
		bidang: 'Some Field Value',
		jenis_penyedia: 'Another Field Value',
		no_spm: 'SPM123',
		time_stamp: '2023-09-19T14:30:00',
		tanggal_kontrak: '2023-09-20',
		nomor_kontrak: 'KON123',
		sub_kegiatan_dpa: 'Sub Kegiatan DPA',
		nilai_kontrak: 1000000,
		alamat_kegiatan: '123 Main St, City',
		jenis_belanja_modal: 'Modal',
		uraian_sub_kegiatan: 'Uraian Sub Kegiatan',
		nama_perusahaan: 'ABC Company',
		nama_pimpinan: 'John Doe',
		no_hp: '1234567890',
		email: 'johndoe@example.com',
		uraian_kontak: 'Uraian Kontak',
		tahap_pekerjaan: 2.5,
		pilihan_pencarian: 'Pilihan Pencarian',
		nilai_permohonan: 800000,
		realisasi_keuangan: 900000,
		presentase_keuangan: 90.0,
		realisasi_fisik: 75,
		presentase_fisik: 75.0,
		rincian_sub_kegiatan: 'Rincian Sub Kegiatan',
		satuan: 10,
		jumlah_hari: 30,
		tanggal_mulai: '2023-09-21',
		tanggal_selesai: '2023-10-21',
		nomor_adendum: 'AD123',
		tanggal_adendum: '2023-09-25',
		jumlah_hari_adendum: '5',
		tanggal_mulai_adendum: '2023-09-26',
		tanggal_berakhir_adendum: '2023-10-01',
		adendum_ke: 1,
		jaminan_pelaksanaan_bentuk: 'Bentuk Jaminan Pelaksanaan',
		jaminan_pelaksanaan_nilai: 500000,
		jaminan_pelaksanaan_masa_berlaku: 365,
		jaminan_pemeliharaan_bentuk: 'Bentuk Jaminan Pemeliharaan',
		jaminan_pemeliharaan_nilai: 100000,
		jaminan_pemeliharaan_masa_berlaku: 180,
		metode_pengadaan: 'Metode Pengadaan',
		manual_lpse: 'Manual LPSE',
		bast_nomor: 'BAST123',
		bast_tanggal: '2023-09-30',
		bast_nilai: 750000,
		tanggal_pho: '2023-10-01',
		nomor_pho: 'PHO456',
		tanggal_fho: '2023-10-02',
		nomor_fho: 'FHO789',
		jaminan_uang_muka_bentuk: 'Bentuk Jaminan Uang Muka',
		jaminan_uang_muka_nilai: '200000',
		jaminan_uang_muka_masa_berlaku: '90',
		tanggal_spk: '2023-09-22',
		nomor_spk: 'SPK789',
		nota_tagihan: {
			id_nota: '-',
			tanggal_nota: '2023-01-02',
			nama_toko: '-',
			rincian_data: '1',
			total: '10000',
			detail_pembelian: [
				{
					uraian: '-',
					harga: '10000',
					jumlah_barang: '1',
					total: '10000'
				}
			]
		},
		bulan: 'September 2023',
		kategori: 'Kategori',
		ukuran_panjang: '10 meters',
		ukuran_lebar: '5 meters',
		kontruksi: 'Konstruksi',
		bap_nomor: 'BAP456',
		bap_tanggal: '2023-10-03',
		id_penyedia_jasa: 123,
		kib_a: [
			{
				kode_barang: '1',
				'nama barang': 'Tanah',
				Luas: '215',
				harga: '100000',
				keterangan: '-'
			}
		],
		kib_b: [
			{
				kode_barang: '-',
				nama_barang: '-',
				merek: '-',
				no_rangka_mesin: '-',
				ukuran: '-',
				banyak: '1',
				harga: '18000',
				keterangan: ''
			}
		],
		kib_c: [
			{
				kode_barang: '1',
				'nama barang': '-',
				tingkat: '1',
				beton: 'beton',
				luas: '215',
				harga: '100000',
				keterangan: '-'
			}
		],
		kib_d: [
			{
				kode_barang: '-',
				nama_barang: '-',
				konstruksi: '-',
				panjang: '-',
				lebar: '-',
				luas: '1',
				alamat: '',
				harga: '18000',
				keterangan: ''
			}
		],
		kib_e: [
			{
				kode_barang: '-',
				nama_barang: '-',
				nomor_registrasi: '-',
				judul: '-',
				spesifikasi: '-',
				asal_daerah: '1',
				pencipta: '-',
				bahan: '-',
				jenis: '-',
				ukuran: '-',
				jumlah: '1',
				asal_usul: '-',
				tahun: '2018',
				harga: '18000',
				keterangan: '-'
			}
		],
		kib_f: [
			{
				kode_barang: '-',
				nama_barang: '-',
				kontruksi: '-',
				panjang: '-',
				lebar: '-',
				luas: '1',
				lokasi: '',
				harga: '18000',
				keterangan: '-'
			}
		],
		status: 'menunggu'
	};

	const form = async () =>
		await fetch(config.api + `/mitra/getFormPenyediaJasaById?id_form=${params.formulirId}`).then(
			(res) => res.json()
		);
	return {
		data: (await form()).data,
		formulirId: params.formulirId
	};
}
