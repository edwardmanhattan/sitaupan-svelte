<script>
	// @ts-nocheck

	export let key;
	export let data;
	export let config;

	export let onChange = () => {};
	onChange();
</script>

<select class="w-full" bind:value={key} on:change={onChange}>
	{#each data ?? [] as x}
		<option value={x[config.key]}>{x[config.title]}</option>
	{:else}
		<option value="-">-</option>
	{/each}
</select>
