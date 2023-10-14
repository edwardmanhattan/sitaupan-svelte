<script>
	// @ts-nocheck

	import { fiero } from '$lib/js/fiero';
	import { formatTitle } from '$lib/js/string';
	import { snack } from '$lib/js/vanilla';
	import Modal from '$lib/modal/modal.svelte';
	import Row from '$lib/table/row.svelte';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';
	import Icon from '@iconify/svelte';
	let modal;

	let source = fiero(`/operator/getListSumberDana`);

	let modifier = {
		id: { show: false }
	};

	let buttons = [
		// {
		// 	head: 'Aksi',
		// 	icon: 'mdi:pencil',
		// 	action: (_, obj) => {
		// 		selected = obj;
		// 		modal.open();
		// 	}
		// }
	];

	let selected = {};
</script>

<div class="flex items-center justify-between">
	<h1>Sumber Dana</h1>
	<div>
		<button
			on:click={async () => {
				selected = {
					nama: ''
				};
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
	<h1>Sumber Dana</h1>

	<div>Nama Sumber Dana</div>
	<input type="text" bind:value={selected.nama} />

	<br />
	<br />
	<button
		on:click={async () => {
			const res = await fiero(`/operator/insertSumberDana`, 'POST', selected);
			if (res.status === 200) {
				snack.info('Berhasil menambah sumber dana baru');
				source = fiero(`/operator/getListSumberDana`);
			} else {
				snack.info('Terjadi kesalahan');
			}
			modal.close();
		}}
	>
		Simpan
	</button>
</Modal>
