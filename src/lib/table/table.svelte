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
	import Select from '$lib/form/select.svelte';
	import { fiero } from '$lib/js/fiero';
	import Bidang from '$lib/shortcut/bidang.svelte';

	export let data;
	export let modifier = {};
	export let buttons = [];

	let searchText = '';
	let interval = '10';

	let keyModifier = getKeyModifier(data, {
		pageNum: { alias: 'No', show: true, export: true },
		...modifier
	});

	let bidangExist = Object.keys(keyModifier).find((k) => k.includes('bidang'));
	let bidang = '';

	$: page = new Pagination(
		searchBidang(searchEachText(data, searchText), bidang, bidangExist),
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
			{#if bidangExist}
				<Bidang bind:bidang />
			{/if}
			<button
				on:click={async () => {
					let columns = shownKeyModifier(keyModifier)
						.map((obj) => ({
							header: keyModifier[obj].alias,
							key: obj
						}))
						.filter((obj) => keyModifier[obj.key].export);
					let rows = data;

					let excelData = {
						columns: columns,
						rows: rows
					};

					await exportToExcel(excelData, {
						fileName: `Data Transaksi`
					});
					snack.info('Data telah diunduh dalam bentuk dokumen Microsoft Excel.');
				}}
				class="text-sm text-white bg-green-600 w-fit"
			>
				<Icon icon="file-icons:microsoft-excel" />
				Export to Excel
			</button>
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
					{#each shownKeyModifier(keyModifier) as key}
						<th>{keyModifier[key].alias}</th>
					{:else}
						<div />
					{/each}
					{#each buttons as button}
						<th>{button.head}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each display as tr}
					<tr>
						{#each shownKeyModifier(keyModifier) as key}
							{#if key === 'pageNum'}
								<td class="text-center">{tr[key]}</td>
							{:else if keyModifier[key].type === 'datetime' || key.includes('tanggal')}
								<td>{formatFullDate(tr[key])}</td>
							{:else if keyModifier[key].type === 'currency' || key.includes('nilai') || key.includes('total')}
								<td>{rupiah(tr[key])}</td>
							{:else if key.includes('persen')}
								<td>{tr[key]}%</td>
							{:else}
								<td>{tr[key]}</td>
							{/if}
						{/each}
						{#each buttons as button}
							<td>
								<button
									class="px-4 mx-auto w-fit bg-{button.color ?? 'blue-2'}"
									on:click={() => {
										button.action(
											tr[button.idKey ?? 'id'],
											display.find((obj) => obj[button.idKey ?? 'id'] === tr[button.idKey ?? 'id']),
											display,
											tr
										);
									}}
								>
									{#if button.icon}
										<Icon icon={button.icon} />
									{/if}

									{#each button.exception ?? [] as exc}
										{#if tr[exc.key] === exc.value}
											{exc.body ?? ''}
										{:else}
											{button.body ?? ''}
										{/if}
									{:else}
										{button.body ?? ''}
									{/each}
								</button>
							</td>
						{/each}
					</tr>
				{:else}
					<tr class="text-center border border-gray-1">
						<td colspan={shownKeyModifier(keyModifier).length + buttons.length} class="border-0">
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
