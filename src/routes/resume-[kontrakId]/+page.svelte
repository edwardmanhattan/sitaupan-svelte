<script>
	// @ts-nocheck

	import { rupiah } from '$lib/js/currency';
	import { formatFullDate } from '$lib/js/datetime';
	import Row from '$lib/table/row.svelte';
	import Kop from '$lib/kop.svelte';
	import Icon from '@iconify/svelte';
	import { exportToPDF } from '$lib/js/download.js';
	import { angkaTerbilang } from '$lib/js/angkaTerbilang.js';
	import Back from '$lib/shortcut/back.svelte';
	export let data;

	const id = data.kontrakId;
	const form = data.data;
	let printWaiting = false;
</script>

<div class="flex flex-col h-screen overflow-auto">
	<div class="flex items-center justify-between p-2 text-teal-800 shrink-0 bg-blue-2">
		<div class="flex items-center gap-4">
			<Back />
			<h1>Resume / Kontrak Fisik</h1>
		</div>
		<button
			on:click={async () => {
				printWaiting = true;
				const link = window.location.href;
				await exportToPDF(link, 'Resume');
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
				class="w-[21cm] h-max px-[2cm] pb-[2.54cm] pt-[1cm] font-times bg-white"
				id="printTarget"
			>
				<Kop />

				<h1 class="my-4 text-center">RESUME SPK / KONTRAK FISIK</h1>
				<div>
					<Row number="1" title="Nomor DPA-SKPD / DPPA-SKPD / DPA.L-SKPD">
						<div>{form.nomor_dpa}</div>
					</Row>

					<Row number="" title="Tanggal DPA-SKPD / DPPA-SKPD / DPA.L-SKPD">
						<div>{formatFullDate(form.tanggal_dpa)}</div>
					</Row>

					<Row number="2" title="Kode Program Keg. Sub Keg. dan Rekening">
						<div>{form.kode_program_keg_sub} / {form.kode_rekening_rincian}</div>
					</Row>

					<Row number="3" title="Nomor dan Tanggal SPK / Kontrak">
						<div>{form.nomor_spk}</div>
					</Row>

					<Row number="" title="Tanggal DPA-SKPD / DPPA-SKPD / DPA.L-SKPD">
						<div>{formatFullDate(form.tanggal_spk)}</div>
					</Row>

					<Row number="4" title="Nilai SPK / Kontrak">
						<div>{rupiah(form.nilai_spk)}</div>
					</Row>

					<Row number="" title="Nilai HPS">
						<div>{rupiah(form.nilai_hps)}</div>
					</Row>

					<Row number="5" title="Nama Perusahaan">
						<div>{form.nama_perusahaan}</div>
					</Row>

					<Row number="6" title="Nama dan Jabatan">
						<div>{form.nama_penjabat} / {form.jabatan}</div>
					</Row>

					<Row number="7" title="Alamat Perusahaan">
						<div>{form.alamat_perusahaan}</div>
					</Row>

					<Row number="8" title="Pekerjaan">
						<div>{form.pekerjaan}</div>
					</Row>

					<Row number="9" title="Cara Pembayaran">
						<div>{form.cara_pembayaran}</div>
					</Row>

					<Row number="" title="a. Fisik / Prosentase Pekerjaan">
						<div>{form.fisik_persentase_pekerjaan}</div>
					</Row>

					<Row number="" title="b. Jumlah yang Diminta">
						<div>{rupiah(form.jumlah_diminta)}</div>
					</Row>

					<Row number="" title="Terbilang">
						<div>{angkaTerbilang(form.jumlah_diminta)} Rupiah</div>
					</Row>

					<Row number="" title="c. Nama Bank dan No. Rekening">
						<div>{form.nama_bank} / {form.nomor_rekening}</div>
					</Row>

					<Row number="10" title="Jangka Waktu Pelaksanaan">
						<div>
							{form.jangka_waktu_pelaksanaan} ({angkaTerbilang(form.jangka_waktu_pelaksanaan)})
						</div>
					</Row>

					<Row number="11" title="Tanggal Penyelesaian Pekerjaan / Kontrak">
						<div>{formatFullDate(form.tanggal_penyelesaian)}</div>
					</Row>

					<Row number="12" title="Jangka Waktu Pemeliharaan">
						<div>
							{form.jangka_waktu_pemeliharaan} ({angkaTerbilang(form.jangka_waktu_pemeliharaan)})
						</div>
					</Row>

					<Row number="13" title="Nomor dan Tanggal Addendum">
						<div>{form.nomor_addendum} / {formatFullDate(form.tanggal_addendum)}</div>
					</Row>

					<Row number="14" title="Nilai Kontrak Addendum">
						<div>{rupiah(form.nilai_addendum)}</div>
					</Row>

					<Row number="15" title="Jangka Waktu Pelaksanaan Addendum">
						<div>
							{form.jangka_pelaksanaan_addendum} ({angkaTerbilang(
								form.jangka_pelaksanaan_addendum
							)})
						</div>
					</Row>

					<Row number="16" title="Tanggal Penyelesaian Addendum">
						<div>{formatFullDate(form.tanggal_penyelesaian_addendum)}</div>
					</Row>

					<Row number="17" title="Jangka Waktu Pemeliharaan Addendum">
						<div>
							{form.jangka_pemeliharaan_addendum} ({angkaTerbilang(
								form.jangka_pemeliharaan_addendum
							)})
						</div>
					</Row>

					<Row number="" title="">
						<div class="text-justify">
							Terhadap setiap dari keterlambatan pelaksanaan/ penyelesaian pekerjaan Penyedia akan
							dikenakan Denda Keterlambatan sebesar 1/1000 (satu per seribu) dari bagian tertentu
							dari Nilai Kontrak sisa pekerjaan yang belum dikerjakan (sebelum PPN sesuai dengan
							Syarat-syarat Umum Kontrak)
						</div>
					</Row>

					<Row number="18" title="Nomor BA Pemeriksaan Kemajuan Pekerjaan">
						<div>{form.no_ba_pemeriksaan}</div>
					</Row>

					<Row number="" title="Tanggal BA Pemeriksaan Kemajuan Pekerjaan">
						<div>{formatFullDate(form.tgl_ba_pemeriksaan)}</div>
					</Row>

					<Row number="22" title="Nomor Berita Acara Pembayaran">
						<div>{form.no_ba_pembayaran}</div>
					</Row>

					<Row number="" title="Tanggal Berita Acara Pembayaran">
						<div>{formatFullDate(form.tgl_ba_pembayaran)}</div>
					</Row>

					<Row number="23" title="Lampiran Perincian Total Pengeluaran" />

					<br />

					<div class="ml-auto text-center w-36">
						<div class="signature">
							<div>
								<div>Tanjung Redeb, {formatFullDate()}</div>
								<div>Pejabat Pembuat Komitmen,</div>
							</div>
							<div>
								<div class="font-semibold underline">{form.nama_penjabat}</div>
								<div>{form.nip_penjabat}</div>
							</div>
						</div>
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

		p {
			@apply text-[11pt] leading-4;
		}
	}
</style>
