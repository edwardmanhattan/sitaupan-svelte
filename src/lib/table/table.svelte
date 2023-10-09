<script>
	// @ts-nocheck

	import { getKeyModifier, shownKeyModifier } from '$lib/js/modifier';
	import { formatFullDate } from '$lib/js/datetime';
	import { searchEachText } from '$lib/js/search';
	import { rupiah } from '$lib/js/currency';

	import Icon from '@iconify/svelte';
	import { Pagination } from '$lib/js/pagination';

	export let data;
	export let modifier = {};
	export let buttons = [];

	let searchText = '';
	let interval = '10';

	$: page = new Pagination(searchEachText(data, searchText), parseInt(interval));
	$: display = page.chop();
	$: currentPage = page.getCurrentPage();

	let keyModifier = getKeyModifier(data, {
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
							{:else if keyModifier[key].type === 'currency' || key.includes('nilai')}
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
