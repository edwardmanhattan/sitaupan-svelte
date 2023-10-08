// @ts-nocheck
/** @type {import('./$types').PageLoad} */
export async function load() {
	const barebone = {
		id_nota: '0',
		tanggal: '',
		nama_toko: '',
		rincian: 0,
		detail: []
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
