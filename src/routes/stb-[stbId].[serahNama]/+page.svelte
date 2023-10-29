<script>
	// @ts-nocheck

	import { formatFullDate } from '$lib/js/datetime';
	import Icon from '@iconify/svelte';
	import { config, fiero } from '$lib/js/fiero.js';
	import { exportToPDF } from '$lib/js/download.js';
	import { rupiah } from '$lib/js/currency';
	import Select from '$lib/form/select.svelte';
	import Back from '$lib/shortcut/back.svelte';

	export let data;

	const form = data.data;

	let printWaiting = false;

	let operatorMenyerahkan = '';
</script>

<div class="flex flex-col h-screen overflow-auto">
	<div class="flex items-center justify-between p-2 text-teal-800 shrink-0 bg-blue-2">
		<div class="flex items-center gap-4">
			<Back />
			<h1>Serah Terima Berkas</h1>
		</div>
		<button
			on:click={async () => {
				printWaiting = true;
				let link = window.location.href;
				link = link.replace('..', '.' + operatorMenyerahkan);

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
					<div class="w-32">Staf Pengelola</div>
					<div>:</div>
					<div>{form.nama_staf}</div>
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
						{#each form.formulir ?? [] as form, i}
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
						{:else}
							<tr>
								<td colspan="8">tidak ada formulir</td>
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
						</div>

						<div>....</div>
					</div>

					<div class="signature">
						<div>
							<div>Yang Menyerahkan</div>
							<div>Sub Bagian Keuangan & Aset</div>
						</div>

						<div>{data.serahNama ?? operatorMenyerahkan}</div>
					</div>
				</div>
			</div>
		</div>

		<div class="p-12">
			<div>Yang Menyerahkan :</div>
			{#await fiero(`/operator/getAllUserOperator`) then data}
				<Select
					bind:key={operatorMenyerahkan}
					{data}
					config={{ key: 'nama', title: 'nama', title2: 'nip' }}
				/>
			{/await}
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

		.signature {
			@apply h-28;
		}
	}
</style>
