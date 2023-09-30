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
	<div class="w-[21cm] px-[2cm] pb-[2.54cm]">
		<Kop />

		<Row number="1" title="Kode Rekening">
			<div>{form.kode_rekening_sub_kegiatan}</div>
		</Row>

		<Row number="2" title="Nomor Dibukukan">
			<div>???</div>
		</Row>

		<Row number="3" title="Program">
			<div>{form.program}</div>
		</Row>

		<Row number="4" title="Kegiatan">
			<div>{form.kegiatan}</div>
		</Row>

		<Row number="5" title="Sub Kegiatan">
			<div>{form.sub_kegiatan}</div>
		</Row>

		<Row number="" title="Catatan Tambahan">
			<div>{form.catatan}</div>
		</Row>

		<Row number="6" title="Sudah Terima Dari">
			<div>{form.sudah_terima}</div>
		</Row>

		<Row number="7" title="Uang Sebesar">
			<div>{form.nilai}</div>
		</Row>

		<Row number="8" title="Untuk Pembayaran">
			<div>{form.sub_kegiatan}</div>
		</Row>

		<Row number="" title="Catatan Tambahan">
			<div>{form.catatan}</div>
		</Row>

		<!--  -->

		<div class="flex items-center justify-between">
			<div>
				Terbilang {terbilang(form.nilai)} Rupiah
			</div>

			<div class="text-center">
				<div>Tanjung Redep, {formatFullDate()}</div>

				<div class="spacer" />
				<div class="spacer" />
				<div class="spacer" />

				<div>AHMAD RIFAI</div>
				<div>Direktur</div>
			</div>
		</div>
		<div class="spacer" />
		<div class="spacer" />
		<div class="spacer" />

		<!--  -->

		<div class="flex justify-between gap-4 text-center">
			<div>
				<div>Mengetahui / Menyetujui</div>
				<div>Kuasa Penggunaan Anggaran</div>
				<div class="spacer" />
				<div class="spacer" />
				<div class="spacer" />
				<div>Junaidi, S.T, M.T</div>
				<div>NIP</div>
			</div>

			<div>
				<div>Pejabat Pelaksana Teknis Kegiatan</div>

				<div class="spacer" />
				<div class="spacer" />
				<div class="spacer" />
				<div class="spacer" />

				<div>Bambang Edy Maryono, SE, M.A.P</div>
				<div>NIP</div>
			</div>

			<div>
				<div>Bendahara Pengeluaran Pembantu</div>
				<div>Dibayar Tanggal 31 Mei 2023</div>
				<div class="spacer" />
				<div class="spacer" />
				<div class="spacer" />
				<div>Tumini Rahayu</div>
				<div>NIP</div>
			</div>
		</div>

		<!--  -->

		<Row number="" title="Keterangan">
			<div>{form.keterangan}</div>
		</Row>
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
