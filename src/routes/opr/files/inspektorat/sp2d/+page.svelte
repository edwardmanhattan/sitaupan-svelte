<script>
	// @ts-nocheck

	import Currency from '$lib/form/currency.svelte';
	import File from '$lib/form/file.svelte';
	import Select from '$lib/form/select.svelte';
	import { getYearNow, getYearsSince } from '$lib/js/datetime';
	import { fiero } from '$lib/js/fiero';
	import { snack } from '$lib/js/vanilla';
	import Modal from '$lib/modal/modal.svelte';
	import Skeleton from '$lib/table/skeleton.svelte';
	import TableSp2d from '$lib/table/table-sp2d.svelte';
	import Icon from '@iconify/svelte';

	let year = getYearNow();
	$: source = `/operator/getLaporanSp2d?tanggal=${year}`;

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
		<TableSp2d {data} />
	{:catch err}
		<div>{err}</div>
	{/await}
</div>

<!-- svelte-ignore a11y-label-has-associated-control -->
<Modal bind:this={modal}>
	<label>Bidang</label>
	{#await fiero(`/operator/getAllBidangProyek`) then data}
		<Select bind:key={form.id_bidang} {data} config={{ key: 'id', title: 'nama_bidang' }} />
	{/await}
	<br />

	<label>LS Fisik</label>
	<File name="ls_fisik" />
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
