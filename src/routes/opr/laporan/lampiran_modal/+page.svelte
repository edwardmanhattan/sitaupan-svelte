<script>
	// @ts-nocheck

	import { getYearNow, getYearsSince } from '$lib/js/datetime';
	import { fiero } from '$lib/js/fiero';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';

	let year = getYearNow();
	$: source = `/operator/getLaporan1C?tanggal=${year}`;
	let modifier = {
		id: { show: false }
	};
	let buttons = [];
</script>

<div>
	<div class="flex items-center justify-between">
		<h1>Lampiran 1C Sewa Modal</h1>
		<select bind:value={year} class="w-32">
			<option value="">Semua</option>
			{#each getYearsSince(2023) as y}
				<option value={y}>{y}</option>
			{/each}
		</select>
	</div>
	<br />

	{#await fiero(source)}
		<Skeleton />
	{:then data}
		<Table {data} {modifier} {buttons} />
	{:catch err}
		<div>{err}</div>
	{/await}
</div>
