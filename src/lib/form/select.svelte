<script>
	// @ts-nocheck
	import { createEventDispatcher } from 'svelte';

	export let key;
	export let data = [{}];
	export let config = '';

	key ||= data[0][config.key];

	export let onChange = () => {};
	onChange();

	const dispatch = createEventDispatcher();

	function linkup(key) {
		dispatch('linkup', { key });
	}
</script>

<select
	class="w-full"
	bind:value={key}
	on:change={() => {
		linkup(key);
		onChange();
	}}
>
	{#each data ?? [] as x}
		<option value={x[config.key]}>{x[config.title]} {x[config.title2] ?? ''}</option>
	{:else}
		<option value="-">-</option>
	{/each}
</select>
