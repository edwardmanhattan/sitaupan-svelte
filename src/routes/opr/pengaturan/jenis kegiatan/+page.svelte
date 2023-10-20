<script>
	// @ts-nocheck

	import { fiero } from '$lib/js/fiero';
	import { snack } from '$lib/js/vanilla';
	import Modal from '$lib/modal/modal.svelte';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';
	import Icon from '@iconify/svelte';
	let modal;

	let source = fiero(`/operator/getAllJenisProyek`);

	let modifier = {
		id: { show: false }
	};

	let buttons = [
		{
			head: 'Aksi',
			icon: 'basil:trash-solid',
			color: 'red-1 text-white-1',
			action: (id) => {
				snack.confirm(
					'Anda akan menghapus jenis kegiatan ini secara permanen. Lanjutkan?',
					async () => {
						const res = await fiero(`/operator/deleteJenisProyek`, 'POST', { id: id });
						if (res.status === 200) {
							snack.info('Berhasil menghapus jenis kegiatan.');
							source = fiero(`/operator/getAllJenisProyek`);
						}
					}
				);
			}
		}
	];

	let selected = {};
</script>

<div class="flex items-center justify-between">
	<h1>Jenis Kegiatan</h1>
	<div>
		<button
			on:click={() => {
				selected = { jenis_proyek: '' };
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
	<h1 class="w-96">Jenis Kegiatan</h1>

	<label>Jenis</label>
	<input type="text" bind:value={selected.jenis_proyek} />

	<br />
	<br />
	<button
		on:click={async () => {
			const res = await fiero(`/operator/insertJenisProyek`, 'POST', selected);
			if (res.status === 200) {
				snack.info('Berhasil menambah jenis kegiatan baru.');
				source = fiero(`/operator/getAllJenisProyek`);
				modal.close();
			}
		}}
	>
		Simpan
	</button>
</Modal>
