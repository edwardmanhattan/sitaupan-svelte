<script>
	// @ts-nocheck
	import { rupiah } from '$lib/js/currency';
	import { fiero } from '$lib/js/fiero';

	let source = fiero(`/operator/kotakDashboard`);
</script>

<div class="grid grid-cols-4 gap-3">
	{#await source}
		{#each { length: 8 } as _, id}
			<div class="h-32 bg-gray-500 rounded animate-pulse" />
		{/each}
	{:then data}
		{#each data as d}
			<div class="rounded bg-gray-2 text-white-1">
				<div
					class="grid h-20 p-2 text-sm font-semibold text-center rounded-t place-items-center bg-black-1"
				>
					{d.tipe_kotak}
				</div>
				<div class="p-2 text-[.85rem] rounded-b">
					<div class="flex items-center justify-between">
						<div>Total Pekerjaan</div>
						<div>{d.total_pekerjaan}</div>
					</div>
					<div class="flex items-center justify-between">
						<div>Total Sub Pekerjaan</div>
						<div>{d.total_sub_pekerjaan}</div>
					</div>
					<div class="flex items-center justify-between">
						<div>Total Anggaran</div>
						<div>{rupiah(d.total_anggaran)}</div>
					</div>
					<div class="flex items-center justify-between">
						<div>Total Realisasi</div>
						<div>{rupiah(d.total_realisasi)}</div>
					</div>
				</div>
			</div>
		{:else}
			<div />
		{/each}
	{:catch err}
		<div>{err}</div>
	{/await}
</div>
