<script>
	// @ts-nocheck
	import { numeric, rupiah } from '$lib/js/currency';

	export let value;

	let display = rupiah(0);
	$: value = numeric(display);
</script>

<div class="w-full">
	<input
		type="text"
		bind:value={display}
		on:focus={() => {
			display = numeric(display);
		}}
		on:blur={() => {
			display = rupiah(display);
		}}
	/>
</div>
