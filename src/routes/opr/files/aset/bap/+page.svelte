<script>
	// @ts-nocheck

	import { getYearsSince } from '$lib/js/datetime';
	import { fiero } from '$lib/js/fiero';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';

	let year = '';
	$: source = `/operator/getLaporanBAP?tanggal=${year}`;
	let modifier = {
		id: { show: false },
		nilai_kontrak: { type: 'currency' }
	};
	let buttons = [];
</script>

<div>
	<div class="flex items-center justify-between">
		<h1>Berita Acara Pembayaran</h1>
		<select bind:value={year} class="w-32">
			<option value="">Semua</option>
			{#each getYearsSince(2022) as y}
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
