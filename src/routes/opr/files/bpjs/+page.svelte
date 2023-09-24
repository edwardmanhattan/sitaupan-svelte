<script>
	import { fiero } from '$lib/js/fiero';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';

	let source = fiero(`/operator/getAllDataBPJS`);
	let modifier = {
		id: { show: false }
	};
</script>

{#await source}
	<Skeleton />
{:then data}
	<Table {data} {modifier} />
{:catch err}
	<div>{err}</div>
{/await}
