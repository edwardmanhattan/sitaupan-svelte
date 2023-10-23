<script>
	// @ts-nocheck

	import { getYearNow, getYearsSince } from '$lib/js/datetime';
	import { fiero } from '$lib/js/fiero';

	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';
	import Icon from '@iconify/svelte';
	import Modal from '$lib/modal/modal.svelte';
	import Select from '$lib/form/select.svelte';
	import { snack } from '$lib/js/vanilla';

	let year = '';
	let random = '';
	$: source = `/operator/getLaporanCapainRealisasi?tanggal=${year}&random=${random}`;
	let modifier = {
		id: { show: false },
		id_capaian: { show: false },
		tahun: { show: false }
	};
	let buttons = [
		{
			head: 'Aksi',
			icon: 'bi:trash',
			color: 'red-1',
			textColor: 'white',
			action: (id) => {
				console.log(id);
				snack.confirm('Anda yakin ingin menghapus data ini?', async function () {
					const res = await fiero(`/operator/deleteCapaianRealisasi`, 'POST', { id });
					console.log(res);
					if (res?.status === 200) {
						snack.info(`Berhasil menghapus data`);
						random = Math.random();
					} else snack.info('Gagal menghapus data.');
				});
			},
			idKey: 'id_capaian'
		}
	];

	let modal;
	let persentaseList = {
		persentase_1: '-',
		persentase_2: '-',
		persentase_3: '-',
		persentase_4: '-',
		persentase_5: '-',
		persentase_6: '-',
		persentase_7: '-',
		persentase_8: '-',
		persentase_9: '-',
		persentase_10: '-',
		persentase_11: '-',
		persentase_12: '-'
	};
	let form;
</script>

<div>
	<div class="flex items-center justify-between">
		<h1>Capaian Realisasi</h1>

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
						id_capaian: 0,
						perangkat_daerah: '-',
						target: '-',
						...persentaseList,
						keterangan: '-',
						tahun: '2023'
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
	<div>Perangkat Daerah</div>
	<input type="text" bind:value={form.perangkat_daerah} />
	<br />

	<div>Target</div>
	<input type="text" bind:value={form.target} />
	<br />

	{#each Object.keys(persentaseList) as _, i}
		<div>Persentase {i + 1}</div>
		<input class="w-32" type="text" bind:value={form[`persentase-${i + 1}`]} /> &nbsp; %
		<br />
	{/each}

	<div>Keterangan</div>
	<textarea rows="3" bind:value={form.keterangan} />
	<br />

	<div>Tahun</div>
	<select bind:value={form.tahun}>
		{#each getYearsSince(2022) as year}
			<option value={year}>{year}</option>
		{/each}
	</select>
	<br />

	<br />
	<br />
	<button
		on:click={async () => {
			const res = await fiero(`/operator/insertCapaianRealisasi`, 'POST', form);
			if (res.status === 200) {
				snack.info('Berhasil menambah data baru');
			} else snack.info('Terjadi kesalahan.');

			random = Math.random();
			modal.close();
		}}
	>
		Simpan
	</button>
</Modal>
