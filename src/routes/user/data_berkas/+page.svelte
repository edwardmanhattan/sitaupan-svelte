<script>
	// @ts-nocheck
	import { rupiah } from '$lib/js/currency.js';
	import { formatFullDate } from '$lib/js/datetime.js';
	import { fiero } from '$lib/js/fiero.js';
	import { getKeyModifier, shownKeyModifier } from '$lib/js/modifier';
	import { Pagination } from '$lib/js/pagination.js';
	import { searchBidang, searchEachText } from '$lib/js/search.js';
	import { snack } from '$lib/js/vanilla.js';
	import Modal from '$lib/modal/modal.svelte';
	import Icon from '@iconify/svelte';
	import Bidang from '$lib/shortcut/bidang.svelte';

	export let data;

	let { _data = [], modifier = {}, operator } = data;

	_data = _data.map((obj) => ({ ...obj, edit_spm: false }));

	let searchText = '';
	let interval = '10';

	let shakeUp = true;
	let page;

	let keyModifier = getKeyModifier(_data, {
		pageNum: { alias: 'No', show: true, export: true },
		nota_tagihan: { show: false },
		...modifier
	});
	let bidangExist = Object.keys(keyModifier).find((k) => k.includes('bidang'));
	let bidang = '';

	$: if (shakeUp) {
		page = new Pagination(
			searchBidang(searchEachText(_data, searchText), bidang, bidangExist),
			parseInt(interval)
		);
	}
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
		<div>
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
					{#each shownKeyModifier(keyModifier) as key}
						<th>{keyModifier[key].alias}</th>
					{:else}
						<div />
					{/each}

					<th>Detail Resume</th>
					<th>Surat Bukti</th>
					<!-- <th>Nota Tagihan</th> -->
					<th>Surat Pengantar</th>
					<th>Nomor SPM</th>
				</tr>
			</thead>
			<tbody>
				{#each display as tr (tr.id_form)}
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

						<td class="w-36">
							{#if tr.id_kontrak_fisik === '0'}
								Resume belum dibuat.
							{:else}
								<a href="/resume-{tr.id_kontrak_fisik}">
									<button> Detail Resume </button>
								</a>
							{/if}
						</td>

						<td class="w-32">
							{#if tr.id_surat_bukti === '0'}
								Surat bukti belum dibuat.
							{:else}
								<a href="/surat_bukti-{tr.id_surat_bukti}">
									<button> Detail Surat </button>
								</a>
							{/if}
						</td>
						<!-- 
						<td class="w-32">
							<a href="/invoice-{tr.nota_tagihan}">
								<button> Detail Nota </button>
							</a>
						</td> -->

						<td class="w-32">
							{#if tr.nomor_spm.toString() === '0' || tr.nomor_spm === '-'}
								Nomor SPM belum dibuat
							{:else if tr.id_surat_pengantar === '0' && !tr.edit_spm}
								Surat pengantar belum dibuat.
							{:else if !tr.edit_spm}
								<a href="/surat_pengantar-{tr.id_surat_pengantar}">
									<button> Detail Surat </button>
								</a>
							{:else}
								<div>...</div>
							{/if}
						</td>

						<td class="w-64">
							<div class="flex items-center gap-2">
								{tr.nomor_spm}
							</div>
						</td>
					</tr>
				{:else}
					<tr class="text-center border border-gray-1">
						<td colspan={shownKeyModifier(keyModifier).length + 4} class="border-0">
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
