<script>
	// @ts-nocheck

	import { getYearNow, getYearsSince } from '$lib/js/datetime';
	import { fiero } from '$lib/js/fiero';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';

	let year = getYearNow();
	$: source = `/operator/getLaporanSp2d?tanggal=${year}`;
	let modifier = {
		id: { show: false },
		id_sp2d: { show: false },
		id_bidang: { show: false },
		id_master_formulir: { show: false }
	};
	let buttons = [];
</script>

<div>
	<div class="flex items-center justify-between">
		<h1>Bukti Bayar (SP2D)</h1>
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
