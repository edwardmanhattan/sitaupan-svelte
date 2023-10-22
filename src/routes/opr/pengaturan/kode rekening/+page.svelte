<script>
	// @ts-nocheck

	import { fiero } from '$lib/js/fiero';
	import { getKeyModifier, shownKeyModifier } from '$lib/js/modifier';
	import { formatTitle } from '$lib/js/string';
	import { snack } from '$lib/js/vanilla.js';
	import Modal from '$lib/modal/modal.svelte';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';
	import Icon from '@iconify/svelte';
	let modal;

	export let data;
	const { jenis = [] } = data;

	let source = fiero(`/operator/getAllKodeRekening`);

	let modifier = {
		id: { show: false },
		nilai: { show: false }
	};

	let modalModifier = {
		pageNum: { show: false }
	};

	let buttons = [
		{
			head: '',
			icon: 'mdi:pencil',
			action: (_, obj) => {
				selected = obj;
				mode = 'update';
				modal.open();
			}
		},
		{
			head: '',
			icon: 'basil:trash-solid',
			color: 'red-1 text-white-1',
			action: (id) => {
				if (data.userJabatan !== '17') {
					//joker
					snack.info('Anda tidak memiliki wewenang untung melakukan perintah ini.');
					return;
				}
				snack.confirm(
					'Anda akan menghapus Kode Rekening ini secara permanen. Lanjutkan?',
					async () => {
						const res = await fiero(`/operator/deleteKodeRekening`, 'POST', { id: id });
						if (res.status === 200) snack.info('Kode Rekening berhasil dihapus.');
						source = fiero(`/operator/getAllKodeRekening`);
						modal.close();
					}
				);
			}
		}
	];

	let selected = {};
	let mode = 'insert';
</script>

<div class="flex items-center justify-between">
	<h1>Kode Rekening</h1>
	<div>
		<button
			on:click={async () => {
				selected = { kode_rekening: '', jenis: '', uraian: '' };
				mode = 'insert';
				modal.open();
			}}
		>
			<Icon icon="bi:plus" />
			Tambah
		</button>
	</div>
</div>

{#await source}
	<Skeleton />
{:then data}
	<Table {data} {modifier} {buttons} />
{:catch err}
	<div>{err}</div>
{/await}

<!-- svelte-ignore a11y-label-has-associated-control -->
<Modal bind:this={modal}>
	<h1 class="w-96">Kode Rekening</h1>

	<label>Kode Rekening</label>
	<input type="text" bind:value={selected.kode_rekening} />

	<label>Uraian</label>
	<input type="text" bind:value={selected.uraian} />

	<label>Jenis</label>
	<select bind:value={selected.jenis}>
		{#each jenis as j}
			<option value={j}>{j}</option>
		{/each}
	</select>

	<br />
	<br />
	<button
		on:click={async () => {
			if (mode === 'insert') {
				const res = await fiero(`/operator/insertKodeRekening`, 'POST', selected);
				if (res.status === 200) snack.info('Kode Rekening berhasil ditambahkan.');
				source = fiero(`/operator/getAllKodeRekening`);
				modal.close();
			} else {
				const res = await fiero(`/operator/updateKodeRekening`, 'POST', selected);
				if (res.status === 200) snack.info('Kode Rekening berhasil diubah.');
				source = fiero(`/operator/getAllKodeRekening`);
				modal.close();
			}
		}}
	>
		Simpan
	</button>
</Modal>
