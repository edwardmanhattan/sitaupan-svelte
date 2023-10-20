<script>
	// @ts-nocheck

	import { fiero } from '$lib/js/fiero';
	import { snack } from '$lib/js/vanilla';
	import Modal from '$lib/modal/modal.svelte';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';
	import Icon from '@iconify/svelte';
	let modal;

	let source = fiero(`/operator/getAllAsalProyek`);

	let modifier = {
		id: { show: false }
	};

	let buttons = [
		{
			head: 'Aksi',
			icon: 'mdi:pencil',
			color: 'red-1 text-white-1',
			action: (id) => {
				snack.confirm(
					'Anda akan menghapus asal kegiatan ini secara permanen. Lanjutkan?',
					async () => {
						const res = await fiero(`/operator/deleteAsalProyek`, 'POST', { id: id });
						if (res.status === 200) {
							snack.info('Berhasil menghapus asal kegiatan.');
							source = fiero(`/operator/getAllAsalProyek`);
						}
					}
				);
			}
		}
	];

	let selected = {};
</script>

<div class="flex items-center justify-between">
	<h1>Asal Kegiatan</h1>
	<div>
		<button
			on:click={() => {
				selected = { asal: '' };
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
	<h1 class="w-96">Asal Kegiatan</h1>

	<label>Asal</label>
	<input type="text" bind:value={selected.asal} />

	<br />
	<br />
	<button
		on:click={async () => {
			const res = await fiero(`/operator/insertAsalProyek`, 'POST', selected);
			if (res.status === 200) {
				snack.info('Berhasil menambah asal kegiatan baru.');
				source = fiero(`/operator/getAllAsalProyek`);
				modal.close();
			}
		}}
	>
		Simpan
	</button>
</Modal>
