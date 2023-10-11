<script>
	// @ts-nocheck

	import { rupiah, terbilang } from '$lib/js/currency';
	import { formatFullDate } from '$lib/js/datetime';
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

	let kop;
	function rotateKop() {
		const rotationAngle = 270; // 90 degrees in this example

		// Calculate the new dimensions after rotation
		const rect = kop.getBoundingClientRect();
		const newWidth = rect.height; // Swap width and height to adjust for rotation
		const newHeight = rect.width;

		// Apply the rotation and dimensions
		kop.style.transform = `rotate(${rotationAngle}deg)`;
		// kop.style.height = `${newHeight}px`;
		// kop.style.width = `${newWidth}px`;
		kop.style.height = `50px`;
	}
	// setTimeout(() => {
	// 	rotateKop();
	// }, 1000);
</script>

<div class="flex flex-col h-screen overflow-auto">
	<div class="flex items-center justify-between p-2 text-white shrink-0 bg-slate-400">
		<h1>Surat Bukti</h1>
		<button
			on:click={() => {
				doc.html(pdf, {
					callback: function (doc) {
						doc.save(`Surat Bukti ${formatFullDate()}`);
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
		<div class="flex items-center bg-white border border-black h-max" bind:this={pdf}>
			<div class="border [writing-mode:vertical-rl]" bind:this={kop}>
				<Kop />
			</div>

			<div class="border grow">
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

				<div class="flex items-center justify-between text-sm">
					<div>
						Terbilang {terbilang(0)} Rupiah
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

				<div class="flex justify-between gap-4 text-sm text-center">
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

				<br />
				<Row number="" title="Keterangan">
					<div>{form.keterangan}</div>
				</Row>
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
