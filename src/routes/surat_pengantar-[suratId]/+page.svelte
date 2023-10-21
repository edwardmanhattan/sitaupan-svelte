<script>
	// @ts-nocheck

	import { formatFullDate } from '$lib/js/datetime';
	import { exportToPDF } from '$lib/js/download.js';
	import Kop3 from '$lib/kop3.svelte';
	import Back from '$lib/shortcut/back.svelte';
	import Icon from '@iconify/svelte';
	export let data;

	const id = data.kontrakId;
	const form = data.data;

	let printWaiting = false;
</script>

<div class="flex flex-col h-screen overflow-auto">
	<div class="flex items-center justify-between p-2 text-teal-800 shrink-0 bg-blue-2">
		<div class="flex items-center gap-4">
			<Back />
			<h1>Surat Pengantar</h1>
		</div>
		<button
			on:click={async () => {
				printWaiting = true;
				const link = window.location.href;
				await exportToPDF(link, 'Surat Pengantar');
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
			<div
				class="w-[21cm] h-max px-[2cm] pb-[2.54cm] pt-[1cm] font-times bg-white text-sm"
				id="printTarget"
			>
				<Kop3 />

				<div class="flex justify-end">
					<div class="w-4/12">
						<div>Kepada :</div>
						<div>Yth. Kepala BPKAD</div>
						<div>Kabupaten Berau</div>
						<div>Cq. Bidang Perbendaharaan</div>
						<div>Di Tanjung Redeb</div>
					</div>
				</div>

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
								<td class="no">1</td>
								<td>
									<div class="text-left">
										<div>Penyampaian Berkas</div>
										<ol class="ps-8">
											<li class="list-decimal">Tahap: {form.tahap}</li>
											<li class="list-decimal">Pekerjaan: {form.uraian_pekerjaan}</li>
											<li class="list-decimal">Penyedia Jasa: {form.penyedia_jasa}</li>
											<li class="list-decimal">No. SPM : {form.nomor_spm}</li>
										</ol>
										<ul class="ps-4">
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
									Dikirim dengan Hormat untuk diketahui dan dipergunakan sebagaimana mestinya,
									terima kasih
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<br />
				<br />

				<div class="flex items-center justify-end">
					<div class="signature">
						<div>
							<div>Tanjung Redeb, {formatFullDate()}</div>
							<div>PPK SKPD</div>
						</div>

						<div>
							<div class="uppercase">{form.nama_penjabat}</div>
							<div>NIP. {form.id_penjabat}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	ul > li {
		list-style-type: '\2013 ';
	}

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
			@apply text-left align-top p-1 border border-black;
		}

		th,
		.no {
			@apply text-center;
		}

		br {
			@apply text-[12pt];
		}

		.spacer {
			@apply h-4;
		}
	}
</style>
