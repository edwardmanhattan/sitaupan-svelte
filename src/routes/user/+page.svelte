<script>
	// @ts-nocheck

	import { fiero } from '$lib/js/fiero';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';

	export let data;
	const { userId } = data;
	let keyword = '';
	let source = null;

	let modifier = {
		id: { show: false },
		id_form: { show: false },
		id_surat_bukti: { show: false },
		id_surat_pengantar: { show: false },
		id_kontrak_fisik: { show: false },
		nota_tagihan: { show: false }
	};
</script>

<h1>Pencarian Tracking Formulir</h1>
<br />

<input
	type="search"
	placeholder="Masukan Nomor SPM / Nomor Kontrak / Kode Rekening / Uraian Pekerjaan ... (klik 'Enter' untuk mencari)"
	class="p-2 text-base"
	bind:value={keyword}
	on:keydown={({ key }) => {
		if (key !== 'Enter') return;
		source = `/mitra/searchFormulir?id_mitra=${userId}&keyword=${keyword}`;
	}}
/>

{#if source}
	{#await fiero(source)}
		<Skeleton />
	{:then data}
		<Table {data} {modifier} />
	{:catch err}
		<div>{err}</div>
	{/await}
{/if}
