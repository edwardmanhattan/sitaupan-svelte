// @ts-nocheck

import { config } from '$lib/js/fiero';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, parent }) {
	const { userJabatan, userId } = await parent();

	const operator = async () =>
		await fetch(config.api + `/operator/getAllUserOperator`).then((res) => res.json());

	const formulir = async () =>
		await fetch(
			config.api + `/operator/getListSpm?id_jabatan=${userJabatan}&id_operator=${userId}`
		).then((res) => res.json());

	return {
		operator: (await operator()).data,
		formulir: (await formulir()).data
	};
}
