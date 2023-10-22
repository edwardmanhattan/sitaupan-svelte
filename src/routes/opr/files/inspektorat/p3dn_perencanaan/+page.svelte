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
	$: source = `/operator/getLaporanP3DNPerencanaan?tanggal=${year}`;
	let modifier = {
		id: { show: false },
		id_perencanaan: { show: false },
		id_bidang: { show: false }
	};
	let buttons = [
		{
			head: 'Aksi',
			icon: 'bi:trash',
			color: 'red-1',
			textColor: 'white',
			action: (id) => {
				snack.confirm('Anda yakin ingin menghapus data ini?', async function () {
					const res = await fiero(`/operator/deleteP3dn`, 'POST', { id });
					if (res?.status === 200) {
						snack.info(`Berhasil menghapus data`);
						year = '';
					} else snack.info('Gagal menghapus data.');
				});
			}
		}
	];

	let modal;
	let form;

	let metode = [
		{ nama: 'Swakelola' },
		{ nama: 'e. Purchasing' },
		{ nama: 'e. Tender' },
		{ nama: 'Kontes' },
		{ nama: 'Sayembara' },
		{ nama: 'Pengadaan Langsung' },
		{ nama: 'Penunjukan Langsung' },
		{ nama: 'Darurat / Lainnya' }
	];
</script>

<div>
	<div class="flex items-center justify-between">
		<h1>P3DN Perencanaan</h1>

		<div class="flex items-center gap-2">
			<select bind:value={year} class="w-32">
				<option value="">Semua</option>
				{#each getYearsSince(2023) as y}
					<option value={y}>{y}</option>
				{/each}
			</select>
			<button
				on:click={() => {
					form = {
						id_bidang: 0,
						metode_pengadaan: '',
						tw1: '',
						tw2: '',
						tw3: '',
						tw4: ''
					};

					modal.open();
				}}
			>
				<Icon icon="bi:plus" />
				Tambah
			</button>
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

<Modal bind:this={modal}>
	<div>Bidang</div>
	{#await fiero(`/operator/getAllBidangProyek`) then data}
		<Select bind:key={form.id_bidang} {data} config={{ key: 'id', title: 'nama_bidang' }} />
	{/await}
	<br />

	<div>Metode Pengadaan</div>
	<Select bind:key={form.metode_pengadaan} data={metode} config={{ key: 'nama', title: 'nama' }} />
	<br />

	<div>TW 1</div>
	<input type="text" bind:value={form.tw1} />
	<br />

	<div>TW 2</div>
	<input type="text" bind:value={form.tw2} />
	<br />

	<div>TW 3</div>
	<input type="text" bind:value={form.tw3} />
	<br />

	<div>TW 4</div>
	<input type="text" bind:value={form.tw4} />
	<br />

	<br />
	<br />
	<button
		on:click={async () => {
			const res = await fiero(`/operator/insertP3DNPerencanaan`, 'POST', form);
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
