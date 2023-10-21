<script>
	// @ts-nocheck

	import { fiero } from '$lib/js/fiero';
	import Modal from '$lib/modal/modal.svelte';
	import Row from '$lib/table/row.svelte';
	import Select from '$lib/form/select.svelte';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';
	import { snack } from '$lib/js/vanilla';
	let modal;

	let source = fiero(`/operator/getListMasterTim`);

	let modifier = {
		id: { show: false },
		id_master_tim: { show: false },
		id_pa: { show: false },
		id_kpa: { show: false },
		id_bpp: { show: false },
		id_sipd: { show: false },
		id_bidang: { show: false }
	};

	let buttons = [
		{
			head: 'Aksi',
			icon: 'mdi:pencil',
			action: (_, obj) => {
				console.log(obj);
				selected = obj;
				modal.open();
			},
			idKey: 'id_master_tim'
		}
	];

	let selected = {};
</script>

<div class="flex items-center justify-between">
	<h1>Master Tim</h1>
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
	<div class="w-[50vw]">
		<h1>Master Tim</h1>

		<Row number="none" title="PA">
			{#await fiero(`/operator/getAllUserOperator`) then data}
				<Select
					bind:key={selected.id_pa}
					{data}
					config={{ key: 'id', title: 'nama', title2: 'nip' }}
				/>
			{/await}
		</Row>

		<Row number="none" title="KPA">
			{#await fiero(`/operator/getAllUserOperator`) then data}
				<Select
					bind:key={selected.id_kpa}
					{data}
					config={{ key: 'id', title: 'nama', title2: 'nip' }}
				/>
			{/await}
		</Row>

		<Row number="none" title="BPP">
			{#await fiero(`/operator/getAllUserOperator`) then data}
				<Select
					bind:key={selected.id_bpp}
					{data}
					config={{ key: 'id', title: 'nama', title2: 'nip' }}
				/>
			{/await}
		</Row>

		<Row number="none" title="SIPD">
			{#await fiero(`/operator/getAllUserOperator`) then data}
				<Select
					bind:key={selected.id_sipd}
					{data}
					config={{ key: 'id', title: 'nama', title2: 'nip' }}
				/>
			{/await}
		</Row>

		<br />
		<br />
		<button
			on:click={async () => {
				console.log(selected);
				const res = await fiero(`/operator/updateMasterTim`, 'POST', selected);
				if (res.status === 200) {
					snack.info('Berhasil merubah informasi master tim');
					source = fiero(`/operator/getListMasterTim`);
				} else {
					snack.info('Terjadi kesalahan');
				}
				modal.close();
			}}
		>
			Simpan
		</button>
	</div>
</Modal>
