<script>
	// @ts-nocheck

	import { formatFullDate, indonesianMonths } from '$lib/js/datetime';
	import Icon from '@iconify/svelte';
	import Row from '$lib/table/row.svelte';
	import { fiero } from '$lib/js/fiero';
	import Modal from '$lib/modal/modal.svelte';
	import { snack } from '$lib/js/vanilla.js';
	import Currency from '$lib/form/currency.svelte';
	import Kop from './kop.svelte';
	import { rupiah, terbilang } from '$lib/js/currency';
	let modal;
	export let data;

	const id = data.kontrakId;
	const form = data.data;
</script>

<div class="h-screen px-24 py-12 overflow-auto">
	<Kop />

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
		<div>{terbilang(form.jumlah_diminta)} Rupiah</div>
	</Row>

	<Row number="" title="c. Nama Bank dan No. Rekening">
		<div>{form.nama_bank} / {form.nomor_rekening}</div>
	</Row>

	<Row number="10" title="Jangka Waktu Pelaksanaan">
		<div>{form.jangka_waktu_pelaksanaan} ({terbilang(form.jangka_waktu_pelaksanaan)})</div>
	</Row>

	<Row number="11" title="Tanggal Penyelesaian Pekerjaan / Kontrak">
		<div>{formatFullDate(form.tanggal_penyelesaian)}</div>
	</Row>

	<Row number="12" title="Jangka Waktu Pemeliharaan">
		<div>{form.jangka_waktu_pemeliharaan} ({terbilang(form.jangka_waktu_pemeliharaan)})</div>
	</Row>

	<Row number="13" title="Nomor dan Tanggal Addendum">
		<div>{form.nomor_addendum} / {formatFullDate(form.tanggal_addendum)}</div>
	</Row>

	<Row number="14" title="Nilai Kontrak Addendum">
		<div>{rupiah(form.nilai_addendum)}</div>
	</Row>

	<Row number="15" title="Jangka Waktu Pelaksanaan Addendum">
		<div>{form.jangka_pelaksanaan_addendum} ({terbilang(form.jangka_pelaksanaan_addendum)})</div>
	</Row>

	<Row number="16" title="Tanggal Penyelesaian Addendum">
		<div>{formatFullDate(form.tanggal_penyelesaian_addendum)}</div>
	</Row>

	<Row number="17" title="Jangka Waktu Pemeliharaan Addendum">
		<div>{form.jangka_pemeliharaan_addendum} ({terbilang(form.jangka_pemeliharaan_addendum)})</div>
	</Row>

	<Row number="18" title="">
		<div class="text-justify">
			Terhadap setiap dari keterlambatan pelaksanaan/ penyelesaian pekerjaan Penyedia akan dikenakan
			Denda Keterlambatan sebesar 1/1000 (satu per seribu) dari bagian tertentu dari Nilai Kontrak
			sisa pekerjaan yang belum dikerjakan (sebelum PPN sesuai dengan Syarat-syarat Umum Kontrak)
		</div>
	</Row>

	<Row number="19" title="Nomor BA Pemeriksaan Kemajuan Pekerjaan">
		<div>{form.no_ba_pemeriksaan}</div>
	</Row>

	<Row number="" title="Tanggal BA Pemeriksaan Kemajuan Pekerjaan">
		<div>{formatFullDate(form.tgl_ba_pemeriksaan)}</div>
	</Row>

	<Row number="20" title="Nomor BA Serah Terima I Pekerjaan">
		<div>{form.no_ba_terima1}</div>
	</Row>

	<Row number="" title="Tanggal BA Serah Terima I Pekerjaan">
		<div>{formatFullDate(form.tgl_ba_terima1)}</div>
	</Row>

	<Row number="21" title="Nomor BA Serah Terima II Pekerjaan">
		<div>{form.no_ba_terima2}</div>
	</Row>

	<Row number="" title="Tanggal BA Serah Terima II Pekerjaan">
		<div>{formatFullDate(form.tgl_ba_terima2)}</div>
	</Row>

	<Row number="22" title="Nomor BA Serah Terima Konsultasi">
		<div>{form.no_ba_konsul}</div>
	</Row>

	<Row number="" title="Tanggal BA Serah Terima Konsultasi">
		<div>{formatFullDate(form.tgl_ba_konsul)}</div>
	</Row>

	<Row number="23" title="Nomor Berita Acara Pembayaran">
		<div>{form.no_ba_pembayaran}</div>
	</Row>

	<Row number="" title="Tanggal Berita Acara Pembayaran">
		<div>{formatFullDate(form.tgl_ba_pembayaran)}</div>
	</Row>

	<Row number="24" title="Lampiran Perincian Total Pengeluaran" />
</div>
