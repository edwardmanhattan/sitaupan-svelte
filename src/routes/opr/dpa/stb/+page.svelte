<script>
	// @ts-nocheck

	import { fiero } from '$lib/js/fiero';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';
	import Modal from '$lib/modal/modal.svelte';
	import { snack } from '$lib/js/vanilla';
	import Icon from '@iconify/svelte';
	import Select from '$lib/form/select.svelte';
	import { goto } from '$app/navigation';
	let modal;

	export let data;
	let { operator } = data;

	let source = fiero(`/operator/getListSerahTerimaBerkas`);
	let modifier = {
		id: { show: false },
		id_serah_terima: { show: false },
		id_bidang: { show: false },
		id_staf: { show: false },
		formulir: { show: false },
		timestamp: { type: 'datetime' }
	};

	let buttons = [
		{
			head: '',
			body: 'Lihat Detail',
			action: (id, obj) => {
				goto(`/stb-${obj.id_serah_terima}`);
			}
		}
	];

	let selected = { id_staf: 2, id_bidang: 0, id_formulir: '' };

	let formulir = [];
	let selectAll = false;
	function selectFormulir() {
		selected.id_formulir = formulir.reduce((acc, cur) => {
			if (cur.selected) acc += cur.id_form + ',';
			return acc;
		}, '');

		if (selected.id_formulir.includes(',')) selected.id_formulir.slice(0, -1);
	}

	let nama = operator.find((x) => x.id === selected.id_staf ?? 0)?.nama;
</script>

<div class="flex items-center justify-between">
	<h1>Serah Terima Berkas</h1>
	<div>
		<button
			on:click={() => {
				selected = { id_staf: 2, id_bidang: 0, formulir: [] };
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
<Modal
	bind:this={modal}
	on:closed={() => {
		selectAll = false;
	}}
>
	<h1>Serah Terima Berkas</h1>

	<label>Staf</label>
	{#await fiero(`/operator/getStafPengelola`) then data}
		<Select
			bind:key={selected.id_staf}
			{data}
			on:linkup={async () => {
				const res = await fiero(
					`/operator/getListFormPenyediaByStafPengelola?id=${selected.id_staf}`
				);
				formulir = res ?? [];
				formulir = formulir.map((x) => ({ ...x, selected: false }));
			}}
			config={{ key: 'id', title: 'nama', title2: 'nip' }}
		/>
	{/await}

	<label>Bidang</label>
	{#await fiero(`/operator/getAllBidangProyek`) then data}
		<Select bind:key={selected.id_bidang} {data} config={{ key: 'id', title: 'nama_bidang' }} />
	{/await}

	<div class="flex items-center justify-between mt-4">
		<label>Formulir</label>
		<label class="flex items-center gap-2 font-mono text-md">
			<input
				type="checkbox"
				bind:checked={selectAll}
				on:change={() => {
					if (selectAll) formulir = formulir.map((x) => ({ ...x, selected: true }));
					else formulir = formulir.map((x) => ({ ...x, selected: false }));
					selectFormulir();
				}}
			/>
			Semua
		</label>
	</div>
	<div class="grid grid-cols-3 gap-2 my-2">
		{#each formulir ?? [] as form}
			<label class="flex items-center gap-2 font-mono text-md">
				<input
					type="checkbox"
					bind:checked={form.selected}
					on:change={() => {
						selectAll = false;
						selectFormulir();
					}}
				/>
				<span>{form.kode_rekening_rincian} ({form.no_spm})</span>
			</label>
		{:else}
			<div class="text-sm italic text-slate-600">tidak ada formulir terkait.</div>
		{/each}
	</div>

	<br />
	<br />
	<button
		on:click={async () => {
			const res = await fiero(`/operator/createSerahTerimaBerkas`, 'POST', selected);
			if (res.status === 200) {
				snack.info('Berhasil membuat serah terima berkas baru.');
			} else snack.info('Terjadi kesalahan.');

			source = fiero(`/operator/getListSerahTerimaBerkas`);
			modal.close();
		}}
	>
		Simpan
	</button>
</Modal>
