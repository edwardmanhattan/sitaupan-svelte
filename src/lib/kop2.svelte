<script>
	// @ts-nocheck

	import berau from '$lib/assets/berau.webp';
</script>

<div class="flex gap-2 p-2">
	<div class="flex flex-col justify-center gap-4 px-2">
		<div class="text-center rotate-180 [writing-mode:vertical-rl]">
			<div class="text-[12pt] font-semibold">PEMERINTAH KABUPATEN BERAU</div>
			<div class="text-[14pt] font-semibold">DINAS PEKERJAAN UMUM DAN PENATAAN RUANG</div>
			<p class="">Jl. Gatot Subroto No. 123 Telp.(0554)21065 Tanjung Redeb - Berau</p>
		</div>
		<div class="-rotate-90 shrink-0">
			<img src={berau} class="w-[2.25cm] aspect-square" alt="Logo Kabupaten Berau" />
		</div>
	</div>

	<div class="w-1 mr-4 grow border-x border-x-black" />
</div>

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
