<script>
	// @ts-nocheck

	import Row from '$lib/table/row.svelte';
	import Select from '$lib/form/select.svelte';
	import Icon from '@iconify/svelte';
	import { fiero } from '$lib/js/fiero.js';
	import { snack } from '$lib/js/vanilla.js';
	import { redirect } from '@sveltejs/kit';
	export let data;
	let { form, bidang, operator, kegiatan } = data;
</script>

<Row number="1" title="Uraian Sub Kegiatan">
	<input type="text" bind:value={form.nama_kegiatan} />
</Row>

<Row number="2" title="Bidang">
	<Select bind:key={form.bidang} data={bidang} config={{ key: 'id', title: 'nama_bidang' }} />
</Row>

<Row number="3" title="Kuasa Pengguna Anggaran (KPA)">
	<svelte:fragment>
		<Select bind:key={form.kpa} data={operator} config={{ key: 'nip', title: 'nama' }} />
		<span class="mx-auto w-fit">/</span>
		<input type="text" bind:value={form.kpa} disabled class="disabled" />
	</svelte:fragment>
</Row>

<Row number="4" title="Pejabat Pelaksana Teknis Kegiatan (PPTK)">
	<button
		on:click={() => {
			form.pptk = [
				...form.pptk,
				{
					nama: '',
					nip: ''
				}
			];
		}}
		class="ml-auto w-fit"
	>
		<Icon icon="bi:plus" />
		Tambah
	</button>
</Row>

<table>
	<thead>
		<tr>
			<th>No</th>
			<th>Nama</th>
			<th>NIP</th>
			<th>Aksi</th>
		</tr>
	</thead>
	<tbody>
		{#each form.pptk as x, i (i)}
			<tr>
				<td>{i + 1}</td>
				<td>
					<Select bind:key={x.nip} data={operator} config={{ key: 'nip', title: 'nama' }} />
				</td>
				<td>
					<input type="text" disabled class="disabled" bind:value={x.nip} />
				</td>
				<td>
					<button
						on:click={() => {
							form.pptk = form.pptk.filter((_, idx) => idx !== i);
						}}
						class="bg-red-600"
					>
						<Icon icon="bi:trash" />
					</button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
<br />

<Row number="5" title="Bendahara Pengeluaran Pembantu">
	<svelte:fragment>
		<Select
			bind:key={form.bendahara_pengeluaran_pembantu}
			data={operator}
			config={{ key: 'nip', title: 'nama' }}
		/>
		<span class="mx-auto w-fit">/</span>
		<input type="text" bind:value={form.bendahara_pengeluaran_pembantu} disabled class="disabled" />
	</svelte:fragment>
</Row>

<Row number="6" title="Staf Pengelola">
	<svelte:fragment>
		<Select bind:key={form.staf_pengelola} data={operator} config={{ key: 'nip', title: 'nama' }} />
		<span class="mx-auto w-fit">/</span>
		<input type="text" bind:value={form.staf_pengelola} disabled class="disabled" />
	</svelte:fragment>
</Row>

<Row number="7" title="Operator SIPD">
	<svelte:fragment>
		<Select bind:key={form.operator_sipd} data={operator} config={{ key: 'nip', title: 'nama' }} />
		<span class="mx-auto w-fit">/</span>
		<input type="text" bind:value={form.operator_sipd} disabled class="disabled" />
	</svelte:fragment>
</Row>

<Row number="8" title="Pejabat Pembuat Komitmen (PPK)">
	<button
		on:click={() => {
			form.ppk = [
				...form.ppk,
				{
					nama: '',
					nip: ''
				}
			];
		}}
		class="ml-auto w-fit"
	>
		<Icon icon="bi:plus" />
		Tambah
	</button>
</Row>

<table>
	<thead>
		<tr>
			<th>No</th>
			<th>Nama</th>
			<th>NIP</th>
			<th>Aksi</th>
		</tr>
	</thead>
	<tbody>
		{#each form.ppk as x, i (i)}
			<tr>
				<td>{i + 1}</td>
				<td>
					<Select bind:key={x.nip} data={operator} config={{ key: 'nip', title: 'nama' }} />
				</td>
				<td>
					<input type="text" disabled class="disabled" bind:value={x.nip} />
				</td>
				<td>
					<button
						on:click={() => {
							form.ppk = form.ppk.filter((_, idx) => idx !== i);
						}}
						class="bg-red-600"
					>
						<Icon icon="bi:trash" />
					</button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
<br />

<Row number="9" title="Kegiatan yang Ditugasi">
	<button
		on:click={() => {
			form.kegiatan = [
				...form.kegiatan,
				{
					nama: '',
					nip: ''
				}
			];
		}}
		class="ml-auto w-fit"
	>
		<Icon icon="bi:plus" />
		Tambah
	</button>
</Row>

<table>
	<thead>
		<tr>
			<th>No</th>
			<th>Kode Rekening</th>
			<th>Uraian Rincian Sub Kegiatan</th>
			<th>Aksi</th>
		</tr>
	</thead>
	<tbody>
		{#each form.kegiatan as x, i (i)}
			<tr>
				<td>{i + 1}</td>
				<td>
					<select bind:value={x.kode_rekening}>
						<!-- {#each kegiatan as keg}
							<option value={keg.kode_rekening}>{keg.nama}</option>
						{/each} -->
						<option value="7.4.1.1.1">7.4.1.1.1</option>
					</select>
				</td>
				<td>
					<input type="text" disabled class="disabled" value="Pembangunan Gorong-Gorong" />
				</td>
				<td>
					<button
						on:click={() => {
							form.kegiatan = form.kegiatan.filter((_, idx) => idx !== i);
						}}
						class="bg-red-600"
					>
						<Icon icon="bi:trash" />
					</button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
<br />

<br />
<button
	on:click={async () => {
		const res = await fiero(`/operator/createTimKegiatan`, 'POST', form);
		if (res.status === 200) {
			snack.info('Berhasil membuat Tim Kegiatan baru.');
			throw redirect(302, '../');
		}
	}}
>
	Simpan
</button>
