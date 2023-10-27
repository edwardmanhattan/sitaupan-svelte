<script>
	// @ts-nocheck
	import { fiero } from '$lib/js/fiero';
	import { formatTitle } from '$lib/js/string';
	import { snack } from '$lib/js/vanilla.js';
	import Modal from '$lib/modal/modal.svelte';
	import { identity } from '$lib/stores';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';
	import Icon from '@iconify/svelte';

	export let data;
	const { userId } = data;

	let subPage = 'formulir_baru';
	let subPages = ['formulir_baru', 'menunggu', 'selesai'];

	let random = Math.random();
	$: source = fiero(
		`/mitra/getListFormPenyediaJasa?id_penyedia_jasa=1&mode=${subPage}&random=${random}`
	);

	let modifier = {
		id_form: { show: false },
		no_spm: { alias: 'Nomor SPM' },
		nomor_dpa: { alias: 'Nomor DPA-SKPD/DPPA-SKPD/DPA.L-SKPD' }
	};

	let buttons = [
		{
			head: 'Aksi',
			body: 'Mulai Pengisian',
			action: (idx, obj) => {
				document.location.href = `/formulir-${obj.id_form}`;
			}
		}
	];

	function changeSubPage(sub) {
		subPage = sub;

		if (subPage === 'formulir_baru') {
			buttons = [
				{
					head: 'Aksi',
					body: 'Mulai Pengisian',
					action: (idx, obj) => {
						document.location.href = `/formulir-${obj.id_form}`;
					}
				}
			];
		} else {
			buttons = [
				{
					head: 'Aksi',
					body: 'Lihat Formulir',
					action: (idx, obj) => {
						document.location.href = `/formulir-${obj.id_form}`;
					}
				}
			];
		}
	}

	let modal = '';

	let mitra = userId;
	let selected = {};
</script>

<div class="flex items-center gap-2">
	{#each subPages as sub}
		<button
			on:click={() => {
				changeSubPage(sub);
			}}
			class:active={subPage === sub}
			class="subpage"
		>
			{formatTitle(sub)}
		</button>
	{/each}

	<button
		on:click={() => {
			modal.open();
		}}
		class="ml-auto w-fit"
	>
		<Icon icon="bi:plus" />
		Tambah Formulir
	</button>
</div>

{#await source}
	<Skeleton />
{:then data}
	<Table {data} {modifier} {buttons} />
{:catch err}
	<div>{err}</div>
{/await}

<Modal bind:this={modal}>
	<h1>Tambah Formulir Penyedia Jasa</h1>

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
			} else snack.info('Terjadi kesalahan.');

			random = Math.random();
			modal.close();
		}}
	>
		Buat Formulir
	</button>
</Modal>
