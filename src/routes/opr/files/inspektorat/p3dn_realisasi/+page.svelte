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
	$: source = `/operator/getLaporanP3dnRealisasi?tanggal=${year}`;
	let modifier = {
		id: { show: false },
		id_perencanaan: { show: false },
		id_bidang: { show: false },
		umkm_paket: { alias: 'UMKM Paket' },
		umkm_jumlah: { alias: 'UMKM Jumlah', type: 'currency' },
		selesai_jumlah: { type: 'currency' },
		pdn_jumlah: { type: 'currency' },
		rup_jumlah: { type: 'currency' }
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
		<h1>P3DN Realisasi</h1>

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
						rup_paket: 0,
						rup_jumlah: 0,
						pdn_paket: 0,
						pdn_jumlah: 0,
						umkm_paket: 0,
						umkm_jumlah: 0,
						selesai_paket: 0,
						selesai_jumlah: 0
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

	<div>RUP Paket</div>
	<input type="number" bind:value={form.rup_paket} />
	<br />

	<div>RUP Jumlah</div>
	<Currency bind:value={form.rup_jumlah} />
	<br />

	<div>PDN Paket</div>
	<input type="number" bind:value={form.pdn_paket} />
	<br />

	<div>PDN Jumlah</div>
	<Currency bind:value={form.pdn_jumlah} />
	<br />

	<div>UMKM Paket</div>
	<input type="number" bind:value={form.umkm_paket} />
	<br />

	<div>UMKM Jumlah</div>
	<Currency bind:value={form.umkm_jumlah} />
	<br />

	<div>Selesai Paket</div>
	<input type="number" bind:value={form.selesai_paket} />
	<br />

	<div>Selesai Jumlah</div>
	<Currency bind:value={form.selesai_jumlah} />
	<br />

	<br />
	<br />
	<button
		on:click={async () => {
			form.bidang = '';
			form.pdn_jumlah = parseInt(form.pdn_jumlah);
			form.rup_jumlah = parseInt(form.rup_jumlah);
			form.umkm_jumlah = parseInt(form.umkm_jumlah);
			form.selesai_jumlah = parseInt(form.selesai_jumlah);

			const res = await fiero(`/operator/insertP3dnRealisasi`, 'POST', {
				p3dn_realisasi: JSON.stringify(form)
			});
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
