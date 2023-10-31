<script>
	// @ts-nocheck
	import { userInfo } from '$lib/stores/stores';

	import { createEventDispatcher, onMount } from 'svelte';

	export let key;
	export let request;
	export let data = [{}];
	export let config = { title: '', key: '' };

	export let onChange = () => {};

	const dispatch = createEventDispatcher();

	function linkup(key, data = {}, request = '') {
		dispatch('linkup', { key, data, request });
	}

	let index = 0;

	if ($userInfo.jabatan == 2 && config.title === 'nama_bidang') key = $userInfo.bidang;

	onMount(() => {
		if ($userInfo.jabatan == 2 && config.title === 'nama_bidang') return;

		key ||= data[0][config?.key] ?? '';
		onChange();
		index = data.findIndex((x) => x[config.key] === key);
		if (request) request = data[index][request];
		linkup(key, data, request);
	});
</script>

{#if $userInfo.jabatan == 2 && config.title === 'nama_bidang'}
	<select bind:value={key} disabled>
		<option value={key}>{data.find((x) => x.id == key)[config.title]} </option>
	</select>
{:else}
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
{/if}
