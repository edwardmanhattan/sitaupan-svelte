<script>
	// @ts-nocheck

	import { formatFullDate } from '$lib/js/datetime';
	import Row from '$lib/table/row.svelte';
	import Kop2 from '$lib/kop2.svelte';
	import Icon from '@iconify/svelte';
	import { config } from '$lib/js/fiero.js';
	export let data;

	const id = data.kontrakId;
	const form = data.data;

	async function print() {
		const link = config.online + '/surat_bukti-ab7ac714-4ed4-4697-97dc-f4fd9692f464';
		try {
			const response = await fetch(`/api/pdf?link=${link}`, {
				method: 'POST',
				headers: { Accept: 'application/json' }
			});

			const json = await response.json();

			const download = document.createElement('a');
			download.href = `data:application/pdf;base64,${json.pdf}`;
			download.download = 'Puppeteer PDF.pdf';
			download.click();
		} catch (err) {
			console.log(err);
		}
	}
</script>

<svelte:head>
	<script
		src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"
	></script>
</svelte:head>

<div class="flex flex-col h-screen overflow-auto">
	<div class="flex items-center justify-between p-2 text-white shrink-0 bg-slate-400">
		<h1>Surat Bukti (BETA)</h1>
		<button on:click={print} class="w-36">
			<Icon icon="basil:printer-outline" />
			Print
		</button>
	</div>
	<div class="flex justify-center p-6 overflow-auto border border-black grow">
		<div class="flex bg-white h-max" id="printTarget">
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
						{form.nilai}
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
							<div class="w-32 p-1 -skew-x-[20deg] text-center border border-black">
								{form.nilai}
							</div>
						</div>
						<div class="w-full h-1 border-y border-y-black" />
					</div>

					<div class="text-center grow">
						<div>Tanjung Redeb, {formatFullDate()}</div>

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

				<div class="flex justify-between text-sm text-center">
					<div class="p-2 border border-black border-e-0">
						<div>Mengetahui / Menyetujui</div>
						<div>Kuasa Penggunaan Anggaran</div>
						<div class="spacer" />
						<div class="spacer" />
						<div class="spacer" />
						<div>Junaidi, S.T, M.T</div>
						<div>NIP</div>
					</div>

					<div class="p-2 border border-black border-e-0">
						<div>Pejabat Pelaksana Teknis Kegiatan</div>

						<div class="spacer" />
						<div class="spacer" />
						<div class="spacer" />
						<div class="spacer" />

						<div>Bambang Edy Maryono, SE, M.A.P</div>
						<div>NIP</div>
					</div>

					<div class="p-2 border border-black">
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
