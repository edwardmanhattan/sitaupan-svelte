<script>
	// @ts-nocheck

	import Row from '$lib/table/row.svelte';
	import Kop2 from '$lib/kop2.svelte';
	import Icon from '@iconify/svelte';
	import { exportToPDF } from '$lib/js/download.js';
	import { formatFullDate } from '$lib/js/datetime';
	import { angkaTerbilang } from '$lib/js/angkaTerbilang';
	import { rupiah } from '$lib/js/currency';
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
			<h1>Surat Bukti</h1>
		</div>
		<button
			on:click={async () => {
				printWaiting = true;
				const link = window.location.href;
				await exportToPDF(link, 'Surat Bukti');
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
			<div class="flex bg-white h-max font-times" id="printTarget">
				<Kop2 />

				<div class="px-4 py-6 grow">
					<div class="text-[12pt] font-semibold underline">UNTUK DINAS</div>
					<div class="text-[14pt] font-semibold underline text-center">SURAT BUKTI</div>
					<br />

					<Row number="none" title="Kode Rekening">
						<div>{form.kode_rekening_sub_kegiatan}</div>
					</Row>

					<Row number="none" title="Nomor Dibukukan" />

					<Row number="none" title="Program">
						<div>{form.program}</div>
					</Row>

					<Row number="none" title="Kegiatan">
						<div>{form.kegiatan}</div>
					</Row>

					<Row number="none" title="Sub Kegiatan">
						<div>{form.sub_kegiatan}</div>
					</Row>

					<Row number="none" title="Sudah Terima Dari">
						<div>{form.sudah_terima}</div>
					</Row>

					<Row number="none" title="Uang Sebesar">
						<div class="w-full p-2 -skew-x-[20deg] text-center border border-black">
							{rupiah(form.nilai)}
						</div>
					</Row>

					<Row number="none" title="Untuk Pembayaran">
						<div>{form.sub_kegiatan}</div>
					</Row>

					<Row number="none" title="">
						<div>
							{form.catatan}
						</div>
					</Row>

					<!--  -->

					<div class="flex items-center justify-between text-sm">
						<div class="self-end grow">
							<div class="w-full h-1 border-y border-y-black" />
							<div class="flex items-center justify-around my-2">
								<div>Terbilang</div>
								<div class="w-fit p-1 px-3 -skew-x-[20deg] text-center border border-black">
									{angkaTerbilang(form.nilai)} rupiah
								</div>
							</div>
							<div class="w-full h-1 border-y border-y-black" />
						</div>

						<div class="grow signature">
							<div>Tanjung Redeb, {formatFullDate()}</div>

							<div>
								<div class="uppercase">{form.nama_penjabat_1}</div>
								<div>{form.nip_penjabat_1}</div>
							</div>
						</div>
					</div>

					<div class="spacer" />
					<div class="spacer" />
					<div class="spacer" />

					<!--  -->

					<div class="grid grid-cols-3 text-sm">
						<div class="p-2 border border-black signature border-e-0">
							<div>
								<div>Mengetahui / Menyetujui</div>
								<div>Kuasa Penggunaan Anggaran</div>
							</div>

							<div>
								<div class="uppercase">{form.nama_penjabat_2}</div>
								<div>{form.nip_penjabat_2}</div>
							</div>
						</div>

						<div class="p-2 border border-black signature border-e-0">
							<div>Pejabat Pelaksana Teknis Kegiatan</div>

							<div>
								<div class="uppercase">{form.nama_penjabat_3}</div>
								<div>{form.nip_penjabat_3}</div>
							</div>
						</div>

						<div class="p-2 border border-black signature">
							<div>
								<div>Bendahara Pengeluaran Pembantu</div>
								<div>Dibayar Tanggal {formatFullDate(form.tanggal_ttd)}</div>
							</div>

							<div>
								<div class="uppercase">{form.nama_penjabat_4}</div>
								<div>{form.nip_penjabat_4}</div>
							</div>
						</div>
					</div>

					<!--  -->
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
