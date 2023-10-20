<script>
	// @ts-nocheck

	import Select from '$lib/form/select.svelte';
	import { fiero } from '$lib/js/fiero';
	import { snack } from '$lib/js/vanilla.js';
	import Modal from '$lib/modal/modal.svelte';
	import Row from '$lib/table/row.svelte';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';
	import Icon from '@iconify/svelte';

	export let data;
	const { barebone, detail, userId } = data;
	let source = fiero(`/mitra/getListNotaAset?id_penyedia_jasa=${userId}`);
	let form = JSON.parse(JSON.stringify(barebone));
	let modal;

	const modifier = {
		id_nota: { show: false },
		id_aset: { show: false },
		id_penyedia_jasa: { show: false }
	};
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
	<Table {data} {modifier} />
{:catch err}
	<div>{err}</div>
{/await}

<Modal width="75vw" bind:this={modal}>
	<Row number="1" title="Nomor Nota">
		<input type="text" bind:value={form.nomor_nota} />
	</Row>

	<Row number="2" title="Tanggal">
		<input type="date" bind:value={form.tanggal_nota} />
	</Row>

	<Row number="3" title="Nama Toko">
		<input type="text" bind:value={form.nama_toko} />
	</Row>

	<Row number="4" title="Rincian Data">
		{#await fiero(`/operator/getListPersediaanAset`) then data}
			<Select bind:key={form.id_aset} {data} config={{ key: 'id', title: 'nama_barang' }} />
		{/await}
	</Row>

	<div class="flex items-center justify-between mb-2">
		<div>Detail Pembelian</div>
		<button
			on:click={() => {
				form.detail_nota = [...form.detail_nota, JSON.parse(JSON.stringify(detail))];
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
			{#each form.detail_nota ?? [] as d, i (i)}
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
								form.detail_nota = form.detail_nota.filter((x, idx) => idx !== i);
							}}
							class="p-1 bg-red-1 text-white-1"
						>
							<Icon icon="bi:trash" />
						</button>
					</td>
				</tr>
			{:else}
				<tr>
					<td colspan="6" class="italic text-center"> belum ada detail pembelian </td>
				</tr>
			{/each}
		</tbody>
	</table>

	<br />
	<button
		on:click={async () => {
			form.id_penyedia_jasa = userId;
			form.total = form.detail_nota.reduce((acc, cur) => {
				return (acc += cur.total);
			}, 0);
			form.detail_nota = JSON.stringify(form.detail_nota);
			const res = await fiero(`/mitra/insertNotaAset`, 'POST', form);

			if (res.status === 200) {
				snack.info('Berhasil menambah Invoice');
			} else {
				snack.info('Terjadi kesalahan');
			}

			source = fiero(`/mitra/getListNotaAset?id_penyedia_jasa=${userId}`);
			modal.close();
		}}
	>
		Simpan
	</button>
</Modal>
