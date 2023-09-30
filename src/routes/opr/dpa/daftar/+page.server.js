// @ts-nocheck
/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const data = async () => await fetch(`/`).then((res) => res.json());

	return {
		// _data: (await data()).data,
		_data: [{ id: 0 }, { id: 1 }],
		modifier: {}
	};
}
