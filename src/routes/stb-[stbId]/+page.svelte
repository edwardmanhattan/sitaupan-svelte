<script>
	// @ts-nocheck

	import { formatFullDate } from '$lib/js/datetime';
	import Row from '$lib/table/row.svelte';
	import Kop from '$lib/kop.svelte';
	import { rupiah, terbilang } from '$lib/js/currency';
	export let data;

	console.log(data);

	const form = data.data;
</script>

<div class="h-screen px-24 py-12 overflow-auto">
	<div class="border border-black">
		<h1 class="text-center font-semibold underline">SERAH TERIMA BERKAS</h1>
		<br />

		<div class="flex items-center gap-4">
			<div class="w-32">Bidang</div>
			<div>:</div>
			<div />
		</div>

		<div class="flex items-center gap-4">
			<div class="w-32">Staf Pengelola</div>
			<div>:</div>
			<div />
		</div>
		<br />

		<table>
			<thead>
				<tr>
					<th>No</th>
					<th>Tanggal</th>
					<th>Bidang</th>
					<th>No. SPM</th>
					<th>Uraian Pekerjaan</th>
					<th>Nilai</th>
					<th>Penyedia Jasa</th>
					<th>Keterangan</th>
				</tr>
			</thead>
			<tbody>
				{#each form.formulir as form, i}
					<tr>
						<td>{i + 1}</td>
						<td>{form.tanggal}</td>
						<td>{form.bidang}</td>
						<td>{form.nomor_spm}</td>
						<td>{form.uraian_pekerjaan}</td>
						<td>{rupiah(form.nilai)}</td>
						<td>{form.penyedia_jasa}</td>
						<td>{form.keterangan}</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<br />
		<br />

		<div class="flex items-center justify-evenly">
			<div class="text-center">
				<div>Yang Menerima</div>
				<div>Staf Pengelola</div>

				<br />
				<br />
				<br />

				<div>....</div>
			</div>

			<div class="text-center">
				<div>Yang Menyerahkan</div>
				<div>Sub Bagian Keuangan & Aset</div>

				<br />
				<br />
				<br />

				<div>....</div>
			</div>
		</div>
	</div>
</div>
