<script>
	// @ts-nocheck

	import Select from '$lib/form/select.svelte';
	import { getYearNow, getYearsSince } from '$lib/js/datetime';
	import { fiero } from '$lib/js/fiero';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';

	let year = getYearNow();
	let jenisBPKAD = 0;
	$: source = `/operator/getLaporanAkutansiBPKAD?tanggal=${year}&id_jenis_bpkad=${jenisBPKAD}`;
	let modifier = {
		id: { show: false },
		lampiran_sp_2_d: { alias: 'Lampiran SP2D' },
		nomor_sp2d: { alias: 'Nomor SP2D' }
	};
	let buttons = [];
</script>

<div>
	<div class="flex items-center justify-between">
		<h1>Laporan Akuntansi BPKAD</h1>

		<div class="flex items-center gap-4">
			<select bind:value={year} class="w-32">
				<option value="">Semua</option>
				{#each getYearsSince(2023) as y}
					<option value={y}>{y}</option>
				{/each}
			</select>

			{#await fiero(`/operator/getListSumberDana`) then data}
				<Select bind:key={jenisBPKAD} {data} config={{ key: 'id', title: 'nama' }} />
			{/await}
		</div>
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
