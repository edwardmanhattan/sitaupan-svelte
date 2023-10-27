<script>
	// @ts-nocheck

	import Currency from '$lib/form/currency.svelte';
	import File from '$lib/form/file.svelte';
	import Select from '$lib/form/select.svelte';
	import { getYearNow, getYearsSince } from '$lib/js/datetime';
	import { fiero } from '$lib/js/fiero';
	import { snack } from '$lib/js/vanilla';
	import Modal from '$lib/modal/modal.svelte';
	import Send from '$lib/shortcut/send.svelte';
	import Skeleton from '$lib/table/skeleton.svelte';
	import TableSp2d from '$lib/table/table-sp2d.svelte';
	import Icon from '@iconify/svelte';

	let year = getYearNow();
	$: source = `/operator/getLaporanSp2d?tanggal=${year}`;

	let modal;
	let form;

	let fileLS, fileKonsultan, fileHonor;

	let nilaiSumber = 0;
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
						honor: 0,
						id_sumber_dana: 0,
						nilai_sumber: 0
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
	<label>Formulir</label>
	{#await fiero(`/operator/getListFormPenyediaJasa?mode=selesai&id_jabatan=17`) then data}
		<Select
			bind:key={form.id_formulir}
			{data}
			config={{ key: 'id_form', title: 'kode_rekening_rincian' }}
		/>
	{/await}
	<br />

	<label>Bidang</label>
	{#await fiero(`/operator/getAllBidangProyek`) then data}
		<Select bind:key={form.id_bidang} {data} config={{ key: 'id', title: 'nama_bidang' }} />
	{/await}
	<br />

	<label>Sumber Dana</label>
	{#await fiero(`/operator/getSumberdanaByIdFormulir?id_form=${form.id_formulir}`) then data}
		<Select
			bind:key={form.id_sumber_dana}
			{data}
			config={{ key: 'id', title: 'nama' }}
			request="nilai"
			on:linkup={(data) => {
				nilaiSumber = data.detail.request;
			}}
		/>
	{/await}
	<br />

	<label>Nomor SP2D</label>
	<input type="text" bind:value={form.nomor_sp2d} />
	<br />

	<label>Pekerjaan</label>
	<input type="text" bind:value={form.pekerjaan} />
	<br />

	<label>Nilai</label>
	<Currency bind:value={form.nilai} />

	<label>LS Fisik</label>
	<File name="ls_fisik" bind:this={fileLS} />

	<label>Konsultan</label>
	<File name="konsultan" bind:this={fileKonsultan} />

	<label>Honor</label>
	<File name="honor" bind:this={fileHonor} />

	<br />
	<br />
	<Send
		on:click={async () => {
			form.nilai_sumber = nilaiSumber;
			const res = await fiero(`/operator/insertSp2d`, 'POST', form);
			if (res.status === 200) {
				const id = res.data;
				try {
					await fileLS.upload(id, 'sp2d', 'ls_fisik');
					await fileKonsultan.upload(id, 'sp2d', 'konsultan');
					await fileHonor.upload(id, 'sp2d', 'honor');
					snack.info('Berhasil menambah data baru');
				} catch (err) {
					snack.info('Terjadi kesalahan (file upload).');
					console.log(err);
				}
			} else snack.info('Terjadi kesalahan (data assign).');

			year = '';
			modal.close();
		}}
	/>
</Modal>
