// @ts-nocheck
/** @type {import('./$types').PageLoad} */
export async function load() {
	return {
		jenis: ['program', 'kegiatan', 'sub_kegiatan', 'rincian_sub_kegiatan', 'unit', 'organisasi']
	};
}
