<script>
	// @ts-nocheck

	import Select from '$lib/form/select.svelte';
	import { fiero } from '$lib/js/fiero';
	import Modal from '$lib/modal/modal.svelte';
	import Row from '$lib/table/row.svelte';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';
	import Icon from '@iconify/svelte';
	import { stringify } from 'postcss';

	let source = fiero(`/mitra/getListNotaAset?id_penyedia_jasa=1`);

	export let data;
	const { barebone, detail } = data;
	let form = JSON.parse(JSON.stringify(barebone));
	let modal;
</script>

<div class="flex items-center justify-between">
	<h1>Berkas Invoice</h1>
	<button
		on:click={() => {
			form = JSON.parse(JSON.stringify(barebone));
			modal.open();
		}}
		class="w-fit"
	>
		<Icon icon="bi:plus" />
		Tambah Invoice
	</button>
</div>

{#await source}
	<Skeleton />
{:then data}
	<Table {data} />
{:catch err}
	<div>{err}</div>
{/await}

<Modal width="75vw" bind:this={modal}>
	<Row number="1" title="ID Nota">
		<input type="text" bind:value={form.id_nota} />
	</Row>

	<Row number="2" title="Tanggal">
		<input type="date" bind:value={form.tanggal} />
	</Row>

	<Row number="3" title="Nama Toko">
		<input type="text" bind:value={form.nama_toko} />
	</Row>

	<Row number="4" title="Rincian Data">
		{#await fiero(`/operator/getListPersediaanAset`) then data}
			<Select bind:key={form.rincian} {data} config={{ key: 'id', title: 'nama_barang' }} />
		{/await}
		<!-- <Select bind:key={kontrak.id_penjabat} data={operator} config={{ key: 'id', title: 'nama' }} /> -->
	</Row>

	<div class="flex items-center justify-between mb-2">
		<div>Detail Pembelian</div>
		<button
			on:click={() => {
				form.detail = [...form.detail, JSON.parse(JSON.stringify(detail))];
			}}
			class="text-sm w-fit"
		>
			<Icon icon="bi:plus" />
			Tambah
		</button>
	</div>

	<table>
		<thead>
			<tr>
				<th>No</th>
				<th>Uraian</th>
				<th>Harga</th>
				<th>Jumlah Barang</th>
				<th>Total</th>
				<th>Aksi</th>
			</tr>
		</thead>
		<tbody>
			{#each form.detail ?? [] as d, i (i)}
				<tr>
					<td>{i + 1}</td>
					<td><input type="text" bind:value={d.uraian} /></td>
					<td>
						<input
							type="number"
							on:change={() => {
								d.total = parseFloat(d.harga) * d.jumlah;
							}}
							bind:value={d.harga}
						/>
					</td>
					<td>
						<input
							type="number"
							on:change={() => {
								d.total = parseFloat(d.harga) * d.jumlah;
							}}
							min="1"
							bind:value={d.jumlah}
						/>
					</td>
					<td>
						<input
							type="number"
							on:change={() => {
								d.harga = parseFloat(d.total) / d.jumlah;
							}}
							bind:value={d.total}
						/>
					</td>
					<td>
						<button
							on:click={() => {
								form.detail = form.detail.filter((x, idx) => idx !== i);
							}}
							class="p-1 bg-rose-700"
						>
							<Icon icon="bi:trash" />
						</button>
					</td>
				</tr>
			{:else}
				<tr>
					<td colspan="6" class="italic text-center">belum ada detail pembelian</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<br />
	<button> Simpan </button>
</Modal>
