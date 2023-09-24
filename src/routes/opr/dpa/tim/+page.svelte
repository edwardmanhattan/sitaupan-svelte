<script>
	import { fiero } from '$lib/js/fiero';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';
	import Icon from '@iconify/svelte';

	let source = fiero(`/operator/getAllTimKegiatan`);
	let modifier = {
		id: { show: false }
	};
</script>

<button class="ml-auto w-fit">
	<Icon icon="bi:plus" />
	Tambah Tim
</button>
<br />

{#await source}
	<Skeleton />
{:then data}
	<Table {data} {modifier} />
{:catch err}
	<div>{err}</div>
{/await}
