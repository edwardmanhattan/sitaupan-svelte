<script>
	// @ts-nocheck

	import { fiero } from '$lib/js/fiero';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';
	import Icon from '@iconify/svelte';

	export let data;

	let source = fiero(
		`/operator/getAllCheckListMitra?id_bidang=${data.auth.user.bidang}&id_jabatan=${data.auth.user.jabatan}&id_operator=${data.auth.user.id}`
	);
	let modifier = {
		id: { show: false }
	};
</script>

<br />

{#await source}
	<Skeleton />
{:then data}
	<Table {data} {modifier} />
{:catch err}
	<div>{err}</div>
{/await}
