<script>
	// @ts-nocheck
	import { rupiah } from '$lib/js/currency.js';
	import { formatFullDate } from '$lib/js/datetime.js';
	import { fiero } from '$lib/js/fiero.js';
	import { getKeyModifier, shownKeyModifier } from '$lib/js/modifier';
	import { Pagination } from '$lib/js/pagination.js';
	import { searchEachText } from '$lib/js/search.js';
	import { snack } from '$lib/js/vanilla.js';
	import Modal from '$lib/modal/modal.svelte';
	import Icon from '@iconify/svelte';
	import Select from '$lib/form/select.svelte';

	export let data;

	let { _data = [], modifier = {}, operator } = data;

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
		nota_tagihan: { show: false },
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

	let modalKontrak;
	let modalBukti;
	let modalPengantar;

	let kontrak = { id_penjabat: 0 };
	let bukti = {
		id_penjabat1: 0,
		id_penjabat2: 0,
		id_penjabat3: 0,
		id_penjabat4: 0,
		tipe_surat: '3'
	};
	let pengantar = { id_penjabat: 0 };
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

					<th>Detail Resume</th>
					<th>Surat Bukti</th>
					<th>Nota Tagihan</th>
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
								<button
									on:click={() => {
										modalKontrak.open();
										kontrak.id_formulir = tr.id_form;
									}}
									class="text-white bg-emerald-700"
								>
									<Icon width="16px" icon="bx:pen" />
									Buat Resume
								</button>
							{:else}
								<a href="/resume-{tr.id_kontrak_fisik}">
									<button> Detail Resume </button>
								</a>
							{/if}
						</td>

						<td class="w-32">
							{#if tr.id_surat_bukti === '0'}
								<button
									on:click={() => {
										modalBukti.open();
										bukti.id_formulir = tr.id_form;
									}}
									class="text-white bg-emerald-700"
								>
									<Icon icon="bi:envelope-paper-fill" />
									Buat Surat
								</button>
							{:else}
								<a href="/surat_bukti-{tr.id_surat_bukti}">
									<button> Detail Surat </button>
								</a>
							{/if}
						</td>

						<td class="w-32">
							<a href="/invoice-{tr.nota_tagihan}">
								<button> Detail Nota </button>
							</a>
						</td>

						<td class="w-32">
							{#if tr.nomor_spm.toString() === '0' || tr.nomor_spm === '-'}
								Nomor SPM belum dibuat
							{:else if tr.id_surat_pengantar === '0' && !tr.edit_spm}
								<button
									on:click={() => {
										modalPengantar.open();
										pengantar.id_formulir = tr.id_form;
									}}
									class="text-white bg-emerald-700"
								>
									<Icon icon="bi:envelope-paper-fill" />
									Buat Surat
								</button>
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
										class="p-1 bg-red-1 text-white-1 w-fit"
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

<!-- svelte-ignore a11y-label-has-associated-control -->
<Modal bind:this={modalKontrak}>
	<!-- <label>Penjabat Pembuat Komitmen</label>
	<Select bind:key={kontrak.id_penjabat} data={operator} config={{ key: 'id', title: 'nama' }} /> -->

	<div>Apakah anda ingin membuat Resume?</div>

	<br />
	<button
		on:click={async () => {
			const res = await fiero(`/operator/createKontrakFisikWithForm`, 'POST', kontrak);
			if (res.status === 200) {
				const tr = _data.find((x) => x.id_form === kontrak.id_formulir);
				tr.id_kontrak_fisik = res.data;
				_data = _data;
				snack.info('Berhasil membuat resume');
				modalKontrak.close();
			}
		}}
	>
		Buat Resume
	</button>
</Modal>

<!-- svelte-ignore a11y-label-has-associated-control -->
<Modal bind:this={modalBukti}>
	<!-- <label>Penjabat Kuasa Penggunaan Anggaran</label>
	<Select bind:key={bukti.id_penjabat1} data={operator} config={{ key: 'id', title: 'nama' }} />

	{#if bukti.tipe_surat === '4'}
		<label>Penjabat Pembuat Komitmen</label>
		<Select bind:key={bukti.id_penjabat2} data={operator} config={{ key: 'id', title: 'nama' }} />
	{/if}

	<label>Penjabat Pelaksana Teknis Kegiatan</label>
	<Select bind:key={bukti.id_penjabat3} data={operator} config={{ key: 'id', title: 'nama' }} />

	<label>Bendahara Pengeluaran Pembantu</label>
	<Select bind:key={bukti.id_penjabat4} data={operator} config={{ key: 'id', title: 'nama' }} />
	-->

	<label>Jumlah Penjabat</label>
	<select bind:value={bukti.tipe_surat}>
		<option value="3">3</option>
		<option value="4">4</option>
	</select>

	<div>Apakah anda ingin membuat Surat Bukti?</div>

	<br />
	<button
		on:click={async () => {
			const res = await fiero(`/operator/createSuratBuktiWithForm`, 'POST', bukti);
			if (res.status === 200) {
				const tr = _data.find((x) => x.id_form === bukti.id_formulir);
				tr.id_surat_bukti = res.data;
				_data = _data;
				snack.info('Berhasil membuat surat bukti');
				modalBukti.close();
			}
		}}
	>
		Simpan
	</button>
</Modal>

<!-- svelte-ignore a11y-label-has-associated-control -->
<Modal bind:this={modalPengantar}>
	<!-- <label>Penjabat</label>
	<Select bind:key={pengantar.id_penjabat} data={operator} config={{ key: 'id', title: 'nama' }} /> -->

	<div>Apakah anda ingin membuat Surat Pengantar?</div>

	<br />
	<button
		on:click={async () => {
			const res = await fiero(`/operator/createSuratPengantar`, 'POST', pengantar);
			if (res.status === 200) {
				const tr = _data.find((x) => x.id_form === pengantar.id_formulir);
				tr.id_surat_pengantar = res.data;
				_data = _data;
				snack.info('Berhasil membuat surat pengantar');
				modalPengantar.close();
			}
		}}
	>
		Simpan
	</button>
</Modal>
