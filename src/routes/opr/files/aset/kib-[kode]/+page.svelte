<script>
	import { formatTitle } from '$lib/js/string.js';
	import Table from '$lib/table/table.svelte';

	export let data;
	let { kib, kode, modifier, buttons } = data;
</script>

<div>
	<h1>KIB {formatTitle(kode)}</h1>
	<br />

	<Table data={kib} {modifier} {buttons} />
</div>
