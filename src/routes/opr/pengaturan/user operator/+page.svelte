<script>
	// @ts-nocheck

	import { fiero } from '$lib/js/fiero';
	import { getKeyModifier, shownKeyModifier } from '$lib/js/modifier';
	import { formatTitle } from '$lib/js/string';
	import Modal from '$lib/modal/modal.svelte';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';
	import Icon from '@iconify/svelte';
	let modal;

	let source = fiero(`/operator/getAllUserOperator`);

	let modifier = {
		id: { show: false },
		foto: { show: false },
		status: { show: false },
		privilege: { show: false }
	};

	let modalModifier = {
		pageNum: { show: false }
	};

	let buttons = [
		{
			head: 'Aksi',
			icon: 'mdi:pencil',
			action: (_, obj) => {
				selected = obj;
				modal.open();
			}
		}
	];

	let selected = {};
</script>

<div class="flex items-center justify-between">
	<h1>User Operator</h1>
	<div>
		<button
			on:click={async () => {
				selected = {
					nama: '',
					username: '',
					password: '',
					nama_perusahaan: '',
					no_telepon: '',
					email: ''
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
	<h1>User Operator</h1>

	{#each shownKeyModifier(getKeyModifier([selected], { ...modifier, ...modalModifier })) as key}
		<label>{formatTitle(key)}</label>
		{#if modalModifier[key]?.disabled}
			<input type="text" bind:value={selected[key]} class="disabled" disabled />
		{:else if modifier[key]?.type === 'datetime'}
			<input type="date" bind:value={selected[key]} />
		{:else if key === 'password'}
			<input type="password" bind:value={selected[key]} />
		{:else}
			<input type="text" bind:value={selected[key]} />
		{/if}
	{/each}

	<br />
	<br />
	<button>Simpan</button>
</Modal>
