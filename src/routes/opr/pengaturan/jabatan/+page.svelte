<script>
	// @ts-nocheck

	import { fiero } from '$lib/js/fiero';
	import { getKeyModifier, shownKeyModifier } from '$lib/js/modifier';
	import { formatTitle } from '$lib/js/string';
	import { snack } from '$lib/js/vanilla';
	import Modal from '$lib/modal/modal.svelte';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';
	import Icon from '@iconify/svelte';
	let modal;

	let source = fiero(`/operator/getAllJabatan`);

	let modifier = {
		id: { show: false },
		edit: { show: false }
	};

	let modalModifier = {
		pageNum: { show: false }
	};

	let buttons = [
		{
			head: 'Edit',
			icon: 'mdi:pencil',
			action: (_, obj) => {
				if (obj.edit === 0) {
					snack.info('Data ini tidak bisa diubah.');
					return;
				}
				selected = obj;
				modal.open();
			},
			exception: [{ key: 'edit', value: 0, body: '(no edit)' }]
		},
		{
			head: 'Hapus',
			icon: 'bi:trash',
			color: 'red-1',
			textColor: 'white',
			action: async (id, obj) => {
				if (obj.edit === 0) {
					snack.info('Data ini tidak bisa dihapus.');
					return;
				}

				const res = await fiero(`/operator/deleteJabatan`, 'POST', { id });
				if (res.status === 200) snack.info('Berhasil menghapus data');
				else snack.info('Terjadi kesalahan');
				source = fiero(`/operator/getAllJabatan`);
			},
			exception: [{ key: 'edit', value: 0, body: '(no delete)' }]
		}
	];

	let selected = {};
</script>

<div class="flex items-center justify-between">
	<h1>Jabatan</h1>
	<div>
		<button
			on:click={async () => {
				selected = { id: -1, nama_jabatan: '' };
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
	<h1 class="w-96">Jabatan</h1>

	{#each shownKeyModifier(getKeyModifier([selected], { ...modifier, ...modalModifier })) as key}
		<label>{formatTitle(key)}</label>
		{#if modalModifier[key]?.disabled}
			<input type="text" bind:value={selected[key]} class="disabled" disabled />
		{:else if modifier[key]?.type === 'datetime'}
			<input type="date" bind:value={selected[key]} />
		{:else}
			<input type="text" bind:value={selected[key]} />
		{/if}
	{/each}

	<br />
	<br />
	<button
		on:click={async () => {
			let res;
			if (selected.id === -1) res = await fiero(`/operator/insertJabatan`, 'POST', selected);
			else res = await fiero(`/operator/updateJabatan`, 'POST', selected);

			if (res.status === 200) {
				if (selected.id === -1) snack.info('Berhasil menambah jabatan baru');
				else snack.info('Berhasil mengubah informasi jabatan.');
			} else snack.info('Terjadi kesalahan');

			source = fiero(`/operator/getAllJabatan`);
			modal.close();
		}}
	>
		Simpan
	</button>
</Modal>
