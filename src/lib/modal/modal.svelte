<script>
	// @ts-nocheck
	import Icon from '@iconify/svelte';

	import { createEventDispatcher } from 'svelte';
	import { scale } from 'svelte/transition';

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
		class="h-screen w-screen fixed top-0 left-0 pt-8 z-[9999] bg-slate-500 bg-opacity-30"
		on:click|self={() => {
			if (closable === 'false') return;
			opened = false;
			closed();
		}}
	>
		<div
			transition:scale
			class="w-fit relative max-w-[{width}] py-6 px-8 bg-blue-2 text-teal-950 rounded mx-auto max-h-[85vh] overflow-auto"
		>
			<div on:click={close} class="absolute text-red-600 cursor-pointer top-5 right-5">
				<Icon icon="bi:x-circle" />
			</div>
			<slot />
		</div>
	</div>
{/if}
