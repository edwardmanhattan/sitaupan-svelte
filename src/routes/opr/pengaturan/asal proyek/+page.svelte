<script>
	// @ts-nocheck

	import { fiero } from '$lib/js/fiero';
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
			head: 'Edit',
			icon: 'mdi:pencil',
			action: (id, obj) => {
				selected = obj;
				modal.open();
			}
		}
	];

	let selected = {};
</script>

<div class="flex items-center justify-between">
	<h1>Asal Proyek</h1>
	<div>
		<button
			on:click={() => {
				selected = { asal_proyek: '' };
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
	<h1 class="w-96">Asal Proyek</h1>

	<label>Asal</label>
	<input type="text" bind:value={selected.asal_proyek} />

	<br />
	<br />
	<button>Simpan</button>
</Modal>
