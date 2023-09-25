<script>
	// @ts-nocheck

	import { fiero } from '$lib/js/fiero';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';

	let source = fiero(`/mitra/getListNotaAset?id_penyedia_jasa=1`);
</script>

<h1>Berkas Invoice</h1>

{#await source}
	<Skeleton />
{:then data}
	<Table {data} />
{:catch err}
	<div>{err}</div>
{/await}
