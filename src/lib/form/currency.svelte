<script>
	// @ts-nocheck
	import { numeric, rupiah } from '$lib/js/currency';
	import { createEventDispatcher, onMount } from 'svelte';

	export let value;
	export let name;

	let display = rupiah(value);
	$: value = numeric(display);

	let element;
	export let onChange = () => {};

	const dispatch = createEventDispatcher();
	function linkup(value) {
		dispatch('linkup', { value });
	}

	onMount(() => {
		value ??= 0;
		linkup(value);
		onChange();
	});
</script>

<div class="w-full">
	<input
		type="text"
		bind:value={display}
		bind:this={element}
		{name}
		id={name}
		on:focus={() => {
			display = numeric(display);
		}}
		on:blur={() => {
			display = rupiah(display);
		}}
		on:change={() => {
			linkup(value);
			onChange();
			element.blur();
		}}
	/>
</div>
