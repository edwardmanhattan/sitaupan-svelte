<script>
	// @ts-nocheck

	import { fiero } from '$lib/js/fiero';
	import { formatTitle } from '$lib/js/string';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';

	let subPage = 'formulir';
	let subPages = ['proyek', 'formulir'];

	let mode = 'menunggu';
	let modes = ['on_progress', 'menunggu', 'approved'];

	$: source = fiero(`/operator/getListFormPenyediaJasa?mode=${mode}&`);

	let modifier = {
		id_form: { show: false },
		no_spm: { alias: 'Nomor SPM' },
		nomor_dpa: { alias: 'Nomor DPA' }
	};

	let buttons = [{ head: 'Lihat Formulir', body: 'Lihat' }];

	function changeSubPage(sub) {}
</script>

<div class="flex items-center justify-end gap-2 text-sm">
	{#each subPages as sub}
		<button
			on:click={() => {
				changeSubPage(sub);
			}}
			class:active={subPage === sub}
			class="subpage"
		>
			{sub === 'proyek' ? 'Proyek' : 'Formulir Penyedia Jasa'}
		</button>
	{/each}
</div>

<hr class="my-3" />

<div class="flex items-center gap-2">
	{#each modes as md}
		<button
			on:click={() => {
				changeSubPage(md);
			}}
			class:active={mode === md}
			class="subpage"
		>
			{md === 'menunggu' ? 'Menunggu Approval' : formatTitle(md)}
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
