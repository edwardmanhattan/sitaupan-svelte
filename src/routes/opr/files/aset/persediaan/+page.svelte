<script>
	// @ts-nocheck

	import Currency from '$lib/form/currency.svelte';
	import Select from '$lib/form/select.svelte';
	import { getYearNow, getYearsSince } from '$lib/js/datetime';
	import { fiero } from '$lib/js/fiero';
	import { snack } from '$lib/js/vanilla';
	import Modal from '$lib/modal/modal.svelte';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';
	import Icon from '@iconify/svelte';

	let year = getYearNow();
	$: source = `/operator/getLaporanPersedianBarang?tanggal=${year}`;
	let modifier = {
		id: { show: false },
		id_perencanaan: { show: false },
		id_bidang: { show: false }
	};
	let buttons = [
		// {
		// 	head: 'Aksi',
		// 	icon: 'bi:trash',
		// 	color: 'red-1',
		// 	textColor: 'white',
		// 	action: (id) => {
		// 		snack.confirm('Anda yakin ingin menghapus data ini?', async function () {
		// 			const res = await fiero(`/operator/deleteP3dn`, 'POST', { id });
		// 			if (res?.status === 200) {
		// 				snack.info(`Berhasil menghapus data`);
		// 				year = '';
		// 			} else snack.info('Gagal menghapus data.');
		// 		});
		// 	}
		// }
	];

	let modal;
	let form;
</script>

<div>
	<div class="flex items-center justify-between">
		<h1>Persediaan Barang</h1>

		<div class="flex items-center gap-2">
			<select bind:value={year} class="w-32">
				<option value="">Semua</option>
				{#each getYearsSince(2023) as y}
					<option value={y}>{y}</option>
				{/each}
			</select>
			<!-- <button
				on:click={() => {
					form = {
						id_jenis_aset: 0,
						banyak: 0,
						harga: 0,
						jumlah: 0,
						tahun: '2023'
					};

					modal.open();
				}}
			>
				<Icon icon="bi:plus" />
				Tambah
			</button> -->
		</div>
	</div>
	<br />

	{#await fiero(source)}
		<Skeleton />
	{:then data}
		<Table {data} {modifier} {buttons} />
	{:catch err}
		<div>{err}</div>
	{/await}
</div>

<!-- svelte-ignore a11y-label-has-associated-control -->
<Modal bind:this={modal}>
	<label>Jenis Aset</label>
	{#await fiero(`/operator/getJenisPersedianAset?id_kategori=`) then data}
		<Select bind:key={form.id_jenis_aset} {data} config={{ key: 'id', title: 'nama' }} />
	{/await}
	<br />

	<label>Banyak</label>
	<input type="number" bind:value={form.banyak} />
	<br />

	<label>Harga</label>
	<Currency bind:value={form.harga} />

	<label>Jumlah</label>
	<input type="number" bind:value={form.jumlah} />
	<br />

	<label>Tahun</label>
	<select bind:value={form.tahun}>
		{#each getYearsSince(2023) as y}
			<option value={y}>{y}</option>
		{/each}
	</select>

	<br />
	<br />
	<button
		on:click={async () => {
			const res = await fiero(`/operator/insertPersedianAwal`, 'POST', form);
			if (res.status === 200) {
				snack.info('Berhasil menambah data baru');
			} else snack.info('Terjadi kesalahan.');

			year = '';
			modal.close();
		}}
	>
		Simpan
	</button>
</Modal>
