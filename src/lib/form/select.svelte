<script>
	// @ts-nocheck
	import { createEventDispatcher, onMount } from 'svelte';

	export let key;
	export let data = [{}];
	export let config = '';

	export let onChange = () => {};

	const dispatch = createEventDispatcher();

	function linkup(key, data = {}) {
		dispatch('linkup', { key, data });
	}

	onMount(() => {
		onChange();
		key ||= data[0][config?.key] ?? '';
		linkup(key, data);
	});
</script>

<select
	class="w-full"
	bind:value={key}
	on:change={() => {
		linkup(key, data);
		onChange();
	}}
>
	{#each data ?? [] as x}
		<option value={x[config.key]}>{x[config.title]} {x[config.title2] ?? ''}</option>
	{:else}
		<option value="-">-</option>
	{/each}
</select>
