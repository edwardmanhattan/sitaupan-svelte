<script>
	// @ts-nocheck
	import { numeric, rupiah } from '$lib/js/currency';

	export let value;
	value ??= 0;

	let display = rupiah(value);
	$: value = numeric(display);

	let element;
	export let onChange = () => {};
</script>

<div class="w-full">
	<input
		type="text"
		bind:value={display}
		bind:this={element}
		on:focus={() => {
			display = numeric(display);
		}}
		on:blur={() => {
			display = rupiah(display);
		}}
		on:change={() => {
			onChange();
			element.blur();
		}}
	/>
</div>
