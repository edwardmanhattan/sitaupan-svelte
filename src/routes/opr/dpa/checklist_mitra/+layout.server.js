// @ts-nocheck

import { config } from '$lib/js/fiero';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	let barebone = {
		nama_kegiatan: '',
		bidang: '',
		kpa: '',
		pptk: [],
		bendahara_pengeluaran_pembantu: '',
		staf_pengelola: '',
		operator_sipd: '',
		ppk: [],
		kegiatan: []
	};

	const bidang = async () =>
		await fetch(config.api + `/operator/getAllBidangProyek`).then((res) => res.json());
	const operator = async () =>
		await fetch(config.api + `/operator/getAllUserOperator`).then((res) => res.json());
	const kegiatan = async () =>
		await fetch(config.api + `/operator/getAllKegiatan`).then((res) => res.json());

	console.log(await operator());

	return {
		form: barebone,
		bidang: (await bidang())?.data ?? [],
		operator: (await operator())?.data ?? [],
		kegiatan: (await kegiatan())?.data ?? []
	};
}
