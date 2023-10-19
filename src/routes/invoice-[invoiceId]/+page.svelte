<script>
	// @ts-nocheck

	import { formatFullDate } from '$lib/js/datetime';
	import Row from '$lib/table/row.svelte';
	import Kop2 from '$lib/kop2.svelte';
	import Icon from '@iconify/svelte';
	import { config, fiero } from '$lib/js/fiero.js';
	import { exportToPDF } from '$lib/js/download.js';
	import { angkaTerbilang } from '$lib/js/angkaTerbilang';
	import { rupiah } from '$lib/js/currency';
	import Select from '$lib/form/select.svelte';
	import Back from '$lib/shortcut/back.svelte';
	export let data;

	const form = data.data;
	console.log(data);

	let printWaiting = false;
</script>

<div class="flex flex-col h-screen overflow-auto">
	<div class="flex items-center justify-between p-2 text-teal-800 shrink-0 bg-blue-2">
		<div class="flex items-center gap-4">
			<Back />
			<h1>Nota Tagihan</h1>
		</div>
		<button
			on:click={async () => {
				printWaiting = true;
				const link = window.location.href;
				await exportToPDF(link, 'Nota Tagihan');
				printWaiting = false;
			}}
			class:pointer-events-none={printWaiting}
			class="w-36"
		>
			<Icon icon="bi:printer" />
			{printWaiting ? 'Processing...' : 'Print'}
		</button>
	</div>

	<div class="flex justify-center p-6 overflow-auto grow">
		<div class="border border-black w-fit h-max">
			<div class="p-6 bg-white h-max font-times printTarget" id="printTarget">
				<h1>INVOICE</h1>
				<br />

				<div class="flex gap-2">
					<div class="w-32">ID Nota</div>
					<span>:</span>
					<div>{form.id_nota}</div>
				</div>

				<div class="flex gap-2">
					<div class="w-32">Tanggal</div>
					<span>:</span>
					<div>{formatFullDate(form.tanggal_nota)}</div>
				</div>

				<div class="flex gap-2">
					<div class="w-32">Nama Toko</div>
					<span>:</span>
					<div>{form.nama_toko}</div>
				</div>

				<div class="flex gap-2">
					<div class="w-32">Rincian Data</div>
					<span>:</span>
					<div>{form.rincian_data}</div>
				</div>

				<div>Detail Pembelian</div>
				<br />

				<table>
					<thead>
						<tr>
							<th>No</th>
							<th>Uraian</th>
							<th>Harga</th>
							<th>Jumlah Barang</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						{#each form.detail_pembelian ?? [] as d, i}
							<tr>
								<td>{i + 1}</td>
								<td>{d.uraian}</td>
								<td>{rupiah(d.harga)}</td>
								<td>{d.jumlah_barang}</td>
								<td>{rupiah(d.total)}</td>
							</tr>
						{:else}
							<tr>
								<td colspan="5">tidak ada data</td>
							</tr>
						{/each}
						<tr>
							<td colspan="3" style="border:none" />
							<td class="font-semibold">Total</td>
							<td class="font-semibold">{rupiah(form.total)}</td>
						</tr>
					</tbody>
				</table>
				<br />

				<div class="flex items-center justify-evenly">
					<div>Tanda Terima</div>
					<div>Hormat Kami</div>
				</div>

				<br />
				<br />
				<br />
				<br />
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	@tailwind components;
	@layer components {
		.font-times {
			font-family: 'Times New Roman', Times, serif;
		}

		* {
			@apply leading-5;
		}

		h1,
		h2 {
			@apply text-[12.5pt] text-center leading-6;
		}

		p {
			@apply text-[12pt] text-justify leading-5;
		}

		table,
		th,
		td {
			@apply text-center p-1 text-base border-black;
		}

		br {
			@apply text-[12pt];
		}

		.spacer {
			@apply h-4;
		}

		.signature {
			@apply h-28;
		}
	}
</style>
