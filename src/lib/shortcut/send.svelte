<script>
	// @ts-nocheck

	import { createEventDispatcher } from 'svelte';

	export let text = 'Simpan';

	const dispatch = createEventDispatcher();
	function linkup() {
		text = 'Processing...';
		dispatch('click');
	}
</script>

<button class:pointer-events-none={text === 'Processing...'} on:click={linkup}>
	{text}
</button>
