<script>
	// @ts-nocheck

	import { getKeyModifier, shownKeyModifier } from '$lib/js/modifier';
	import { formatFullDate } from '$lib/js/datetime';
	import { searchEachText } from '$lib/js/search';
	import { rupiah } from '$lib/js/currency';

	import Icon from '@iconify/svelte';
	import { Pagination } from '$lib/js/pagination';
	import { snack } from '$lib/js/vanilla';
	import { exportToExcel } from '$lib/js/download';
	import { formatTitle } from '$lib/js/string';

	export let data;

	let searchText = '';
	let interval = '10';

	$: page = new Pagination(searchEachText(data, searchText), parseInt(interval));
	$: display = page.chop();
	$: currentPage = page.getCurrentPage();

	///////////////////////////////////////////////////////////

	function prev() {
		display = page.prev();
		currentPage = page.getCurrentPage();
	}

	function next() {
		display = page.next();
		currentPage = page.getCurrentPage();
	}
</script>

<div>
	<div class="flex items-center justify-between gap-2">
		<div class="flex items-center gap-2">
			<!-- <select class="w-32 text-sm">
				<option value="semua">semua</option>
			</select> -->
			<!-- 
			<button
				on:click={() => {
					keyModal.open();
				}}
				class="w-24 text-sm text-black bg-transparent border-black"
			>
				<Icon icon="bi:gear" />
				Setting
			</button> -->
		</div>
		<div class="flex items-center gap-2">
			<select class="w-24 text-sm" bind:value={interval}>
				<option value="10">10</option>
				<option value="25">25</option>
				<option value="50">50</option>
				<option value="100">100</option>
			</select>
			<input type="text" bind:value={searchText} class="text-sm" placeholder="cari..." />
		</div>
	</div>
	<div id="table" class="w-full overflow-auto">
		<table>
			<thead>
				<tr>
					<th rowspan="2">No</th>
					<th rowspan="2">Bidang</th>
					<th rowspan="2">Pekerjaan</th>
					<th colspan="3">SP2D (SoftFile)</th>
				</tr>
				<tr>
					<th>LS Fisik</th>
					<th>Konsultan</th>
					<th>Honor</th>
				</tr>
			</thead>
			<tbody>
				{#each display as tr}
					<tr>
						<td class="text-center">{tr.pageNum}</td>
						<td>{tr.nama_bidang}</td>
						<td />
						<td />
						<td />
						<td />
					</tr>
				{:else}
					<tr class="text-center border border-gray-1">
						<td colspan="6" class="border-0"> Tidak ada data. </td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="flex items-center px-2 mt-2 text-sm">
		<div class="flex items-center">
			<button class="bg-transparent rounded-none text-slate-950 rounded-s" on:click={prev}>
				<Icon width="20px" icon="basil:caret-left-solid" />
			</button>

			<button class="bg-transparent rounded-none text-slate-950 rounded-e" on:click={next}>
				<Icon width="20px" icon="basil:caret-right-solid" />
			</button>
		</div>
		<div class="ml-2">
			{display.length} dari {page.root.length} data
		</div>
		<div class="ml-auto">
			{currentPage} dari {page.pageLength + 1} halaman
		</div>
	</div>
</div>
