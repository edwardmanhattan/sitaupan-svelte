<script>
	// @ts-nocheck
	import Modal from '$lib/modal/modal.svelte';

	import { getKeyModifier, shownKeyModifier } from '$lib/js/modifier';
	import { formatFullDate } from '$lib/js/datetime';
	import { searchEachText } from '$lib/js/search';
	import { rupiah } from '$lib/js/currency';

	import Icon from '@iconify/svelte';
	import { Pagination } from '$lib/js/pagination';
	import { snack } from '$lib/js/vanilla';
	import { fiero } from '$lib/js/fiero';
	import { createEventDispatcher } from 'svelte';

	export let rincianData = [];
	export let listMitra = [];

	let modifier = {
		id: { show: false },
		id_jenis_pekerjaan: { show: false },
		nilai_persetujuan: { type: 'currency' },
		nilai_total_mitra: { type: 'currency' },
		tombol: { show: false },
		id_penyedia_jasa: { show: false },
		nama_proyek: { alias: 'Nama Kegiatan' }
	};

	let searchText = '';
	let interval = '10';

	$: page = new Pagination(searchEachText(rincianData, searchText), parseInt(interval));
	$: display = page.chop();
	$: currentPage = page.getCurrentPage();

	let keyModifier = getKeyModifier(rincianData, {
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

	///////////////////////////////////////////////////////////

	let modal;
	let mitra;
	let selected;

	const dispatch = createEventDispatcher();

	function seeList(_data, _origin, _selected) {
		dispatch('list', {
			data: _data,
			origin: _origin,
			selected: _selected
		});
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

					<th>Aksi</th>
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

						<td>
							{#if tr.id_penyedia_jasa !== 0}
								<button
									on:click={async () => {
										const apiUrl = `/operator/getListFormPenyediaJasaIdMappingDpa`;
										const formulirData = {
											formulir_baru:
												(await fiero(apiUrl + `?id_mapping_dpa=${tr.id}&mode=formulir_baru`)) ?? [],
											menunggu:
												(await fiero(apiUrl + `?id_mapping_dpa=${tr.id}&mode=menunggu`)) ?? [],
											selesai: (await fiero(apiUrl + `?id_mapping_dpa=${tr.id}&mode=selesai`)) ?? []
										};
										seeList(formulirData, tr.nama_proyek, tr);
									}}
								>
									Lihat List
								</button>
							{:else}
								<button
									on:click={() => {
										selected = tr;
										modal.open();
									}}
									class="bg-teal-600"
								>
									<Icon icon="bi:plus" />
									Tambah Mitra
								</button>
							{/if}
						</td>
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

<!-- svelte-ignore a11y-label-has-associated-control -->
<Modal bind:this={modal}>
	<div class="p-2 font-mono text-sm rounded text-rose-700">
		belum ada mitra penyedia jasa pada sub kegiatan ini.
	</div>

	<h1>Tambah Penyedia Jasa</h1>

	<label>Mitra</label>
	<select bind:value={mitra}>
		{#each listMitra as mtr (mtr.id)}
			<option value={mtr.id}>{mtr.nama_perusahaan}</option>
		{/each}
	</select>

	<br />
	<br />
	<button
		on:click={async () => {
			const res = await fiero(`/operator/createFormPenyediaJasa`, 'POST', {
				id_mapping_dpa: parseInt(selected.id),
				id_penyedia_jasa: parseInt(mitra),
				id_jenis_penyedia_jasa: parseInt(selected.id_jenis_pekerjaan)
			});

			if (res.status === 200) {
				snack.info('Berhasil membuat formulir penyedia jasa.');
				rincianData = rincianData.map((x) => {
					if (x.id === selected.id) return { ...x, id_penyedia_jasa: res.data };
					else return x;
				});
				modal.close();
			}
		}}
	>
		Pilih
	</button>
</Modal>
