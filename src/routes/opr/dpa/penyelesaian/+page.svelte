<script>
	// @ts-nocheck

	import { fiero } from '$lib/js/fiero';
	import { formatTitle } from '$lib/js/string';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';
	import Modal from '$lib/modal/modal.svelte';
	import { snack } from '$lib/js/vanilla.js';
	let modal;

	export let data;
	const { listMitra } = data;
	let mitra = listMitra[0]?.id;

	let subPage = 'rincian';
	let subPages = ['rincian', 'formulir'];

	let mode = 'formulir_baru';
	let modes = ['formulir_baru', 'menunggu', 'approved'];

	let sourceApi = `/operator/getListRincianSubKegiatanFormulir`;
	$: source = fiero(sourceApi);

	let modifier;
	let buttons;

	let selected;
	function changeSubPage(sub) {
		subPage = sub;
		if (sub === 'rincian') {
			sourceApi = `/operator/getListRincianSubKegiatanFormulir`;
			modifier = {
				id: { show: false },
				id_jenis_pekerjaan: { show: false },
				nilai_persetujuan: { type: 'currency' },
				nilai_total_mitra: { type: 'currency' },
				tombol: { show: false },
				id_penyedia_jasa: { show: false }
			};
			buttons = [
				{
					head: 'List Formulir',
					body: 'Lihat List',
					action: (_, obj) => {
						if (obj.id_penyedia_jasa === 0) {
							selected = obj;
							modal.open();
						} else {
							changeSubPage('formulir');
						}
					},
					exception: [{ key: 'id_penyedia_jasa', value: 0, body: 'Tambah Mitra' }]
				}
			];
		} else {
			changeMode(mode);
			modifier = {
				id_form: { show: false },
				no_spm: { alias: 'Nomor SPM' },
				nomor_dpa: { alias: 'Nomor DPA' }
			};
		}
	}
	changeSubPage('rincian');

	function changeMode(md, parent) {
		mode = md;
		sourceApi = `/operator/getListFormPenyediaJasa?mode=${mode}&`;

		if (mode === 'menunggu') {
			buttons = [
				{
					head: 'Lihat Formulir',
					body: 'Lihat',
					action: (_, obj) => {
						document.location.href = `/formulir-${obj.id_form}`;
					}
				},
				{
					head: '',
					icon: 'basil:checked-box-outline'
				}
			];
		} else {
			buttons = [
				{
					head: 'Lihat Formulir',
					body: 'Lihat',
					action: (_, obj) => {
						document.location.href = `/formulir-${obj.id_form}`;
					}
				}
			];
		}
	}
</script>

<div class="flex items-center justify-end gap-2 text-sm">
	{#each subPages as sub}
		<button
			on:click={() => {
				changeSubPage(sub);
			}}
			class:active={subPage === sub}
			class="subpage"
		>
			{sub === 'rincian' ? 'Rincian Sub Kegiatan' : 'Formulir Penyedia Jasa'}
		</button>
	{/each}
</div>

<hr class="my-3" />

{#if subPage === 'formulir'}
	<div class="flex items-center gap-2">
		{#each modes as md}
			<button
				on:click={() => {
					changeMode(md);
				}}
				class:active={mode === md}
				class="subpage"
			>
				{md === 'menunggu' ? 'Menunggu Approval' : formatTitle(md)}
			</button>
		{/each}
	</div>
{/if}

{#await source}
	<Skeleton />
{:then data}
	<Table {data} {modifier} {buttons} />
{:catch err}
	<div>{err}</div>
{/await}

<!-- svelte-ignore a11y-label-has-associated-control -->
<Modal bind:this={modal}>
	<div class="p-2 font-mono text-sm rounded text-amber-200">
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
			console.log({
				id_mapping_dpa: parseInt(selected.id),
				id_penyedia_jasa: parseInt(mitra),
				id_jenis_penyedia_jasa: parseInt(selected.id_jenis_pekerjaan)
			});

			const res = await fiero(`/operator/createFormPenyediaJasa`, 'POST', {
				id_mapping_dpa: parseInt(selected.id),
				id_penyedia_jasa: parseInt(mitra),
				id_jenis_penyedia_jasa: parseInt(selected.id_jenis_pekerjaan)
			});

			if (res.status === 200) {
				snack.info('Berhasil membuat formulir penyedia jasa.');
				source = fiero(sourceApi);
				modal.close();
			}
		}}
	>
		Pilih
	</button>
</Modal>
