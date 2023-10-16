<script>
	// @ts-nocheck
	import { createEventDispatcher } from 'svelte';

	export let width = '65vw';
	export let closable = 'true';

	let opened;
	export function open() {
		opened = true;
	}
	export function close() {
		opened = false;
	}

	const dispatch = createEventDispatcher();

	function closed() {
		dispatch('closed');
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if opened}
	<div
		class="h-screen w-screen fixed top-0 left-0 pt-8 z-[9999] bg-slate-200 bg-opacity-30"
		on:click|self={() => {
			if (closable === 'false') return;
			opened = false;
			closed();
		}}
	>
		<div
			class="w-fit max-w-[{width}] py-6 px-8 bg-blue-2 text-teal-950 rounded mx-auto max-h-[85vh] overflow-auto"
		>
			<slot />
		</div>
	</div>
{/if}
