<script>
	// @ts-nocheck
	import { rupiah } from '$lib/js/currency.js';
	import { formatFullDate } from '$lib/js/datetime.js';
	import { fiero } from '$lib/js/fiero.js';
	import { getKeyModifier, shownKeyModifier } from '$lib/js/modifier';
	import { Pagination } from '$lib/js/pagination.js';
	import { searchEachText } from '$lib/js/search.js';
	import { snack } from '$lib/js/vanilla.js';
	import Icon from '@iconify/svelte';

	export let data;

	let { _data = [], modifier = {} } = data;

	_data = _data.map((obj) => ({ ...obj, edit_spm: false }));

	let searchText = '';
	let interval = '10';

	let shakeUp = true;
	let page;

	$: if (shakeUp) {
		page = new Pagination(searchEachText(_data, searchText), parseInt(interval));
	}
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

					<th>Detail Kontrak</th>
					<th>Surat Bukti</th>
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

						<td class="w-32">
							{#if tr.id_kontrak_fisik === '0'}
								<button>Buat Kontrak</button>
							{:else}
								<a href="/kontrak-{tr.id_kontrak_fisik}">
									<button> Detail Kontrak </button>
								</a>
							{/if}
						</td>

						<td class="w-32">
							{#if tr.id_surat_bukti === '0'}
								<button>Buat Surat</button>
							{:else}
								<a href="/surat_bukti-{tr.id_surat_bukti}">
									<button> Detail Surat </button>
								</a>
							{/if}
						</td>

						<td class="w-32">
							{#if tr.id_surat_pengantar === '0'}
								<button>Buat Surat</button>
							{:else}
								<a href="/surat_pengantar-{tr.id_surat_pengantar}">
									<button> Detail Surat </button>
								</a>
							{/if}
						</td>

						<td class="w-64">
							<div class="flex items-center gap-2">
								{#if !tr.edit_spm}
									<div class="text-center grow">{tr.nomor_spm}</div>
									<button
										on:click={() => {
											if (!display.find((x) => x.edit_spm)) {
												shakeUp = false;
												tr.edit_spm = true;
											} else snack.info('masih ada kolom edit yang aktif');
										}}
										class="p-1 w-fit"
									>
										<Icon width="18px" icon="basil:edit-outline" />
									</button>
								{:else}
									<input type="text" bind:value={tr.nomor_spm} />
									<button
										on:click={() => {
											tr.edit_spm = false;
											shakeUp = true;
										}}
										class="p-1 w-fit bg-rose-700"
									>
										<Icon width="18px" icon="basil:cancel-outline" />
									</button>
									<button
										on:click={async () => {
											await fiero(`/operator/updateNomorSPM`, 'POST', {
												id_formulir: tr.id_form,
												nomor_spm: parseInt(tr.nomor_spm)
											}).then((res) => {
												const origin = _data.find((x) => x.id_form === tr.id_form);
												origin.nomor_spm = tr.nomor_spm;
												tr.edit_spm = false;
												shakeUp = true;

												snack.info('Berhasil mengubah Nomor SPM');
											});
										}}
										class="p-1 w-fit bg-emerald-600"
									>
										<Icon width="18px" icon="basil:checked-box-outline" />
									</button>
								{/if}
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
