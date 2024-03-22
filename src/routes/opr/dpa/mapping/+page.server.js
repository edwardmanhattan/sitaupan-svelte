// @ts-nocheck

import { numeric } from '$lib/js/currency';
import { config, fiero } from '$lib/js/fiero';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const program = {
		nomor_dpa: '',
		tanggal_dpa: '',
		bidang: 0,
		kode_rekening: '',
		uraian_program: '',
		anggaran: 0
	};

	const kegiatan = {
		kode_rekening_program: null,
		kode_rekening: null,
		uraian: null,
		anggaran: null
	};

	const sub_kegiatan = {
		kode_rekening_kegiatan: null,
		kode_rekening: null,
		uraian: null,
		anggaran: null
	};

	const rincian = {
		kode_rekening_sub_kegiatan: null,
		kode_rekening: null,
		uraian: null,
		anggaran: null,
		keterangan: null,
		sumber_dana_dummy: [{ sumber_dana: '', nilai: 0 }]
	};

	const nama_pekerjaan = {
		kode_rekening_rincian_sub_kegiatan: null,
		kode_rekening: null,
		uraian: null,
		anggaran: null,
		keterangan: null,
		sumber_dana_dummy: [{ sumber_dana: '', nilai: 0 }]
	};

	const dpa = async () =>
		await fetch(config.api + `/operator/getAllNomorDPA`).then((res) => res.json());
	const bidang = async () =>
		await fetch(config.api + `/operator/getAllBidangProyek`).then((res) => res.json());
	const jenis = async () =>
		await fetch(config.api + `/operator/getAllJenisProyek`).then((res) => res.json());

	return {
		barebone: {
			program: program,
			kegiatan: kegiatan,
			sub_kegiatan: sub_kegiatan,
			rincian_sub_kegiatan: rincian,
			nama_pekerjaan
		},
		dpa: (await dpa()).data,
		bidang: (await bidang()).data,
		jenis: (await jenis()).data
	};
}

const editSchema = z.object({
	id: z.coerce.number(),
	jenis: z.string(),
	id_parent: z.coerce.number(),
	kode_rekening: z.string(),
	uraian: z.string(),
	anggaran: z.string()
});

/** @type {import('./$types').Actions} */
export const actions = {
	edit: async ({ request }) => {
		const formData = await request.formData();
		const safeParse = editSchema.safeParse(Object.fromEntries(formData));

		if (!safeParse.success) return fail(400, { issues: safeParse.error.issues });

		const entry = safeParse.data;
		entry.anggaran = numeric(entry.anggaran);

		const result = await fiero('/operator/updateMappingDpa', 'POST', entry);

		if (result.status !== 200) return fail(500, { success: false, message: 'terjadi kesalahan.' });

		return { message: 'berhasil mengubah data.', success: true, resdata: result.data };
	}
};
