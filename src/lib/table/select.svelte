<script>
	// @ts-nocheck

	export let key;
	export let data;
	export let config;
</script>

<select class="w-full" bind:value={key}>
	{#each data as x}
		<option value={x[config.key]}>{x[config.title]}</option>
	{/each}
</select>
