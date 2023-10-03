<script>
	// @ts-nocheck

	import { formatFullDate } from '$lib/js/datetime';
	import { rupiah, terbilang } from '$lib/js/currency';
	import jsPDF from 'jspdf';
	import Row from '$lib/table/row.svelte';
	import Kop from '$lib/kop.svelte';
	import Icon from '@iconify/svelte';
	export let data;

	const id = data.kontrakId;
	const form = data.data;

	const doc = new jsPDF({
		unit: 'pt'
	});
	let pdf;
</script>

<div class="flex flex-col h-screen overflow-auto">
	<div class="flex items-center justify-between p-2 text-white shrink-0 bg-slate-400">
		<h1>Surat Pengantar</h1>
		<button
			on:click={() => {
				doc.html(pdf, {
					callback: function (doc) {
						doc.save(`Surat Pengantar ${formatFullDate()}`);
					},
					x: 0,
					y: 0,
					html2canvas: { scale: 0.75 }
				});
			}}
			class="w-36"
		>
			<Icon icon="basil:printer-outline" />
			Print
		</button>
	</div>
	<div class="flex justify-center p-6 overflow-auto grow">
		<div class="w-[21cm] h-max px-[2cm] pb-[2.54cm] border border-black text-sm" bind:this={pdf}>
			<Kop />

			<div>Kepada :</div>
			<div>Yth. Kepala BPKAD</div>
			<div>Kabupaten Berau</div>
			<div>Cq. Bidang Perbendaharaan</div>
			<div>Di Tanjung Redeb</div>

			<br />

			<div class="text-center">
				<h1>SURAT PENGANTAR</h1>
				<h2>Nomor: 900/{form.nomor_surat_pengantar}/DPUPR-KAB.KEU/VII/2023</h2>
				<br />

				<table>
					<thead>
						<tr>
							<th>NO</th>
							<th>JENIS YANG DIKIRIM</th>
							<th>BANYAKNYA</th>
							<th>KETERANGAN</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>
								<div class="text-left">
									<div>Penyampaian Berkas</div>
									<ol class="ps-2">
										<li>1. Tahap: {form.tahap}</li>
										<li>2. Pekerjaan: {form.uraian_pekerjaan}</li>
										<li>3. Penyedia Jasa: {form.penyedia_jasa}</li>
										<li>4. No. SPM : {form.nomor_spm}</li>
									</ol>
									<ul>
										<li>Surat Pernyataan Tanggung Jawab Mutlak SPM-LS</li>
										<li>Surat Perintah Membayar (SPM)</li>
										<li>
											Surat Pernyataan Verifikasi Kelengkapan dan Keabsahan Dokumen dan Lampiran
											SPP-LS
										</li>
										<li>Kwitansi</li>
										<li>Resume Kontrak</li>
										<li>Ed-Billing</li>
										<li>KIB</li>
										<li>Rekening Koran</li>
									</ul>
								</div>
							</td>
							<td> 1 (Satu) Berkas </td>
							<td>
								Dikirim dengan Hormat untuk diketahui dan dipergunakan sebagaimana mestinya, terima
								kasih
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<br />
			<br />

			<div class="flex items-center justify-end">
				<div class="text-center">
					<div>Tanjung Redeb, {formatFullDate()}</div>
					<div>PPK SKPD</div>

					<br />
					<br />
					<br />

					<div>MISRIANI, SE</div>
					<div>NIP xxx</div>
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
			@apply font-times;
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
			@apply text-center p-1;
		}

		br {
			@apply text-[12pt];
		}

		.spacer {
			@apply h-4;
		}
	}
</style>
