<script>
	// @ts-nocheck

	import Row from '$lib/table/row.svelte';
	import Select from '$lib/form/select.svelte';
	import Icon from '@iconify/svelte';
	import { fiero } from '$lib/js/fiero.js';
	import { snack } from '$lib/js/vanilla.js';
	import { redirect } from '@sveltejs/kit';
	import Back from '$lib/shortcut/back.svelte';
	export let data;
	let { form, bidang, operator, kegiatan, tim } = data;

	let pptkPresent = tim.pptk?.id !== 0;
</script>

<div class="flex my-3">
	<Back />
</div>

<Row number="1" title="Uraian Sub Kegiatan">
	<!-- <input type="text" bind:value={form.nama_kegiatan} /> -->
	{tim.nama_tim}
</Row>

<Row number="2" title="Bidang">
	<!-- <Select bind:key={form.bidang} data={bidang} config={{ key: 'id', title: 'nama_bidang' }} /> -->
	{tim.bidang}
</Row>

<Row number="3" title="PA">
	<svelte:fragment>
		<!-- <Select bind:key={form.operator_sipd} data={operator} config={{ key: 'nip', title: 'nama' }} /> -->
		{tim.pa.nama}
		<span>/</span>
		{tim.pa.nip}
		<!-- <input type="text" bind:value={form.operator_sipd} disabled class="disabled" /> -->
	</svelte:fragment>
</Row>

<Row number="4" title="Kuasa Pengguna Anggaran (KPA)">
	<svelte:fragment>
		<!-- <Select bind:key={form.kpa} data={operator} config={{ key: 'nip', title: 'nama' }} /> -->
		{tim.kpa.nama}
		<span class="">/</span>
		<!-- <input type="text" bind:value={form.kpa} disabled class="disabled" /> -->
		{tim.kpa.nip}
	</svelte:fragment>
</Row>

<Row number="5" title="Pejabat Pelaksana Teknis Kegiatan (PPTK)">
	{#if pptkPresent}
		{tim.pptk.nama} <span class="w-32 text-center">/</span> {tim.pptk.nip}
	{:else}
		<div class="flex items-center gap-2">
			{#await fiero(`/operator/getAllUserOperator`) then data}
				<Select bind:key={tim.pptk} {data} config={{ key: 'id', title: 'nama', title2: 'nip' }} />
			{/await}
			<button> Perbarui PPTK </button>
		</div>
	{/if}
</Row>

<br />

<Row number="6" title="Bendahara Pengeluaran Pembantu">
	<svelte:fragment>
		<!-- <Select
			bind:key={form.bendahara_pengeluaran_pembantu}
			data={operator}
			config={{ key: 'nip', title: 'nama' }}
		/> -->
		{tim.bendahara_pengeluaran_pembantu.nama}
		<span>/</span>
		{tim.bendahara_pengeluaran_pembantu.nip}
		<!-- <input type="text" bind:value={form.bendahara_pengeluaran_pembantu} disabled class="disabled" /> -->
	</svelte:fragment>
</Row>

<Row number="7" title="Staf Pengelola" />
<table>
	<thead>
		<tr>
			<th>No</th>
			<th>Nama</th>
			<th>NIP</th>
		</tr>
	</thead>
	<tbody>
		{#each tim.staf_pengelola ?? [] as staf, i}
			<tr>
				<td class="text-center">{i + 1}</td>
				<td>{staf.nama}</td>
				<td>{staf.nip}</td>
			</tr>
		{/each}
	</tbody>
</table>
<br />

<Row number="8" title="Operator SIPD">
	<svelte:fragment>
		<!-- <Select bind:key={form.operator_sipd} data={operator} config={{ key: 'nip', title: 'nama' }} /> -->
		{tim.operator_sipd.nama}
		<span>/</span>
		{tim.operator_sipd.nip}
		<!-- <input type="text" bind:value={form.operator_sipd} disabled class="disabled" /> -->
	</svelte:fragment>
</Row>

<Row number="9" title="Pejabat Pembuat Komitmen (PPK)" />

<table>
	<thead>
		<tr>
			<th>No</th>
			<th>Nama</th>
			<th>NIP</th>
		</tr>
	</thead>
	<tbody>
		{#each tim.ppk ?? [] as ppk, i}
			<tr>
				<td class="text-center">{i + 1}</td>
				<td>{ppk.nama}</td>
				<td>{ppk.nip}</td>
			</tr>
		{/each}
	</tbody>
</table>
<br />

<Row number="10" title="Kegiatan yang Ditugasi" />

<table>
	<thead>
		<tr>
			<th>No</th>
			<th>Kode Rekening</th>
			<th>Uraian</th>
		</tr>
	</thead>
	<tbody>
		{#each tim.kegiatan ?? [] as kegiatan, i}
			<tr>
				<td class="text-center">{i + 1}</td>
				<td>{kegiatan.kode_rekening}</td>
				<td>{kegiatan.uraian}</td>
			</tr>
		{/each}
	</tbody>
</table>
<br />

<br />
<br />
