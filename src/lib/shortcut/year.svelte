<script>
	import { getYearsSince } from '$lib/js/datetime';

	export let year = '';
	export let since = 2023;
</script>

<select bind:value={year} class="w-32">
	<option value="">Semua</option>
	{#each getYearsSince(since) as y}
		<option value={y}>{y}</option>
	{/each}
</select>
