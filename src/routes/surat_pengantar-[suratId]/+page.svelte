<script>
	// @ts-nocheck

	import { formatFullDate } from '$lib/js/datetime';
	import Row from '$lib/table/row.svelte';
	import Kop from '$lib/kop.svelte';
	import { rupiah, terbilang } from '$lib/js/currency';
	export let data;

	const id = data.kontrakId;
	const form = data.data;
</script>

<div class="h-screen px-24 py-12 overflow-auto">
	<div class="w-[21cm] px-[2cm] pb-[2.54cm] border border-black">
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

		<div class="flex justify-end items-center">
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
