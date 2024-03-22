export const hierarchy = [
	'program',
	'kegiatan',
	'sub_kegiatan',
	'rincian_sub_kegiatan',
	'nama_pekerjaan'
];

/**
 * @param {string} current
 */
export function hierarchyParent(current) {
	const index = hierarchy.findIndex((v) => v === current) - 1 ?? 0;
	return index < 0 ? 'DPA' : hierarchy[index];
}

/**
 * @param {string} current
 */
export function hierarchyChild(current) {
	const index = hierarchy.findIndex((v) => v === current) + 1 ?? 0;
	return hierarchy[index];
}
