<script>
	// @ts-nocheck
	import { createEventDispatcher, onMount } from 'svelte';

	export let key;
	export let request;
	export let data = [{}];
	export let config = '';

	export let onChange = () => {};

	const dispatch = createEventDispatcher();

	function linkup(key, data = {}, request = '') {
		dispatch('linkup', { key, data, request });
	}

	onMount(() => {
		onChange();
		key ||= data[0][config?.key] ?? '';
		linkup(key, data, request ?? '');
	});

	let index = 0;
</script>

<select
	class="w-full"
	bind:value={key}
	on:change={() => {
		index = data.findIndex((x) => x[config.key] === key);
		if (request) request = data[index][request];
		linkup(key, data);
		onChange();
	}}
>
	{#each data ?? [] as x}
		<option value={x[config.key]}>
			{x[config.title]}
			{x[config.title2] ? `  (NIP. ${x[config.title2]})` : ''}
		</option>
	{:else}
		<option value="-">-</option>
	{/each}
</select>
