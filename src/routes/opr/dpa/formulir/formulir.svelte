<script>
	// @ts-nocheck

	import { getKeyModifier, shownKeyModifier } from '$lib/js/modifier';
	import { formatFullDate } from '$lib/js/datetime';
	import { searchEachText } from '$lib/js/search';
	import { rupiah } from '$lib/js/currency';
	import Icon from '@iconify/svelte';
	import { Pagination } from '$lib/js/pagination';
	import { fiero } from '$lib/js/fiero';
	import { snack } from '$lib/js/vanilla';
	import { goto } from '$app/navigation';
	import Modal from '$lib/modal/modal.svelte';

	export let data = {};
	export let modifier = {};
	export let origin = 'Semua';
	export let selected = {};
	export let listMitra = [];

	let mode = 'formulir_baru';
	let searchText = '';
	let interval = '10';

	$: page = new Pagination(searchEachText(data[mode] ?? [], searchText), parseInt(interval));
	$: display = page.chop();
	$: currentPage = page.getCurrentPage();

	modifier = {
		id_form: { show: false }
	};

	$: keyModifier = getKeyModifier(data[mode] ?? [{}], {
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
</script>

<div>
	<div class="flex items-center gap-4">
		<button
			class:active={mode === 'formulir_baru'}
			on:click={async () => {
				mode = 'formulir_baru';
			}}
			class="subpage"
		>
			Formulir Baru
		</button>
		<button
			class:active={mode === 'menunggu'}
			on:click={async () => {
				mode = 'menunggu';
			}}
			class="subpage">Menunggu</button
		>
		<button
			class:active={mode === 'selesai'}
			on:click={async () => {
				mode = 'selesai';
			}}
			class="subpage"
		>
			Selesai
		</button>

		<div class="flex items-center gap-4 ml-auto w-fit">
			<div class="ml-auto font-semibold">{origin}</div>
			{#if origin !== 'Semua'}
				<button
					on:click={() => {
						modal.open();
					}}
					class="w-fit"
				>
					<Icon icon="bi:plus" /> Tambah Formulir
				</button>
			{/if}
		</div>
	</div>

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

						<td class="flex items-center justify-center gap-2">
							<button
								on:click={() => {
									goto(`/formulir-${tr.id_form}`);
									// document.location.href = `/formulir-${tr.id_form}`;
								}}
								class="w-fit"
							>
								Lihat Form
							</button>
							<button
								on:click={() => {
									snack.confirm('Anda yakin ingin menghapus data ini?', async function () {
										console.log(tr.id_form);
										const res = await fiero(`/operator/deleteFormulirPenyediaJasa`, 'POST', {
											id: tr.id_form
										});
										console.log(res);

										if (res?.status === 200) {
											snack.info(`Berhasil menghapus data`);
											data[mode] = data[mode].filter((x) => x.id_form !== tr.id_form);
										} else snack.info('Gagal menghapus data.');
									});
								}}
								class="text-white bg-red-1 w-fit"
							>
								<Icon icon="bi:trash" />
							</button>
						</td>
						{#if mode === 'menunggu'}
							<td>
								<div class="flex items-center justify-center gap-2">
									<button
										on:click={async () => {
											const res = await fiero(`/operator/accFormulirPenyediaJasa`, 'POST', {
												id_form: tr.id_form,
												status: 'revisi'
											});
											if (res.status === 200) {
												snack.info('Formulir Penyedia Jasa ditolak');
												const apiUrl = `/operator/getListFormPenyediaJasaIdMappingDpa`;

												data.formulir_baru =
													(await fiero(
														apiUrl + `?id_mapping_dpa=${selected.id}&mode=formulir_baru`
													)) ?? [];
												mode = 'formulir_baru';
											}
										}}
										class="text-white bg-rose-600 w-fit"
									>
										<Icon icon="basil:cancel-outline" />
									</button>
									<button
										on:click={async () => {
											const res = await fiero(`/operator/accFormulirPenyediaJasa`, 'POST', {
												id_form: tr.id_form,
												status: 'selesai'
											});
											if (res.status === 200) {
												snack.info('Formulir Penyedia Jasa disetujui');
												const apiUrl = `/operator/getListFormPenyediaJasaIdMappingDpa`;

												data.selesai =
													(await fiero(apiUrl + `?id_mapping_dpa=${selected.id}&mode=selesai`)) ??
													[];
												console.log(data.selesai);
												mode = 'selesai';
											}
										}}
										class="text-white bg-emerald-600 w-fit"
									>
										<Icon icon="basil:check-outline" />
									</button>
								</div>
							</td>
						{/if}
					</tr>
				{:else}
					<tr class="text-center border border-gray-1">
						<td colspan={shownKeyModifier(keyModifier).length + 1} class="border-0">
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
	<h1>Tambah Formulir Penyedia Jasa</h1>

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
				const apiUrl = `/operator/getListFormPenyediaJasaIdMappingDpa`;

				data.formulir_baru =
					(await fiero(apiUrl + `?id_mapping_dpa=${selected.id}&mode=formulir_baru`)) ?? [];
				mode = 'formulir_baru';
				modal.close();
			}
		}}
	>
		Pilih
	</button>
</Modal>
