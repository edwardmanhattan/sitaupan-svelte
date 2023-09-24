<script>
	// @ts-nocheck
	import { fiero } from '$lib/js/fiero';
	import { formatTitle } from '$lib/js/string';
	import { identity } from '$lib/stores';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';

	let subPage = 'formulir_baru';
	let subPages = ['formulir_baru', 'menunggu', 'selesai'];

	$: source = fiero(
		`/mitra/getListFormPenyediaJasa?id_penyedia_jasa=${$identity.id}&mode=${subPage}`
	);

	let modifier = {
		id_form: { show: false },
		no_spm: { alias: 'Nomor SPM' },
		nomor_dpa: { alias: 'Nomor DPA-SKPD/DPPA-SKPD/DPA.L-SKPD' }
	};

	let buttons = [{ head: 'Aksi', body: 'Mulai Pengisian' }];

	function changeSubPage(sub) {
		subPage = sub;
	}
</script>

<div class="flex items-center gap-2">
	{#each subPages as sub}
		<button
			on:click={() => {
				changeSubPage(sub);
			}}
			class:active={subPage === sub}
			class="subpage"
		>
			{formatTitle(sub)}
		</button>
	{/each}
</div>

{#await source}
	<Skeleton />
{:then data}
	<Table {data} {modifier} {buttons} />
{:catch err}
	<div>{err}</div>
{/await}
