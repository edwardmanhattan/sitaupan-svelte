<script>
	// @ts-nocheck

	import Select from '$lib/form/select.svelte';
	import { fiero } from '$lib/js/fiero';
	import { snack } from '$lib/js/vanilla';
	import Modal from '$lib/modal/modal.svelte';
	import Kategori from '$lib/shortcut/kategori.svelte';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';
	import Icon from '@iconify/svelte';
	let modal;

	let random = Math.random();
	let id_kategori = '';
	$: source = fiero(`/operator/getJenisPersedianAset?id_kategori=${id_kategori}&random=${random}`);

	let modifier = {
		id: { show: false },
		id_kategori: { show: false }
	};

	let buttons = [
		{
			head: 'Edit',
			icon: 'basil:edit-outline',
			action: (id, obj) => {
				obj.nama_jenis = obj.nama;
				selected = obj;
				modal.open();
			}
		},
		{
			head: 'Hapus',
			icon: 'basil:trash-solid',
			color: 'red-1 text-white-1',
			action: (id, obj) => {
				snack.confirm(
					'Anda akan menghapus jenis persediaan aset ini secara permanen. Lanjutkan?',
					async () => {
						const res = await fiero(`/operator/deleteJenisPersedianAset`, 'POST', { id });
						if (res.status === 200) {
							snack.info('Berhasil menghapus jenis persediaan aset.');
						} else snack.info('Terjadi kesalahan.');
						random = Math.random();
						modal.close();
					}
				);
			}
		}
	];

	let selected = {};
</script>

<div class="flex items-center justify-between">
	<h1>Kategori Persediaan Aset</h1>
	<div>
		<button
			on:click={() => {
				selected = { id: 0, id_kategori: 0, nama_jenis: '' };
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
	<h1>Jenis Persediaan Aset</h1>

	<label>Kategori Persediaan Aset</label>
	{#await fiero(`/operator/getListPersediaanAset`) then data}
		<Select bind:key={selected.id_kategori} {data} config={{ key: 'id', title: 'nama_barang' }} />
	{/await}

	<label>Jenis Persediaan Aset</label>
	<input type="text" bind:value={selected.nama_jenis} />

	<br />
	<br />
	<button
		on:click={async () => {
			let src =
				selected.id === 0
					? `/operator/insertJenisPersedianAset`
					: `/operator/updateJenisPersedianAset`;
			const res = await fiero(src, 'POST', selected);

			if (res.status === 200) {
				if (selected.id === 0) snack.info('Berhasil menambah jenis persediaan aset baru.');
				else snack.info('Berhasil mengubah informasi jenis persediaan aset');
			} else snack.info('Terjadi kesalahan.');

			random = Math.random();
			modal.close();
		}}
	>
		Simpan
	</button>
</Modal>
