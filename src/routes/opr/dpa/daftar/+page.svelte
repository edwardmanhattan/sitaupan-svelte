<script>
	// @ts-nocheck
	import { rupiah } from '$lib/js/currency.js';
	import { formatFullDate } from '$lib/js/datetime.js';
	import { getKeyModifier, shownKeyModifier } from '$lib/js/modifier';
	import { Pagination } from '$lib/js/pagination.js';
	import { searchEachText } from '$lib/js/search.js';
	import Icon from '@iconify/svelte';

	export let data;

	const { _data = [], modifier = {} } = data;

	let searchText = '';
	let interval = '10';

	$: page = new Pagination(searchEachText(_data, searchText), parseInt(interval));
	$: display = page.chop();
	$: currentPage = page.getCurrentPage();

	let keyModifier = getKeyModifier(_data, {
		pageNum: { alias: 'No', show: true, export: true },
		...modifier
	});

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
		<div />
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
					{#each shownKeyModifier(keyModifier) as key}
						<th>{keyModifier[key].alias}</th>
					{:else}
						<div />
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each display as tr}
					<tr>
						{#each shownKeyModifier(keyModifier) as key}
							{#if key === 'pageNum'}
								<td class="text-center">{tr[key]}</td>
							{:else if keyModifier[key].type === 'datetime'}
								<td>{formatFullDate(tr[key])}</td>
							{:else if keyModifier[key].type === 'currency'}
								<td>{rupiah(tr[key])}</td>
							{:else}
								<td>{tr[key]}</td>
							{/if}
						{/each}
					</tr>
				{:else}
					<tr class="text-center border border-gray-1">
						<td colspan={shownKeyModifier(keyModifier).length} class="border-0">
							Tidak ada data.
						</td>
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
