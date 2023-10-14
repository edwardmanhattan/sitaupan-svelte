// @ts-nocheck
/** @type {import('./$types').PageLoad} */
export async function load() {
	const barebone = {
		nomor_nota: '-',
		tanggal_nota: '',
		nama_toko: '',
		id_aset: 0,
		total: 0,
		detail_nota: []
	};

	const detail = {
		id: 0,
		uraian: '',
		harga: 0,
		jumlah: 0,
		total: 0
	};

	return {
		barebone,
		detail
	};
}
