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

	let source = fiero(`/operator/getAllNomorDPA`);

	let modifier = {
		id: { show: false },
		nomor_dpa: { alias: 'Nomor DPA' },
		tanggal_dpa: { alias: 'Tanggal DPA', type: 'datetime' }
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
				mode = 'edit';
				modal.open();
			}
		},
		{
			head: '',
			icon: 'basil:trash-solid',
			color: 'rose-700',
			action: (id) => {
				snack.confirm('Anda akan menghapus Nomor DPA ini secara permanen. Lanjutkan?', async () => {
					const res = await fiero(`/operator/deleteNomorDPA`, 'POST', { id: id });
					if (res.status === 200) snack.info('Nomor DPA berhasil dihapus.');
					source = fiero(`/operator/getAllNomorDPA`);
					modal.close();
				});
			}
		}
	];

	let selected = {};
	let mode = 'insert';
</script>

<div class="flex items-center justify-between">
	<h1>Nomor DPA</h1>
	<div>
		<button
			on:click={async () => {
				selected = { nomor_dpa: '', tanggal_dpa: '' };
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
	<h1 class="w-96">Nomor DPA</h1>

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
			if (mode === 'insert') {
				const res = await fiero(`/operator/insertNomorDPA`, 'POST', selected);
				if (res.status === 200) snack.info('Nomor DPA berhasil ditambahkan.');
				source = fiero(`/operator/getAllNomorDPA`);
				modal.close();
			} else {
				const res = await fiero(`/operator/updateNomorDPA`, 'POST', selected);
				console.log(res);
				if (res.status === 200) snack.info('Nomor DPA berhasil diubah.');
				source = fiero(`/operator/getAllNomorDPA`);
				modal.close();
			}
		}}
	>
		Simpan
	</button>
</Modal>
