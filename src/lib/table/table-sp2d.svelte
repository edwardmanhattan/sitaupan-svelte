<script>
	// @ts-nocheck

	import { getKeyModifier, shownKeyModifier } from '$lib/js/modifier';
	import { formatFullDate } from '$lib/js/datetime';
	import { searchBidang, searchEachText } from '$lib/js/search';
	import { rupiah } from '$lib/js/currency';

	import Icon from '@iconify/svelte';
	import { Pagination } from '$lib/js/pagination';
	import { snack } from '$lib/js/vanilla';
	import { exportToExcel } from '$lib/js/download';
	import { formatTitle } from '$lib/js/string';
	import { config } from '$lib/js/fiero';
	import Bidang from '$lib/shortcut/bidang.svelte';

	export let data;

	let searchText = '';
	let interval = '10';

	let bidang = '';

	$: page = new Pagination(
		searchBidang(searchEachText(data, searchText), bidang, 'nama_bidang'),
		parseInt(interval)
	);
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
			<Bidang bind:bidang />
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
					<th rowspan="2">Nomor SP2D</th>
					<th rowspan="2">Pekerjaan</th>
					<th rowspan="2">Nilai</th>
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
						<td>{tr.nomor_sp2d}</td>
						<td>{tr.pekerjaan}</td>
						<td>{rupiah(tr.nilai)}</td>
						<td>
							{#if tr.ls_fisik === '-'}
								<div class="italic text-slate-400">data tidak ada</div>
							{:else}
								<a href={config.api + `/getFile?path=${tr.ls_fisik}`} target="_blank">
									<button>Lihat</button>
								</a>
							{/if}
						</td>
						<td>
							{#if tr.konsultan === '-'}
								<div class="italic text-slate-400">data tidak ada</div>
							{:else}
								<a href={config.api + `/getFile?path=${tr.konsultan}`} target="_blank">
									<button>Lihat</button>
								</a>
							{/if}
						</td>
						<td>
							{#if tr.honor === '-'}
								<div class="italic text-slate-400">data tidak ada</div>
							{:else}
								<a href={config.api + `/getFile?path=${tr.honor}`} target="_blank">
									<button>Lihat</button>
								</a>
							{/if}
						</td>
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
