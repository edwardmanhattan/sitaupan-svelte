<script>
	// @ts-nocheck

	import berau from '$lib/assets/berau.webp';
</script>

<div class="flex items-center justify-between">
	<div class="shrink-0">
		<img src={berau} class="w-[2.77cm] h-[3cm]" alt="Logo Kabupaten Berau" />
	</div>
	<div class="text-center">
		<div class="text-[12pt] font-semibold">PEMERINTAH KABUPATEN BERAU</div>
		<div class="text-[14pt] font-semibold">DINAS PEKERJAAN UMUM DAN</div>
		<div class="text-[14pt] font-semibold">PENATAAN RUANG</div>
		<p class="uppercase">Tanjung Redeb - Berau</p>
	</div>
	<p class="self-end">Kode Pos : 77311</p>
</div>

<hr class="mt-2 border-b border-b-black" />
<hr class="mt-1 mb-2 border-b border-b-black" />

<style lang="postcss">
	@tailwind components;
	@layer components {
		.font-times {
			font-family: 'Times New Roman', Times, serif;
		}

		* {
			@apply font-times leading-5;
		}

		p {
			@apply text-[11pt] leading-4;
		}
	}
</style>
