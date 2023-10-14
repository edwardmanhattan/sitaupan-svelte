<script>
	// @ts-nocheck

	import { formatFullDate } from '$lib/js/datetime';
	import Row from '$lib/table/row.svelte';
	import Kop2 from '$lib/kop2.svelte';
	import Icon from '@iconify/svelte';
	import { config } from '$lib/js/fiero.js';
	import { exportToPDF } from '$lib/js/download.js';
	import { angkaTerbilang } from '$lib/js/angkaTerbilang';
	import { rupiah } from '$lib/js/currency';
	export let data;

	const form = data.data;

	let printWaiting = false;
</script>

<div class="flex flex-col h-screen overflow-auto">
	<div class="flex items-center justify-between p-2 text-white shrink-0 bg-blue-2">
		<h1>Serah Terima Berkas</h1>
		<button
			on:click={async () => {
				printWaiting = true;
				const link = window.location.href;
				await exportToPDF(link, 'Serah Terima Berkas');
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
			<div class="p-6 bg-white h-max font-times" id="printTarget">
				<h1 class="font-semibold text-center underline">SERAH TERIMA BERKAS</h1>
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
								<td>{formatFullDate(form.tanggal)}</td>
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
					<div class="signature">
						<div>
							<div>Yang Menerima</div>
							<div>Staf Pengelola</div>
						</div>

						<div>....</div>
					</div>

					<div class="signature">
						<div>
							<div>Yang Menyerahkan</div>
							<div>Sub Bagian Keuangan & Aset</div>
						</div>

						<div>....</div>
					</div>
				</div>
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
	}
</style>
