<script>
	// @ts-nocheck

	import Currency from '$lib/form/currency.svelte';
	import Select from '$lib/form/select.svelte';
	import { getYearNow, getYearsSince } from '$lib/js/datetime';
	import { fiero } from '$lib/js/fiero';
	import { snack } from '$lib/js/vanilla';
	import Modal from '$lib/modal/modal.svelte';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';
	import Icon from '@iconify/svelte';

	let year = getYearNow();
	$: source = `/operator/getLaporanSerapanAnggaran?tanggal=${year}`;
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
		<h1>Serapan Anggaran</h1>

		<div class="flex items-center gap-2">
			<select bind:value={year} class="w-32">
				<option value="">Semua</option>
				{#each getYearsSince(2023) as y}
					<option value={y}>{y}</option>
				{/each}
			</select>
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
