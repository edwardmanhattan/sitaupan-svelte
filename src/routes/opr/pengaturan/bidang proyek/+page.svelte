<script>
	// @ts-nocheck

	import { fiero } from '$lib/js/fiero';
	import { snack } from '$lib/js/vanilla';
	import Modal from '$lib/modal/modal.svelte';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';
	import Icon from '@iconify/svelte';
	let modal;

	let source = fiero(`/operator/getAllBidangProyek`);

	let modifier = {
		id: { show: false }
	};

	let buttons = [
		{
			head: 'Aksi',
			icon: 'basil:trash-solid',
			color: 'rose-700',
			action: (id, obj) => {
				snack.confirm('Anda akan menghapus bidang ini secara permanen. Lanjutkan?', async () => {
					const res = await fiero(`/operator/deleteBidangProyek`, 'POST', { id: id });
					if (res.status === 200) {
						snack.info('Berhasil menghapus bidang.');
						source = fiero(`/operator/getAllBidangProyek`);
					}
				});
			}
		}
	];

	let selected = {};
</script>

<div class="flex items-center justify-between">
	<h1>Bidang Proyek</h1>
	<div>
		<button
			on:click={() => {
				selected = { nama_bidang: '', kode_bidang: '' };
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
	<h1>Bidang Proyek</h1>

	<label>Nama Bidang</label>
	<input type="text" bind:value={selected.nama_bidang} />
	<label>Kode Bidang</label>
	<input type="text" bind:value={selected.kode_bidang} />

	<br />
	<br />
	<button
		on:click={async () => {
			const res = await fiero(`/operator/insertBidangProyek`, 'POST', selected);
			if (res.status === 200) {
				snack.info('Berhasil menambah bidang proyek baru.');
				source = fiero(`/operator/getAllBidangProyek`);
				modal.close();
			}
		}}
	>
		Simpan
	</button>
</Modal>
