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
	$: source = `/operator/getLaporanSp2d?tanggal=${year}`;
	let modifier = {
		id: { show: false },
		id_sp2d: { show: false },
		id_bidang: { show: false },
		id_master_formulir: { show: false }
	};
	let buttons = [];

	let modal;
	let form;
</script>

<div>
	<div class="flex items-center justify-between">
		<h1>Bukti Bayar (SP2D)</h1>

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
						id_formulir: 0,
						id_bidang: 0,
						ls_fisik: '',
						konsultan: '',
						honor: 0
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
	<div>Formulir</div>
	{#await fiero(`/operator/getListFormPenyediaJasa?mode=selesai&id_jabatan=17`) then data}
		<Select
			bind:key={form.id_formulir}
			{data}
			config={{ key: 'id_form', title: 'kode_rekening_rincian' }}
		/>
	{/await}
	<br />

	<div>Bidang</div>
	{#await fiero(`/operator/getAllBidangProyek`) then data}
		<Select bind:key={form.id_bidang} {data} config={{ key: 'id', title: 'nama_bidang' }} />
	{/await}
	<br />

	<div>LS Fisik</div>
	<input type="text" bind:value={form.ls_fisik} />
	<br />

	<div>Konsultan</div>
	<input type="text" bind:value={form.konsultan} />
	<br />

	<div>Honor</div>
	<Currency bind:value={form.honor} />
	<br />

	<br />
	<br />
	<button
		on:click={async () => {
			const res = await fiero(`/operator/insertSp2d`, 'POST', form);
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
