<script>
	// @ts-nocheck

	import { fiero } from '$lib/js/fiero';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';
	import Modal from '$lib/modal/modal.svelte';
	import { snack } from '$lib/js/vanilla';
	import Icon from '@iconify/svelte';
	import Select from '$lib/form/select.svelte';
	let modal;

	export let data;
	let { operator, formulir } = data;

	formulir = formulir.map((x) => ({ ...x, selected: false }));

	let source = fiero(`/operator/getListSerahTerimaBerkas`);
	let modifier = {
		id: { show: false },
		id_serah_terima: { show: false },
		id_bidang: { show: false },
		id_staf: { show: false },
		formulir: { show: false }
	};

	let buttons = [
		{
			head: '',
			body: 'Lihat Detail',
			action: (id, obj) => {
				document.location.href = `/stb-${obj.id_serah_terima}`;
			}
		}
	];

	let selected = { id_staf: 2, id_bidang: 0, id_formulir: '' };

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
<Modal bind:this={modal}>
	<h1>Serah Terima Berkas</h1>

	<label>Staf</label>
	<input type="text" bind:value={nama} disabled />

	<label>Bidang</label>
	{#await fiero(`/operator/getAllBidangProyek`) then data}
		<Select bind:key={selected.id_bidang} {data} config={{ key: 'id', title: 'nama_bidang' }} />
	{/await}

	<label>Formulir</label>
	<div class="grid grid-cols-3 gap-2">
		{#each formulir ?? [] as form}
			<label class="flex items-center gap-2 font-mono text-md">
				<input on:change={selectFormulir} type="checkbox" bind:checked={form.selected} />
				<span>{form.kode_rincian_sub_kegiatan} ({form.nomor_spm})</span>
			</label>
		{/each}
	</div>

	<br />
	<br />
	<button
		on:click={async () => {
			// console.log(selected);
			const res = await fiero(`/operator/createSerahTerimaBerkas`, 'POST', selected);
			if (res.status === 200) {
				snack.info('Berhasil membuat serah terima berkas baru.');
				source = fiero(`/operator/getListSerahTerimaBerkas`);
				modal.close();
			}
		}}
	>
		Simpan
	</button>
</Modal>
